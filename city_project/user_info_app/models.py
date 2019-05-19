from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class UserProfileInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='images/user_pics', blank=True)

    def __str__(self):
        return self.user.username

    # def get_info(self, request):
    #     profile_info = User.objects.filter(id=request.user.id)
    #     return profile_info


class ExtendUser(User):
    class Meta():
        proxy = True

    def get_current_user_info(self, request):
        profile_info = User.objects.filter(id=request.user.id)
        return profile_info

    def get_user_info():
        return User.objects.all()

    def clean(self):

        if self.username is None or self.username == "":
            raise ValidationError('Field with username can not be empty')

        if self.password is None or self.password == "":
            raise ValidationError('Field with passwords can not be empty')

        try:
            User.objects.get(email=self.email)
            raise ValidationError('User with same email already exists')
        except User.DoesNotExist:
            if self.email is None or self.email == "":
                raise ValidationError('Field with email address can not be empty')

    @staticmethod
    def username_if_exists(username):
        if User.objects.filter(username=username).exists():
            return True
        return False


class ResetPasswordUserInfo(User):
    @staticmethod
    def email_if_exists(email):
        if User.objects.filter(email=email).exists():
            return True
        return False

    @staticmethod
    def set_new_password(email, password):
        user = User.objects.get(email=email)
        user.set_password(password)
        user.save()
        return True
