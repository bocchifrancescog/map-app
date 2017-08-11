# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import copy
import json
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
    latMin = request.GET.get('latMin', 0);
    latMax = request.GET.get('latMax', 0);
    lngMin = request.GET.get('lngMin', 0);
    lngMax = request.GET.get('lngMax', 0);
    print(str(latMin));
    print(str(latMax));
    print(str(lngMin));
    print(str(lngMax));
    #data = DownloadLocationTime.objects.all()
    #json_data = serializers.serialize('json', data,  fields=('app_id',))
    data = []
    for row in DownloadLocationTime.objects.filter(
        latitude__range=(latMin,latMax),
        longitude__range=(lngMin, lngMax)
    ):
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

    datatmp = DownloadLocationTime.objects.values('country','app_id').annotate(count=Count('app_id')).order_by('country', 'app_id')


    # create a dictionary by country
    data = []
    previous_country = ""
    index = 0

    template = {
        "country": "",
        "counts": {},
    }
    # TODO refactor
    apps = DownloadLocationTime.objects.all().values_list('app_id', flat=True).distinct()
    for app_id in apps:
        template['counts'][app_id] = 0


    # todo add comment
    for i in range(0, len(datatmp)):
        dt = datatmp[i]
        if previous_country != dt['country']:
            previous_country = dt['country']
            index = len(data)
            tmp = copy.deepcopy(template)
            tmp['country'] = dt['country']
            tmp['counts'][dt['app_id']] = dt['count']
            data.append(tmp)
        else:
            # same country as before, but a different app_id
            data[index]['counts'][dt['app_id']] = dt['count']

        print(data[index])
        print("--")

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

import datetime
def downloads_by_time(request):
    """
    Return downloads by time of the day.
    A day is divided into morning, afternoon, evening and night
    :param request:
    :return:
    """
    apps = ['IOS_ALERT', 'IOS_MATE']
    data = [
        {
            'label' : 'Morning',
            'until': datetime.time(hour=12),
            'counts': {}
        },
        {
            'label': 'Afternoon',
            'until': datetime.time(hour=17),
            'counts': {}
        },
        {
            'label': 'Evening',
            'until': datetime.time(hour=21),
            'counts': {}
        },
        {
            'label': 'Night',
            'until': datetime.time(hour=23, minute=59, second=59),
            'counts': {}
        }
    ]

    for dt in data:
        for app_id in apps:
            dt['counts'][app_id] = 0

    for dt in DownloadLocationTime.objects.all():
        index = get_position(data, dt)
        data[index]['counts'][dt.app_id] += 1

    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')


def get_position(time_slots, download):
    """

    :param time_slots:
    :param download:
    :return:
    """
    for i in range(0, len(time_slots)):
        if download.downloaded_at.time() < time_slots[i]['until']:
            return i

    return len(time_slots) -1
