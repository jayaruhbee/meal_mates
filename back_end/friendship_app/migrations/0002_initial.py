# Generated by Django 4.2.3 on 2023-08-09 20:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friendship_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='follows',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL, unique=True),
        ),
        migrations.AddField(
            model_name='follows',
            name='following',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]
