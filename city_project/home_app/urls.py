from django.urls import path

from home_app.views import Home

app_name = 'home_app'

urlpatterns = [
    path('', Home.as_view(), name='home'),
]
