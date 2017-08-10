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
          center: {lat: 45.464200, lng: 9.190000},
          zoom: 4
        });

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
            position: new google.maps.LatLng({lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)}),
            label: position.app_id
          });
        });

        var markerCluster = new window.MarkerClusterer(this.map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

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
