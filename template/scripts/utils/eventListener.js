import { updateFavouriteOnMovieCard } from '../components/movieCard.js';
import { favouriteSetup } from '../pageSetups/pageSetups.js';

// Listener för att ta bort Modalen genom 'Close'-btn
export function closeMovieModalBtnListener(dataID) {

  const movieCloseBtnRef = document.querySelector('#movieCloseBtn');

  movieCloseBtnRef.addEventListener('click', () => {
      const overlayRef = document.querySelector('.modal-overlay');
      // Borttagning av overlayen bakom movieModal
      overlayRef.remove();

      if(window.location.pathname === '/template/index.html') {
        // Uppdaterar favouritstjärnan på movieCard
      updateFavouriteOnMovieCard(dataID);
      // Om det är favouritesidan körs favouriteSetup
      }

      if(window.location.pathname === '/template/favorites.html') {
        favouriteSetup(); 
      }

      if(window.location.pathname === '/template/search.html') {
        // Uppdaterar favouritstjärnan      
        updateFavouriteOnMovieCard(dataID);
      }
  });
}

// Listener för att stänga ner Modalen
export function closeModalListener() {
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal-content');

  // Stäng modalen om man klickar utanför modalinnehållet
  overlay.addEventListener('click', async function (event) {
      if (event.target === overlay) {
        overlay.remove();
        // Hämtning av favouritstjärnan
        const cardFavouriteStarRef = modal.querySelector('.card__favourite-star');
        
        if(window.location.pathname === '/template/index.html') {
          // Uppdaterar favouritstjärnan      
          updateFavouriteOnMovieCard(cardFavouriteStarRef.dataset.dataid);
        }

        if(window.location.pathname === '/template/favorites.html') {
          favouriteSetup(); 
        }

        if(window.location.pathname === '/template/search.html') {
          // Uppdaterar favouritstjärnan      
          updateFavouriteOnMovieCard(cardFavouriteStarRef.dataset.dataid);
        }
      }
  });
}

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