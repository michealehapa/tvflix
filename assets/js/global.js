'use strict';



// add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};





// toggle search in mobil device || small screen
const searchBox = document.querySelector("[search-box]");
const searchToggler = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchToggler, "click", function () {
    searchBox.classList.toggle("active");
});







//store movieId in localStorage when you click any movie card


const getMovieDetail = function(movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}



const getMovieList = function(urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}