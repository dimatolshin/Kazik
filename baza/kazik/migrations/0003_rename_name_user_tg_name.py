# Generated by Django 5.1.3 on 2024-12-07 10:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kazik', '0002_image_remove_user_age_remove_user_email_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='tg_name',
        ),
    ]
