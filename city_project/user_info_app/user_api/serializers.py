from django.contrib.auth.models import User

from rest_framework import serializers


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
        model = User


class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('email',)
        model = User


class UserSerializerWithToken(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')
