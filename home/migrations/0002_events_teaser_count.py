from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="events_teaser_count",
            field=models.PositiveSmallIntegerField(default=3),
        ),
    ]