from django.contrib.auth import views as auth_views
from django.urls import path

from . import views
from .views import (
    # ChangePasswordView,
    # PasswordResetConfirmView,
    # PasswordResetRequestView,
    index,
    login_request,
    # logout_request,
    register_request,
    LoginView,
    LogoutView,
    # generate_password_reset_token
)


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/<str:verification_token>/', views.verify_email, name='verify_email'),
    path("index/", views.index, name="index"),
    path("register/", views.register_request, name="register"),
    path(
        "password-change/",
        auth_views.PasswordChangeView.as_view(),
        name="password_change",
    ),
    path(
        "password-change/done/",
        auth_views.PasswordChangeDoneView.as_view(),
        name="password_change_done",
    ),
    
]
