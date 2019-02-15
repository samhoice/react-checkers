from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import viewsets, mixins
from rest_framework import permissions

from .models import (Game,
        Board)
from .serializers import (UserSerializer, 
        GameSerializer,
        GameListSerializer,
        BoardSerializer)

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

class BoardViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Board.objects.all()

    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, )

