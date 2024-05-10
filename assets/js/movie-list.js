'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";


//collection of genre name and url parameter from local storage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");





sidebar();



let currentPage = 1;
let totalPages = 0;





fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&${urlParam}`, function ({ results: movieList, total_pages}) {
   
    totalPages = total_pages;

    document.title = `${genreName} Movies - Tvflix`;

    const moveListElem = document.createElement("section");
    moveListElem.classList.add("movie-list", "genre-list");
    moveListElem.ariaLabel = `${genreName} Movies`;


    moveListElem.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${genreName} Movies</h1>
        </div>

        <div class="grid-list"></div>

        <button class="btn load-more" load-more>Load More</button>
    `;


    //add movie card based on fetch item

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        moveListElem.querySelector(".grid-list").appendChild
        (movieCard);


    }


    pageContent.appendChild(moveListElem);



    //load more button funtionality
    document.querySelector("[load-more]").addEventListener("click", function () {
        if (currentPage > totalPages) {
            this.style.display = "none";   //this == loading-btn
            return;
        }

        currentPage++;
        this.classList.add("loading"); // this == loading-btn

        fetchDataFromServer( `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`, ({ results: movieList}) => {
           this.classList.remove("loading");  //this loading-btn
           
           for (const movie of movieList) {
            const movieCard = createMovieCard(movie);

            moveListElem.querySelector(".grid-list").appendChild
            (movieCard);
           }
        });


    });
});




search();