# Generated by Django 5.1.3 on 2024-12-09 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0006_alter_casino_number_of_casino'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casino',
            name='rating',
            field=models.FloatField(),
        ),
    ]
