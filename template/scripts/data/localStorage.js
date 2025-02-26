import { oData } from '../data/data.js';

// Funktion för att ta bort stjärnmärk film i localStorage
export function removeFavouriteFromLocalStorage(favouriteId) {
    let storeData = JSON.parse(localStorage.getItem('favourites'));

    // Här sparas en ny array där favoriteMovie tas bort från storeData om den finns med där.
    storeData = storeData.filter((data) => data.imdbID !== favouriteId);

    // Uppdatera localStorage med nya arrayen
    localStorage.setItem('favourites', JSON.stringify(storeData));
}

// Funktion för att spara stjärnmärk film i localStorage
export function saveFavouriteToLocalstorage(keyname, input) {
    // Här hämtas senaste arrayen från localStorage
    let storeData = JSON.parse(localStorage.getItem(`${keyname}`) || '[]');
    
    // Här läggs den nya favouriteMovie in i den localStoragearrayen
    storeData.push(input);    
    
    // Här skrivs oData.favourites arrayen så att det blir den nya arrayen med tillagda favouriteMovie
    oData.favourites = storeData;
    
    // Uppdatarer den nya localStorage
    localStorage.setItem(`${keyname}`, JSON.stringify(oData.favourites));
}

// Funktion för att hämta och returnera localStorage med keyname som input
export function getLocalStorage(keyname) {
    const storeData = localStorage.getItem(`${keyname}`) || '[]';

    return JSON.parse(storeData);
}

// Funktion för att ta bort sökning från localStorage
export function removeSearchLocalStorage() {    
    let storeData = [];

    localStorage.setItem('search', JSON.stringify(storeData));
}