from django.db import migrations, transaction


def forwards(apps, schema_editor):
    """Ensure there is an AboutPage instance at /about/ and clear broken hero images."""
    HomePage     = apps.get_model("home", "HomePage")
    StandardPage = apps.get_model("home", "StandardPage")
    AboutPage    = apps.get_model("home", "AboutPage")

    # Convert existing StandardPage(slug="about") → AboutPage or create fresh
    with transaction.atomic():
        try:
            about_std = StandardPage.objects.get(slug="about")
            # If it's already AboutPage via polymorphism we are done
            if about_std.specific_class == AboutPage:
                pass
            else:
                # create AboutPage with same parent/position
                about_page = AboutPage(
                    title=about_std.title,
                    slug=about_std.slug,
                    live=about_std.live,
                )
                parent = about_std.get_parent()
                parent.add_child(instance=about_page)
                about_page.save_revision().publish()
                # retire old page (keep for history but unlive)
                about_std.live = False
                about_std.save()
        except StandardPage.DoesNotExist:
            # create brand-new AboutPage under root
            from wagtail.models import Page
            root = Page.objects.get(id=1)
            about_page = AboutPage(title="About", slug="about", live=True)
            root.add_child(instance=about_page)
            about_page.save_revision().publish()

    # Clear broken hero images so template fallback kicks in
    HomePage.objects.filter(hero_image__isnull=False).update(hero_image=None)


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0005_aboutpage_model"),
    ]

    operations = [
        migrations.RunPython(forwards, noop),
    ]