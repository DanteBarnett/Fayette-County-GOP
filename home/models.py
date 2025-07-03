from django.db import models
from django.utils import timezone

from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page, Orderable
from wagtail.snippets.models import register_snippet
from wagtail import blocks as wagblocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.documents.blocks import DocumentChooserBlock
from modelcluster.fields import ParentalKey

# ---------------------------------------------
# 1. Global Site Settings
# ---------------------------------------------
@register_snippet
class SiteSettings(models.Model):
    title = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="hero_image",
    )
    footer_blurb = models.TextField(blank=True)

    panels = [
        FieldPanel("title"),
        FieldPanel("tagline"),
        FieldPanel("hero_image"),
        FieldPanel("footer_blurb"),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Site Settings"

# ---------------------------------------------
# 2. Home Page
# ---------------------------------------------
class HomePage(Page):
    hero_title = models.CharField(max_length=255, default="Fayette County GOP")
    hero_subtitle = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="home_hero_image",
    )

    mission = RichTextField(blank=True)
    cta_buttons = StreamField([
        ("button", wagblocks.StructBlock([
            ("label", wagblocks.CharBlock()),
            ("link", wagblocks.URLBlock(required=False)),
        ]))
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("hero_title"),
        FieldPanel("hero_subtitle"),
        FieldPanel("hero_image"),
        FieldPanel("mission"),
        FieldPanel("cta_buttons"),
    ]

    class Meta:
        verbose_name = "Home Page"

# ---------------------------------------------
# 3. Standard Page (About, Contact, etc.)
# ---------------------------------------------
class StandardPage(Page):
    body = StreamField([
        ("heading", wagblocks.CharBlock(classname="full title")),
        ("paragraph", wagblocks.RichTextBlock()),
        ("image", ImageChooserBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("body"),
    ]

# ---------------------------------------------
# 4. Events
# ---------------------------------------------
class EventIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]

    subpage_types = ["home.EventPage"]


class EventPage(Page):
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    description = RichTextField()
    flyer = models.ForeignKey(
        "wagtaildocs.Document",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="event_flyer",
    )
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="event_image",
    )
    cta_link = models.URLField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("start_date"),
        FieldPanel("end_date"),
        FieldPanel("location"),
        FieldPanel("description"),
        FieldPanel("flyer"),
        FieldPanel("image"),
        FieldPanel("cta_link"),
    ]

    parent_page_types = ["home.EventIndexPage"]

# ---------------------------------------------
# 5. Blog
# ---------------------------------------------
class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]

    subpage_types = ["home.BlogPostPage"]


class BlogPostPage(Page):
    published_at = models.DateTimeField(default=timezone.now)
    author = models.CharField(max_length=255)
    cover_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="blog_cover_image",
    )
    body = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("published_at"),
        FieldPanel("author"),
        FieldPanel("cover_image"),
        FieldPanel("body"),
    ]

    parent_page_types = ["home.BlogIndexPage"]

# ---------------------------------------------
# 6. Leadership
# ---------------------------------------------
@register_snippet
class Leader(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    photo = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="leader_photo",
    )
    email = models.EmailField(blank=True)
    bio = RichTextField(blank=True)

    panels = [
        FieldPanel("name"),
        FieldPanel("role"),
        FieldPanel("photo"),
        FieldPanel("email"),
        FieldPanel("bio"),
    ]

    def __str__(self):
        return f"{self.name} — {self.role}"


class LeadershipPage(Page):
    template = "home/leadership_page.html"

    class Meta:
        verbose_name = "Leadership Page"

# ---------------------------------------------
# 7. Gallery
# ---------------------------------------------
class GalleryItem(Orderable):
    page = ParentalKey("GalleryPage", related_name="items")
    title = models.CharField(max_length=255)
    media = StreamField([
        ("image", ImageChooserBlock()),
        ("video", wagblocks.EmbedBlock()),
    ], use_json_field=True)

    panels = [
        FieldPanel("title"),
        FieldPanel("media"),
    ]


class GalleryPage(Page):
    title = models.CharField(max_length=255, default="Gallery")

    content_panels = Page.content_panels + []

    subpage_types = []