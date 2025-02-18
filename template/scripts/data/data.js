import { MovieByHighestRating } from '../utils/utils.js';
import {
    removeFavouriteFromLocalStorage,
    saveFavouriteToLocalstorage,
} from '../data/localStorage.js';

// Här sparas datan i en variabel som är tillgänglig för andra moduler.
export const oData = {
    topMovieList: [],
    movie: [],
    movieFullDetail: [],
    MovieByHighestRating: [],
    favourites: [],
};
