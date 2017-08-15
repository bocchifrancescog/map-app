# map-app
Web Application that shows app downloads on a map

# setup
- Open map-app/client/src/Config.js file and assign your google API key to the variable API_KEY. 

Ex:
const API_KEY = 'MyGoogleApiKey';

To know how to get a google api key, please visit: https://developers.google.com/maps/documentation/javascript/get-api-key


### setup

- docker-compose build
- docker-compose up

On another console
- docker-compose exec server ./map-app/server/manage.py migrate
- docker-compose exec server ./map-app/server/manage.py loaddata ./map-app/server/map/fixtures/auth_initial_data.json
- docker-compose exec server ./map-app/server/manage.py loaddata ./map-app/server/map/fixtures/map_inital_data.json


- open browser at http://localhost:3000/

To see data in the backend:
- open browser at http://localhost:3001/admin
- user: admin, password: admin9999

# tools
- python 2.7
- django 1.11
- reactJS 15.6.1

![Alt text](/screenshots/home.png?raw=true "Home page screenshot")


### Expansion

In order to create a push notification system for a web application there are 2(ish) ideas that come to my mind:
1. Polling: the client application query the server with a classic ajax request in order to see if there is any new data. Based on the frequency it can look like receiving a real time notification from the server.
2. Websockets: since they are continuos connections between client and the server, the server can send any message to the client at any time, so every time thare are new data, the client will be notified. From the backend prospective, I would implement a signal, that every time new data are saved would send them to the client.
(3). Server-sent events: They  use http continuos connections as websockets, but the messages are 1 way only (from server to client). Not supported on Microsoft browsers yet.


