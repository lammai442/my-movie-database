import { indexSetup, favouriteSetup } from './pageSetups/pageSetups.js';

if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexSetup();
} else if(window.location.pathname === '/template/favorites.html') {
    favouriteSetup()     
} else if(window.location.pathname === '/template/movie.html') {


} else if(window.location.pathname === '/template/search.html') {
}