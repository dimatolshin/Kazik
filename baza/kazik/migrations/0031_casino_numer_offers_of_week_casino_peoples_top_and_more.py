# Generated by Django 5.1.3 on 2024-12-13 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0030_prize_image_without_background_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='casino',
            name='numer_offers_of_week',
            field=models.IntegerField(blank=True, null=True, verbose_name="Нумерация 'Предложение недели' "),
        ),
        migrations.AddField(
            model_name='casino',
            name='peoples_top',
            field=models.IntegerField(blank=True, null=True, verbose_name="Нумерация 'Топ людей' "),
        ),
        migrations.AlterField(
            model_name='casino',
            name='number_of_casino',
            field=models.IntegerField(blank=True, null=True, verbose_name="Нумерация 'Топ 10 казино'"),
        ),
    ]