from django.contrib.auth.models import User
from .models import Game
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'url', 'created', 'white_player', 'black_player')
        read_only_fields = ('white_player', 'black_player')

    def create(self, validated_data):
        return Game.objects.create(black_player=self.context['request'].user)
