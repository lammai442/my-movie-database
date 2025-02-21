import { submitSearch, searchSetup } from './data/data.js';
import { indexSetup, favouriteSetup } from './pageSetups/pageSetups.js';
import { saveFavouriteToLocalstorage, removeSearchLocalStorage, getLocalStorage
} from './data/localStorage.js';
import { createMovieCard, createAllMovieCards } from './components/movieCard.js';
import { fetchOmdbMovieBySearch } from './modules/api.js';

import { getAllMovieDetails } from './utils/utils.js';
import { showMovieModal } from './components/movieCard.js';
// Index-sidan
if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    indexSetup();
    searchDropdown()
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

function searchDropdown() {
    const searchInputRef = document.querySelector('#searchInput');
    const searchDropdownRef = document.querySelector('.search__dropdown');

    searchInputRef.addEventListener('input', async (event) => {        
        // event.preventDefault();
        const searchInput = event.target.value.trim();
        
        if (searchInput.length > 2) {
                        
            let movies = await fetchOmdbMovieBySearch(searchInput)

            if (movies && movies.length > 0) {
                let fiveMovies = movies.splice(0, 5);           
                createSearchMovies(fiveMovies);
            } else {   
                searchDropdownRef.innerHTML = `
                <p class="search__no-title">There are no movies with this title</p>`;
            }
        } 
        // Om det är kortare än 2 tecken, töm listan
        else {
            searchDropdownRef.innerHTML = ''; // Töm dropdownen om inget sökord
        }
    })

}

displaySearchDropdown ();

function displaySearchDropdown () {
    const searchDropdownRef = document.querySelector('.search__dropdown');
    const searchInputRef = document.querySelector('#searchInput');
    // Visa dropdownen igen när man klickar på inputfältet (om den innehåller något)
    searchInputRef.addEventListener('focus', () => {
        // Kontroll om searchDropdown har något li-element
        if (searchDropdownRef.children.length > 0) {                    
            searchDropdownRef.style.display = 'block';
        }
    });
}


function createSearchMovies(movies) {
    const searchDropdownRef = document.querySelector('.search__dropdown');
    searchDropdownRef.style.display = 'block';
    searchDropdownRef.innerHTML = '';    
    
    for(let i = 0; i < movies.length; i++) {        
        const searchListItem = document.createElement('li')
        searchListItem.classList.add('search__list-item');
        searchListItem.dataset.searchid =`${movies[i].imdbID}`        
        searchListItem.innerHTML = `
                <img class="search__poster" src="${movies[i].Poster}" alt="Poster image">
                <section class="search__movie-info">
                    <p class="search__title">${movies[i].Title}</p>
                    <p class="search__year">${movies[i].Year}</p>
                </section>`
        ;
        searchDropdownRef.appendChild(searchListItem);
        
        searchListItem.addEventListener('click', (event) => {
            
            showMovieModal(event.currentTarget.dataset.searchid);
        })
    }
}

document.addEventListener('click', (event) => {
    const searchDropdownRef = document.querySelector('.search__dropdown');
    const searchInputRef = document.querySelector('#searchInput');
    
    // Kontroll om det finns något barn inne i .s
    if (searchDropdownRef.children.length > 0) {
        // Kontrollera om klicket INTE är inuti searchDropdownRef
        if (!searchDropdownRef.contains(event.target) && event.target !== searchInputRef) {
            
            // Gömmer alla listitems från search när den klickas utanför
            searchDropdownRef.style.display = 'none';
        }
    }
});

