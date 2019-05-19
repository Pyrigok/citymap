from django.http import HttpResponse, JsonResponse

from rest_framework import generics, status

from places.api.serializers import HotelSerializer, CafeSerializer
from places.models import Hotel, Cafe
from save_places_app.models import SavedPlaces
from save_places_app.serializers import SavedPlacesSerializer


class SavedPlacesApi(generics.ListCreateAPIView):
    """API for saving places"""

    queryset_hotels = Hotel.get_all_hotels()
    queryset_cafes = Cafe.get_all_cafes()
    hotels_serializer_class = HotelSerializer
    cafe_serializer_class = CafeSerializer

    def post(self, request):
        username = request.data['user_name']
        place_name = request.data['place_name']
        if SavedPlaces.save_place(username, place_name):
            return HttpResponse('Place was saved')
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


class SavedPlacesViewApi(generics.ListCreateAPIView):
    """API for showing saved places"""

    def post(self, request):
        username = request.data['user_name']
        saved_places = SavedPlaces.show_place(username)
        serializer = SavedPlacesSerializer(saved_places, many=True)
        return JsonResponse(serializer.data, safe=False)