import { oData } from './data/data.js';
import { fetchTopMovies, fetchOmdbMovie } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { shuffleArray, MovieByHighestRating } from './utils/utils.js';
import { getElement } from './utils/domUtils.js';

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
        let fullMovieDetails = await getAllMovieDetails(oData.topMovieList)     
        console.log(MovieByHighestRating(fullMovieDetails));

        
        // Funktion som returnerar full information när man lägger in en array med filmer
        async function getAllMovieDetails(database){
            let movieDatabase = [];
            for(let movie of database) {
                // 
                let fullMovieDetail = await fetchOmdbMovie(movie.imdbID);               
                movieDatabase.push(fullMovieDetail);
            }
            return movieDatabase;                    
        }
        // let movie = await fetchOmdbMovie(fiveRandomTrailerMovies[0].imdbID);
        // console.log(movie);
        
        

    }


    
    
    


} else if(window.location.pathname === '/template/favorites.html') {
  
} else if(window.location.pathname === '/template/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/template/search.html') {
    console.log('search.html');

}


