# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.views.generic import View, FormView
from places.forms import AddHotelForm, AddFoodPlaceForm, AddressForm
from places.models import Hotel, Address, Cafe


class AddPlacesView(View):
    """Renders simple page with list of categories in which user can add new place."""

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return render(request, 'places/add_places.html', {})
        else:
            return HttpResponseRedirect('/signin')


class AddHotelCommonView(FormView):
    """Renders page for addition of new hotel."""

    hotel_base_form = AddHotelForm()
    address_form = AddressForm()

    template_name = 'places/add_place_hotel.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name,
                      {
                          'hotel_base_form': self.hotel_base_form,
                          'address_form': self.address_form,
                      })

    def post(self, request, *args, **kwargs):
        self.hotel_base_form = AddHotelForm(request.POST, request.FILES)
        self.address_form = AddressForm(request.POST)

        # Ensure both forms are valid before continuing on
        if self.hotel_base_form.is_valid() and self.address_form.is_valid():
            hotel = self.hotel_base_form.save()
            address = self.address_form.save(commit=False)
            address.hotel = hotel.get_object_by_pk(pk=hotel.pk)
            address.save()
            return HttpResponseRedirect('/places/')
        else:
            context = {
                'hotel_base_form': AddHotelForm(),
                'address_form': AddressForm(),
            }
            return render(request, 'places/add_places.html', context)


class AddFoodPlaceCommonView(FormView):
    """Renders page for addition of new place where to eat in city."""

    foodplace_base_form = AddFoodPlaceForm()
    address_form = AddressForm()

    template_name = 'places/add_place_foodplace.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name,
                      {
                          'foodplace_base_form': self.foodplace_base_form,
                          'address_form': self.address_form,
                      })

    def post(self, request, *args, **kwargs):
        self.foodplace_base_form = AddFoodPlaceForm(request.POST, request.FILES)
        self.address_form = AddressForm(request.POST)

        if self.foodplace_base_form.is_valid() and self.address_form.is_valid():
            foodplace = self.foodplace_base_form.save()
            address = self.address_form.save(commit=False)
            address.foodplace = foodplace.get_object_by_pk(pk=foodplace.pk)
            address.save()
            return HttpResponseRedirect('/places/')
        else:
            context = {
                'foodplace_base_form': AddFoodPlaceForm(),
                'address_form': AddressForm(),
            }
            return render(request, 'places/add_places.html', context)


class GetPlaces(View):
    """Get hotels from booking.com and save them in DB"""

    def post(self, request, type):

        if type == "hotels":
            self.get_hotels(1)
        elif type == "cafes":
            self.get_cafes(1)

        return HttpResponse("OK")

    def get_hotels(self, count):
        """Fill db with hotels. Getting count of hotels have to be saved."""
        url = "https://www.booking.com/searchresults.html?aid=304142&label=gen173nr-1FCAso6QFCBnRhdXJ1c0gzWARo6QGIAQGYATG4ARnIAQzYAQHoAQH4AQKIAgGoAgM&sid=c4b6bd482c32ffd883bb8d1fed21a034&tmpl=searchresults&city=-1045268&class_interval=1&dest_id=-1045268&dest_type=city&from_sf=1&group_adults=2&group_children=0&label_click=undef&no_rooms=1&raw_dest_type=city&room1=A%2CA&sb_price_type=total&shw_aparth=1&slp_r_match=0&src=city&ssb=empty&ssne=Lviv&ssne_untouched=Lviv&rdf="

        while url != None:
            hotels_on_page = self.get_hotels_links(url)

            if self.request_info_by_links(hotels_on_page, count, self.get_hotel_information, self.save_hotel):
                return

            url = self.get_next_page_link(url)

    def request_info_by_links(self, links, count, get_detail_by_link, save_place):
        """Save places from links list.
        Getting:
        links - list of place's urls,
        count - count of places which have to be saved,
        get_detail_by_link - method to get details of certain type of place,
        save_place - method for saving place.
        Return true when needed count of places were saved.
        """
        saved_counter = 0

        for link in links:
            info = get_detail_by_link(link)

            if info != None:
                saved_counter = saved_counter + save_place(info)

            if saved_counter == count:
                return True

    def save_cafe(self, cafe_info):
        """Create Cafe object and save it.
        Getting dictionary with cafe's information.
        Return 1 if saved and 0 when not.
        """
        try:
            cafe = Cafe(**cafe_info)
            cafe.save()
            return 1
        except Exception as exc:
            print("save_cafe EXCEPTION: ", repr(exc))
            return 0

    def get_cafes(self, count):
        """Fill db with cafes. Getting count of cafes have to be saved."""
        url = "https://www.tripadvisor.com/Restaurants-g295377-Lviv_Lviv_Oblast.html"
        cafes_links = self.get_cafes_links(url)
        self.request_info_by_links(cafes_links, count, self.get_cafe_information, self.save_cafe)

    def get_cafes_links(self, url):
        """Get all cafe's links on certain page.
        Getting page url. Return list of urls.
        """
        return self.get_links(url, "property_title", "https://www.tripadvisor.com")

    def get_hotels_links(self, url):
        """Get all hotel's links on certain page.
        Getting page url. Return list of urls.
        """
        return self.get_links(url, "hotel_name_link url", "https://www.booking.com")

    def get_links(self, url, link_class, url_base):
        """Get all place's links on certain page.
        Getting:
        url - page which contain place's links,
        link_class - <a> tag class,
        url_base - url prefix for adding related url.
        Return list with all place's links.
        """
        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')
        links = html.find_all("a", {"class": link_class})
        places_links = []

        for a in links:
            href = url_base + a["href"]
            href = ''.join(href.split())
            places_links.append(href)

        return places_links

    def get_next_page_link(self, url):
        """Get url of next page with hotels. Getting url of current page.
        Return next page url or None when current page is last.
        """
        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')
        next = html.find_all("a", {"title": "Next page"})

        try:
            return next[0]["href"]
        except Exception as exc:
            print("get_next_page_link EXCEPTION: ", repr(exc))
            return None

    def extract_hotel_address(self, hotel_info):
        """Extract hotel address from raw address field. Getting dictionary with
        hotel information. Return dictionary with address data.
        """
        address_title_list = ["street", "city", "postal_code", "building_number"]
        address_data_list = hotel_info["address_raw_line"].split(",")
        street = address_data_list[0]
        building_number = [int(s) for s in street.split() if s.isdigit()]
        address_data_list[0] = ''.join([i for i in street if not i.isdigit()])

        try:
            address_data_list.append(building_number[0])
        except IndexError:
            print("extract_hotel_address EXCEPTION: no building number.")

        address_data_list.remove(" Ukraine")
        address_info = dict(zip(address_title_list, address_data_list))

        return address_info

    def save_hotel(self, hotel_info):
        """Create hotel object and save it. Getting dictionary with hotel
        information. Return 1 if hotel saved and 0 when not.
        """
        try:
            address_info = self.extract_hotel_address(hotel_info)
            del hotel_info["address_raw_line"]
            hotel = Hotel(**hotel_info)
            hotel.save()
            address_info.update({"hotel": hotel})
            hotel_address = Address(**address_info)
            hotel_address.save()
            return 1
        except Exception as exc:
            print("save_hotel EXCEPTION: ", repr(exc))
            return 0

    def set_data_to_dict(self, dict, data, title, check_string):
        """Create dict and set data to it.
        Getting:
        dict - destination dictionary,
        data - value,
        title - key,
        check_string - for boolean type string to check for present in data
        """
        try:
            if check_string:
                dict.update({title: check_string in data.text})
            else:
                dict.update({title: ' '.join(data.text.split())})
        except AttributeError:
            if check_string:
                dict.update({title: "False"})
            else:
                dict.update({title: "None"})

    def is_cafe_saved(self, name):
        """Check hotel for saving. Getting cafe's name.
        Return: Boolean. True if cafe is already saved.
        """
        return name in Cafe().get_all_names()

    def get_cafe_information(self, url):
        """Parsing html page and getting data. Getting cafe's page url
        Return: dict or None.
        None if cafe already saved.
        """
        cafe = {}
        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')
        name = html.find("h1", {"class": "ui_header h1"})

        if self.is_cafe_saved(' '.join(name.text.split())):
            return None

        street = html.find("span", {"class": "street-address"})
        locality = html.find("span", {"class": "locality"})
        headers = html.find("div", {"class": "header_links"})
        phone = html.find("span", {"class": "is-hidden-mobile detail"})
        center_related = html.find("span", {
            "class": "restaurants-detail-overview-cards-LocationOverviewCard__detailLinkText--2saB_ restaurants-detail-overview-cards-LocationOverviewCard__nearbyText--1OBMr"})
        img_url = html.find("img", {"class": "basicImg"})
        mark = html.find("span",
                         {"class": "restaurants-detail-overview-cards-RatingsOverviewCard__overallRating--r2Cf6"})

        self.set_data_to_dict(cafe, name, "name", None)
        self.set_data_to_dict(cafe, street, "street", None)
        self.set_data_to_dict(cafe, locality, "locality", None)
        self.set_data_to_dict(cafe, headers, "headers", None)
        self.set_data_to_dict(cafe, phone, "phone", None)
        self.set_data_to_dict(cafe, center_related, "center_related", None)
        self.set_data_to_dict(cafe, mark, "mark", None)
        cafe.update({"img_url": img_url["src"]})

        return cafe

    def is_hotel_saved(self, name):
        """Check hotel for saving. Getting hotel name.
        Return: Boolean. True if hotel is already saved
        """
        return name in Hotel().get_all_names()

    def get_hotel_information(self, url):
        """Parsing html page and getting data. Getting url of hotel page.
        Return: dict or None. None if hotel already saved.
        """
        hotel = {}
        response = requests.get(url)
        html = BeautifulSoup(response.text, 'html.parser')
        name = html.find("h2", {"id": "hp_hotel_name"})

        if self.is_hotel_saved(' '.join(name.text.split())):
            return None

        address = html.find("span", {"class": "hp_address_subtitle js-hp_address_subtitle jq_tooltip"})
        children = html.find("div", {"id": "children_policy"})
        mark = html.find("div", {"class": "bui-review-score__badge"})
        pets = html.find("div", {"data-section-id": "-2"})
        restaurant = html.find("div", {"data-section-id": "7"})
        pool_and_spa = html.find("div", {"data-section-id": "21"})
        shuttle = html.find("span", {"class": "facility-badge__tooltip-title"})
        description = html.find("div", {"id": "summary"})
        preview_img_url = html.find("img", {"alt": "Gallery image of this property"})

        self.set_data_to_dict(hotel, name, "name", None)
        self.set_data_to_dict(hotel, address, "address_raw_line", None)
        self.set_data_to_dict(hotel, description, "description", None)
        self.set_data_to_dict(hotel, mark, "mark", None)
        self.set_data_to_dict(hotel, shuttle, "shuttle", None)
        self.set_data_to_dict(hotel, children, "children_allowed", "All children are welcome.")
        self.set_data_to_dict(hotel, pets, "pets_allowed", "Pets are not allowed.")
        self.set_data_to_dict(hotel, restaurant, "has_restaurant", "Restaurant")
        self.set_data_to_dict(hotel, pool_and_spa, "has_pool", "Swimming pool")
        self.set_data_to_dict(hotel, pool_and_spa, "has_spa", "Spa")

        hotel.update({"img_url": preview_img_url["src"]})

        return hotel
