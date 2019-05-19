# -*- coding: utf-8 -*-
from places.models import Hotel, Address, Comment, Cafe
from rest_framework import serializers


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('name', 'mark', 'pets_allowed', 'img_url', 'children_allowed',
                  'has_restaurant', 'has_pool', 'has_spa', 'shuttle', 'description')
        model = Hotel


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('hotel', 'author', 'text', 'created_date')
        model = Comment


class CafeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('name', 'street', 'locality', 'headers', 'phone',
                  'center_related', 'mark', 'img_url')
        model = Cafe


class AddressSerializer(serializers.ModelSerializer):
    """Serializer class for Address model."""

    class Meta:
        model = Address
        exclude = ('hotel', 'foodplace', 'latitude', 'longitude',)


class HotelAdditionSerializer(serializers.ModelSerializer):
    """Serializer class for Hotel with ForeignKey to Address model."""
    hotel_address = AddressSerializer(many=True)

    class Meta:
        model = Hotel
        exclude = ('address_raw_line', 'img_url', 'users_saved', 'location',)

    def create(self, validated_data):
        """Custom '.create()' method because we need to get hotel.pk before saving of related Address instance."""
        hotel = self.Hotel.objects.create(**validated_data)
        return hotel
