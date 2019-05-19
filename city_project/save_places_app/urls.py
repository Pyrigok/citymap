from django.urls import path

from save_places_app.api_views import SavedPlacesApi, SavedPlacesViewApi


app_name = 'save_place_app'

urlpatterns = [
    path('saved-places-api/', SavedPlacesApi.as_view(), name='saved_hotels_api'),
    path('saved-places-view-api/', SavedPlacesViewApi.as_view(), name='saved_places_view_api')
]
