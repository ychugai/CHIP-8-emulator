const API_URL = 'http://localhost:8000/';

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  
  const options = { 
    method
  };

  return fetch(url, options)
    .then(res =>
      res.ok ? res.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

export default callApi;
