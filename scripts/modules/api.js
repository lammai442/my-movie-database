import { oData } from '../data/data.js';

// Funktion för att hämta data från Jespers API med rekommenderade filmer
export async function fetchTopMovies() {
	try {
		const response = await fetch(
			'https://santosnr6.github.io/Data/favoritemovies.json'
		);

		// Om response returnerar false
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		let movies = await response.json();
		// Sparas i oData för att kunna användas i andra moduler
		oData.topMovieList = movies;

		return movies;
	} catch (error) {
		console.log('Failed to fetch top movies:', error);
		return null;
	}
}

// Funktion för att hämta filmer genom imdbId
export async function fetchOmdbMovie(id) {
	try {
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=fa992dba&plot=full&i=${id}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status} `);
		}
		let movie = await response.json();
		oData.movie = movie;
		return movie;
	} catch (error) {
		console.log(`Failed to fetch movie`), error;
		return null;
	}
}

// Funktion för att hämta filmer genom sökord
export async function fetchOmdbMovieBySearch(search) {
	try {
		const responsePageOne = await fetch(
			`https://www.omdbapi.com/?apikey=fa992dba&s=${search}&page=1`
		);

		// Om response returnerar false
		if (!responsePageOne.ok) {
			throw new Error(`HTTP error! Status: ${responsePageOne.status}`);
		}
		// Hämtar hem första sidan
		let moviesPageOne = await responsePageOne.json();

		let moviesPageTwo = null;

		// Om det finns fler än 10 filmer i arrayen
		if (parseInt(moviesPageOne.totalResults) > 10) {
			const responsePageTwo = await fetch(
				`https://www.omdbapi.com/?apikey=fa992dba&s=${search}&page=2`
			);

			// Om response returnerar false
			if (!responsePageTwo.ok) {
				throw new Error(
					`HTTP error! Status: ${responsePageTwo.status}`
				);
			}
			// Sparar ner sida två i arrayen
			moviesPageTwo = await responsePageTwo.json();
		}

		// Om moviePageTwo innehåller filmer
		if (moviesPageTwo !== null) {
			const combinedMovies = [
				...moviesPageOne.Search,
				...moviesPageTwo.Search,
			];
			return combinedMovies;
		} else {
			return moviesPageOne;
		}
	} catch (error) {
		console.log(`Failed to fetch ${search}`), error;
		return null;
	}
}
