import React from 'react'
import scriptLoader from 'react-async-script-loader'
import IconMarkers from './IconMarkers'
import Service from './Service'
import MapHelper from './MapHelper'
import Config from '../Config'
import { Header, Grid } from 'semantic-ui-react'

/**
 * This class is resposible to render the map of the downloads
 */
class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        map : null,
        markerClusterer: null,
        markers: {},
        icons: new IconMarkers(),
        error: false
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

  /**
   * Creates a map on the screen
   */
  createMap(){
    const google = window.google;
    const center = this.props.center;
    const zoom = this.props.zoom;
    const map = new google.maps.Map(
        this.refs.map, {
          center: center,
          zoom: zoom
    });

    this.setState({
      map : map,
      markerClusterer: new window.MarkerClusterer(
        map, [],
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
    });

    // Every time I change the zoom or the viewport I load only the markers that
    // are visible
    google.maps.event.addListener(map, 'idle', () => {
      this.loadMarkers();
    });

  }

  /**
   * Load markers on the map. The markers information a retrieved from the
   * backend
   */
  loadMarkers(){
    var map = this.state.map;
    var markers = this.state.markers;
    const icons = this.state.icons;
    const markerClusterer = this.state.markerClusterer;

    const google = window.google;

    // Loading positions from backend
    Service.getPositions(map.getBounds(),
      positions => {

        // Remove old markers that are not inside the view
        for (var key in markers) {
            if (markers.hasOwnProperty(key)) {
                if(!this.isVisible(markers[key], map)){
                  markerClusterer.removeMarker(markers[key]);
                  delete markers[key];
                }
            }
        }

        // Check if it is not already there, if not add it
        var new_markers = []
        positions.forEach(function(position, i) {
            if (!(position.id in markers)){
              var marker = MapHelper.createMarker(
                google, map, position, icons.getIcon(position.app_id)['url']);
              markers[position.id] = marker;
              new_markers.push(marker);
            }
        });

        // Now I have all the markers
        markerClusterer.addMarkers(new_markers);
        this.setState({
          markers: markers
        });
    }).catch(error => {
        this.setState({
          error: true
        });
    });
  }

  /**
   * Returns true if a marker is visible on the map view
   * @param marker Marker to check
   * @param map google map
   */
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

        {this.state.error &&
            <Grid.Column width={16} >
                <div className="ui error message">
                    "Ops! There was an error while loading the data for the map.
                    We'll try to fix it as soon as possible."
                </div>
            </Grid.Column>
        }

        <Grid.Row columns={2} className="stackable">
          <Grid.Column width={13}>
            <div ref="map" style={{height: '400px', width: '100%'}}></div>
              { !this.state.map && <div className="center-md">Loading...</div> }
          </Grid.Column>
          <Grid.Column width={3}>
            <Header color="blue"> Legend </Header>
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
  'https://maps.googleapis.com/maps/api/js?key='+Config.API_KEY,
)(MapContainer)
