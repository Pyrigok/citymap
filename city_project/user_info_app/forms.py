from django import forms
from django.contrib.auth.models import User

from user_info_app.models import UserProfileInfo, ExtendUser as User


class UserForm(forms.ModelForm):
    class Meta():
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

    password = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(widget=forms.EmailInput())


class LoginForm(forms.ModelForm):
    class Meta():
        model = User
        fields = ('username', 'password')

    password = forms.CharField(widget=forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)


class PasswordResetForm(forms.Form):
    class Meta():
        model = User
        fields = ('email')

    email = forms.CharField(label=("Enter your email:"), widget=forms.EmailInput)


class ConfirmPasswordForm(forms.Form):
    class Meta():
        model = User
        fields = ('password')

    password1 = forms.CharField(label=("Password"), widget=forms.PasswordInput)
    password2 = forms.CharField(label=("Password confirmation"), widget=forms.PasswordInput)

    @staticmethod
    def confirm_password(password1, password2):
        PASSWORD_MIN_LENGTH = 8
        if password1 != password2:
            raise forms.ValidationError('Password and confirm password not matched')
        elif len(password1) < PASSWORD_MIN_LENGTH:
            raise forms.ValidationError('Password should have %d symbols at least' % PASSWORD_MIN_LENGTH)
        elif password1.isdigit():
            raise forms.ValidationError('Password should not be all numeric')
        return password1


class UserProfileInfoForm(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('profile_pic',)


class SignUpForm(forms.ModelForm):
    class Meta():
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

    password2 = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        cleaned_data = super(SignUpForm, self).clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")
        if password != password2:
            raise forms.ValidationError('Passwords do not match')
