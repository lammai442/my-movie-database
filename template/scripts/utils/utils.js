import { oData } from '../data/data.js';
import { fetchOmdbMovie } from '../modules/api.js';

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

// Funktion som sorterar efter imdbRating med högst betyg längst upp
export function MovieByHighestRating(database) {
    return database.sort((a, b) => b.imdbRating - a.imdbRating);
}

// Funktion som returnerar full information när man lägger in en array med filmer
export async function getAllMovieDetails(database) {
    let movieDatabase = [];
    
    // Loopa igenom hela arrayen och ersätt den med full information    
    for (let movie of database) {
        // Hämtar hem den iterationens fulla detaljer från Omdb och lägger in den i nya arrayen
        let fullMovieDetail = await fetchOmdbMovie(movie.imdbID);
        // Lägger in nya objektet med fulla detaljer i nya filmdatabasen
        movieDatabase.push(fullMovieDetail);
    }
    // Uppdatarer oData.movieFullDetail med fullständig info på alla objekts filmdetaljer
    oData.movieFullDetail = movieDatabase;
    return movieDatabase;
}

// Kontroll ifall filmen finns i favourites
export function doesMovieExistInFavourites(id) {
    // Hämtar hem från localstorage med favourites
    let storeData = JSON.parse(localStorage.getItem('favourites') || '[]');

    // Om det finns något i storeData
    if (storeData.length > 0) {
        // Returna sant ifall moviecarden finns med i storeData
        if (storeData.some((favourite) => favourite.imdbID === id)) {
            return true;
        }
    }
}


