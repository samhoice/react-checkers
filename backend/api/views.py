from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import viewsets
from rest_framework import permissions

from .models import Game
from .serializers import (UserSerializer, 
        GameSerializer)

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAuthenticated,)

class GameViewSet(viewsets.ModelViewSet):

    serializer_class = GameSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        player = self.request.user
        return Game.objects.filter(Q(white_player=player) | Q(black_player=player))
