import {
	indexPageSetup,
	favouritePageSetup,
	searchPageSetup,
} from './pageSetups/pageSetups.js';

// Index-sidan
if (
	window.location.pathname === '/' ||
	window.location.pathname === '/index.html' ||
	window.location.pathname === '/my-movie-database/' ||
	window.location.pathname === '/my-movie-database/index.html'
) {
	console.log('index');

	indexPageSetup();
}

// Favorites-sidan
else if (
	window.location.pathname === '/favorites.html' ||
	window.location.pathname === '/my-movie-database/favorites.html'
) {
	console.log('favorites');
	favouritePageSetup();
}

// Search-sidan
else if (
	window.location.pathname === '/search.html' ||
	window.location.pathname === '/my-movie-database/search.html'
) {
	console.log('search');
	searchPageSetup();
}
