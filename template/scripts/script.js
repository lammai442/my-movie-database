import { oData } from './data/data.js';
import { fetchTopMovies, fetchOmdbMovie } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { shuffleArray, MovieByHighestRating, getAllMovieDetails } from './utils/utils.js';
import { getElement } from './utils/domUtils.js';
import { createMovieCard } from './components/movieCard.js';
import { getLocalStorage} from './data/localStorage.js'

if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    
    pageSetup();

    // Funktion för att sätta upp startsidan
    async function pageSetup(){
        // Hämtar hem topfilmer från Jespers databas och lägger in i oData.topMoviesList
        await fetchTopMovies();
        
        // Shufflar om hela arrayen och sparar sedan de fem först i listan in i fiveRandomTrailerMovies
        let fiveRandomTrailerMovies = shuffleArray(oData.topMovieList).slice(0, 5);      

        // Här skickas 5 slumpmässiga filmer från Jespers databas för caroussel
        for (let i = 0; i < fiveRandomTrailerMovies.length; i++) {
            // För varje iteration så skickas även ett nummer med som måste börja på 1
            renderTrailers(fiveRandomTrailerMovies[i], i + 1)         
        }

        // Omvandlar arrayen topMovieList så att den har mer detailjer
        let fullMovieDetails = await getAllMovieDetails(oData.topMovieList);     
        // Lägger in top 20 filmer med högst ranking först från Jespers databas
        oData.MovieByHighestRating = MovieByHighestRating(fullMovieDetails).slice(0, 20);        
        
        // // En loop för att skapa 20 st movieCards efter högsta rankingen
        // for(let movie of oData.MovieByHighestRating) {
        //     createMovieCard(movie.Poster, movie.Title, movie.imdbRating)
        // }

        for(let i= 0; i < oData.MovieByHighestRating.length; i++) {
            createMovieCard(oData.MovieByHighestRating[i].Poster, oData.MovieByHighestRating[i].Title, oData.MovieByHighestRating[i].imdbRating, oData.MovieByHighestRating[i].imdbID);            
        }
    }

} else if(window.location.pathname === '/template/favorites.html') {
    favouriteSetup()     
} else if(window.location.pathname === '/template/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/template/search.html') {
    console.log('search.html');
}



export function favouriteSetup(){
    const favouriteCardContainerRef = document.querySelector('#favouriteCardContainer');
    favouriteCardContainerRef.innerHTML = '';
    console.log('favouriteSetup');
    
    let favourites = getLocalStorage();
    
    if(favourites.length > 0) {
        for(let i= 0; i < favourites.length; i++) {
            createMovieCard(favourites[i].Poster, favourites[i].Title, favourites[i].imdbRating, favourites[i].imdbID);            
        }
    }        
}
    
    function setLocalStorage(){
        let storedData = getLocalStorage();
        
        let newData = 'tt0816692';
        
        storedData.push(newData);    

        localStorage.setItem('favourite', JSON.stringify(storedData));

        if(storedData.length > 1) {
            for(let data of storedData) {
                if(data.includes('tt0816692')) {
                    console.log('hej');
                }
            }
        }
        
    }


