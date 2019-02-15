from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (Game,
        Board)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')

class BoardSerializer(serializers.ModelSerializer):
    layout = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ('id', 'layout')

    def get_layout(self, obj):
        pos_mapping = {
            0: (0,0),
            1: (0,2),
            2: (0,4),
            3: (0,6),
            4: (1,1),
            5: (1,3),
            6: (1,5),
            7: (1,7),
            8: (2,0),
            9: (2,2),
            10: (2,4),
            11: (2,6),
            12: (3,1),
            13: (3,3),
            14: (3,5),
            15: (3,7),
            16: (4,0),
            17: (4,2),
            18: (4,4),
            19: (4,6),
            20: (5,1),
            21: (5,3),
            22: (5,5),
            23: (5,7),
            24: (6,0),
            25: (6,2),
            26: (6,4),
            27: (6,6),
            28: (7,1),
            29: (7,3),
            30: (7,5),
            31: (7,7),
        }

        piece_mapping = {
            ' ': 1,
            'w': 2,
            'b': 3,
            'W': 4,
            'B': 5,
        }

        board = [[0 for x in range(8)] for y in range(8)]
        for i, c in enumerate(obj.layout):
            xy = pos_mapping[i]
            board[xy[0]][xy[1]] = piece_mapping[c]
        return board

class GameSerializer(serializers.ModelSerializer):
    board_set = BoardSerializer(many=True)
    class Meta:
        model = Game
        fields = ('id', 'url', 'created', 'white_player', 'black_player', 'board_set')
        read_only_fields = ('white_player', 'black_player', 'board_set')

class GameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'url', 'created', 'white_player', 'black_player')
        read_only_fields = ('white_player', 'black_player')

    def create(self, validated_data):
        return Game.objects.create(black_player=self.context['request'].user)

