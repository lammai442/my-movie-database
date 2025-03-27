import {
	indexPageSetup,
	favouritePageSetup,
	searchPageSetup,
} from './pageSetups/pageSetups.js';

// Index-sidan
if (
	window.location.pathname === '/' ||
	window.location.pathname === '/index.html' ||
	window.location.pathname === '/my-movie-database/'
) {
	console.log('index');

	indexPageSetup();
}

// Favorites-sidan
else if (window.location.pathname === '/favorites.html') {
	console.log('favorites');
	favouritePageSetup();
}

// Search-sidan
else if (window.location.pathname === '/search.html') {
	console.log('search');
	searchPageSetup();
}
