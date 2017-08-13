# map-app
Web Application that shows downloads on a map

# setup
- Open client/src/Config.js file and assign your google API key to the variable API_KEY. 
Ex:
const API_KEY = 'MyGoogleApiKey';

In order to get a google api key, please visit: https://developers.google.com/maps/documentation/javascript/get-api-key

## start server
cd server
python manage runserver 8000

## start client
cd client
npm start
open browser at http://localhost:3000/

# tools
- python 2.7
- django:  pip install Django==1.11
