import { updateFavouriteOnMovieCard } from '../components/movieCard.js';
import { favouritePageSetup } from '../pageSetups/pageSetups.js';

// Listener för att ta bort Modalen genom 'Close'-btn
export function closeMovieModalBtnListener(dataID) {

  const movieCloseBtnRef = document.querySelector('#movieCloseBtn');

  movieCloseBtnRef.addEventListener('click', () => {
      const overlayRef = document.querySelector('.modal-overlay');
      // Borttagning av overlayen bakom movieModal
      overlayRef.remove();

      if(window.location.pathname === '/index.html') {
      // Uppdaterar favouritstjärnan på movieCard
      updateFavouriteOnMovieCard(dataID);
      }

      if(window.location.pathname === '/favorites.html') {
        favouritePageSetup(); 
      }

      if(window.location.pathname === '/search.html') {
        // Uppdaterar favouritstjärnan      
        updateFavouriteOnMovieCard(dataID);
      }
  });
}

// Listener för att stänga ner Modalen vid click utanför modalContent
export function closeModalListener() {
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal-content');

  // Stäng modalen om man klickar utanför modalinnehållet
  overlay.addEventListener('click', async function (event) {
      if (event.target === overlay) {
        overlay.remove();
        // Hämtning av favouritstjärnan
        const cardFavouriteStarRef = modal.querySelector('.card__favourite-star');
        
        if(window.location.pathname === '/index.html') {
          // Uppdaterar favouritstjärnan      
          updateFavouriteOnMovieCard(cardFavouriteStarRef.dataset.dataid);
        }

        if(window.location.pathname === '/favorites.html') {
          favouritePageSetup(); 
        }

        if(window.location.pathname === '/search.html') {
          // Uppdaterar favouritstjärnan      
          updateFavouriteOnMovieCard(cardFavouriteStarRef.dataset.dataid);
        }
      }
  });
}

// Lyssnare för att gömma searchDropdown vid klick utanför
export function checksearchDropdownListener() {
    document.addEventListener('click', (event) => {
        const searchDropdownRef = document.querySelector('.search__dropdown');
        const searchInputRef = document.querySelector('#searchInput');
        
        // Kontroll om det finns något barn inne i .search__dropdown
        if (searchDropdownRef.children.length > 0) {
            // Kontrollera om klicket INTE är inuti searchDropdownRef
            if (!searchDropdownRef.contains(event.target) && event.target !== searchInputRef) {
                // Gömmer alla listitems från search när den klickas utanför
                searchDropdownRef.style.display = 'none';
            }
        }
    });
}

// Lyssnare för att ta bort trailerIframe
export function closeTrailerListener() {
  const overlay = document.querySelector('.modal-overlay');

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.remove();
    }
  });
}

// Lyssnare för att skapa trailerIframe
export function trailerIframeListener(trailerLink, dataID) {
    const trailerBtnRef = document.querySelector(`[data-trailerid="${dataID}`);
    
    // eventlyssnare
    trailerBtnRef.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.classList.add('modal-overlay');

      overlay.innerHTML = `
          <iframe src="${trailerLink}" class="iframe" width="800" height="500"></iframe>
      `
      // Lägg till overlay i dokumentets body
      document.body.appendChild(overlay);

      // Lägg till eventlyssnare för att stänga overlay när man klickar utanför modalContent
      closeTrailerListener();
    })
}
