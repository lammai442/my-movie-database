import { oData } from '../data/data.js';
import { fetchOmdbMovie } from '../modules/api.js';
import { saveFavouriteToLocalstorage, removeFavouriteFromLocalStorage, } from '../data/localStorage.js';
import { favouritePageSetup } from '../pageSetups/pageSetups.js';

//Fisher-Yates shuffle algorithm
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

// Funktion för att sätta status på stjärnmarkering
export function favouriteStarSetup(dataId, action) {
    let cardFavouriteStarRef = [];

    if(action === 'movieCard') {
        cardFavouriteStarRef = document.querySelector(`[data-dataid='${dataId}']`);
    } else if(action === 'modalstarcard') {
        const modalRef = document.querySelector('.modal-content');
        
        cardFavouriteStarRef = modalRef.querySelector(`[data-dataid='${dataId}']`);
    }    
    
    // Om filmen finns i localStorage så ska den ändras till stjärnmärkt
    if (doesMovieExistInFavourites(cardFavouriteStarRef.dataset.dataid)) {     
        // Ändra om stjärnan så att den är ifylld
        cardFavouriteStarRef.src = './res/icons/star-solid.svg';      
    } else if (cardFavouriteStarRef) {        
        cardFavouriteStarRef.src = './res/icons/star-regular.svg'; // Sätt till tom stjärna      
    }
  
    // Lyssnare på favouritestjärnan som också har async
    cardFavouriteStarRef.addEventListener('click', async (event) => {        
        // Hämtar hem referensen för moviecardens img.src
        const imgSrcRef = event.currentTarget.src;
        
        let favouriteMovie = '';
        
        // Här läggs filmen in i oData.favourites
        if (imgSrcRef.includes('star-regular.svg')) {
            // Byt ut favoritstjärnan till solid
            event.currentTarget.src = './res/icons/star-solid.svg';
            
            // Hämtar hem objektet för filmen och sparar i en variabel
            favouriteMovie = await fetchOmdbMovie(event.currentTarget.dataset.dataid);
            
            // Skicka med variabeln till localStorage
            saveFavouriteToLocalstorage('favourites',favouriteMovie);
  
            if(window.location.pathname === '/favorites.html') {
              favouritePageSetup(); 
            }
        }
        // Här tas den bort från oData.favourites
        else if (imgSrcRef.includes('star-solid.svg')) {
            // Byt ut favoritstjärnan till regular
            event.currentTarget.src = './res/icons/star-regular.svg';
  
            // Här tas den bort från oData.favourites
            oData.favourites = oData.favourites.filter(
                (favourite) => favourite.imdbID !== favouriteMovie.imdbID
            );
            // Här tas den bort från localStorage
            removeFavouriteFromLocalStorage(event.currentTarget.dataset.dataid);
  
            if(window.location.pathname === '/favorites.html') {
              favouritePageSetup();
            }
        }
    });
  }


  

