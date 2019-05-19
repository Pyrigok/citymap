# -*- coding: utf-8 -*-
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from places.api.views import HotelApi, GetHotelComments, GetCafeComments, CafeApi, HotelAdditionAPI
from places.views import AddPlacesView, AddHotelCommonView, AddFoodPlaceCommonView, GetPlaces

app_name = 'places'

urlpatterns = [
    path('', AddPlacesView.as_view(), name='add_places'),
    path('add-new/', include([
        path('api/hotel', HotelAdditionAPI.as_view()),
        path('common/hotel/', AddHotelCommonView.as_view(), name='add_place_hotel'),
        path('common/foodplace/', AddFoodPlaceCommonView.as_view(), name='add_place_foodplace'),
    ])),
    path('get-places/<str:type>/', csrf_exempt(GetPlaces.as_view()), name='get_places'),
    path('hotel-info-api/', include([
        path('', HotelApi.as_view(), name='hotel_info_api'),
        path('<int:pk>', GetHotelComments.as_view(), name='hotel_comments'),
    ])),
    path('cafe-info-api/', include([
        path('', CafeApi.as_view(), name='cafe_info_api'),
        path('<int:pk>', GetCafeComments.as_view(), name='cafe_comments'),
    ])),
]
