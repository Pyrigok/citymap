from django.shortcuts import render
from django.views.generic import View
from user_info_app.models import ExtendUser


class Home(View):
    profile_info = None

    def get(self, request):
        if request.user.is_authenticated:
            self.profile_info = ExtendUser.get_current_user_info(self, request)
        return render(request, 'home_app/home.html', {'profile_info': self.profile_info})
