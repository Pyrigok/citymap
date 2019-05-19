from django.urls import path, include

from search.views import GetHotels, GetRestaurants, HotelSearch, NearestRestaurants, RestaurantSearch, ResultView, \
    Autocomplete, Search

# NEW VIEWS IMPORT
from search.views import FoodPlaceList, HotelPlaceList

app_name = 'search'

urlpatterns = [
    path('', Search.as_view(), name='search'),
    path('forms/', include([
        path('hotels/', HotelSearch.as_view(), name='search_hotel'),
        path('restaurant/', RestaurantSearch.as_view(), name='search_rest'),
    ])),
    path('get-hotels/', GetHotels.as_view(), name='get_hotels'),
    path('get-hotels/<str:id>', GetHotels.as_view(), name='get_hotels'),
    path('get-rest/', GetRestaurants.as_view(), name='get_restaurants'),
    path('nearest-places/', NearestRestaurants.as_view(), name='ajax_rest'),
    path('result/<int:id>', ResultView.as_view(), name='result'),
    # NEW REACT VIEWS START
    path('restaurant/', FoodPlaceList.as_view()),
    path('hotels/', HotelPlaceList.as_view())
]
