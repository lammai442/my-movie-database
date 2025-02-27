import { fetchOmdbMovie } from '../modules/api.js';
import { oData } from '../data/data.js';
import { doesMovieExistInFavourites, favouriteStarSetup } from '../utils/utils.js';
import {
    removeFavouriteFromLocalStorage
} from '../data/localStorage.js';
import { closeMovieModalBtnListener, closeModalListener, trailerIframeListener } from '../utils/eventListener.js';

// Funktion för att skapa ett enskilt MovieCard
export async function createMovieCard(poster, title, ratings, dataID) {
    // Hämtar hem referens till vart movieCard ska läggas in
    const cardContainerRef = document.querySelector('.card-container');

    // Om poster har värdet av 'N/A' så ska det ersättas med en annan bild
    if(poster === 'N/A') {
      poster = './res/icons/missing-poster.svg';
    }

    if(ratings === 'N/A') {
      ratings = '-';
    }

    // Skapande av korten
    let article = document.createElement('article');
    article.classList.add('card__movie');
    article.dataset.id = `${dataID}`;
    article.innerHTML = `
            <section class="card__top">
              <img class="card__poster" data-posterid="${dataID}"src="${poster}" alt="movie poster for ${title}">
              <figure class="card__favourite-box">
                <img class="card__favourite-bookmark" src="./res/icons/bookmark-solid.svg" alt="bookmark background">
                <img class="card__favourite-star" src="./res/icons/star-regular.svg" data-dataid="${dataID}" alt="favourite star">
              </figure>
            </section>
            <section class="card__bottom">
                <section class="card__rating-container">
                    <img class="card__rating-star" src="./res/icons/star-solid.svg" alt="Rating icon">
                    <p class="card__rating">${ratings}</p>
                </section>
                <h3 class="card__title" data-titleid="${dataID}">${title}</h3>
            </section>
    `;

    // Lägg in nya card_movie i cardContainer
    cardContainerRef.appendChild(article);

    const movie = oData.topMovieList.find(movie => movie.imdbID === dataID);
    let trailerLink = '';
    if (movie && movie.Trailer_link) {
      trailerLink = movie.Trailer_link;
    }

    // Om det finns en trailerlink körs denna
    if(trailerLink !== '') {
      trailerSetup(trailerLink, dataID)
    }

    // Sätter upp statusen för favouriteStar
    favouriteStarSetup(dataID, 'movieCard');

    // Funktion för att öppna movieModal när man klickar på poster/title
    referensToMovieModal(dataID);

}

// Funktion för att lägga till trailerLänk
function trailerSetup (trailerLink, dataID) {
    const posterIdRef = document.querySelector(`[data-posterid='${dataID}']`)
    const trailerBtn = document.createElement('button');
    trailerBtn.textContent = 'Trailer';
    trailerBtn.classList.add('card__trailer-btn');
    trailerBtn.setAttribute('data-trailerid', dataID)

    posterIdRef.after(trailerBtn);
    
    // Skapa trailerIframe 
    trailerIframeListener(trailerLink, dataID);
}



// Funktion för att visa Modal
export async function showMovieModal(id) {
    const movie = await fetchOmdbMovie(id);
    // Skapa overlay-elementet
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    // Skapa modalinnehållet
    const modal = document.createElement('div');
    modal.classList.add('modal-content');

    // Om poster har värdet av 'N/A' så ska det ersättas med en annan bild
    if(movie.Poster === 'N/A') {
      movie.Poster = './res/icons/missing-poster.svg';
    }
    
    // Lägg in filmens innehåll i modalen
    modal.innerHTML = 
    `<article class="movie">
      <h2 class="movie__title">${movie.Title}</h2>
      <figure class="card__favourite-box card__favourite-box--smaller">
        <img class="card__favourite-bookmark" src="./res/icons/bookmark-solid.svg" alt="bookmark background">
        <img class="card__favourite-star" src="./res/icons/star-regular.svg" data-dataid="${movie.imdbID}" alt="favourite star">
      </figure>
      <section class="movie__info">
        <section class="movie__poster">
          <img class="movie__poster-img" src="${movie.Poster}" alt="Movie poster of ${movie.Title}">
        </section>
        <section class="movie__top-info">
            <p class="movie__summary"><strong>Rated</strong>: ${movie.Rated}</p>
            <p class="movie__summary"><strong>Genre</strong>: ${movie.Genre}</p>
            <p class="movie__summary"><strong>Runtime</strong>: ${movie.Runtime}</p>
            <p class="movie__summary"><strong>Released</strong>: ${movie.Released}</p>
            <p class="movie__summary"><strong>Ratings</strong>: ${movie.imdbRating}</p>
        </section>
        <section class="movie__plot">
            <h3 class="movie__subtitle">Plot</h3>
            <p>${movie.Plot}</p>
        </section>
        <section class="movie__bottom-info">
            <section>
              <h3 class="movie__subtitle">Director:</h3>
              <p class="movie__team">${movie.Director}</p>
            </section>
            <section>
              <h3 class="movie__subtitle">Writer:</h3>
              <p class="movie__team">${movie.Writer}</p>
            </section>
            <section>
              <h3 class="movie__subtitle">Actors:</h3>
              <p class="movie__team">${movie.Actors}</p>
            </section>
        </section>
      </section>
      <button id="movieCloseBtn" class="movie__close-btn">Close</button>
    </article>`;
  
  // Lägg modalinnehållet inuti overlay
  overlay.appendChild(modal);
  
  // Lägg till overlay i dokumentets body
  document.body.appendChild(overlay);
  
  // Sätter upp statusen för favoritstjärnan
  favouriteStarSetup(movie.imdbID, 'modalstarcard');
  
  closeModalListener();

  // Eventlistener när man trycker på 'Close'-btn i movieModal
  closeMovieModalBtnListener(movie.imdbID)
}

// Funktion för att skapa alla MovieCards
export function createAllMovieCards(movies) {
  for(let i= 0; i < movies.length; i++) {
      createMovieCard(movies[i].Poster, movies[i].Title, movies[i].imdbRating, movies[i].imdbID);            
      }
}

// Funktion för att uppdatera favouritestjärnan på movieCard efter modalen stängt ner
export function updateFavouriteOnMovieCard(dataId){
    const article = document.querySelector(`[data-id='${dataId}']`);
    
    if(article) {
      const movieCard = article.querySelector(`[data-dataid="${dataId}"]`);

      // Om filmen finns i localStorage så ska den ändras till stjärnmärkt
      if (doesMovieExistInFavourites(dataId)) {
        movieCard.src = './res/icons/star-solid.svg'; // Sätt till fylld stjärna
      } 
      // Om filmen INTE finns i localStorage så ska den ändras till stjärnmärkt
      else if (!(doesMovieExistInFavourites(dataId))) {
        movieCard.src = './res/icons/star-regular.svg'; // Sätt till tom stjärna  
        
        // Här tas den bort från localStorage
        removeFavouriteFromLocalStorage(dataId);
        
        // Här tas den bort från oData.favourites
        oData.favourites = oData.favourites.filter((favourite) => favourite.imdbID !== dataId);
        }
    }     
}

// Funktion för att öppna movieModal när man klickar på poster/title
function referensToMovieModal(dataID) {
  // Hämtning av alla poster/title referenser på movieCard
  let posterTitleRef = document.querySelectorAll(`[data-posterid='${dataID}'], [data-titleid='${dataID}']`);
  
  // En forEachloop på en nodeList för att öppna movieModal
  posterTitleRef.forEach(element => {
    element.addEventListener('click', () => {
      showMovieModal(dataID);
    })
  })
}