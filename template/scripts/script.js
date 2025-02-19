import { oData } from './data/data.js';
import { indexSetup, favouriteSetup } from './pageSetups/pageSetups.js';
import { saveFavouriteToLocalstorage, removeSearchLocalStorage, getLocalStorage
} from './data/localStorage.js'
import { createMovieCard } from './components/movieCard.js';

import { getAllMovieDetails } from './utils/utils.js'

if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexSetup();
    search();
} else if(window.location.pathname === '/template/favorites.html') {
    favouriteSetup()     
    search();
} else if(window.location.pathname === '/template/movie.html') {


} else if(window.location.pathname === '/template/search.html') {
    presentSearch();
    search();
}

export function search() {
    const searchFormRef = document.querySelector('#searchForm')

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

async function presentSearch() {
    // Hämtar hem sökordet från localStorage
    let search = getLocalStorage('search');
    
    // Hämtar hem en array som har sökordet genom API
    let movie = await fetchOmdbMovieBySearch(search)
    
    // movie saknar alla detaljer och skickas till att söka så att alla detaljer hamnar i en ny array
    let fullMovieDetails = await getAllMovieDetails(movie.Search)
    
    // Loopar för att skapa moviecards i söksidan.
    for(let i= 0; i < fullMovieDetails.length; i++) {
        createMovieCard(fullMovieDetails[i].Poster, fullMovieDetails[i].Title, fullMovieDetails[i].imdbRating, fullMovieDetails[i].imdbID);            
        }
}

async function fetchOmdbMovieBySearch(search) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=fa992dba&s=*${search}`)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let movie = await response.json();
        return movie;

    } catch (error) {
        console.log(`Failed to fetch ${search}`), error;
        return null;
    }
}