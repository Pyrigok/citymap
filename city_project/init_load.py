import requests, time
from django.db import IntegrityError
from django.contrib.gis.geos import Point
from places.models import Hotel, FoodPlace, Address

API_KEY = "AIzaSyD-G62CxapPg9ozROE32V9dVOpeHylSJVM"
LOCATION = "49.8375734,24.0183711"
PHOTO_API = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
NEAREST_PLACE_API = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="

globals().update(locals())


def clear_all_tables():
    Hotel.objects.all().delete()
    FoodPlace.objects.all().delete()


def get_nearest_places(type, model):
    full_url = NEAREST_PLACE_API + LOCATION + "&radius=5000&type=" + type + "&key=" + API_KEY
    ignor_list = ["church", "cemetery"]
    for n in range(2):
        json_data = requests.get(full_url).json()
        for place in json_data["results"]:
            latitude = place["geometry"]["location"]["lat"]
            longitude = place["geometry"]["location"]["lng"]
            try:
                if "rating" in place.keys() and "photos" in place.keys():
                    if set(ignor_list).intersection(place['types']):
                        continue
                    new_place = model(name=place["name"],
                                      address_raw_line=place["vicinity"],
                                      mark=place["rating"],
                                      img_url=PHOTO_API + place["photos"][0]["photo_reference"] + "&key=" + API_KEY,
                                      location=Point(float(latitude), float(longitude), srid=4326))
                    new_place.save()
                    print(new_place)
                    if model == FoodPlace:
                        place_adress = Address(
                            foodplace=new_place,
                            latitude=latitude,
                            longitude=longitude)
                    else:
                        place_adress = Address(
                            hotel=new_place,
                            latitude=latitude,
                            longitude=longitude)
                    place_adress.save()
            except IntegrityError as e:
                print("Error! Object already exists", e)
        time.sleep(2)
        full_url += "&pagetoken=" + json_data["next_page_token"]


clear_all_tables()
get_nearest_places('hotels', Hotel)
get_nearest_places('restaurant', FoodPlace)
