import { oData } from '../data/data.js';

// Funktion för att hämta data från Jespers API med rekommenderade filmer
export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();   
    // Sparas i oData för att kunna användas i andra moduler
    oData.topMovieList = movies;
    
    return movies;
}

export async function fetchOmdbMovie(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=fa992dba&plot=full&i=${id}`)
    let movie = await response.json();
    oData.movie = movie;

    return movie;
}