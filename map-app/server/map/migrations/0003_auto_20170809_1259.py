# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-09 12:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0002_auto_20170809_1248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='downloadlocationtime',
            name='country',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]