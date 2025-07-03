"""
home/models.py – Fayette County GOP
Wagtail 6 · Django 5 · Python 3.12
"""
from django.db import models
from django.utils import timezone

from wagtail import blocks as wagblocks
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.fields import RichTextField, StreamField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Orderable, Page
from wagtail.snippets.models import register_snippet
from wagtail.contrib.forms.models import AbstractEmailForm, AbstractFormField
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from modelcluster.fields import ParentalKey
from wagtail.embeds.blocks import EmbedBlock
from wagtail.blocks import PageChooserBlock


# ──────────────────────────────────────────────────────────────────────────────
# 1 – GLOBAL SITE SETTINGS
# ──────────────────────────────────────────────────────────────────────────────
@register_setting
class SiteSettings(BaseSiteSetting):
    """Editable via → Settings ▸ Site ► Fayette GOP"""

    title = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    footer_blurb = models.TextField(blank=True)
    social_links = StreamField(
        [
            (
                "link",
                wagblocks.StructBlock(
                    [
                        ("label", wagblocks.CharBlock()),
                        ("url", wagblocks.URLBlock()),
                    ]
                ),
            ),
        ],
        blank=True,
        use_json_field=True,
    )

    panels = [
        FieldPanel("title"),
        FieldPanel("tagline"),
        FieldPanel("hero_image"),
        FieldPanel("footer_blurb"),
        FieldPanel("social_links"),
    ]

    def __str__(self) -> str:  # noqa: D401
        return self.title


# ──────────────────────────────────────────────────────────────────────────────
# 2 – HOME PAGE
# ──────────────────────────────────────────────────────────────────────────────
class HomePage(Page):
    hero_title = models.CharField(max_length=255, default="Fayette County GOP")
    hero_subtitle = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    mission = RichTextField(blank=True)
    cta_buttons = StreamField(
        [
            (
                "button",
                wagblocks.StructBlock(
                    [
                        ("label", wagblocks.CharBlock()),
                        ("link", wagblocks.URLBlock(required=False)),
                    ]
                ),
            )
        ],
        blank=True,
        use_json_field=True,
    )

    sections = StreamField([
        ("mission", PageChooserBlock(target_model="home.MissionPage", icon="info")),
        ("issues", PageChooserBlock(target_model="home.IssuesPage", icon="warning")),
        ("events", PageChooserBlock(target_model="home.EventIndexPage", icon="date")),
        ("news", PageChooserBlock(target_model="home.BlogIndexPage", icon="doc-full")),
        ("gallery", PageChooserBlock(target_model="home.GalleryPage", icon="image")),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("hero_title"),
        FieldPanel("hero_subtitle"),
        FieldPanel("hero_image"),
        FieldPanel("mission"),
        FieldPanel("cta_buttons"),
        FieldPanel("sections"),
    ]

    class Meta:
        verbose_name = "Home Page"


# ──────────────────────────────────────────────────────────────────────────────
# 3 – STANDARD PAGES (About, Contact, etc.)
# ──────────────────────────────────────────────────────────────────────────────
class StandardPage(Page):
    body = StreamField(
        [
            ("heading", wagblocks.CharBlock(classname="full title")),
            ("paragraph", wagblocks.RichTextBlock()),
            ("image", ImageChooserBlock()),
        ],
        use_json_field=True,
    )

    content_panels = Page.content_panels + [FieldPanel("body")]


# ──────────────────────────────────────────────────────────────────────────────
# 4 – EVENTS
# ──────────────────────────────────────────────────────────────────────────────
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
        related_name="+",
    )
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
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


# ──────────────────────────────────────────────────────────────────────────────
# 5 – BLOG
# ──────────────────────────────────────────────────────────────────────────────
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
        related_name="+",
    )
    body = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("published_at"),
        FieldPanel("author"),
        FieldPanel("cover_image"),
        FieldPanel("body"),
    ]

    parent_page_types = ["home.BlogIndexPage"]


# ──────────────────────────────────────────────────────────────────────────────
# 6 – LEADERSHIP
# ──────────────────────────────────────────────────────────────────────────────
@register_snippet
class Leader(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    photo = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
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

    def __str__(self) -> str:  # noqa: D401
        return f"{self.name} — {self.role}"


class LeadershipPage(Page):
    template = "home/leadership_page.html"

    class Meta:
        verbose_name = "Leadership Page"


# ──────────────────────────────────────────────────────────────────────────────
# 7 – GALLERY
# ──────────────────────────────────────────────────────────────────────────────
class GalleryItem(Orderable):
    page = ParentalKey("GalleryPage", related_name="items")
    title = models.CharField(max_length=255)
    media = StreamField(
        [
            ("image", ImageChooserBlock()),
            ("video", EmbedBlock()),
        ],
        use_json_field=True,
    )

    panels = [FieldPanel("title"), FieldPanel("media")]


class GalleryPage(Page):
    template = "home/gallery_page.html"
    subpage_types: list[str] = []

    class Meta:
        verbose_name = "Gallery"


# ──────────────────────────────────────────────────────────────────────────────
# 8 – CONTACT PAGE (email form)
# ──────────────────────────────────────────────────────────────────────────────
class FormField(AbstractFormField):
    page = ParentalKey("ContactPage", on_delete=models.CASCADE, related_name="form_fields")


class ContactPage(AbstractEmailForm):
    template = "home/contact_page.html"
    landing_page_template = "home/contact_page.html"

    intro = RichTextField(blank=True)
    thank_you_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        FieldPanel("intro"),
        FieldPanel("thank_you_text"),
        MultiFieldPanel(
            [
                FieldPanel("from_address"),
                FieldPanel("to_address"),
                FieldPanel("subject"),
            ],
            heading="Email Settings",
        ),
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["form"] = self.get_form(request.POST or None)
        return context


# ──────────────────────────────────────────────────────────────────────────────
# 9 – MISSION & ISSUES PAGES
# ──────────────────────────────────────────────────────────────────────────────
class MissionPage(Page):
    """Mission page with rich StreamField content."""

    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    body = StreamField(
        [
            ("heading", wagblocks.CharBlock(classname="full title")),
            ("paragraph", wagblocks.RichTextBlock()),
            ("image", ImageChooserBlock()),
            ("quote", wagblocks.BlockQuoteBlock()),
            ("document", DocumentChooserBlock()),
        ],
        blank=True,
        use_json_field=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    template = "home/mission_page.html"

    class Meta:
        verbose_name = "Mission Page"


class IssueBlock(wagblocks.StructBlock):
    """Block representing a single top-issue card."""

    title = wagblocks.CharBlock()
    description = wagblocks.RichTextBlock()
    icon = wagblocks.CharBlock(help_text="CSS class for icon", required=False)
    link = wagblocks.URLBlock(required=False, help_text="Optional learn-more link")
    background_color = wagblocks.CharBlock(required=False, help_text="Hex color override")

    class Meta:
        icon = "warning"
        label = "Issue"


class IssuesPage(Page):
    """Displays a list of top issues with flip-on-hover cards."""

    intro = RichTextField(blank=True)
    issues = StreamField([
        ("issue", IssueBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("issues"),
    ]

    template = "home/issues_page.html"

    class Meta:
        verbose_name = "Issues Page"
