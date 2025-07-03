# fayette_gop/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

# Wagtail
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtail_docs_urls

# Local
from home.feeds import LatestPostsFeed

urlpatterns = [
    # Django admin (default)
    path("django-admin/", admin.site.urls),

    # Wagtail admin (⇠ was missing, causes /admin/ 404)
    path("admin/", include(wagtailadmin_urls)),

    # Wagtail documents
    path("documents/", include(wagtail_docs_urls)),

    # PWA assets
    path(
        "manifest.json",
        TemplateView.as_view(
            template_name="manifest.json",
            content_type="application/manifest+json",
        ),
    ),
    re_path(
        r"^service-worker\.js$",
        TemplateView.as_view(
            template_name="service-worker.js",
            content_type="application/javascript",
        ),
        name="service-worker",
    ),

    # RSS feed
    path("blog/rss.xml", LatestPostsFeed(), name="rss_feed"),

    # Front-end pages (must stay last)
    path("", include(wagtail_urls)),
]

# ──────────────────────────────────────────────
# Development helpers
# ──────────────────────────────────────────────
if settings.DEBUG:
    # Debug Toolbar
    try:
        import debug_toolbar

        urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    except ModuleNotFoundError:
        pass  # toolbar not installed; skip

    # Serve uploaded media
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

