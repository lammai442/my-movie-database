export function createMovieCard(poster, title, ratings) {
    console.log('createMovieCard');
    
    const cardContainerRef = document.querySelector('#cardContainer');
    let article = document.createElement('article');
    article.innerHTML = `
    <article class="card__movie">
            <section class="card__top">
              <img class="card__poster" src="${poster}" alt="movie poster">
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
                <h3 class="card__title">${title}</h3>
            </section>
    </article>
    `;   
    cardContainerRef.appendChild(article);   
}