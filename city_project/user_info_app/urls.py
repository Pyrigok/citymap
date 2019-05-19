from django.urls import path, include

from user_info_app.views import Logout, SignUp, SignIn, UpdateUserView, UserInfoView, \
    PasswordReset, PasswordResetDone, PasswordResetConfirm, PasswordResetComplete, \
    current_user

from user_info_app.user_api.views import UserInfoAPIView, UserInfoUpdateAPIView, \
    ResetPasswordAPIView, ResetPasswordConfirmAPIView, SignUpAPIView

app_name = 'user_info_app'

urlpatterns = [
    path('logout/', Logout.as_view(), name='logout'),
    path('signup/', SignUp.as_view(), name='signup'),
    path('signin/', SignIn.as_view(), name='signin'),
    path('reset-password/', include([
        path('', PasswordReset.as_view(), name='password_reset'),
        path('done/', PasswordResetDone.as_view(), name='password_reset_done'),
        path('confirm/<uid64>/<token>/<email>/', PasswordResetConfirm.as_view(),
             name='password_reset_confirm'),
        path('complete/', PasswordResetComplete.as_view(), name='password_reset_complete'),
    ])),
    path('user-info/', include([
        path('<int:pk>/', UserInfoView.as_view(), name='user_info'),
        path('update/<int:pk>/', UpdateUserView.as_view(), name='update_user'),
    ])),

    # REST and React
    path('current_user/', current_user),
    path('users/', SignUpAPIView.as_view()),
    path('user-info-api/', include([
        path('', UserInfoAPIView.as_view(), name='user_info_api'),
        path('update/<int:pk>', UserInfoUpdateAPIView.as_view(), name='update_user_info_api'),
    ])),
    path('reset-password-api/', ResetPasswordAPIView.as_view(), name='reset_password_api'),
    path('reset-password-confirm-api/', ResetPasswordConfirmAPIView.as_view(), name='reset_password_api')
]
