import { submitSearch, searchSetup } from './data/data.js';
import { indexSetup, favouriteSetup } from './pageSetups/pageSetups.js';
import { saveFavouriteToLocalstorage, removeSearchLocalStorage, getLocalStorage
} from './data/localStorage.js';
import { createMovieCard, createAllMovieCards } from './components/movieCard.js';
import { fetchOmdbMovieBySearch } from './modules/api.js';

import { getAllMovieDetails } from './utils/utils.js';
import { showMovieModal } from './components/movieCard.js';

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
        event.preventDefault();
        const searchInput = event.target.value.trim();
        
        if (searchInput.length > 2) {
                        
            let movies = await fetchOmdbMovieBySearch(searchInput)

            if (movies && movies.length > 0) {
                let fiveMovies = movies.splice(0, 5);           
                createSearchMovies(fiveMovies);
            } else {
                console.log('else');
                const headerSearchListRef = document.querySelector('.search__dropdown');        
                headerSearchListRef.innerHTML = `
                <p class="search__no-title">There are no movies with this title</p>`;
            }
        } else {
            // Om det är kortare än 2 tecken, töm listan
            const headerSearchListRef = document.querySelector('.search__dropdown');
            headerSearchListRef.innerHTML = ''; // Töm dropdownen om inget sökord
        }
    })

const headerSearchListRef = document.querySelector('.search__dropdown');

// Visa dropdownen igen när man klickar på inputfältet (om den innehåller något)
searchInputRef.addEventListener('focus', () => {
    if (headerSearchListRef.children.length > 0) {
        console.log('focus');
                
        headerSearchListRef.style.display = 'block';
    }
});
}

function createSearchMovies(movies) {
    const headerSearchListRef = document.querySelector('.search__dropdown');
    headerSearchListRef.style.display = 'block';
    headerSearchListRef.innerHTML = '';    
    
    for(let i = 0; i < movies.length; i++) {        
        const searchListItem = document.createElement('li')
        searchListItem.classList.add('search__list-item');
        searchListItem.dataset.searchid =`${movies[i].imdbID}`        
        searchListItem.innerHTML = `
                <img class="search__poster" src="${movies[i].Poster}" alt="Poster image">
                <section class="search__movie-info">
                    <p class="search__title">${movies[i].Title}</p>
                    <p class="search__year">${movies[i].Year}</p>
                </section>
        `
        ;
        headerSearchListRef.appendChild(searchListItem);
        
        searchListItem.addEventListener('click', (event) => {
            console.log(event.currentTarget.dataset.searchid);
            
            showMovieModal(event.currentTarget.dataset.searchid);
        })
    }
}

document.addEventListener('click', (event) => {
    event.preventDefault();
    const headerSearchListRef = document.querySelector('.search__dropdown');
    const searchInputRef = document.querySelector('#searchInput')
    
    // Kontrollera om klicket INTE är inuti headerSearchListRef
    if (headerSearchListRef && !headerSearchListRef.contains(event.target) && event.target !== searchInputRef) {
        console.log('d-none');
        
        headerSearchListRef.style.display = 'none';
    }
});

