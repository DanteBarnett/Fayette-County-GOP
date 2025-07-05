from django.db import migrations, models
import wagtail.fields

class Migration(migrations.Migration):
    dependencies = [
        ("home", "0004_aboutpage_and_hero_fix"),
    ]

    operations = [
        migrations.CreateModel(
            name="AboutPage",
            fields=[
                ("standardpage_ptr", models.OneToOneField(auto_created=True, on_delete=models.CASCADE, parent_link=True, primary_key=True, serialize=False, to="home.standardpage")),
            ],
            options={
                "abstract": False,
            },
            bases=("home.standardpage",),
        ),
    ]