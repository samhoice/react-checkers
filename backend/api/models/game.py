from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Game(models.Model):
    black_player = models.ForeignKey(User,
                                     on_delete=models.SET_NULL,
                                     null=True,
                                     related_name='b_player_set')
    white_player = models.ForeignKey(User,
                                     on_delete=models.SET_NULL,
                                     null=True,
                                     related_name='w_player_set')
    created = models.DateTimeField(auto_now_add=True)


def create_board(sender, instance, **kwargs):
    Board.objects.create(game=instance)


post_save.connect(create_board, sender=Game)


class Board(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    layout = models.CharField(max_length=64, default="b"*12 + " "*8 + "w"*12)

    adjacency_matrix = {
        0:  {'b': (),       'f': (4)},
        1:  {'b': (),       'f': (4, 5)},
        2:  {'b': (),       'f': (5, 6)},
        3:  {'b': (),       'f': (6, 7)},
        4:  {'b': (0, 1),   'f': (8, 9)},
        5:  {'b': (1, 2),   'f': (9, 10)},
        6:  {'b': (2, 3),   'f': (10, 11)},
        7:  {'b': (3),      'f': (11)},
        8:  {'b': (4),      'f': (12)},
        9:  {'b': (4, 5),   'f': (12, 13)},
        10: {'b': (5, 6),   'f': (13, 14)},
        11: {'b': (6, 7),   'f': (14, 15)},
        12: {'b': (8, 9),   'f': (16, 17)},
        13: {'b': (9, 10),  'f': (17, 18)},
        14: {'b': (10, 11), 'f': (18, 19)},
        15: {'b': (11),     'f': (19)},
        16: {'b': (12),     'f': (20)},
        17: {'b': (12, 13), 'f': (20, 21)},
        18: {'b': (13, 14), 'f': (21, 22)},
        19: {'b': (14, 15), 'f': (22, 23)},
        20: {'b': (16, 17), 'f': (24, 25)},
        21: {'b': (17, 18), 'f': (25, 26)},
        22: {'b': (18, 19), 'f': (26, 27)},
        23: {'b': (19),     'f': (27)},
        24: {'b': (20),     'f': (28)},
        25: {'b': (20, 21), 'f': (28, 29)},
        26: {'b': (21, 22), 'f': (29, 30)},
        27: {'b': (22, 23), 'f': (30, 31)},
        28: {'b': (24, 25), 'f': ()},
        29: {'b': (25, 26), 'f': ()},
        30: {'b': (26, 27), 'f': ()},
        31: {'b': (27),     'f': ()}
    }

    piece_mapping = {
        ' ': 1,
        'w': 2,
        'b': 3,
        'W': 4,
        'B': 5,
    }

    def testValidMove(self, from_sq, to_sq):
        return True

    def applyMove(self, from_sq, to_sq):
        pass


class Move(models.Model):
    from_sq = models.IntegerField()
    to_sq = models.IntegerField()
    created = models.DateTimeField()
    moved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
