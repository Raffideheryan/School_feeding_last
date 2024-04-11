from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY")

DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True

ALLOWED_HOSTS = [
    "www.aroxj_aprelakerpi_despan.schoolfeeding.am",
    "127.0.0.1",
    "localhost",
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
    "http://127.0.0.1:3000",
    "http://localhost:3030",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
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
        "DIRS": [BASE_DIR / "school/build"],  # todo
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

# BASE_URL ="http://127.0.0.1/"
# EMAIL_FROM ="testfirst0303@gmail.com"


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'aroxjaprelakerpidespan@gmail.com'  # dreq dzer mail@
EMAIL_HOST_PASSWORD = 'ynqa mgyq cwwn kbdg'  # dreq dzer mail_i "app password"_@(orinak -> "asjw jinn locd knjb")
DEFAULT_FROM_EMAIL = "aroxjaprelakerpidespan@gmail.com" # dreq dzer mail@

# REACT_BASE_URL = 'http://127.0.0.1:3000/'
REACT_BASE_URL = 'http://127.0.0.1:3000/'
# REACT_BASE_URL = 'http://127.0.0.1:3000/newpass/'


STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

STATICFILES_DIRS = [BASE_DIR / "school/build/static"]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configure the logging settings
# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "formatters": {
#         "file_formatter": {
#             "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
#             "style": "{",
#         },
#         "console_formatter": {
#             "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
#             "style": "{",
#         },
#     },
#     "handlers": {
#         "console": {
#             "level": "DEBUG",
#             "class": "logging.StreamHandler",
#             "formatter": "console_formatter",
#         },
#         "file": {
#             "level": "DEBUG",
#             "class": "logging.FileHandler",
#             "filename": BASE_DIR / "logs.log",
#             "formatter": "file_formatter",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console", "file"],
#             "level": "DEBUG",
#             "propagate": True,
#         },
#     },
# }
# LOGGING["loggers"]["django.server"]["level"] = "WARNING"
