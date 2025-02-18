import { oData } from '../data/data.js';

// Funktion för att ta bort stjärnmärk film i localStorage
export function removeFavouriteFromLocalStorage(favoriteMovie) {
    let storeData = JSON.parse(localStorage.getItem('favourites'));

    // Här sparas en ny array där favoriteMovie tas bort från storeData om den finns med där.
    storeData = storeData.filter((data) => data.imdbID !== favoriteMovie.imdbID);

    // Uppdatera localStorage med nya arrayen
    localStorage.setItem('favourites', JSON.stringify(storeData));
}

// HÄR FUNGERAR INTE KODEN DÅ DEN GÖR DUBBLETTER
// Funktion för att spara stjärnmärk film i localStorage
export function saveFavouriteToLocalstorage(favouriteMovie) {
    let storeData = JSON.parse(localStorage.getItem('favourites') || '[]');
    storeData.push(favouriteMovie);
    console.log(storeData);

    // Lägger in den nya filmen i oData.favouritesarrayen
    oData.favourites.push(...storeData);
    // Uppdatarer den nya localStorage
    localStorage.setItem('favourites', JSON.stringify(oData.favourites));
}
