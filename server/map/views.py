# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.shortcuts import render
from django.core import serializers
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, StreamingHttpResponse
from django.core.serializers.json import DjangoJSONEncoder
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
            'country': row.country,
            'downloaded_at': row.downloaded_at
        }
        data.append(tmp)

    json_data = json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')

