# Generated by Django 5.1.3 on 2024-12-19 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0040_alter_casino_descriptions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prize',
            name='number_of_choice',
            field=models.IntegerField(default=100, verbose_name='Порядок нумерации призов'),
        ),
        migrations.AlterField(
            model_name='user',
            name='key_free_case',
            field=models.IntegerField(default=1, verbose_name='Количество ключей "Бесплатный кейс"'),
        ),
    ]