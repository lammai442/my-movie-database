import { oData } from '../data/data.js';

// Funktion för att hämta data från Jespers API med rekommenderade filmer
export async function fetchTopMovies() {
    try {      
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        
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

export async function fetchOmdbMovie(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=fa992dba&plot=full&i=${id}`)
    let movie = await response.json();
    oData.movie = movie;

    return movie;
}