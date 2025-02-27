import { oData } from '../data/data.js';
import { fetchTopMovies, fetchOmdbMovieBySearch } from '../modules/api.js';
import { renderTrailers } from '../modules/caroussel.js';
import { shuffleArray, MovieByHighestRating, getAllMovieDetails } from '../utils/utils.js';
import { createAllMovieCards } from '../components/movieCard.js';
import { getLocalStorage} from '../data/localStorage.js';
import { checksearchDropdownListener } from '../utils/eventListener.js';
import { searchDropdown, submitSearch } from '../utils/search.js';

// Funktion för att sätta upp startsidan
export async function indexPageSetup() {
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
    
    // Funktion för skapa alla movieCards
    createAllMovieCards(oData.MovieByHighestRating);
    
    // Aktivering av sökfunktioner
    searchDropdown();
    submitSearch();
    checksearchDropdownListener();
}

// Funktion för att sätta upp favoritsidan
export function favouritePageSetup() {
    const favouriteCardContainerRef = document.querySelector('#favouriteCardContainer');
    // Tömmer innehållet från tidigare
    favouriteCardContainerRef.innerHTML = '';
    
    // Hämtar hem från LocalStorage med keyname 'favourites'
    let favourites = getLocalStorage('favourites');
    // Om det finns någon film i 'favourites' skapas korten
    if(favourites.length > 0) {
        createAllMovieCards(favourites);
    }
    // Om ingen film är sjärnmarkerad så syns denna 
    else {
        favouriteCardContainerRef.innerHTML = `<p class="empty-msg">You haven't chosen any favourite movie yet!</p>`;
    }
    // Aktivering av sökfunktioner
    searchDropdown();
    submitSearch();
    checksearchDropdownListener();
}

// Funktion för att sätt upp searchsidan
export async function searchPageSetup() {
    const searchContainerRef = document.querySelector('#searchContainer');
    searchContainerRef.innerHTML = '';

    // Hämtar hem sökordet från localStorage
    let search = getLocalStorage('search');
    
    // Hämtar hem en array som har sökordet genom API
    let movie = await fetchOmdbMovieBySearch(search);
    
    // Här kontrolleras ifall det har returnerat en movie.Error och då kommer följande felmeddelande fram
    if(movie.Error) {
        searchContainerRef.innerHTML = `
        <p class="empty-msg">The movie doesn't exist in the database.</p>
        `;
    } 
    // Om movie returneras med en array med filmer så körs detta
    else {
        // Hämtar hem alla detaljer från filmerna
        let fullMovieDetails = await getAllMovieDetails(movie);
        
        // Loopar för att skapa moviecards i söksidan.
        createAllMovieCards(fullMovieDetails);        
    }

    // Aktivering av sökfunktioner
    searchDropdown();
    submitSearch();
    checksearchDropdownListener();
}