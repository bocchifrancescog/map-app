function getPositions(query, cb) {
  return fetch('http://localhost:3001/api/map/', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log("urray");
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
  console.log(response)
  return response.json();
}

const Service = { getPositions };
export default Service;
