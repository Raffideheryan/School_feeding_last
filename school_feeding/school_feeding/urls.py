from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from main.views import (
    ApplicationFormView,
    MessageView,
    ProjectView1,
    ProjectView2,
    ProjectView3,
    ProjectView4,
    RegistrationView,
    TeamView,
    UserView,
    VerifyEmailView,
    VotableItemViewSet,
    VoteViewSet,
    forget_password,
    new_password,
    download_pdf,
    VoteViewSet2,
    VoteViewSet3,
    VoteViewSet4,

    # PasswordResetRequestView,
    # PasswordResetConfirmView,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"users", UserView)
router.register(r"teams", TeamView)
router.register(r"projects1", ProjectView1)
router.register(r"projects2", ProjectView2)
router.register(r"projects3", ProjectView3)
router.register(r"projects4", ProjectView4)
router.register(r"registrations", RegistrationView)
router.register(r"messages", MessageView)

# changes
# changes
router.register(r"items", VotableItemViewSet)
router.register(r"votes", VoteViewSet)
router.register(r"votes2", VoteViewSet2)
router.register(r"votes3", VoteViewSet3)
router.register(r"votes4", VoteViewSet4)


router.register(r"applicationform", ApplicationFormView)
# router.register(r"password-reset/", PasswordResetRequestView)
# router.register(r"password-reset/confirm/<uidb64>/<token>/", PasswordResetConfirmView)


urlpatterns = [
    path("user/", include("main.urls")),
    path("A8rK5sP3tL1z/", admin.site.urls),
    path("api/auth/", include("rest_framework.urls")),
    path("info/", include(router.urls)),
    path("", include("main.urls")),
    path(
        "api/verify-email/<int:user_id>/",
        VerifyEmailView.as_view(),
        name="verify-email",
    ),
    path("api/forget_password/", forget_password, name="forget_password"),
    path("api/new_password/<uidb64>/<token>/", new_password, name="new_password"),
    path("download_pdf/", download_pdf, name="download_pdf")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
