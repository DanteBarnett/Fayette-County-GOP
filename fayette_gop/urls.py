from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtail_docs_urls
from home.feeds import LatestPostsFeed
from django_serviceworker.views import service_worker

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("documents/", include(wagtail_docs_urls)),
    path("serviceworker.js", service_worker, name="service-worker"),
    path("blog/rss.xml", LatestPostsFeed(), name="rss_feed"),

    # Wagtail front-end pages
    path("", include(wagtail_urls)),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)