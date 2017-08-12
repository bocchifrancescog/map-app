import React from 'react'
import scriptLoader from 'react-async-script-loader'
import IconMarkers from './IconMarkers'
import Service from './Service'
import { Header, Grid } from 'semantic-ui-react'

class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        map : null,
        markerClusterer: null,
        markers: {},
        icons: new IconMarkers(),
    }

  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.createMap();
      }
      else {
        console.log("Error while loading the map");
        this.props.onError();
        }
    }
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
     if (isScriptLoaded && isScriptLoadSucceed) {
        this.createMap();
    }
  }

  createMap(){
    const google = window.google;
    const map = new google.maps.Map(
        this.refs.map, {
          center: {lat: 45.464200, lng: 9.190000},
          zoom: 4
    });

    this.setState({
      map : map,
      markerClusterer: new window.MarkerClusterer(
        map, [], {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
    });

    // Every time I change the zoom or the viewport I load only the markers that
    // are visible
    google.maps.event.addListener(map, 'idle', () => {
      this.loadMarkers();
    });

  }

  loadMarkers(){
    console.log("Loading Markers...");
    var map = this.state.map;
    var markers = this.state.markers;
    const icons = this.state.icons;
    const markerClusterer = this.state.markerClusterer;

    const google = window.google;

    // Loading positions from backend
    Service.getPositions(map.getBounds(),
      positions => {
        console.log("Total load: "+positions.length);

        // Remove old markers that are not inside the view
        for (var key in markers) {
            if (markers.hasOwnProperty(key)) {
                if(!this.isVisible(markers[key], map)){
                  console.log("removing "+key)
                  markerClusterer.removeMarker(markers[key]);
                  delete markers[key];
                }
            }
        }

        // Check if it is not already there, if not add it
        var my_marks = []
        positions.map(function(position, i) {
            if (!(position.id in markers)){
              console.log("Add "+position.id)
              var markTmp =  new google.maps.Marker({
                position: new google.maps.LatLng({
                  lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)}),
                label: position.app_id,
                icon: icons.getIcon(position.app_id)['url'],
              });
              markers[position.id] = markTmp;
              my_marks.push(markTmp);
            }
        });

        // Now I have all the markers
        markerClusterer.addMarkers(my_marks);
        this.setState({
          markers: markers
        });
    });
  }

  isVisible(marker, map){
    return map.getBounds().contains(marker.getPosition());
  }

  render(){
    const iconToColor = this.state.icons.getIconToColor();
    const legendDiv = Object.keys(iconToColor).map((key, index) => (
          <div key={key} className="item" style={{color:'#'+iconToColor[key]['color']  }}>
            <i className="large marker middle aligned icon" ></i>
            <div className="content">
              <span className="header grey">{key}</span>
            </div>
          </div>
        ));

    return (
      <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={13}>
          <div ref="map" style={{height: '400px', width: '100%'}}></div>
            { !this.state.map && <div className="center-md">Loading...</div> }
        </Grid.Column>
        <Grid.Column width={3}>
          <Header color="grey"> Legend </Header>
          <div className="ui relaxed divided list">
            {legendDiv}
          </div>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
}

export default scriptLoader(
  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDiAJOD4m26OSbueUlIZY9xkhDOKx0tZ10',
)(MapContainer)
