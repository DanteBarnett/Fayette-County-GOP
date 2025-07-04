"""
home/models.py – Fayette County GOP
Wagtail 6 · Django 5 · Python 3.12
"""
from django.db import models
from django.http import HttpResponseRedirect
from django.utils import timezone

from wagtail import blocks as wagblocks
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.forms.models import AbstractEmailForm, AbstractFormField
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.embeds.blocks import EmbedBlock
from wagtail.fields import RichTextField, StreamField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Orderable, Page
from wagtail.snippets.models import register_snippet
from modelcluster.fields import ParentalKey


# ──────────────────────────────────────────────────────────────────────────────
# 1 – GLOBAL SITE SETTINGS
# ──────────────────────────────────────────────────────────────────────────────
@register_setting
class SiteSettings(BaseSiteSetting):
    """Editable via Settings ▸ Site ► Fayette GOP"""
    title = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
    )
    footer_blurb = models.TextField(blank=True)
    social_links = StreamField(
        [("link",
          wagblocks.StructBlock([
              ("label", wagblocks.CharBlock()),
              ("url",   wagblocks.URLBlock()),
          ]))],
        blank=True, use_json_field=True
    )

    panels = [
        FieldPanel("title"),
        FieldPanel("tagline"),
        FieldPanel("hero_image"),
        FieldPanel("footer_blurb"),
        FieldPanel("social_links"),
    ]

    def __str__(self):
        return self.title


# ──────────────────────────────────────────────────────────────────────────────
# 2 – HOME PAGE
# ──────────────────────────────────────────────────────────────────────────────
class HomePage(Page):
    hero_title    = models.CharField(max_length=255, default="Fayette County GOP")
    hero_subtitle = models.CharField(max_length=255, blank=True)
    hero_image    = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
    )

    mission = RichTextField(blank=True)
    cta_buttons = StreamField(
        [("button",
          wagblocks.StructBlock([
              ("label", wagblocks.CharBlock()),
              ("link",  wagblocks.PageChooserBlock(required=False)),
              ("external_url", wagblocks.URLBlock(
                  required=False,
                  help_text="If linking off-site, fill this and leave 'link' blank.",
              )),
          ], icon="link"))],
        blank=True, use_json_field=True
    )
    events_teaser_count = models.PositiveSmallIntegerField(default=3,
        help_text="Number of upcoming events to show on homepage teaser")

    content_panels = Page.content_panels + [
        FieldPanel("hero_title"),
        FieldPanel("hero_subtitle"),
        FieldPanel("hero_image"),
        FieldPanel("mission"),
        FieldPanel("cta_buttons"),
        FieldPanel("events_teaser_count"),
    ]

    subpage_types = [
        "home.VolunteerPage",
        "home.EventIndexPage",
        "home.DonateRedirectPage",
        "home.NewsletterSignupPage",
        "home.StandardPage",
    ]

    class Meta:
        verbose_name = "Home Page"


# ──────────────────────────────────────────────────────────────────────────────
# 3 – STANDARD PAGE (About, etc.)
# ──────────────────────────────────────────────────────────────────────────────
class StandardPage(Page):
    body = StreamField(
        [
            ("heading",   wagblocks.CharBlock(classname="full title")),
            ("paragraph", wagblocks.RichTextBlock()),
            ("image",     ImageChooserBlock()),
        ],
        use_json_field=True
    )
    content_panels = Page.content_panels + [FieldPanel("body")]
    parent_page_types = ["home.HomePage"]


# ──────────────────────────────────────────────────────────────────────────────
# 4 – EVENTS
# ──────────────────────────────────────────────────────────────────────────────
class EventIndexPage(Page):
    intro = RichTextField(blank=True)
    content_panels = Page.content_panels + [FieldPanel("intro")]
    parent_page_types = ["home.HomePage"]
    subpage_types   = ["home.EventPage"]

class EventPage(Page):
    start_date = models.DateTimeField(default=timezone.now)
    end_date   = models.DateTimeField(null=True, blank=True)
    location   = models.CharField(max_length=255, blank=True)
    description = RichTextField()
    flyer = models.ForeignKey(
        "wagtaildocs.Document", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
    )
    image = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
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
# 5 – VOLUNTEER
# ──────────────────────────────────────────────────────────────────────────────
class VolunteerPage(StandardPage):
    """
    Simple content page with a Volunteer sign-up embed or form.
    """
    template = "home/volunteer_page.html"
    parent_page_types = ["home.HomePage"]
    subpage_types = []


# ──────────────────────────────────────────────────────────────────────────────
# 6 – DONATE (external redirect helper)
# ──────────────────────────────────────────────────────────────────────────────
class DonateRedirectPage(Page):
    """
    Instantly redirects to WinRed / Anedot / etc.  
    - Set "External URL" in page settings.
    """
    external_url = models.URLField(help_text="Where to send visitors", blank=False)

    content_panels = Page.content_panels + [
        FieldPanel("external_url"),
    ]

    parent_page_types = ["home.HomePage"]
    subpage_types = []

    def serve(self, request):
        return HttpResponseRedirect(self.external_url)


# ──────────────────────────────────────────────────────────────────────────────
# 7 – NEWSLETTER SIGN-UP (simple form or embed)
# ──────────────────────────────────────────────────────────────────────────────
class NewsletterSignupPage(StandardPage):
    """
    Use body to embed a Mailchimp/Constant-Contact form
    """
    template = "home/newsletter_page.html"
    parent_page_types = ["home.HomePage"]
    subpage_types = []


# ──────────────────────────────────────────────────────────────────────────────
# 8 – BLOG (unchanged)
# ──────────────────────────────────────────────────────────────────────────────
class BlogIndexPage(Page):
    intro = RichTextField(blank=True)
    parent_page_types = ["home.HomePage"]
    subpage_types     = ["home.BlogPostPage"]
    content_panels    = Page.content_panels + [FieldPanel("intro")]

class BlogPostPage(Page):
    published_at = models.DateTimeField(default=timezone.now)
    author       = models.CharField(max_length=255)
    cover_image  = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
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
# 9 – LEADERSHIP  (unchanged)
# ──────────────────────────────────────────────────────────────────────────────
@register_snippet
class Leader(models.Model):
    name  = models.CharField(max_length=255)
    role  = models.CharField(max_length=255)
    photo = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True,
        on_delete=models.SET_NULL, related_name="+"
    )
    email = models.EmailField(blank=True)
    bio   = RichTextField(blank=True)

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
    parent_page_types = ["home.HomePage"]
    subpage_types = []


# ──────────────────────────────────────────────────────────────────────────────
# 10 – GALLERY  (unchanged)
# ──────────────────────────────────────────────────────────────────────────────
class GalleryItem(Orderable):
    page  = ParentalKey("GalleryPage", related_name="items")
    title = models.CharField(max_length=255)
    media = StreamField(
        [("image", ImageChooserBlock()),
         ("video", EmbedBlock())],
        use_json_field=True
    )
    panels = [FieldPanel("title"), FieldPanel("media")]

class GalleryPage(Page):
    template = "home/gallery_page.html"
    parent_page_types = ["home.HomePage"]
    subpage_types = []


# ──────────────────────────────────────────────────────────────────────────────
# 11 – CONTACT + FORM  (unchanged)
# ──────────────────────────────────────────────────────────────────────────────
class FormField(AbstractFormField):
    page = ParentalKey("ContactPage", on_delete=models.CASCADE, related_name="form_fields")

class ContactPage(AbstractEmailForm):
    template              = "home/contact_page.html"
    landing_page_template = "home/contact_page.html"

    intro          = RichTextField(blank=True)
    thank_you_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        FieldPanel("intro"),
        FieldPanel("thank_you_text"),
        MultiFieldPanel(
            [FieldPanel("from_address"),
             FieldPanel("to_address"),
             FieldPanel("subject")],
            heading="Email Settings",
        ),
    ]

    parent_page_types = ["home.HomePage"]
    subpage_types = []

    def get_context(self, request, *args, **kwargs):
        context          = super().get_context(request, *args, **kwargs)
        context["form"]  = self.get_form(request.POST or None)
        return context

