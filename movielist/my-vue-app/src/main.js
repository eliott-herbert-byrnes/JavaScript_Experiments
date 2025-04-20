import './style.css'

const movieSearch = document.getElementById('mySearch')
const searchButton = document.getElementById('searchBtn')
const contentContainer = document.getElementById('contentContainer')
const hideHomeContent = document.getElementById('startExploring')
const revealSearchError = document.getElementById('movieSearchError')
const addWatchList = document.getElementById('watchlistAdd')
let searchFormat = ''

// Saving to local storage
let watchList = []

// Search Buton functionality
searchButton.addEventListener('click', () => {
  if (movieSearch.value) {
    searchFormat = movieSearch.value.replace(/ /g, '+')
    searchFormat = searchFormat.toLowerCase()
    hideHomeContent.classList.add('hidden')
    getMovie()
  }
})


// Renders movie list to DOM
async function getMovie() {
  contentContainer.innerHTML = '';

  const searchRes = await fetch(`https://www.omdbapi.com/?apikey=9f32cbeb&s=${searchFormat}`);
  const searchData = await searchRes.json();

  if (searchData.Response === 'True') {
    if (revealSearchError) {
      revealSearchError.classList.add('hidden');
    }

    const detailedMovies = await Promise.all(
      searchData.Search.map(async (movie) => {
        const res = await fetch(`https://www.omdbapi.com/?apikey=9f32cbeb&i=${movie.imdbID}`);
        return await res.json();
      })
    );

    detailedMovies.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movieCard');
      movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movieInfo">
          <div class="movieTitle">
            <h3>${movie.Title}</h3>
            <img src="/img/star.svg" alt="star">
            <p>${movie.imdbRating}</p>
          </div>

          <div class="movieDetails">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <div class="watchlistAdd" data-imdbid="${movie.imdbID}">
              <img src="/img/plus.svg" alt="plus">
              <p class="watchListText">Watchlist</p>
            </div>
          </div>

          <div class="moviePlot">
            <p>${movie.Plot}</p>
          </div>
        </div>
      `;

      contentContainer.appendChild(movieCard);

      const watchlistBtn = movieCard.querySelector('.watchlistAdd');
      const watchlistText = watchlistBtn.querySelector('.watchListText');
      
      // Load current watchlist and check
      watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
      const alreadyAdded = watchList.some(m => m.imdbID === movie.imdbID);
      
      // Reusable disable function
      function disableWatchlistBtn() {
        watchlistText.innerHTML = 'Added to watchlist';
        watchlistText.classList.add('disabled');
        watchlistText.style.pointerEvents = 'none';
        watchlistText.style.opacity = '0.5';
        watchlistText.style.cursor = 'not-allowed';
        watchlistText.style.transition = 'opacity 0.5s ease-in-out';
      }
      
      if (alreadyAdded) {
        disableWatchlistBtn();
      } else {
        watchlistBtn.addEventListener('click', () => {
          // Double-check in case user spam-clicks
          watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
          const stillNotAdded = !watchList.some(m => m.imdbID === movie.imdbID);
      
          if (stillNotAdded) {
            const movieData = {
              imdbID: movie.imdbID,
              Poster: movie.Poster,
              Title: movie.Title,
              imdbRating: movie.imdbRating,
              Runtime: movie.Runtime,
              Genre: movie.Genre,
              Plot: movie.Plot
            };
      
            watchList.push(movieData);
            localStorage.setItem('watchlist', JSON.stringify(watchList));
            console.log('Added to watchlist:', movieData);
          }
      
          disableWatchlistBtn(); // ✅ Always call after adding
        });
      }
    })

  } else {
    contentContainer.innerHTML = '';
    if (revealSearchError) {
      revealSearchError.classList.remove('hidden');
    }
  }
}