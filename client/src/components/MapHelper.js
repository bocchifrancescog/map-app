/**
 * Helper functions for the map
 */

 /**
  * Create a marker on a map and returns it
  * @param google google api instance
  * @param map google map reference
  * @param position element to print on the marker
  * @param icon icon to assign at the marker
  */
function createMarker(google, map, position, icon) {
  var infowindow = new google.maps.InfoWindow({
    content: position.app_id+
      "<br> Where : "+position.latitude + ", "+position.longitude+
      "<br> When: "+position.downloaded_at
  });

  var marker =  new google.maps.Marker({
    position: new google.maps.LatLng({
      lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)}),
    icon: icon,
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  return marker;
}

const MapHelper = { createMarker };
export default MapHelper;
