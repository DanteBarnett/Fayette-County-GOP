"""
Django settings for Fayette County GOP website
Compatible with Django 5.0, Wagtail 6, Python 3.12
"""

from pathlib import Path
import environ

# ------------------------------------------------------------------------------
# Base paths
# ------------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(
    # casting, default value
    DJANGO_DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ["localhost", "127.0.0.1"]),
)
# read .env if present
env.read_env(BASE_DIR / ".env")

# ------------------------------------------------------------------------------
# Core settings
# ------------------------------------------------------------------------------

SECRET_KEY = env("DJANGO_SECRET_KEY", default="change-me")
DEBUG = env("DJANGO_DEBUG")

ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# ------------------------------------------------------------------------------
# Applications
# ------------------------------------------------------------------------------

INSTALLED_APPS = [
    # Django core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd-party
    "wagtail",
    "wagtail.admin",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.embeds",
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.contrib.sitemaps",
    "wagtailseo",
    "modelcluster",
    "taggit",
    "pwa",                      # <-- replaces django_serviceworker
    # project apps
    "home",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
]

ROOT_URLCONF = "fayette_gop.urls"
WSGI_APPLICATION = "fayette_gop.wsgi.application"

# ------------------------------------------------------------------------------
# Templates
# ------------------------------------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
                "wagtail.contrib.settings.context_processors.settings",
                "fayette_gop.context_processors.analytics",
            ],
        },
    },
]

# ------------------------------------------------------------------------------
# Database (SQLite default; Postgres via DATABASE_URL)
# ------------------------------------------------------------------------------

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
    )
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

# ------------------------------------------------------------------------------
# Internationalisation
# ------------------------------------------------------------------------------

LANGUAGE_CODE = "en-us"
TIME_ZONE = "America/New_York"
USE_I18N = True
USE_TZ = True

# ------------------------------------------------------------------------------
# Static & media
# ------------------------------------------------------------------------------

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ------------------------------------------------------------------------------
# Wagtail
# ------------------------------------------------------------------------------

WAGTAIL_SITE_NAME = "Fayette GOP"
WAGTAILADMIN_BASE_URL = env("WAGTAILADMIN_BASE_URL", default="http://localhost:8000")

# ------------------------------------------------------------------------------
# Email (SendGrid)
# ------------------------------------------------------------------------------

EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
SENDGRID_API_KEY = env("SENDGRID_API_KEY", default="")
SENDGRID_SANDBOX_MODE_IN_DEBUG = False

# ------------------------------------------------------------------------------
# Google Analytics
# ------------------------------------------------------------------------------

GA_ID = env("GA_ID", default="")

# ------------------------------------------------------------------------------
# PWA (django-pwa)
# ------------------------------------------------------------------------------

PWA_APP_NAME = "Fayette GOP"
PWA_APP_SHORT_NAME = "FCGOP"
PWA_APP_DESCRIPTION = "Official website of the Fayette County Republican Party"
PWA_APP_THEME_COLOR = "#b40000"
PWA_APP_BACKGROUND_COLOR = "#ffffff"
PWA_APP_SCOPE = "/"
PWA_SERVICE_WORKER_PATH = BASE_DIR / "static" / "service-worker.js"

# ------------------------------------------------------------------------------
# Security hardening (safe defaults, tweak in production)
# ------------------------------------------------------------------------------

CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_PRELOAD = not DEBUG
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30  # 30 days

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
