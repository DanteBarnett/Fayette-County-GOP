# fayette_gop/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtail_docs_urls

from home.feeds import LatestPostsFeed

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("documents/", include(wagtail_docs_urls)),

    # PWA assets (django-pwa)
    path("manifest.json", TemplateView.as_view(
        template_name="manifest.json",
        content_type="application/manifest+json",
    )),
    re_path(
        r"^service-worker\.js$",
        TemplateView.as_view(
            template_name="service-worker.js",
            content_type="application/javascript",
        ),
        name="service-worker",
    ),

    # RSS
    path("blog/rss.xml", LatestPostsFeed(), name="rss_feed"),

    # Wagtail front-end pages
    path("", include(wagtail_urls)),
]

# -------------------------------------------------------------------
# DEBUG toolbar & media in development
# -------------------------------------------------------------------
if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
