import {
	indexPageSetup,
	favouritePageSetup,
	searchPageSetup,
} from './pageSetups/pageSetups.js';

document.addEventListener('DOMContentLoaded', () => {
	const path = window.location.pathname;

	// Index-sidan
	if (
		path === '/' ||
		path === '/index.html' ||
		path === '/my-movie-database/' ||
		path === '/my-movie-database/index.html'
	) {
		console.log('index');
		indexPageSetup();
	}

	// Favorites-sidan
	else if (
		path === '/favorites.html' ||
		path === '/my-movie-database/favorites.html'
	) {
		console.log('favorites');
		favouritePageSetup();
	}

	// Search-sidan
	else if (
		path === '/search.html' ||
		path === '/my-movie-database/search.html'
	) {
		console.log('search');
		searchPageSetup();
	}
});
