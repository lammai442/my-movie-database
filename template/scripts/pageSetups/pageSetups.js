import { oData } from '../data/data.js';
import { fetchTopMovies } from '../modules/api.js';
import { renderTrailers } from '../modules/caroussel.js';
import { shuffleArray, MovieByHighestRating, getAllMovieDetails } from '../utils/utils.js';
import { createMovieCard } from '../components/movieCard.js';
import { getLocalStorage} from '../data/localStorage.js'

// Funktion för att sätta upp startsidan
export async function indexSetup() {
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

    for(let i= 0; i < oData.MovieByHighestRating.length; i++) {
    createMovieCard(oData.MovieByHighestRating[i].Poster, oData.MovieByHighestRating[i].Title, oData.MovieByHighestRating[i].imdbRating, oData.MovieByHighestRating[i].imdbID);            
    }
}

export function favouriteSetup() {
    const favouriteCardContainerRef = document.querySelector('#favouriteCardContainer');
    favouriteCardContainerRef.innerHTML = '';
    
    let favourites = getLocalStorage('favourites');
    
    if(favourites.length > 0) {
        for(let i= 0; i < favourites.length; i++) {
            createMovieCard(favourites[i].Poster, favourites[i].Title, favourites[i].imdbRating, favourites[i].imdbID);            
        }
    }
    // Om ingen film är sjärnmarkerad så syns denna 
    else {
        favouriteCardContainerRef.innerHTML = `<p>Här var det tomt</p>`;
    }        
}