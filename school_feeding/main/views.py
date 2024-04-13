import os
import smtplib

import PyPDF2
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.http import (
    FileResponse,
    HttpResponse,
    HttpResponseNotFound,
    HttpResponseServerError,
    JsonResponse,
)

from datetime import timedelta
from django.utils import timezone

# changes
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.crypto import get_random_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from docx import Document
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from threading import Timer
from datetime import timedelta
from django.utils import timezone

from .forms import EmailAuthenticationForm, NewUserForm
from PyPDF2 import PdfReader
# from rest_framework.response import Response
# from django.core.mail import send_mail
# from django.conf import settings
from .models import (
    ApplicationForm,
    CustomUser,
    EmailVerificationToken,
    Message,
    PasswordChange,
    Project1,
    Project2,
    Project3,
    Project4,
    Registration,
    Team,
    VotableItem,
    Vote,
)
from .serializers import (  # PasswordChangeSerializer,
    ApplicationFormSerializer,
    ForgetPasswordSerializer,
    LoginSerializer,
    MessageSerializer,
    NewPasswordSerializer,
    ProjectSerializer1,
    ProjectSerializer2,
    ProjectSerializer3,
    ProjectSerializer4,
    RegistrationSerializer,
    TeamSerializer,
    UserSerializer,
    VotableItemSerializer,
    VoteSerializer,
)

# changes

class ApplicationFormView(viewsets.ModelViewSet):

    queryset = ApplicationForm.objects.all()
    serializer_class = ApplicationFormSerializer

    def perform_create(self, serializer):
        _id = self.request.data.get('user', None)
        if _id:
            user_instance = CustomUser.objects.get(pk=_id)
            if user_instance:
                serializer.save(user=user_instance)
                return

        serializer.save(user=self.request.user)


class VotableItemViewSet(viewsets.ModelViewSet):
    queryset = VotableItem.objects.all()
    serializer_class = VotableItemSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


@api_view(["POST"])
def forget_password(request):
    serializer = ForgetPasswordSerializer(data=request.data)
    if serializer.is_valid():
        user = CustomUser.objects.get(email=serializer.validated_data["email"])
        
        if not user.email_verified:
            return Response(
                {"error": "Email is not verified."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer.send_reset_email(user, request)
        return Response(
            {"detail": "A password reset link has been sent to your email."},
            status=status.HTTP_200_OK,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def new_password(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        serializer = NewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response(
                {"detail": "Your password has been successfully reset."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"detail": "The reset password link is invalid or expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )





class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
 
    def create(self, request, *args, **kwargs):
        print("created")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        self.send_verification_email(user)
        
        # Schedule user deletion after 2 minutes
        deletion_timer = Timer(180, self.delete_unverified_user, args=[user.id])
        deletion_timer.start()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def send_verification_email(self, user):
        print("sending verification email...")
        subject = "Email Verification"
        verification_url = reverse("verify-email", kwargs={"user_id": user.id})
        message = f"Click the link to verify your email: http://127.0.0.1:8000{verification_url}"
        from_email = settings.EMAIL_HOST_USER  # Change this to your sender email
        recipient_list = [user.email]
        try:
            print("sending mail")
            send_mail(subject, message, from_email, recipient_list)
            print("sent")
        except smtplib.SMTPRecipientsRefused:
            raise ValidationError("Email address does not exist. Please provide a valid email address.")

    def delete_unverified_user(self, user_id):
        try:
            user = CustomUser.objects.get(id=user_id, email_verified=False)
            user.delete()
            print(f"Deleted unverified user with id: {user_id}")
        except CustomUser.DoesNotExist:
            print(f"User with id {user_id} does not exist or is already verified.")
        
    


class VerifyEmailView(APIView):
    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            user.email_verified = True
            user.save()
            return redirect("http://127.0.0.1:3000/login")
        except CustomUser.DoesNotExist:
            return HttpResponse("User not found.", status=status.HTTP_404_NOT_FOUND)




class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not user.email_verified:
            return Response(
                {"error": "Email is not verified."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = authenticate(request, email=email, password=password)
        if user is not None:
            return Response({"message": "Login successful" , 'user_id':user.id}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )


class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ProjectView1(viewsets.ModelViewSet):
    queryset = Project1.objects.all()
    serializer_class = ProjectSerializer1

 


class ProjectView2(viewsets.ModelViewSet):
    queryset = Project2.objects.all()
    serializer_class = ProjectSerializer2

    


class ProjectView3(viewsets.ModelViewSet):
    queryset = Project3.objects.all()
    serializer_class = ProjectSerializer3




class ProjectView4(viewsets.ModelViewSet):
    queryset = Project4.objects.all()
    serializer_class = ProjectSerializer4

    # def create(self, request, *args, **kwargs):
    #     pdf_file = request.data.get('pdf')
    #     word_file = request.data.get('word')

    #     if pdf_file:
    #         try:
    #             with pdf_file.open('rb') as f:
    #                 pdf_reader = PdfReader(f)
    #                 num_pages = len(pdf_reader.pages)
    #             if num_pages > 10:
    #                 return Response({"error": "PDF file cannot have more than 10 pages."}, status=status.HTTP_400_BAD_REQUEST)
    #             else:
    #                 return Response({"success": "PDF file has fewer than 10 pages."}, status=status.HTTP_201_CREATED)
    #         except Exception as e:
    #             return Response({"error": f"Error: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    #     if word_file:
    #         try:
    #             with open('/tmp/uploaded_word.docx', 'wb') as destination:
    #                 for chunk in word_file.chunks():
    #                     destination.write(chunk)

    #             doc = Document('/tmp/uploaded_word.docx')

    #             num_pages = len(doc.paragraphs)
    #             if num_pages <= 3:
    #                 return Response({"success": "Word file has fewer than 3 pages."}, status=status.HTTP_201_CREATED)
    #             else:
    #                 return Response({"error": "Word file must have at least 3 pages."}, status=status.HTTP_400_BAD_REQUEST)

    #         except Exception as e:
    #             return Response({"error": f"Error: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    #         finally:
    #             os.remove('/tmp/uploaded_word.docx')

    #     return super().create(request, *args, **kwargs)


class RegistrationView(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer


class MessageView(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer





def download_pdf(request):
    filename = "dummy.pdf"

    file_path = os.path.join(settings.MEDIA_ROOT, "pdf", filename)

    if os.path.exists(file_path):
        with open(file_path, "rb") as f:
            pdf_data = f.read()

        response = HttpResponse(pdf_data, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response
    else:
        return HttpResponseNotFound("The requested file does not exist.")


def index(request):
    return render(request, "index.html", context={})


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            send_verification_email(user)
            messages.success(
                request,
                "Registration successful. Please check your email to verify your account.",
            )
            return redirect("login")  # Redirect to login page
    else:
        form = NewUserForm()
    return render(request, "register.html", {"form": form})


# changes
def send_verification_email(user):
    # user = CustomUser.objects.get(email=email_)
    # if user.email_verified = False
        print("inside func 'send_verification_email'")
        token = get_random_string(length=32)
        user.verification_token = token
        user.save()
        subject = "Email Verification"
        message = f"Please click the following link to verify your email: http://127.0.0.1:8000/verify/{token}"
        sender = "testfirst0303@gmail.com"
        recipient = user.email
        send_mail(subject, message, sender, [recipient])


def verify_email(request, verification_token):
    print("inside func 'verify_email'")
    user = get_object_or_404(CustomUser, verification_token=verification_token)
    user.email_verified = True
    user.save()
    messages.success(request, "Email verification successful. You can now log in.")
    return redirect("http://127.0.0.1:3000/login")


def login_request(request):
    if request.method == "POST":
        form = EmailAuthenticationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password")
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Welcome back, {email}.")
                return redirect("index")  # Redirect to your desired page after login
            else:
                messages.error(request, "Invalid email or password.")
        else:
            messages.error(request, "Invalid email or password.")
    else:
        form = EmailAuthenticationForm()
    return render(request, "login.html", {"login_form": form})




class LogoutView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
