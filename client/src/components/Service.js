function getPositions(query, cb) {
  return fetch('api/map/downloads', {
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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log("There was an error!!!");
  console.log(error);
  throw error;
}

function parseJSON(response) {
  //console.log(response.json());
  return response.json();
}

const Service = { getPositions, getDownloadsByCountry, getAppIds  };
export default Service;
