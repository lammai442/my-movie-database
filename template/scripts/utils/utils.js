import { oData } from "../data/data.js";
import { fetchOmdbMovie } from "../modules/api.js";

//Fisher-Yates shuffle algorithm (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
export function shuffleArray(array) {
    let i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }    
    return array;
}

// Funktion som sorterar efter imdbRating med högst längst upp och returnerar 20 topfilmer
export function MovieByHighestRating(database) {
    return database.sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 20);
}

// Funktion som returnerar full information när man lägger in en array med filmer
export async function getAllMovieDetails(database){
    let movieDatabase = [];
    // Loopa igenom hela arrayen och ersätt den med full information
    for(let movie of database) {
        // Hämtar hem den iterationens fulla detaljer från Omdb och lägger in den i nya arrayen
        let fullMovieDetail = await fetchOmdbMovie(movie.imdbID); 
        // Lägger in nya objektet med fulla detaljer i nya filmdatabasen   
        movieDatabase.push(fullMovieDetail);
    }
    oData.movieFullDetail = movieDatabase;    
    return movieDatabase;                    
}