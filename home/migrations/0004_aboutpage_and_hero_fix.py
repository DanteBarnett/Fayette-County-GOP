from django.db import migrations
from wagtail.models import Page


def forwards(apps, schema_editor):
    """Create an unpublished About page under the Home page and tidy hero images.

    The original migration hit an IntegrityError because `content_type` was not
    populated when instantiating the About page.  We now fetch the runtime
    ContentType for the model and pass it to the constructor.  While we are in
    here we also keep the original hero-image clean-up routine (copy the site
    setting hero image to the Home page if the Home page hasn't got one).
    """
    # 1. Import the *runtime* ContentType model (cannot be loaded via ``apps``)
    from django.contrib.contenttypes.models import ContentType

    # Historical/hybrid models -------------------------------------------------
    HomePage = apps.get_model("home", "HomePage")
    SiteSettings = apps.get_model("home", "SiteSettings")

    # ``AboutPage`` existed historically – if it has since been renamed or
    # removed fall back to ``StandardPage`` so the data-migration still works.
    try:
        AboutPage = apps.get_model("home", "AboutPage")
    except LookupError:
        AboutPage = apps.get_model("home", "StandardPage")

    # 2. Grab the runtime ContentType and attach it when we create the page
    ct = ContentType.objects.get_for_model(AboutPage)

    # -------------------------------------------------------------------------
    #  A)  Ensure an "About" child page exists under the site's HomePage
    # -------------------------------------------------------------------------
    # Need to fetch using the *real* Page manager because the historical
    # HomePage model used here lacks helper methods like ``get_children``.
    home_root = Page.objects.type(HomePage).first()
    if home_root and not Page.objects.child_of(home_root).filter(slug="about").exists():
        about_page = AboutPage(
            title="About",
            slug="about",
            live=False,  # leave unpublished so editors can tweak later
            content_type=ct,
        )
        # NB: ``add_child`` will save the instance.
        home_root.add_child(instance=about_page)
        # Keep a non-live revision for editors.
        about_page.save_revision()

    # -------------------------------------------------------------------------
    #  B)  Hero image clean-up
    # -------------------------------------------------------------------------
    # If the HomePage hero image hasn't been filled in yet, copy the global
    # Site Settings hero image so the front page looks decent by default.
    site_setting = SiteSettings.objects.first()
    hero_img = getattr(site_setting, "hero_image", None) if site_setting else None
    if hero_img:
        for hp in HomePage.objects.all():
            if not getattr(hp, "hero_image", None):
                hp.hero_image = hero_img
                hp.save()


def backwards(apps, schema_editor):
    """Remove the automatically-created About page (safe rollback)."""
    try:
        AboutPage = apps.get_model("home", "AboutPage")
    except LookupError:
        AboutPage = apps.get_model("home", "StandardPage")

    for page in AboutPage.objects.filter(slug="about"):
        page.delete()


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0003_clean_cta_buttons"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]