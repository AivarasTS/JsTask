const gamesListElement = document.getElementById('games-list')
const gameForm = document.getElementById('gameForm')
const sortCriteriaSelect = document.getElementById('sortCriteria')

function displayGames() {
  fetch('https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit')
    .then(response => response.json())
    .then(games => {
      games.sort((a, b) => a.price - b.price)

      gamesListElement.innerHTML = ''

      games.forEach(game => {
        const gameCard = document.createElement('div')
        gameCard.classList.add('game-card')

        const titleElement = document.createElement('h2')
        titleElement.textContent = game.title
        gameCard.appendChild(titleElement)

        const priceElement = document.createElement('p')
        priceElement.textContent = '$ ' + game.price
        gameCard.appendChild(priceElement)

        const posterLink = document.createElement('a')
        posterLink.href = '/productPage/product.html?id=' + game.id
        const posterElement = document.createElement('img')
        posterElement.src = game.poster
        posterElement.alt = game.title + ''
        posterElement.classList.add('game-poster')
        posterLink.appendChild(posterElement)
        gameCard.appendChild(posterLink)

        gamesListElement.appendChild(gameCard)
      })
    })
}

displayGames()

gameForm.addEventListener('submit', function(event) {
  event.preventDefault()

  const titleInput = document.getElementById('title')
  const priceInput = document.getElementById('price')
  const posterUrlInput = document.getElementById('posterUrl')
  const gameIdInput = document.getElementById('gameId')

  const gameData = {
    title: titleInput.value,
    price: priceInput.value,
    poster: posterUrlInput.value
  }

  const gameId = gameIdInput.value

  const requestMethod = gameId ? 'PUT' : 'POST'
  const apiUrl = gameId ? `https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit/${gameId}` : 'https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit'

  fetch(apiUrl, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  })
    .then(response => response.json())
    .then(data => {
      alert('Game information submitted!')
      displayGames()
      gameForm.reset()
    })
})