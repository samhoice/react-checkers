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

    winner = models.ForeignKey(User,
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True)

    def getTurnNum(self):
       return self.turn_set.filter(complete=True).count()

    def getBoard(self):
        return self.board_set.first()

def create_board(sender, instance, **kwargs):
    Board.objects.create(game=instance)


post_save.connect(create_board, sender=Game)


class Board(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    layout = models.CharField(max_length=64, default="b"*12 + " "*8 + "w"*12)

    def testValidMove(self, from_sq, to_sq):
        return True

    def applyMove(self, from_sq, to_sq):
        pass

class Turn(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    complete = models.BooleanField(default=True)

    def __str__(self):
        jump_move = "move"
        if self.jump_set.exists():
            jump_move = "jump"
        return "Turn: {} - game {} {}".format(self.pk, self.game.id, jump_move)

class Move(models.Model):
    from_sq = models.IntegerField()
    to_sq = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    moved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    turn = models.ForeignKey(Turn, on_delete=models.CASCADE)


class Jump(models.Model):
    from_sq = models.IntegerField()
    to_sq = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    moved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    turn = models.ForeignKey(Turn, on_delete=models.CASCADE)
