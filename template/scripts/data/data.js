import { removeSearchLocalStorage, saveFavouriteToLocalstorage, getLocalStorage} from "./localStorage.js";
import { fetchOmdbMovieBySearch } from '../modules/api.js';
import { getAllMovieDetails } from '../utils/utils.js';
import { createAllMovieCards } from "../components/movieCard.js";

// Globala data
export const oData = {
    topMovieList: [],
    movieFullDetail: [],
    MovieByHighestRating: [],
    favourites: [],
};

export function submitSearch() {
    const searchFormRef = document.querySelector('#searchForm');

    searchFormRef.addEventListener('submit', (event) => {   
        // Tömmer localStorage med tidigare sökning
        removeSearchLocalStorage();
        event.preventDefault();  
        const searchInputRef = document.querySelector('#searchInput')
        // Sparar ner sökningen till oData med keyname search
        saveFavouriteToLocalstorage('search', searchInputRef.value);

        if (window.location.pathname !== '/template/search.html') {
            // När man har submittat sökningen så byts det till detta fönster
            window.location.href = `/template/search.html`;
            searchSetup();
        } 
        // Om den är på samma searchsidan så laddas inte sidan om.
        else if (window.location.pathname === '/template/search.html') {
            searchSetup();
        }
    })
}

// Sätter upp searchsidan
export async function searchSetup() {
    const searchContainerRef = document.querySelector('#searchContainer');
    searchContainerRef.innerHTML = '';

    // Hämtar hem sökordet från localStorage
    let search = getLocalStorage('search');
    
    // Hämtar hem en array som har sökordet genom API
    let movie = await fetchOmdbMovieBySearch(search);
    
    // Här kontrolleras ifall det har returnerat en movie.Error och då kommer följande felmeddelande fram
    if(movie.Error) {
        searchContainerRef.innerHTML = `
        <p class="search__movie-not-found">${search} finns inte i databasen</p>
        `;
    } 
    // Om movie returneras med en array med filmer så körs detta
    else {
        // hämtar hem alla detaljer från filmerna
        let fullMovieDetails = await getAllMovieDetails(movie);
        
        // Loopar för att skapa moviecards i söksidan.
        createAllMovieCards(fullMovieDetails);        
    }
}


