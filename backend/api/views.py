from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import status, viewsets, mixins
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

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
        return Game.objects.filter(Q(white_player=player) | Q(black_player=player))

    @action(detail=True, methods=['post'])
    def move(self, request, pk):
        serializer = MoveSerializer(data=request.data)
        game = self.get_object()
        board = game.getBoard()
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
                return Response({"move": serializer.data,
                                 "board": board_serializer.data,
                                 "turn": game.getTurnNum()})
            else:
                return Response({"response": 'Invalid move'},
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
        if turn.count() > 1:
            return Response({"error": "Turns are out of sync"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif turn.count() == 1:
            turn = turn[0]
        turn_num = game.getTurnNum() 
        if serializer.is_valid():
            (move_num, new_layout) = Checkers.jumpPiece(board.layout,
                                           serializer.validated_data['from_sq'],
                                           serializer.validated_data['to_sq'],
                                           turn_num)
            if new_layout:
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
                board_serializer = BoardSerializer(board)
                return Response({"jump": serializer.data,
                    "board": board_serializer.data,
                    "turn": game.getTurnNum()})
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
