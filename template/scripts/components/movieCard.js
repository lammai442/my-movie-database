import { fetchOmdbMovie } from "../modules/api.js";

export function createMovieCard(poster, title, ratings, dataID) {    
    const cardContainerRef = document.querySelector('#cardContainer');
    let article = document.createElement('article');
    article.innerHTML = `
    <article class="card__movie" data-id="${dataID}">
            <section class="card__top">
              <img class="card__poster" data-posterid="${dataID}"src="${poster}" alt="movie poster">
              <figure class="card__favourite-box">
                <img class="card__favourite-bookmark" src="./res/icons/bookmark-solid.svg" alt="bookmark background">
                <img class="card__favourite-star" src="./res/icons/star-regular.svg" alt="favourite star">
              </figure>
            </section>
            <section class="card__bottom">
                <section class="card__rating-container">
                    <img class="card__rating-star" src="./res/icons/star-solid.svg" alt="Rating icon">
                    <p class="card__rating">${ratings}</p>
                </section>
                <h3 class="card__title" data-titleid="${dataID}">${title}</h3>
            </section>
    </article>
    `;
    // Lägg in nya card_movie i cardContainer så att den syns i Top 20 highest listan
    cardContainerRef.appendChild(article);   
    
    // Skapar en referens till posterID
    const card__posterRef = document.querySelector(`[data-posterid="${dataID}"]`)
    
    // En lyssnare när man klickar på posterbilden som kör funktionen för att öppna en overlay för filmens detaljer 
    card__posterRef.addEventListener('click', (event) => {
      showMovie(event.target.dataset.posterid);
    })

     // Skapar en referens till posterID
    const card__titleRef = document.querySelector(`[data-titleid="${dataID}"]`)

    // En lyssnare när man klickar på posterbilden som kör funktionen för att öppna en overlay för filmens detaljer 
    card__titleRef.addEventListener('click', (event) => {
      showMovie(event.target.dataset.titleid);
    })
}

async function showMovie(id){ 
  const movie = await fetchOmdbMovie(id);
  // const bodyRef = document.body;
  let articleRef = document.createElement('article');
  articleRef.classList.add('movie__container')
  articleRef.innerHTML = `    
    <section class="movie">
      <h2 class="movie__title">${movie.Title}</h2>
      <section class="movie__info">
        <img class="movie__poster" src="${movie.Poster}" alt="">
        <section class="movie__top-info">
          <p class="movie__details">Rated: ${movie.Rated}</p>
          <p class="movie__details">Genre: ${movie.Genre}</p>
          <p class="movie__details">Runtime: ${movie.Runtime}</p>
          <p class="movie__details">Released: ${movie.Released}</p>
          <p class="movie__details">Ratings: ${movie.imdbRating}</p>
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
    </section>
  `  
  document.body.style.position = "relative";
  document.body.appendChild(articleRef);
}