# Generated by Django 5.1.3 on 2024-12-09 19:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0015_remove_user_image_casino_banner_url_prize_image_url_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='daly_bonus',
            name='prizes',
        ),
        migrations.AddField(
            model_name='daly_bonus',
            name='count_prizes',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='daly_bonus',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='daly_bonus', to='kazik.user'),
        ),
    ]
