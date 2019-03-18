from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import status, viewsets, mixins
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (Game,
        Board,
        Move)
from .serializers import (UserSerializer, 
        GameSerializer,
        GameListSerializer,
        BoardSerializer,
        MoveSerializer)

# Create your views here.

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
            if testValidMove(board.layout,
                    serializer.data['from_sq'],
                    serializer.data['to_sq']):
                new_board = makeMove(board.layout,
                    serializer.validated_data['from_sq'],
                    serializer.validated_data['to_sq'])
                board.layout = new_board
                board.save()
            return Response({"move": serializer.data})
        else:
            return Response(serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST)

class BoardViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Board.objects.all()

    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, )

def testValidMove(board, from_sq, to_sq):
    return True

def makeMove(layout, from_sq, to_sq):
    print("f:{} t:{}".format(from_sq, to_sq))
    checker = layout[from_sq:from_sq+1]
    print(checker)
    layout = layout[0:from_sq] + ' ' + layout[from_sq+1:]
    layout = layout[0:to_sq] + checker + layout[to_sq+1:]
    return layout
