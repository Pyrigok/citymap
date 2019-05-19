from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import View, TemplateView

from search.forms import (HotelsForm, RestauranForm)
from places.models import Hotel, FoodPlace, Address

from googleplaces import GooglePlaces

from django.contrib.gis.geos import Point

from search.serializers import FoodPlaceSerializer, HotelPlaceSerializer

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions

import json
import requests as request_lib


class ResultView(TemplateView):
    template_name = 'search/result_page.html'

    def get(self, request, name='', *args, **kwargs):
        hotel = Hotel.objects.get(id=id)
        args = {'hotel': hotel}
        return render(request, self.template_name, args)


class Search(TemplateView):
    template_name = 'search/search.html'
    form = HotelsForm

    def get(self, request):
        model = Address.get_hotels_coordinates(self)
        return render(request, self.template_name, {'form': self.form, 'model': model})

    def post(self, request):
        keywords = request.POST.get('keywords')
        if ('adult' in request.POST):
            category = Hotel.get_object_by_keywords(self, keywords)
            coordinates = Address.get_hotels_coordinates(self, keywords)
        else:
            category = FoodPlace.get_object_by_keywords(self, keywords)
            coordinates = Address.get_foodplace_coordinates(self, keywords)
        return render(request, 'search/result_page.html', {'category': category, 'coordinates': coordinates})


class HotelSearch(Search):
    template_name = 'search/search_forms.html'
    form = HotelsForm

    def post(self, request):
        if request.POST.get('category') == 'Restaurant':
            qs = list(Address.get_foodplace_coordinates(self))
        else:
            qs = list(Address.get_hotels_coordinates(self))
        return JsonResponse(qs, safe=False)


class RestaurantSearch(Search):
    template_name = 'search/search_forms.html'
    form = RestauranForm


class GetHotels(View):
    # places API key1: AIzaSyB4q85ssJbKf4cNtaiQT-GeK0KCFiwoDqs
    # places API key2: AIzaSyA7BvQg4U2dF-z9seDJZLtR-1zEzLQAq0I
    def get(self, request, id=None):
        API_KEY = 'AIzaSyA7BvQg4U2dF-z9seDJZLtR-1zEzLQAq0I'
        google_places = GooglePlaces(API_KEY)
        query_result = google_places.nearby_search(lat_lng={'lat': 49.83, 'lng': 24.02}, radius=10000, types=['Hotel'])
        places = query_result.places
        cordinates = []
        for place in places:
            if place.place_id == id:
                cordinates = [place.geo_location["lat"], place.geo_location["lng"]]
                return render(request, 'search/get_hotels.html',
                              {'places': places, 'cordinates': cordinates, 'selected': place})
        return render(request, 'search/get_hotels.html', {'places': places, 'cordinates': cordinates, 'selected': None})


class GetRestaurants(TemplateView):
    template_name = 'search/get_restaurant.html'
    model = FoodPlace.objects.all()

    def get(self, request):
        return render(request, self.template_name, {'food': self.model})


class NearestRestaurants(View):
    API_KEY = 'AIzaSyD-G62CxapPg9ozROE32V9dVOpeHylSJVM'
    NEAREST_PLACE_API = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
    PHOTO_API = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
    """Get nearest places for re"""

    def post(self, request):

        location = request.POST.get('lat') + "," + request.POST.get('lon')
        full_url = self.NEAREST_PLACE_API + request.POST.get('lat') + "," + request.POST.get('lon') + \
                   "&radius=1000&type=" + request.POST.get('category') + "&key=" + self.API_KEY
        print(full_url)
        json_data = request_lib.get(full_url).json()
        if request.POST.get('category') == "Hotels":
            self.nearest_places(Hotel, json_data)
        else:
            self.nearest_places(FoodPlace, json_data)
        return HttpResponse("Hello")

    def nearest_places(self, model, json_data):
        for place in json_data["results"]:
            latitude = place["geometry"]["location"]["lat"]
            longitude = place["geometry"]["location"]["lng"]
            try:
                if "rating" in place.keys() and "photos" in place.keys():
                    new_place = model(name=place["name"],
                                      address_raw_line=place["vicinity"],
                                      mark=place["rating"],
                                      img_url=self.PHOTO_API + place["photos"][0][
                                          "photo_reference"] + "&key=" + self.API_KEY,
                                      location=Point(float(latitude), float(longitude), srid=4326))
                    new_place.save()
                    print(new_place)
                    if model == FoodPlace:
                        place_adress = Address(
                            foodplace=new_place,
                            latitude=latitude,
                            longitude=longitude)
                    else:
                        place_adress = Address(
                            hotel=new_place,
                            latitude=latitude,
                            longitude=longitude)
                    place_adress.save()
            except IntegrityError as e:
                print("Error! Object already exists", e)


class Autocomplete(View):
    def post(self, request):
        if request.POST.get('category') == 'Hotels':
            qs = list(Hotel.objects.values('name'))
        elif request.POST.get('category') == 'Restaurant':
            qs = list(FoodPlace.objects.values('name'))
        return JsonResponse(qs, safe=False)


# REACT SERIALIZERS VIEWS
class FoodPlaceList(generics.ListCreateAPIView):
    """Filter by parametres for map search"""
    queryset = FoodPlace.objects.all()
    serializer_class = FoodPlaceSerializer

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        if 'top' in data:
            filter_qs = FoodPlace.get_top(self, data['top'])
        else:
            filter_qs = FoodPlace.get_nearest_places(self, data)
        serializer = FoodPlaceSerializer(filter_qs, many=True)
        return Response(serializer.data)


class HotelPlaceList(generics.ListCreateAPIView):
    """Filter by parametres for map search"""
    queryset = Hotel.objects.all()
    serializer_class = HotelPlaceSerializer

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        if 'top' in data:
            filter_qs = Hotel.get_top(self, data['top'])
        else:
            filter_qs = Hotel.get_nearest_places(self, data)
        serializer = HotelPlaceSerializer(filter_qs, many=True)
        return Response(serializer.data)
