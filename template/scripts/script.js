import { indexSetup, favouriteSetup, searchSetup } from './pageSetups/pageSetups.js';
import { searchDropdown, submitSearch } from './utils/search.js';

// Index-sidan
if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexSetup();
    searchDropdown();
    submitSearch();
} 
// Favorites-sidan
else if(window.location.pathname === '/template/favorites.html') {
    favouriteSetup()     
    searchDropdown()
    submitSearch();
} else if(window.location.pathname === '/template/movie.html') {

// Search-sidan
} else if(window.location.pathname === '/template/search.html') {
    searchSetup();
    searchDropdown()
    submitSearch();
}



