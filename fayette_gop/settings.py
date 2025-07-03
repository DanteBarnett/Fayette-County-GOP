"""
Django 5 · Wagtail 6 · Python 3.12
Settings for Fayette County GOP website
"""

from pathlib import Path
import environ

# ──────────────────────────────────────────────
# Paths & environment
# ──────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(
    DJANGO_DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ["localhost", "127.0.0.1"]),
)
env.read_env(BASE_DIR / ".env")  # ignore if .env missing

# ──────────────────────────────────────────────
# Core
# ──────────────────────────────────────────────
DEBUG       = env.bool("DJANGO_DEBUG", default=True)
SECRET_KEY  = env("DJANGO_SECRET_KEY", default="change-me-in-prod")
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

# ──────────────────────────────────────────────
# Applications
# ──────────────────────────────────────────────
INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Wagtail
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
    "wagtail.contrib.settings", 
    "wagtailseo",
    # Third-party
    "modelcluster",
    "taggit",
    "pwa",  # replaces django-serviceworker
    # Local apps
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

# ──────────────────────────────────────────────
# Templates
# ──────────────────────────────────────────────
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

# ──────────────────────────────────────────────
# Database
# ──────────────────────────────────────────────
DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{BASE_DIR/'db.sqlite3'}",
    )
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

# ──────────────────────────────────────────────
# Internationalisation
# ──────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE     = "America/New_York"
USE_I18N      = True
USE_TZ        = True

# ──────────────────────────────────────────────
# Static & media
# ──────────────────────────────────────────────
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)

MEDIA_URL  = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ──────────────────────────────────────────────
# Wagtail
# ──────────────────────────────────────────────
WAGTAIL_SITE_NAME = "Fayette GOP"
WAGTAILADMIN_BASE_URL = env(
    "WAGTAILADMIN_BASE_URL", default="http://localhost:8000"
)

# ──────────────────────────────────────────────
# Email
# ──────────────────────────────────────────────
if DEBUG:
    # Local dev: never hit SendGrid
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
    SENDGRID_API_KEY = env("SENDGRID_API_KEY")
    SENDGRID_SANDBOX_MODE_IN_DEBUG = False

# ──────────────────────────────────────────────
# Google Analytics (optional)
# ──────────────────────────────────────────────
GA_ID = env("GA_ID", default="")

# ──────────────────────────────────────────────
# PWA config (django-pwa)
# ──────────────────────────────────────────────
PWA_APP_NAME            = "Fayette GOP"
PWA_APP_SHORT_NAME      = "FCGOP"
PWA_APP_DESCRIPTION     = "Official website of the Fayette County Republican Party"
PWA_APP_THEME_COLOR     = "#0b1e45"
PWA_APP_BACKGROUND_COLOR= "#ffffff"
PWA_APP_SCOPE           = "/"
PWA_SERVICE_WORKER_PATH = BASE_DIR / "static" / "service-worker.js"

# ──────────────────────────────────────────────
# Security
# ──────────────────────────────────────────────
CSRF_TRUSTED_ORIGINS   = env.list("CSRF_TRUSTED_ORIGINS", default=[])
SESSION_COOKIE_SECURE  = not DEBUG
CSRF_COOKIE_SECURE     = not DEBUG
SECURE_BROWSER_XSS_FILTER      = True
SECURE_CONTENT_TYPE_NOSNIFF    = True
SECURE_HSTS_PRELOAD           = not DEBUG
SECURE_HSTS_INCLUDE_SUBDOMAINS= not DEBUG
SECURE_HSTS_SECONDS           = 60 * 60 * 24 * 30  # 30 days

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

