import uuid

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.core.mail import EmailMessage

from user_info_app.models import UserProfileInfo, ResetPasswordUserInfo, ExtendUser
from user_info_app.user_api.serializers import UserInfoSerializer, ResetPasswordSerializer, UserSerializerWithToken
from user_info_app.tokens import password_reset_token
from city_project.settings import REACT_HOST
from city_project.settings import EMAIL_HOST_USER
from mail_service_app.mail_service import SendMail

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class UserInfoAPIView(generics.ListCreateAPIView):
    """CBV for generate list of users"""

    queryset = ExtendUser.get_user_info()
    serializer_class = UserInfoSerializer


class UserInfoUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    """CBV for update user's data from react"""

    queryset = ExtendUser.get_user_info()
    serializer_class = UserInfoSerializer


class ResetPasswordAPIView(generics.ListCreateAPIView):
    """CBV for resetting a password"""

    queryset = ExtendUser.get_user_info()
    serializer_class = ResetPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        if ResetPasswordUserInfo.email_if_exists(email):
            mail_subject = 'Reset your password'
            context = {
                'domain': REACT_HOST,
                'page': 'reset-password-confirm',
                'uid': str(uuid.uuid1()),
                'token': password_reset_token.make_token(User),
                'email': email,
            }
            message = render_to_string('user_info_app/reset_email_for_react.html', context)
            letter = SendMail(mail_subject, message, EMAIL_HOST_USER, email)
            letter.send_letter()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class ResetPasswordConfirmAPIView(generics.ListCreateAPIView):
    """CBV for entering and confirmation new password"""

    queryset = ExtendUser.get_user_info()
    serializer_class = ResetPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        password = request.data['password1']
        if ResetPasswordUserInfo.set_new_password(email, password):
            return HttpResponse('Password was changed')
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


class SignUpAPIView(APIView):
    """CBV for register user"""

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            if not ExtendUser.username_if_exists(username=request.data['username']):
                if not ResetPasswordUserInfo.email_if_exists(email=request.data['email']):
                    if request.data['password'] == request.data['password2']:
                        serializer.save()
                        return Response('Success', status=status.HTTP_201_CREATED)
                    return Response('You\'re not confirm password', status=status.HTTP_400_BAD_REQUEST)
                return Response('This email already exists', status=status.HTTP_400_BAD_REQUEST)
            return Response('This username already exists', status=status.HTTP_400_BAD_REQUEST)
        return Response('Please fill all fields', status=status.HTTP_400_BAD_REQUEST)
