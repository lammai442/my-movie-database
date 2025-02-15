import { oData } from './data/data.js';
import { fetchTopMovies } from './modules/api.js';


if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    console.log('index.html');
    console.log('favorites.html');
    console.log('hej');
    console.log(oData.topMovieList);
    async function init() {
        await fetchTopMovies();
        console.log(oData);
    }
    init();

} else if(window.location.pathname === '/template/favorites.html') {
  
} else if(window.location.pathname === '/template/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/template/search.html') {
    console.log('search.html');

}


