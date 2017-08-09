import React from 'react'
import scriptLoader from 'react-async-script-loader'
import Service from './Service'
class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.map = null;
    this.positions = []
    this.initMap = this.initMap.bind(this);
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        console.log("componentWillReceiveProps");
        this.initMap();
      }
      else {
        console.log("error");
        this.props.onError();
        }
    }
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
     if (isScriptLoaded && isScriptLoadSucceed) {
        console.log('componentDidMount');
        this.initMap();
    }
  }


  initMap(){
    const google = window.google;
    this.map = new google.maps.Map(this.refs.map, {
          center: {lat: -31.563910, lng: 147.154312},
          zoom: 2
        });

        console.log(this.map);
        this.loadPositions(google);
  }

  loadPositions(google){
    Service.getPositions('query', positions => {
        this.setState({
          positions: positions
        });

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = positions.map(function(position, i) {
          return new google.maps.Marker({
            position: {lat: position.latitude, lng: position.longitude},
            label: position.app_id
          });
        });

        var markerCluster = new window.MarkerClusterer(this.map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    });

  }

  loadLocations(google) {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        //return responseJson.movies;
        var locations = [
            {lat: -31.563910, lng: 147.154312},
            {lat: -33.718234, lng: 150.363181},
            {lat: -33.727111, lng: 150.371124},
            {lat: -33.848588, lng: 151.209834},
            {lat: -33.851702, lng: 151.216968},
            {lat: -34.671264, lng: 150.863657},
            {lat: -35.304724, lng: 148.662905},
            {lat: -36.817685, lng: 175.699196},
            {lat: -36.828611, lng: 175.790222}
          ];
          /*for (var j=0; j<100000; j++){
            locations.push({lat: getRandom(-90, 90), lng: getRandom(-180, 180)})
          }*/

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
              return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
              });
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new window.MarkerClusterer(this.map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    return (
    <div>
      <div ref="map" style={{height: '400px', width: '600px'}}></div>
      { !this.map && <div className="center-md">Loading...</div> }
    </div>
    )
  }
}

export default scriptLoader(
  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDiAJOD4m26OSbueUlIZY9xkhDOKx0tZ10',
)(MapContainer)

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
