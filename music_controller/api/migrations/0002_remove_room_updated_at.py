# Generated by Django 2.2 on 2021-02-03 23:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='updated_at',
        ),
    ]
