from django.db import migrations
from django.db import transaction

def forwards(apps, schema_editor):
    HomePage     = apps.get_model("home", "HomePage")
    StandardPage = apps.get_model("home", "StandardPage")

    # Create /about/ page once if it doesn't exist
    from wagtail.models import Page  # wagtail is available during migration execution
    root = Page.objects.get(id=1)
    if not StandardPage.objects.filter(slug="about").exists():
        with transaction.atomic():
            about_page = StandardPage(
                title="About",
                slug="about",
                live=True,
            )
            root.add_child(instance=about_page)
            about_page.save_revision().publish()

    # Clear hero images so template falls back to static placeholder
    HomePage.objects.update(hero_image=None)

class Migration(migrations.Migration):
    dependencies = [
        ("home", "0003_clean_cta_buttons"),
    ]
    operations = [
        migrations.RunPython(forwards, migrations.RunPython.noop),
    ]