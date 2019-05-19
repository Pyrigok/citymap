from rest_framework import serializers

from places.api.serializers import HotelSerializer
from places.models import Cafe


class SavedPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('name', 'street', 'locality', 'headers', 'phone',
                  'center_related', 'mark', 'img_url')

        model = Cafe
        name = HotelSerializer(many=True)
