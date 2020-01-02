from django.contrib import admin
from api.models import (Board,
                        Game,
                        Turn,
                        Move,
                        Jump)

# Register your models here.
class BoardInline(admin.TabularInline):
    model = Board

class GameAdmin(admin.ModelAdmin):
    fields = ('black_player', 'white_player', 'winner')
    #inlines = [BoardInline]

admin.site.register(Game, GameAdmin)
admin.site.register(Board)
admin.site.register(Turn)
admin.site.register(Move)
admin.site.register(Jump)
