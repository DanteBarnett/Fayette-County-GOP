from django.contrib.syndication.views import Feed
from django.urls import reverse
from .models import BlogPostPage

class LatestPostsFeed(Feed):
    title = "Fayette GOP – Latest Posts"
    link = "/blog/rss.xml"
    description = "Updates and news from the Fayette County Republican Party."

    def items(self):
        return BlogPostPage.objects.live().order_by("-first_published_at")[:20]

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.search_description or item.title

    def item_link(self, item):
        return item.url