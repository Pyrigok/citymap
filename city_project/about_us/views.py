from django.shortcuts import render
from django.views.generic import View


class AboutUs(View):
    """Renders 'About Us' page."""

    @staticmethod
    def get(request):
        return render(request, 'about_us/about_us.html', {})
