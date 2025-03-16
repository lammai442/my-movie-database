import {
	indexPageSetup,
	favouritePageSetup,
	searchPageSetup,
} from './scripts/pageSetups/pageSetups.js';

// Index-sidan
if (
	window.location.pathname === '/' ||
	window.location.pathname === '/index.html' ||
	window.location.pathname === 'my-movie-database/'
) {
	indexPageSetup();
}

// Favorites-sidan
else if (window.location.pathname === '/favorites.html') {
	favouritePageSetup();
}

// Search-sidan
else if (window.location.pathname === '/search.html') {
	searchPageSetup();
}
