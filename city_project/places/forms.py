# -*- coding: utf-8 -*-
from django import forms
from places.models import Hotel, FoodPlace, Address


class AddHotelForm(forms.ModelForm):
    """Creates form for hotel addition from corresponding model."""

    class Meta():
        model = Hotel
        exclude = ['address_raw_line', 'location', 'img_url', 'users_saved']

        widgets = {
            'image_uploaded_by_user': forms.ClearableFileInput(
                attrs={'onchange': 'readURL(this);', 'accept': '.jpg, .jpeg, .png'}),
            'description': forms.Textarea(attrs={'cols': 30, 'rows': 2}),

        }


class AddressForm(forms.ModelForm):
    """Creates form for hotel address."""

    class Meta:
        model = Address
        exclude = ['hotel', 'foodplace']


class AddFoodPlaceForm(forms.ModelForm):
    """Creates form for food place addition from corresponding model."""

    class Meta():
        model = FoodPlace
        exclude = ['address_raw_line', 'location', 'img_url']
        widgets = {
            'image_uploaded_by_user': forms.ClearableFileInput(
                attrs={'onchange': 'readURL(this);', 'accept': '.jpg, .jpeg, .png'}),
        }
