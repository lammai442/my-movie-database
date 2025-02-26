import { indexPageSetup, favouritePageSetup, searchPageSetup } from './pageSetups/pageSetups.js';

// Index-sidan
if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexPageSetup();
} 

// Favorites-sidan
else if(window.location.pathname === '/template/favorites.html') {
    favouritePageSetup()     
}

// Search-sidan
else if(window.location.pathname === '/template/search.html') {
    searchPageSetup();
}



