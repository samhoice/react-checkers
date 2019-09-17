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
    queryset = User.objects.all()
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
        board = game.board_set.first()
        if serializer.is_valid():
            (move_num, new_layout) = Checkers.movePiece(board.layout,
                                                        serializer.validated_data['from_sq'],
                                                        serializer.validated_data['to_sq'],
                                                        game.turn_set.count())
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
                                 "turn": game.turn_set.count()})
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
        board = game.board_set.first()
        if serializer.is_valid():
            new_board = Checkers.jumpPiece(board.layout,
                                           serializer.validated_data['from_sq'],
                                           serializer.validated_data['to_sq'])
            if new_board:
                board.layout = new_board
                board.save()
                return Response({"jump": serializer.data})
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class BoardViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Board.objects.all()

    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, )
