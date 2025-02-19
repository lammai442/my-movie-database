import { submitSearch, searchSetup } from './data/data.js';
import { indexSetup, favouriteSetup } from './pageSetups/pageSetups.js';
import { saveFavouriteToLocalstorage, removeSearchLocalStorage, getLocalStorage
} from './data/localStorage.js'
import { createMovieCard, createAllMovieCards } from './components/movieCard.js';
import { fetchOmdbMovieBySearch } from './modules/api.js';

import { getAllMovieDetails } from './utils/utils.js'

if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexSetup();
    searchDropdown()
    submitSearch();
} else if(window.location.pathname === '/template/favorites.html') {
    favouriteSetup()     
    submitSearch();
} else if(window.location.pathname === '/template/movie.html') {


} else if(window.location.pathname === '/template/search.html') {
    searchSetup();
    submitSearch();
    searchDropdown()
}

function searchDropdown() {
    const searchInputRef = document.querySelector('#searchInput');
    

    searchInputRef.addEventListener('input', async (event) => {        
        event.preventDefault;
        console.log(event.target.value);
        if (event.target.value.trim().length > 1) {
                        
            let movie = await fetchOmdbMovieBySearch(event.target.value.trim())
            console.log(movie);
        }
            
            
            // movie saknar alla detaljer och skickas till att söka så att alla detaljer hamnar i en ny array
            // let fullMovieDetails = await getAllMovieDetails(movie.Search)
            
            // // Loopar för att skapa moviecards i söksidan.
            // createAllMovieCards(fullMovieDetails);
    })
}