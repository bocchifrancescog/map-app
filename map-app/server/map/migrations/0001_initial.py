# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-09 11:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DownloadLocationTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('app_id', models.CharField(max_length=50)),
                ('downloaded_at', models.DateTimeField()),
                ('country', models.CharField(max_length=50)),
            ],
        ),
    ]
