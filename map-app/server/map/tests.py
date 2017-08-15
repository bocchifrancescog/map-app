# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from django.test import TestCase
from models import DownloadLocationTime
# Create your tests here.

class DownloadLocationTimeTestCase(TestCase):
    """ Unit tests for the DownloadLocationTime model """

    def test_model_001(self):
        """Ensure saving a new DownloadLocationTimeTestCase
        instance with valid values works"""

        try:
            DownloadLocationTime(
                longitude=9.1900,
                latitude=45.4642,
                app_id='IOS_ALERT',
                downloaded_at=datetime.datetime.now()).save()
        except Exception:
            self.fail("Cannot save DownloadLocationTimeTestCase instance with valid values")

class ViewsTestCase(TestCase):
    """ Unit tests for the view """

    def setUp(self):
        """Configure method executed prior to each test."""

        morning = datetime.datetime.now()
        morning = morning.replace(hour=8, minute=30)
        evening = morning.replace(hour=19, minute=30)

        # Milan
        DownloadLocationTime(
            longitude=9.1900,latitude=45.4642, app_id='IOS_ALERT', downloaded_at=morning)\
            .save()

        # London
        DownloadLocationTime(
            longitude=-0.1278,latitude=51.5074, app_id='IOS_MATE', downloaded_at=evening)\
            .save()

    def tearDown(self):
        """Unconfigure method executed after each test."""
        DownloadLocationTime.objects.all().delete()

    def test_downloads_001(self):
        """
        Check that /api/map/downloads/ works and returns to locations
        """
        url_params = "?lat_min=45.0&latMax=52.0&lngMin=-1.0&lngMax=10.0"
        response = self.client.get('/api/map/downloads/'+url_params)

        # check status
        self.assertEqual(response.status_code, 200)

        # check content
        content = response.json()
        self.assertEqual(len(content), 2)

        content = str(content)
        self.assertIn('IOS_ALERT', content)
        self.assertIn('IOS_MATE', content)

    def test_downloads_by_country_001(self):
        """
        Check that /api/map/downloads_by_country/ works
        """

        response = self.client.get('/api/map/downloads_by_country/')
        # check status
        self.assertEqual(response.status_code, 200)

        # check content
        content = response.json()
        self.assertEqual(len(content), 2)

        # It's ordered by country
        self.assertEqual(content[0]['country'], 'Italy')
        self.assertEqual(content[0]['counts']['IOS_MATE'], 0)
        self.assertEqual(content[0]['counts']['IOS_ALERT'], 1)

        self.assertEqual(content[1]['country'], 'United Kingdom')
        self.assertEqual(content[1]['counts']['IOS_MATE'], 1)
        self.assertEqual(content[1]['counts']['IOS_ALERT'], 0)


    def test_downloads_by_time_001(self):
        """
        Check that /api/map/downloads_by_time/ works
        """

        response = self.client.get('/api/map/downloads_by_time/')
        # check status
        self.assertEqual(response.status_code, 200)

        # check content
        content = response.json()
        self.assertEqual(len(content), 4)

        # It's ordered by time of the day
        self.assertEqual(content[0]['label'], 'Morning')
        self.assertEqual(content[0]['counts']['IOS_MATE'], 0)
        self.assertEqual(content[0]['counts']['IOS_ALERT'], 1)

        self.assertEqual(content[1]['label'], 'Afternoon')
        self.assertEqual(content[1]['counts']['IOS_MATE'], 0)
        self.assertEqual(content[1]['counts']['IOS_ALERT'], 0)

        self.assertEqual(content[2]['label'], 'Evening')
        self.assertEqual(content[2]['counts']['IOS_MATE'], 1)
        self.assertEqual(content[2]['counts']['IOS_ALERT'], 0)

        self.assertEqual(content[3]['label'], 'Night')
        self.assertEqual(content[3]['counts']['IOS_MATE'], 0)
        self.assertEqual(content[3]['counts']['IOS_ALERT'], 0)
