import { showMovieModal } from '../components/movieCard.js';
import { fetchOmdbMovieBySearch } from '../modules/api.js';
import { removeSearchLocalStorage, saveFavouriteToLocalstorage } from '../data/localStorage.js'
import { searchPageSetup } from '../pageSetups/pageSetups.js';

// Funktion för att aktivera dropdown på sökfältet
export function searchDropdown() {
    // Visar dropdownmeny igen om den tidigare funnits
    displaySearchDropdown();

    const searchInputRef = document.querySelector('#searchInput');
    const searchDropdownRef = document.querySelector('.search__dropdown');

    searchInputRef.addEventListener('input', async (event) => {        
        // Sparar sökinputet och överflödig mellanslag i början/slutet tas bort
        const searchInput = event.target.value.trim();
        
        // En begränsning så att den aktiveras efter minst tre tecken
        if (searchInput.length > 2) {
                        
            let movies = await fetchOmdbMovieBySearch(searchInput);

            if (movies && movies.length > 0) {
                let fiveMovies = movies.splice(0, 5);           
                createSearchDropdownMovies(fiveMovies);
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

// Funktion för att visa dropdownen igen när man klickar på inputfältet (om den innehåller något)
export function displaySearchDropdown () {
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

// Funktion för att skapa filmerna i dropdownmenyn
function createSearchDropdownMovies(movies) {
    const searchDropdownRef = document.querySelector('.search__dropdown');
    // För att få den att synas om man har klickat utanför dropdownen
    searchDropdownRef.style.display = 'block';
    searchDropdownRef.innerHTML = '';    
    // Loopen för att skapa 5 filmer
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
        
        // Lyssnare för att visa Moviemodal när man klickar på filmen från dropdownmenyn
        searchListItem.addEventListener('click', (event) => {    
            showMovieModal(event.currentTarget.dataset.searchid);
        })
    }
}

// Funktion när man har gjort en sökning
export function submitSearch() {
    const searchFormRef = document.querySelector('#searchForm');

    searchFormRef.addEventListener('submit', (event) => {   
        // Tömmer localStorage med tidigare sökning
        removeSearchLocalStorage();
        event.preventDefault();  
        const searchInputRef = document.querySelector('#searchInput')
        // Sparar ner sökningen till oData med keyname search
        saveFavouriteToLocalstorage('search', searchInputRef.value);

        if (window.location.pathname !== '/search.html') {
            // När man har submittat sökningen så byts det till detta fönster
            window.location.href = `/search.html`;
            searchPageSetup();
        } 
        // Om den är på samma searchsidan så laddas inte sidan om.
        else if (window.location.pathname === '/search.html') {
            searchPageSetup();
        }
    })
}