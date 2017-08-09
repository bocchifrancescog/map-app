# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from models import DownloadLocationTime


class DownloadLocationTimeAdmin(admin.ModelAdmin):
    list_filter = ('app_id',)


admin.site.register(DownloadLocationTime, DownloadLocationTimeAdmin)