# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from urllib2 import urlopen,URLError
from django.db import models

class DownloadLocationTime(models.Model):
    """
    Entity to store the location and the time of the for the app download
    """

    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    app_id = models.CharField(max_length=50)
    downloaded_at = models.DateTimeField()
    country = models.CharField(max_length=50, null=True, blank=True)

    def __unicode__(self):
        return "%s - %s - %s - %s - %s" % (self.longitude, self.latitude, \
               self.app_id, self.downloaded_at, self.country)

    def save(self,*args, **kwargs):
        """
        overwrite save in order to set 'country' given a longitude
        and latitude
        """
        country = DownloadLocationTime.get_country(
            self.latitude, self.longitude)

        if country is None:
            raise Exception("Latitude and Longitude "
                            "provided do not belong to any country")
        else:
            self.country = country
            super(DownloadLocationTime, self).save(*args, **kwargs)

    @staticmethod
    def get_country(lat, lon):
        """
        Return the related country name from a latitude and a longitude
        :param lat: latitude
        :param lon: longitude
        :return:
        """
        country = None
        url = "http://maps.googleapis.com/maps/api/geocode/json?"
        url += "latlng=%s,%s&sensor=false" % (lat, lon)
        print("reading...")
        try:
            v = urlopen(url, timeout=1.5).read()
            j = json.loads(v)
            print(j)
            components = j['results'][0]['address_components']
            for c in components:
                print(c)
                if "country" in c['types']:
                    country = c['long_name']
        except URLError, e:
            raise Exception("There was an error google api call: %r" % e)

        return country
