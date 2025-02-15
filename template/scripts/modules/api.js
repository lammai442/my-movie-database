import { oData } from '../data/data.js';

// Funktion för att hämta data från Jespers API med rekommenderade filmer
export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();   
    // Sparas i oData för att kunna användas i andra moduler
    oData.topMovieList = movies;
    
    return movies;
}