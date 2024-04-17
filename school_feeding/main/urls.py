from django.contrib.auth import views as auth_views
from django.urls import path

from . import views
from .views import (
    
    login_request,
    register_request,
    LoginView,
    LogoutView,
)


urlpatterns = [
    path('info/login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/<str:verification_token>/', views.verify_email, name='verify_email'),

]
