from django.urls import path, include

from contact_app.views import ContactUsView, LetterSentView
from contact_app.contact_api.views import ContactUsAPIView

app_name = 'contact_app'

urlpatterns = [
    path('contact-us/', include([
        path('send-letter', ContactUsView.as_view(), name='contact-us'),
        path('', ContactUsAPIView.as_view(), name='contact_us'),
        path('letter-sent/', LetterSentView.as_view(), name='letter_sent'),
    ])),
]
