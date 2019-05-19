from city_project.settings import EMAIL_HOST_USER
from mail_service_app.mail_service import SendMail

from rest_framework import generics, permissions, status
from rest_framework.response import Response


class ContactUsAPIView(generics.ListCreateAPIView):
    """CBV for sending letter to admin"""

    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):

        try:

            letter = SendMail(request.data['subject'], request.data['message'], request.data['email'], EMAIL_HOST_USER,
                              from_name=request.data['username'])
            letter.send_letter()

            if not request.data['username'] or not request.data['email']:
                raise RuntimeError

        except RuntimeError:
            return Response('You are not logged in!', status=status.HTTP_400_BAD_REQUEST)

        except SystemError:
            return Response('Server does not respond. Please try again later!', status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response('Letter sent successfully!', status=status.HTTP_200_OK)
