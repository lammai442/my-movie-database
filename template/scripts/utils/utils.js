//Fisher-Yates shuffle algorithm (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
export function shuffleArray(array) {
    let i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }    

    return array;
}

// Funktion som sorterar efter imdbRating med högst längst upp och returnerar 20 topfilmer
export function MovieByHighestRating(database) {
    return database.sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 20);
}