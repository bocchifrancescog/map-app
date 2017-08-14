# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import copy
import datetime
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
    lat_min = request.GET.get('latMin', 0)
    lat_max = request.GET.get('latMax', 0)
    lng_min = request.GET.get('lngMin', 0)
    lng_max = request.GET.get('lngMax', 0)

    data = []
    for row in DownloadLocationTime.objects.filter(
            latitude__range=(lat_min, lat_max),
            longitude__range=(lng_min, lng_max)
    ):
        # Serialize data
        tmp = {
            'id': row.pk,
            'app_id': row.app_id,
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
    :param request: http request
    :return:
    """

    data_tmp = DownloadLocationTime.objects.values(
        'country', 'app_id').annotate(count=Count('app_id')).order_by(
        'country', 'app_id')

    # create a dictionary by country
    data = []
    previous_country = ""
    index = 0

    template = {
        "country": "",
        "counts": {},
    }

    apps = _get_app_ids()
    for app_id in apps:
        template['counts'][app_id] = 0

    # I need to group data_tmp by country, because at the moment they are grouped by app_id
    for i in range(0, len(data_tmp)):
        dt = data_tmp[i]
        if previous_country != dt['country']:
            previous_country = dt['country']
            index = len(data)
            tmp = copy.deepcopy(template)
            tmp['country'] = dt['country']
            tmp['counts'][dt['app_id']] = dt['count']
            data.append(tmp)
        else:
            # same country as before, but a different app_id (this is valid because they ordered by country)
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

    objects = _get_app_ids()
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
    apps = _get_app_ids()
    data = [
        {
            'label': 'Morning',
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
        index = _get_position(data, dt)
        data[index]['counts'][dt.app_id] += 1

    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')


def _get_position(time_slots, download):
    """
    Give the position inside time_slots of a given download object
    :param time_slots: dictionary containing the different times
    :param download: DownloadLocationTime object
    :return:
    """
    for i in range(0, len(time_slots)):
        if download.downloaded_at.time() < time_slots[i]['until']:
            return i

    return len(time_slots) - 1


def _get_app_ids():
    """
    Return all the distinct app_ids in the database
    :return:
    """
    return DownloadLocationTime.objects.all().values_list(
        'app_id', flat=True).distinct()
