FROM node:6.11.2

RUN mkdir -p /code
WORKDIR /code

# copy our application code
ADD map-app /code/

# node package install
RUN cd client; npm install