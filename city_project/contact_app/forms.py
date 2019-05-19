# -*- coding: utf-8 -*-
from django import forms


class ContactUsForm(forms.Form):
    subject = forms.CharField(max_length=70, label='Letter subject')
    user_text = forms.CharField(max_length=2560, label="Letter content", widget=forms.Textarea())
