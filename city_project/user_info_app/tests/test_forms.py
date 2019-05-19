from django.contrib.auth.models import User
from django.test import TestCase

from user_info_app.forms import SignUpForm


class RegistrationTestCase(TestCase):

    def setUp(self):
        self.cityUser1 = User.objects.create_user(username='AnnieKey', first_name='Anastasia', last_name='Koval',
                                                 email='anastasiakovalyshyn@gmail.com', password='123456789q')
        self.cityUser2 = User.objects.create_user(username='DanH', first_name='Dan', last_name='Hellex',
                                                  email='danhellex@gmail.com', password='123456789w')
        self.cityUser3 = User.objects.create_user(username='ElJey', first_name='El', last_name='Jey',
                                                  email='ellejey@gmail.com', password='1234w')
        self.cityUser1.save()


class RegistrationFormTests(RegistrationTestCase):
    pass



