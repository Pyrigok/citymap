import uuid

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.generic import View, UpdateView, RedirectView, FormView, TemplateView

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter

from user_info_app.user_api.serializers import UserInfoSerializer
from user_info_app.forms import PasswordResetForm, ConfirmPasswordForm, SignUpForm, UserProfileInfoForm
from user_info_app.models import ExtendUser, UserProfileInfo, ResetPasswordUserInfo
from user_info_app.tokens import password_reset_token

from mail_service_app.mail_service import SendMail

from city_project.settings import EMAIL_HOST_USER


class Logout(RedirectView):

    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect('/signin')


class SignUp(View):
    """CBV for register user"""

    form = SignUpForm()

    def get(self, request):
        if request.user.is_authenticated:
            return HttpResponseRedirect('/')
        prof_form = UserProfileInfoForm()
        return render(request, 'user_info_app/signup.html', {'form': self.form, 'prof_form': prof_form})

    def post(self, request):
        self.form = SignUpForm(request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)

        if self.form.is_valid():
            user = self.form.save()
            user.set_password(self.form.cleaned_data['password'])
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.profile_pic = request.FILES.get('profile_pic')  # TODO: test this change
            profile.save()
            return HttpResponseRedirect('/signin')

        return render(request, 'user_info_app/signup.html', {'error': self.form.non_field_errors(), 'form': self.form})


class SignIn(TemplateView):
    """CBV for Log In"""

    template_name = 'user_info_app/signin.html'

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')  # TODO: check if we can get this info from the form?
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            return HttpResponse("Your account was inactive.")
        return HttpResponse("Invalid login details given")


class PasswordReset(FormView):
    """CBV for resetting a password"""

    form = PasswordResetForm()
    template_name = 'user_info_app/password_reset.html'

    def post(self, request):
        self.form = PasswordResetForm(data=request.POST)
        if self.form.is_valid():
            email = self.form.cleaned_data["email"]
            if ResetPasswordUserInfo.email_if_exists(email):
                mail_subject = 'Reset your password'
                current_site = get_current_site(request)
                context = {
                    'domain': current_site.domain,
                    'page': 'reset-password-confirm',
                    'uid': str(uuid.uuid1()),
                    'token': password_reset_token.make_token(User),
                    'email': email,
                }
                message = render_to_string('user_info_app/password_reset_email.html', context)
                letter = SendMail(mail_subject, message, EMAIL_HOST_USER, email)
                letter.send_letter()
                return HttpResponseRedirect('/reset-password/done/')
            else:
                return HttpResponse('Wrong email')

    def get(self, request):
        return render(request, self.template_name, {'form': self.form})


class PasswordResetDone(TemplateView):
    """CBV for message with info that the letter was sent"""

    template_name = 'user_info_app/password_reset_done.html'

    def get(self, request):
        return render(request, self.template_name, {})


class PasswordResetConfirm(FormView):
    """CBV for entering and confirmation new password"""

    form = ConfirmPasswordForm()
    template_name = 'user_info_app/password_reset_confirm.html'

    def post(self, request, uid64, token, email):
        self.form = ConfirmPasswordForm(data=request.POST)
        if self.form.is_valid():
            password1 = self.form.cleaned_data["password1"]
            password2 = self.form.cleaned_data["password2"]
            if ConfirmPasswordForm.confirm_password(password1, password2):
                ResetPasswordUserInfo.set_new_password(email, password1)
                return HttpResponseRedirect('/reset-password/complete/')
        else:
            return HttpResponse("Incorrect data")

    def get(self, request, uid64, token, email):
        return render(request, self.template_name, {})


class PasswordResetComplete(TemplateView):
    """CBV for message with info that the password was changed"""

    template_name = 'user_info_app/password_reset_complete.html'

    def get(self, request):
        return render(request, self.template_name, {})


class UserInfoView(View):
    """Logged User Info"""

    user_info = None

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            self.user_info = ExtendUser.get_current_user_info(self, request)
        return render(request, 'user_info_app/user_info.html', {'user_info': self.user_info})


class UpdateUserView(UpdateView):
    """CBV for update user info"""

    model = User
    fields = ['username', 'first_name', 'last_name', 'email']
    template_name = 'user_info_app/user_info_update.html'
    success_url = '/'


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserInfoSerializer(request.user)
    return Response(serializer.data)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
