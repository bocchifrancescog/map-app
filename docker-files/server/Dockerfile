FROM python:2.7

RUN mkdir -p /code
WORKDIR /code

# copy our application code
ADD map-app /code/

# python package install
RUN pip install Django==1.11.2

# run migrations
RUN python ./server/manage.py migrate

# create superuser
#echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin9999')" | python #manage.py shell

# load some data
RUN python ./server/manage.py loaddata