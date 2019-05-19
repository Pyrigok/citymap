from places.models import Hotel, FoodPlace, Address
from rest_framework import serializers


class AdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('latitude', 'longitude')


class FoodPlaceSerializer(serializers.HyperlinkedModelSerializer):
    foodplace_address = AdressSerializer(many=True, read_only=True)

    class Meta:
        model = FoodPlace
        fields = ('name', 'img_url', 'mark', 'address_raw_line', 'foodplace_address')


class HotelPlaceSerializer(serializers.HyperlinkedModelSerializer):
    hotel_address = AdressSerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = ('name', 'img_url', 'mark', 'address_raw_line', 'hotel_address')
