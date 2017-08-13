function getPositions(bounds, cb) {
  var latMax = bounds.getNorthEast().lat();
  var latMin= bounds.getSouthWest().lat();
  var lngMax = bounds.getNorthEast().lng();
  var lngMin = bounds.getSouthWest().lng();

  var url = 'api/map/downloads/?';
  var url =url + 'latMax='+latMax+'&latMin='+latMin+'&lngMax='+lngMax+'&lngMin='+lngMin+'';

  return fetch(url, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getDownloadsByCountry(query, cb) {
  return fetch('api/map/downloads_by_country', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAppIds(query, cb) {
  return fetch('api/map/app_ids', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getDownloadsByTime(query, cb) {
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
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  //console.log(response.json());
  return response.json();
}

const Service = { getPositions, getDownloadsByCountry, getAppIds, getDownloadsByTime };
export default Service;
