import './style.css'

const movieSearch = document.getElementById('mySearch')
const searchButton = document.getElementById('searchBtn')
const contentContainer = document.getElementById('contentContainer')
const hideHomeContent = document.getElementById('startExploring')
const revealSearchError = document.getElementById('movieSearchError')
let searchFormat = ''

searchButton.addEventListener('click', () => {
  if (movieSearch.value) {
    searchFormat = movieSearch.value.replace(/ /g, '+')
    searchFormat = searchFormat.toLowerCase()
    console.log(searchFormat)
    hideHomeContent.classList.add('hidden')
    getMovie()
  }
})

// Movie API
async function getMovie() {
  const response = await fetch(`http://www.omdbapi.com/?apikey=9f32cbeb&s=${searchFormat}`)
  const data = await response.json()
  console.log(data)
  if (data.Response === 'True') {
    console.log('true')
    if (revealSearchError) {
      revealSearchError.classList.add('hidden')
    }

      const movieArray = data.Search
    
      movieArray.map((movie) => {
        const movieCard = document.createElement('div')
        movieCard.classList.add('movieCard')
        movieCard.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `
        
        contentContainer.appendChild(movieCard)
      })

  } else {
    console.log('false')
    revealSearchError.classList.remove('hidden')

  }
}
