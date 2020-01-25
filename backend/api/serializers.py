from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (Game,
        Board,
        Move)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')

class BoardSerializer(serializers.ModelSerializer):
    piece_mapping = {
        ' ': 1,
        'w': 2,
        'b': 3,
        'W': 4,
        'B': 5,
    }

    layout = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ('id', 'layout')

    def get_layout(self, obj):
        board = [[0 for x in range(8)] for y in range(8)]
        for i, c in enumerate(obj.layout):
            x, y = MoveSerializer.pos_mapping[i]
            board[y][x] = self.piece_mapping[c]
        return board

class GameSerializer(serializers.ModelSerializer):
    board_set = BoardSerializer(many=True)
    class Meta:
        model = Game
        fields = ('id', 'url', 'created', 'white_player', 'black_player', 'winner', 'board_set')
        read_only_fields = ('white_player', 'black_player', 'winner', 'board_set')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['turn'] = instance.getTurnNum()
        return ret

class GameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'url', 'created', 'white_player', 'black_player', 'winner')
        read_only_fields = ('white_player', 'black_player', 'winner')

    def create(self, validated_data):
        g = Game.objects.latest('pk')
        if g and g.pk % 2 == 1:
            return Game.objects.create(black_player=self.context['request'].user)
        return Game.objects.create(white_player=self.context['request'].user)

class MoveSerializer(serializers.ModelSerializer):
    from_sq = serializers.CharField(min_length=2, max_length=2)
    to_sq = serializers.CharField(min_length=2, max_length=2)
    class Meta:
        model = Move
        fields = ('id', 'from_sq', 'to_sq', 'turn')
        read_only_fields = ('turn', )

    pos_mapping = {
        0: (0, 0),
        1: (2, 0),
        2: (4, 0),
        3: (6, 0),
        4: (1, 1),
        5: (3, 1),
        6: (5, 1),
        7: (7, 1),
        8: (0, 2),
        9: (2, 2),
        10: (4, 2),
        11: (6, 2),
        12: (1, 3),
        13: (3, 3),
        14: (5, 3),
        15: (7, 3),
        16: (0, 4),
        17: (2, 4),
        18: (4, 4),
        19: (6, 4),
        20: (1, 5),
        21: (3, 5),
        22: (5, 5),
        23: (7, 5),
        24: (0, 6),
        25: (2, 6),
        26: (4, 6),
        27: (6, 6),
        28: (1, 7),
        29: (3, 7),
        30: (5, 7),
        31: (7, 7),
    }

    rev_pos_mapping = {
        0: {0: 0,
            2: 8,
            4: 16,
            6: 24},
        1: {1: 4,
            3: 12,
            5: 20,
            7: 28},
        2: {0: 1,
            2: 9,
            4: 17,
            6: 25,},
        3: {1: 5,
            3: 13,
            5: 21,
            7: 29},
        4: {0: 2,
            2: 10,
            4: 18,
            6: 26},
        5: {1: 6,
            3: 14,
            5: 22,
            7: 30,},
        6: {0: 3,
            2: 11,
            4: 19,
            6: 27,},
        7: {1: 7,
            3: 15,
            5: 23,
            7: 31,},
    }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        fs = rep['from_sq']
        ts = rep['to_sq']
        rep['from_sq'] = "{}{}".format(self.pos_mapping[int(fs)][0],self.pos_mapping[int(fs)][1])
        rep['to_sq'] = "{}{}".format(self.pos_mapping[int(ts)][0],self.pos_mapping[int(ts)][1])
        return rep

    def to_internal_value(self, data):
        value = super().to_internal_value(data)
        fx = data['from_sq'][0:1]
        fy = data['from_sq'][1:]
        tx = data['to_sq'][0:1]
        ty = data['to_sq'][1:]
        value['from_sq'] = MoveSerializer.rev_pos_mapping[int(fx)][int(fy)]
        value['to_sq'] = MoveSerializer.rev_pos_mapping[int(tx)][int(ty)]
        return value
