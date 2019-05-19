from user_info_app.user_api.serializers import UserInfoSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserInfoSerializer(user, context={'request': request}).data
        # 'user': UserSerializer(user, context={'request': request}).data
    }
