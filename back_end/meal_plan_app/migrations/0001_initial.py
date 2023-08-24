# Generated by Django 4.2.4 on 2023-08-17 16:43

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meal_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal_plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal_plans', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date(2023, 8, 17))),
                ('daily_meal', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='daily_meal', to='meal_app.meal')),
                ('meal_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='days_of_meals', to='meal_plan_app.meal_plan')),
            ],
        ),
    ]
