FROM python:2.7

RUN mkdir -p /code
WORKDIR /code

# copy our application code
ADD map-app /code/

# python package install
RUN pip install Django==1.11.2
RUN pip install psycopg2

# run migrations
#RUN python ./server/manage.py migrate

# load some data
#RUN python ./server/manage.py loaddata ./server/map/fixtures/auth_initial_data.json
#RUN python ./server/manage.py loaddata ./server/map/fixtures/map_inital_data.json