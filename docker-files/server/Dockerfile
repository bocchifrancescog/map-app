FROM python:2.7

RUN mkdir -p /code
WORKDIR /code

# copy our application code
ADD map-app /code/

# python package install
RUN pip install Django==1.11.2
RUN pip install psycopg2
