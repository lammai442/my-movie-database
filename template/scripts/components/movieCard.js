export function createMovieCard(poster, title, ratings) {
    console.log('createMovieCard');
    
    const cardContainerRef = document.querySelector('#cardContainer');
    let article = document.createElement('article');
    article.innerHTML = `
    <article class="card__movie">
            <section class="card__top">
              <img class="card__poster" src="${poster}" alt="movie poster">
              <figure class="card__favourite-box">
                <img class="card__favourite-icon" src="" alt="favourite icon">
              </figure>
            </section>
            <section class="card__bottom">
                <section class="card__rating-container">
                    <img class="card__rating-star" src="" alt="Rating icon">
                    <p class="card__rating">${ratings}</p>
                </section>
                <h3 class="card__title">${title}</h3>
            </section>
    </article>
    `;   
    cardContainerRef.appendChild(article);   
}