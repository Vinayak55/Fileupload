# Generated by Django 3.1.7 on 2021-03-19 09:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fileupload', '0002_auto_20210319_1328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fileupload',
            name='content',
        ),
    ]
