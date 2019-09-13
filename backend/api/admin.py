from django.contrib import admin
from api.models import (Board,
                        Game,
                        Turn,
                        Move,
                        Jump)

# Register your models here.
admin.site.register(Game)
admin.site.register(Board)
admin.site.register(Turn)
admin.site.register(Move)
admin.site.register(Jump)
