from django.test import TestCase

from places.models import Hotel


class TestModelHotel(TestCase):
    """Simple examples of testing for Hotel model."""

    @classmethod
    def set_up_test_data(cls):
        Hotel.objects.create(name='My MEGA hotel name')

    def test_string_representation(self):
        hotel = Hotel(name="My MEGA hotel name")
        self.assertEqual(str(hotel), hotel.name)

    def test_verbose_name_plural(self):
        self.assertEqual(str(Hotel._meta.verbose_name_plural), "hotels")
