# -*- coding: utf-8 -*-
from django.core.mail import EmailMultiAlternatives as Em
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User


class ContactUsFormTest(TestCase):

    def setUp(self):
     
        User.objects.get_or_create(
            username="pyrigok",
            first_name="Vasyl",
            last_name="Pyrih",
            email="testadmin@email.com",
            password="123"
        )

    def test_email_sent(self):
        """Check if email is being sent"""

        client = Client()
        #self.url = reverse('contact_app:contact_us')

        # client.login(username='pyrigok', password='1592648c')
        client.login(username='pyrigok', password='123')

        response = self.client.post(reverse('contact_app:contact_us'), {'subject': 'letter_subject',
                                                                        'user_text': 'test text',
                                                                        'from_email': "test@email.com",
                                                                        'recipient_list': ['pyrigok@i.ua']
                                                                        })

        msg = Em.message(self).encode('utf-8')
        self.assertEqual(msg.get('subject'), 'letter_subject')
        self.assertEqual(msg.get('from_email'), 'test@email.com')
        self.assertEqual(msg.get_payload(), 'test text', )
