# Generated by Django 5.1.3 on 2024-12-13 16:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0031_casino_numer_offers_of_week_casino_peoples_top_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banners',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('image', models.URLField(blank=True, null=True)),
                ('picture', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='banner', to='kazik.image')),
            ],
        ),
        migrations.DeleteModel(
            name='Personal_Visit_on_Casino',
        ),
    ]
