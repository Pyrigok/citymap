from django.db import models
from django.contrib.auth.models import User

from itertools import chain

from places.models import Hotel, Cafe

class SavedPlaces(models.Model):
    """Model for saved places."""

    saved_hotels = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    saved_cafes = models.ForeignKey(Cafe, on_delete=models.CASCADE)


    @staticmethod
    def save_place(username, place_name):
        ids_places = Hotel.objects.values_list('id', flat=True).filter(name=place_name)

        if len(ids_places) == 0:
            ids_places = Cafe.objects.values_list('id', flat=True).filter(name=place_name)
            places_queryset = Cafe.objects.filter(pk__in=set(ids_places))
        else:
            places_queryset = Hotel.objects.filter(pk__in=set(ids_places))

        place_object = places_queryset.filter(name=place_name).last()
        user_save = place_object.users_saved.filter(username=username)
        user = User.objects.filter(username=username)
        if len(user_save) == 0:
            place_object.users_saved.set(user)
            place_object.save()
            return True
        else:
            return False


    @staticmethod
    def show_place(username):
        id_user = User.objects.values_list('id', flat=True).filter(username=username).last()
        hotels_queryset = Hotel.objects.filter(users_saved=id_user)
        cafes_queryset = Cafe.objects.filter(users_saved=id_user)
        saved_places = list(chain(hotels_queryset, cafes_queryset))
        return saved_places