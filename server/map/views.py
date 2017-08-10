# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.shortcuts import render
from django.core import serializers
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from models import DownloadLocationTime


def downloads(request):
    """
    Return a json containing the following fields:
    'app_id', 'latitude', 'longitude', 'downloaded_at'
    :param request:
    :return:
    """

    #data = DownloadLocationTime.objects.all()
    #json_data = serializers.serialize('json', data,  fields=('app_id',))
    data = []
    for row in DownloadLocationTime.objects.all():
        # Serialize data
        tmp={
            'id': row.pk,
            'app_id' : row.app_id,
            'latitude': row.latitude,
            'longitude': row.longitude,
            'downloaded_at': row.downloaded_at
        }
        data.append(tmp)

    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')

def downloads_by_country(request):
    """
    Return downloads by country
    :param request: 
    :return: 
    """

    datatmp = DownloadLocationTime.objects.values('country', 'app_id').annotate(count=Count('country',))
    apps = ['IOS_ALERT', 'IOS_MATE']

    # create a dictionary by country
    data = []
    template = {
        "country": ""
    }
    # TODO refactor
    apps = DownloadLocationTime.objects.all().values_list('app_id', flat=True).distinct()
    for app_id in apps:
        template[app_id] = 0

    previous_country = ""
    index = 0
    # todo add comment
    for i in range(0, len(datatmp)):
        dt = datatmp[i]
        if previous_country != dt['country']:
            previous_country = dt['country']
            index = len(data)
            tmp = dict(template)
            tmp['country'] = dt['country']
            tmp[dt['app_id']] = dt['count']
            data.append(tmp)
        else:
            # same country as before, but a different app_id
            data[index][dt['app_id']] = dt['count']

    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')

def app_ids(request):
    """
    Return downloads by country
    :param request:
    :return:
    """

    objects = DownloadLocationTime.objects.all().values_list('app_id', flat=True).distinct()
    data = []
    for obj in objects:
        data.append({
            'app_id': str(obj)
        })
    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')

def downloads_by_time(request):
    """
    Return downloads by time of the day.
    A day is divided into morning, afternoon, evening and night
    :param request:
    :return:
    """
    times = [
        "Morning",
        "Afternoon"
        "Evening"
        "Night"
    ]
    return HttpResponse(my_custom_sql())

from django.db import connection

def my_custom_sql():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM map_downloadlocationtime")
        return cursor.fetchall()