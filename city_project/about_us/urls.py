from django.urls import path

from about_us.views import AboutUs

app_name = 'about_us'

urlpatterns = [
    path('', AboutUs.as_view(), name='about_us'),
]
