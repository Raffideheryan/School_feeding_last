from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY")

DEBUG = False

CORS_ORIGIN_ALLOW_ALL = True

ALLOWED_HOSTS = [
    "aroxj_aprelakerpi_despan.schoolfeeding.am",
]




INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # own
    "main.apps.MainConfig",
    "rest_framework",
    "corsheaders",
]

CORS_ALLOWED_ORIGINS = [
    "https://aroxj_aprelakerpi_despan.schoolfeeding.am/",
]


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "school_feeding.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "school/build"],  
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]



WSGI_APPLICATION = "school_feeding.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("NAME"),
        "USER": env("USER"),
        "PASSWORD": env("PASSWORD"),
        "HOST": env("HOST"),
        "PORT": env("PORT"),
    }
}


AUTH_USER_MODEL = "main.CustomUser"

AUTHENTICATION_BACKENDS = [
    "main.authentication.EmailBackend",
    "django.contrib.auth.backends.ModelBackend",
]


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ("en", ("English")),
    ("ru", ("Russian")),
    ("hy", ("Armenian")),
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'aroxjaprelakerpidespan@gmail.com'  
EMAIL_HOST_PASSWORD = 'ynqa mgyq cwwn kbdg'  
DEFAULT_FROM_EMAIL = "aroxjaprelakerpidespan@gmail.com" 


REACT_BASE_URL = 'https://www.aroxj_aprelakerpi_despan.schoolfeeding.am/'

DATA_UPLOAD_MAX_MEMORY_SIZE = 1000 * 1024 * 1024
FILE_UPLOAD_MAX_MEMORY_SIZE = 1000 * 1024 * 1024
FILE_UPLOAD_MAX_SIZE = 1000 * 1024 * 1024



STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

STATICFILES_DIRS = [BASE_DIR / "school/build/static"]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

