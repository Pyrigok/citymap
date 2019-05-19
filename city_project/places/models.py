# -*- coding: utf-8 -*-
import datetime
from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.utils import timezone


class Hotel(models.Model):
    """Model for creation of new hotels."""
    name = models.CharField(max_length=200, unique=True)
    website = models.CharField(max_length=1024, blank=True, default="")
    phone = models.IntegerField(help_text="Please use the following format: 380123456789", blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    stars = models.IntegerField(null=True)
    location = models.PointField(null=True, blank=True)
    mark = models.FloatField(default=0.0)
    children_allowed = models.BooleanField(null=True, default=False)
    pets_allowed = models.BooleanField(null=True)
    has_restaurant = models.BooleanField(null=True, default=False)
    has_pool = models.BooleanField(null=True, default=False)
    has_spa = models.BooleanField(null=True, default=False)
    shuttle = models.CharField(max_length=50, blank=True, default="", null=True)
    description = models.TextField(blank=True, default="")
    img_url = models.CharField(max_length=512, null=True, default="")
    image_uploaded_by_user = models.ImageField(upload_to="images/places_imgs/hotels", blank=True, null=True)
    address_raw_line = models.CharField(max_length=255, blank=True, default="")
    
    users_saved = models.ManyToManyField(User)

    def __str__(self):
        """A string representation of the model."""
        return self.name

    @staticmethod
    def get_all_hotels():
        """Retrieve all hotels from database."""
        return Hotel.objects.all()

    class Meta:
        verbose_name = "hotel"
        verbose_name_plural = "hotels"
        ordering = ['pk']

    def get_all_names(self):
        """Get list of names of hotels already saved."""
        hotels = Hotel.objects.all()
        names = []

        for hotel in hotels:
            names.append(hotel.name)

        return names

    def get_object_by_pk(self, pk):
        """Retrieve hotel by its primary key."""
        return Hotel.objects.get(pk=pk)

    def get_object_by_name(self, name):
        """Retrieve hotel by its name."""
        return Hotel.objects.get(name=name)

    def get_object_by_keywords(self, keyword):
        """Retrieve hotel by its name."""
        return Hotel.objects.filter(name__contains=keyword)

    def get_top(self, top):
        return Hotel.objects.all().order_by('-mark')[:top]

    def get_nearest_places(self, data):

        keywords = data['keywords']
        coordinates = data['user_position']
        mark = data['mark']
        user_position = Point(float(coordinates['lat']), float(coordinates['lng']), srid=4326)
        if mark > 1:
            return Hotel.objects.filter(location__distance_lte=(user_position, D(km=int(data['radius']))),
                                        name__contains=keywords, mark__gte=mark - 1, mark__lte=mark)
        return Hotel.objects.filter(location__distance_lte=(user_position, D(km=int(data['radius']))),
                                    name__contains=keywords)


class Cafe(models.Model):
    """Model for new cafe creation"""
    name = models.CharField(max_length=200, unique=True)
    street = models.CharField(max_length=100, blank=True, default="")
    locality = models.CharField(max_length=50, blank=True, default="")
    headers = models.CharField(max_length=200, blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    center_related = models.CharField(max_length=50, blank=True, default="")
    mark = models.FloatField(default=0.0)
    img_url = models.CharField(max_length=512, null=True, default="")
    users_saved = models.ManyToManyField(User)

    def __str__(self):
        return self.name

    @staticmethod
    def get_all_cafes():
        """Get queryset of objects of already saved cafes."""
        return Cafe.objects.all()

    def get_object_by_pk(self, pk):
        """Retrieve hotel by its primary key."""
        return Cafe.objects.get(pk=pk)

    def get_cafe_by_name(self, name):
        """Retrieve cafe by its name."""
        return Cafe.objects.get(name=name)

    def get_all_names(self):
        """Get list of names of cafes already saved."""
        cafes = Cafe.objects.all()
        names = []

        for cafe in cafes:
            names.append(cafe.name)

        return names


class Comment(models.Model):
    """Model for new comment creation"""
    hotel = models.ForeignKey('places.Hotel', on_delete=models.CASCADE, related_name='comments', null=True)
    cafe = models.ForeignKey('places.Cafe', on_delete=models.CASCADE, related_name='comments', null=True)
    author = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text

    def get_all_objects(self):
        """Get quesryset of saved objects."""
        return Comment.objects.all()

    def get_objects_by_hotel(self, selected_hotel):
        """Get queryset of object filtered by hotel.
        Getting selected_hotel - Hotel class object.
        """
        return Comment.objects.filter(hotel=selected_hotel)

    def get_objects_by_cafe(self, selected_cafe):
        return Comment.objects.filter(cafe=selected_cafe)


class FoodPlace(models.Model):
    """Model for creation of a new food place."""
    RESTAURANT = 'RESTAURANT'
    CAFE = 'CAFE'
    COFFEE_BREAK = 'COFFEE BREAK'
    BAKERY = 'BAKERY'
    BAR = 'BAR'
    TYPE_CHOICES = (
        (RESTAURANT, 'restaurant'),
        (CAFE, 'cafe'),
        (COFFEE_BREAK, 'coffee break'),
        (BAKERY, 'bakery'),
        (BAR, 'bar'),
    )

    UKRAINIAN = 'UKRAINIAN'
    ITALIAN = 'ITALIAN'
    ASIAN = 'ASIAN'
    AMERICAN = 'AMERICAN'
    CHINESE = 'CHINESE'
    CUISINE_CHOICES = (
        (UKRAINIAN, 'Ukrainian'),
        (ITALIAN, 'Italian'),
        (ASIAN, 'Asian'),
        (AMERICAN, 'American'),
        (CHINESE, 'Chinese'),
    )

    VEGETARIAN = 'VEGETARIAN'
    VEGAN = 'VEGAN'
    CARNIVOROUS = 'CARNIVOROUS'
    DIETARY_CHOICES = (
        (VEGETARIAN, 'Vegetarian'),
        (VEGAN, 'Vegan'),
        (CARNIVOROUS, 'Carnivorous'),
    )

    BREAKFAST = 'BREAKFAST'
    SNACK = 'SNACK'
    LUNCH = 'LUNCH'
    DINNER = 'DINNER'
    TIME_OF_DAY_CHOICES = (
        (BREAKFAST, 'Breakfast'),
        (SNACK, 'Snack'),
        (LUNCH, 'Lunch'),
        (DINNER, 'Dinner'),
    )

    BITE = 'BITE'
    MEDIUM = 'MEDIUM'
    SQUARE_MEAL = 'SQUARE MEAL'
    FAMILY_LUNCH = 'FAMILY LUNCH'
    BANQUET = 'BANQUET'
    MEAL_PORTION = (
        (BITE, 'bite'),
        (MEDIUM, 'medium'),
        (SQUARE_MEAL, 'square meal'),
        (FAMILY_LUNCH, 'family lunch'),
        (BANQUET, 'banquet'),
    )

    name = models.CharField(max_length=255, unique=True)
    address_raw_line = models.CharField(max_length=255, blank=True, default="")
    website = models.CharField(max_length=1024, blank=True, default="")
    phone = models.IntegerField(blank=True, null=True)
    opening_hour = models.TimeField(default=datetime.time(hour=9, minute=0))
    closing_hour = models.TimeField(default=datetime.time(hour=23, minute=0))
    created_date = models.DateTimeField(default=timezone.now)
    mark = models.FloatField(default=0.0)

    catering_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default=RESTAURANT)
    cuisine = models.CharField(max_length=9, choices=CUISINE_CHOICES, default=UKRAINIAN)
    dietary = models.CharField(max_length=11, choices=DIETARY_CHOICES, default=CARNIVOROUS)
    time_of_day = models.CharField(max_length=9, choices=TIME_OF_DAY_CHOICES, default=BREAKFAST)
    portion_size = models.CharField(max_length=12, choices=MEAL_PORTION, default=BITE)

    img_url = models.CharField(max_length=512, null=True, default="")
    image_uploaded_by_user = models.ImageField(upload_to="images/places_imgs/foodplaces", blank=True, null=True)
    location = models.PointField(null=True, blank=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name

    @staticmethod
    def get_all_foodplaces(self):
        """Retrieve all food places from database."""
        return FoodPlace.objects.all()

    class Meta:
        verbose_name = "foodplace"
        verbose_name_plural = "foodplaces"
        ordering = ['pk']

    def get_object_by_pk(self, pk):
        """Retrieve foodplace by its primary key."""
        return FoodPlace.objects.get(pk=pk)

    def get_object_by_name(self, name):
        """Retrieve foodplace by its name."""
        return FoodPlace.objects.get(name=name)

    def get_object_by_keywords(self, keyword):
        """Retrieve hotel by its name."""
        return FoodPlace.objects.filter(name__contains=keyword)

    def get_top(self, top):
        return FoodPlace.objects.filter(mark__gte=1).order_by('-mark')[:top]

    def get_nearest_places(self, data):
        keywords = data['keywords']
        coordinates = data['user_position']
        user_position = Point(float(coordinates['lat']), float(coordinates['lng']), srid=4326)
        mark = data['mark']
        if data['mark'] == 0:
            return FoodPlace.objects.filter(location__distance_lte=(user_position, D(km=int(data['radius']))),
                                            name__contains=keywords)
        return FoodPlace.objects.filter(location__distance_lte=(user_position, D(km=int(data['radius']))),
                                        name__contains=keywords, mark__gte=mark - 1, mark__lte=mark)


class Address(models.Model):
    """Model to store address of place."""
    hotel = models.ForeignKey('places.Hotel', on_delete=models.CASCADE, related_name="hotel_address", null=True)
    foodplace = models.ForeignKey(FoodPlace, on_delete=models.CASCADE, related_name='foodplace_address', null=True)

    city = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True)
    building_number = models.CharField(max_length=3, blank=True)
    postal_code = models.CharField(max_length=6, blank=True)

    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    def get_hotels_coordinates(self, keyword=""):
        return Address.objects.values('hotel__name', 'latitude', 'longitude').exclude(
            hotel__name__isnull=True).filter(hotel__name__contains=keyword)

    def get_foodplace_coordinates(self, keyword=""):
        return Address.objects.values('foodplace__name', 'latitude', 'longitude').exclude(
            foodplace__name__isnull=True).filter(foodplace__name__contains=keyword)
