from django.contrib import admin
from api.models import (Board, 
        Game,
        Move)

# Register your models here.
admin.site.register(Game)
admin.site.register(Board)
admin.site.register(Move)
