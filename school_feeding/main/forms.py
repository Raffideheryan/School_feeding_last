from django import forms
from django.contrib.auth.forms import (
    AuthenticationForm,
    PasswordResetForm,
    UserCreationForm,
)
from django.contrib.auth.models import User

from .models import CustomUser


class CustomPasswordResetForm(PasswordResetForm):
    def send_mail(
        self,
        subject_template_name,
        email_template_name,
        context,
        from_email,
        to_email,
        html_email_template_name=None,
    ):
        email = EmailMultiAlternatives(
            subject_template_name,
            strip_tags(email_template_name),
            from_email,
            [to_email],
        )
        email.attach_alternative(email_template_name, "text/html")
        email.send()


class EmailAuthenticationForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    #changes 
    # password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ("username", "email", "password1", "password2", "phone")
