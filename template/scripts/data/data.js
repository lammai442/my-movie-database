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
        // Sparar ner sökningen till oData.search så att det är små bokstäver
        saveFavouriteToLocalstorage('search', searchInputRef.value.toLowerCase());        
        window.location.href = `/template/search.html`;
    })
}

// Sätter upp searchsidan
export async function searchSetup() {
    // Hämtar hem sökordet från localStorage
    let search = getLocalStorage('search');
    
    // Hämtar hem en array som har sökordet genom API
    let movie = await fetchOmdbMovieBySearch(search);    
        
    // movie saknar alla detaljer och skickas till att söka så att alla detaljer hamnar i en ny array
    let fullMovieDetails = await getAllMovieDetails(movie);
    

    // Loopar för att skapa moviecards i söksidan.
    createAllMovieCards(fullMovieDetails);
}


