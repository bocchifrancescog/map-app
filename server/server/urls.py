"""server URL Configuration """

from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    url(r'^api/map/', include('map.urls')),
    url(r'^admin/', include(admin.site.urls)),
]