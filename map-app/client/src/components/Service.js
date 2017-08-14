/**
 * Set of functions to interact with the backend
 */

/**
 * Performs a get to api/map/downloads/ and returns a list of positions
 * @param bounds: bounds of the view
 * @param cb: Success callback
 */
function getPositions(bounds, cb) {
  var latMax = bounds.getNorthEast().lat();
  var latMin= bounds.getSouthWest().lat();
  var lngMax = bounds.getNorthEast().lng();
  var lngMin = bounds.getSouthWest().lng();

  var url = 'api/map/downloads/?';
  url = url + 'latMax='+latMax+'&latMin='+latMin+'&lngMax='+lngMax+'&lngMin='+lngMin+'';

  return fetch(url, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * Returns the downloads by country
 * @param cb: Success callback
 */
function getDownloadsByCountry(cb) {
  return fetch('api/map/downloads_by_country', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * Returns the list of apps
 * @param cb: Success callback
 */
function getAppIds(cb) {
  return fetch('api/map/app_ids', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * Returns the downloads by time
 * @param cb: Success callback
 */
function getDownloadsByTime(cb) {
  return fetch('api/map/downloads_by_time', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error('HTTP Error '+response.statusText);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Service = { getPositions, getDownloadsByCountry, getAppIds, getDownloadsByTime };
export default Service;
