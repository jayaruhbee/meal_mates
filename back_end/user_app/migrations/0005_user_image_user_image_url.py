# Generated by Django 4.2.4 on 2023-08-22 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0004_remove_user_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='user_images/'),
        ),
        migrations.AddField(
            model_name='user',
            name='image_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]
