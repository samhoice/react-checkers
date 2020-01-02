from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from django.views.generic import DetailView

from rest_framework import status, viewsets, mixins
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import (Game,
                     Board,
                     Turn,
                     Move,
                     Jump)
from .serializers import (UserSerializer,
                          GameSerializer,
                          GameListSerializer,
                          BoardSerializer,
                          MoveSerializer)

from .checkers import Checkers


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAuthenticated,)

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class GameViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if(self.action == 'list' or self.action == 'create'):
            return GameListSerializer
        else:
            return GameSerializer

    def get_queryset(self):
        player = self.request.user
        return Game.objects.filter(Q(white_player=player) | Q(black_player=player)).order_by('-created')

    @action(detail=True, methods=['post'])
    def move(self, request, pk):
        serializer = MoveSerializer(data=request.data)
        game = self.get_object()
        board = game.getBoard()
        if game.turn_set.filter(complete=False).count():
            return Response({"error": "Can't move during a jump"},
                    status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            (move_num, new_layout) = Checkers.movePiece(board.layout,
                                                        serializer.validated_data['from_sq'],
                                                        serializer.validated_data['to_sq'],
                                                        game.getTurnNum())
            if new_layout:
                # move success!
                board.layout = new_layout
                board.save()
                turn = Turn(game=game, complete=True)
                turn.save()
                move = Move(from_sq=serializer.validated_data['from_sq'],
                            to_sq=serializer.validated_data['to_sq'],
                            moved_by=request.user,
                            turn=turn)
                move.save()
                board_serializer = BoardSerializer(board)

                channel_layer = get_channel_layer()
                # TODO: this should send to the group for the game, not "notifier"
                async_to_sync(channel_layer.group_send)("notifier", 
                        {'type': "notify.turn",
                            'message': "{},{}".format(game.id, game.getTurnNum())})

                return Response({"move": serializer.data,
                                 "board": board_serializer.data,
                                 "turn": game.getTurnNum()})
            else:
                return Response({"error": 'Invalid move'},
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def jump(self, request, pk):
        serializer = MoveSerializer(data=request.data)
        game = self.get_object()
        board = game.getBoard()
        turn = game.turn_set.filter(complete=False)
        jumping_piece = None
        if turn.count() > 1:
            return Response({"error": "Turns are out of sync"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif turn.count() == 1:
            turn = turn[0]
            # this is the piece that's jumping
            jumping_piece = turn.jump_set.latest('created').to_sq
        turn_num = game.getTurnNum() 
        print(turn_num)
        if serializer.is_valid():
            if jumping_piece is not None and serializer.validated_data['from_sq'] != jumping_piece:
                # make sure you keep jumping with the same piece
                return Response({"error": 'Not the jumping piece'},
                        status=status.HTTP_400_BAD_REQUEST)
            (move_num, new_layout) = Checkers.jumpPiece(board.layout,
                                           serializer.validated_data['from_sq'],
                                           serializer.validated_data['to_sq'],
                                           turn_num)
            if new_layout:
                # a jump changed the board
                board.layout = new_layout
                board.save()
                if not turn:
                    turn = Turn(game=game)
                if(move_num == game.getTurnNum()):
                    turn.complete = False
                else:
                    turn.complete = True
                turn.save()
                jump = Jump(from_sq=serializer.validated_data['from_sq'],
                        to_sq=serializer.validated_data['to_sq'],
                        moved_by=request.user,
                        turn=turn)
                jump.save()

                winner = Checkers.checkWin(new_layout)
                if winner and winner == 'b':
                    game.winner = game.black_player
                    game.save()
                elif winner:
                    game.winner = game.white_player
                    game.save()

                if turn.complete:
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)("notifier", 
                        {'type': "notify.turn",
                            'message': "{},{}".format(game.id, game.getTurnNum())})

                board_serializer = BoardSerializer(board)
                return Response({"jump": serializer.data,
                    "board": board_serializer.data,
                    "turn": game.getTurnNum(),
                    "end": winner != None})
            else:
                return Response({"error": 'Invalid jump'},
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class BoardViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Board.objects.all()

    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, )
