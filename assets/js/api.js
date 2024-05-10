'use strict';

const api_key = '6db5f5d0d9a389dc6a6306ce72db67b0';
const imageBaseURL = 'https://image.tmdb.org/t/p/';


// fetch data from server using the `url` and passes the result in the json data to `callback` function, along with an optional parameter if has `optionalParam`.

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
     .then(response => response.json())
     .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFromServer}; 