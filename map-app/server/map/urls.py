from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^downloads/$', views.downloads, name='downloads'),
    url(r'^downloads_by_country/$', views.downloads_by_country, name='downloads_by_country'),
    url(r'^downloads_by_time/$', views.downloads_by_time, name='downloads_by_time'),
    url(r'^app_ids/$', views.app_ids, name='add_ids'),
]