"""city_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from user_info_app.views import FacebookLogin

urlpatterns = [
    path('', include('home_app.urls', namespace='home_app')),
    path('user/', include('user_info_app.urls', namespace='user_info_app')),
    path('contact/', include('contact_app.urls', namespace='contact_app')),
    path('about-us/', include('about_us.urls', namespace='about_us')),
    path('places/', include('places.urls', namespace='places')),
    path('search/', include('search.urls', namespace='search')),
    path('saved-place/', include('save_places_app.urls', namespace='saved_places')),
    path('pxa-master/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('token-refresh/', refresh_jwt_token),
    path('auth/', include([
        path('facebook/', FacebookLogin.as_view(), name='Facebook_login'),
    ])),
]

admin.site.site_header = 'CityMap Administration'
admin.site.site_title = 'CityMap Administration'
