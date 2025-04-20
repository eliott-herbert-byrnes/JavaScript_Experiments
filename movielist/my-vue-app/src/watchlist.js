import './style.css'

// watchlist.js
const watchlistContainer = document.getElementById('contentContainer');
const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

if (storedWatchlist.length === 0) {
  watchlistContainer.innerHTML = `
        <div class="emptyWatchlist hidden">
        <h2>Your watchlist is looking a little empty...</h2>
        <div class="addMoviesContainer" id="addMoviesContainer">
          <img src="img/plus.svg" alt="plus icon" />
          <a href="/index.html" id="addMoviesLink"><h3>Let's add some movies!</h3></a>
        </div>
  `;
} else {
    storedWatchlist.forEach((movie) => {
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
            <div class="removeWatchlist" data-imdbid="${movie.imdbID}">
              <img src="/img/plus.svg" alt="plus">
              <p id="watchListText">Remove</p>
            </div>
          </div>

          <div class="moviePlot">
            <p>${movie.Plot}</p>
          </div>
        </div>
      `;
      watchlistContainer.appendChild(movieCard);

      const removeWatchlistBtn = movieCard.querySelector('.removeWatchlist');
        removeWatchlistBtn.addEventListener('click', () => {
            const imdbID = movie.imdbID;
            const updatedWatchlist = storedWatchlist.filter(m => m.imdbID !== imdbID);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            watchlistContainer.removeChild(movieCard);
            console.log('Removed from watchlist:', imdbID);
        });

    })
}
