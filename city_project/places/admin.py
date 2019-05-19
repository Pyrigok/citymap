from django.contrib import admin
from places.models import Hotel, Address, FoodPlace, Comment, Cafe

admin.site.register(Hotel)
admin.site.register(Address)
admin.site.register(FoodPlace)
admin.site.register(Comment)
admin.site.register(Cafe)
