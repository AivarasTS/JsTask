const gameId = new URLSearchParams(window.location.search).get('id')

    fetch(`https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit/${gameId}`)
      .then(response => response.json())
      .then(game => {
        const gameDescriptionElement = document.getElementById('game-description')
        const gameCard = document.createElement('div')
        gameCard.classList.add('game-card')

        const titleElement = document.createElement('h2')
        titleElement.textContent = game.title
        gameCard.appendChild(titleElement)

        const priceElement = document.createElement('p')
        priceElement.textContent = '$ ' + game.price
        gameCard.appendChild(priceElement)

        const idElement = document.createElement('p')
        idElement.textContent = 'ID: ' + game.id
        gameCard.appendChild(idElement)

        const posterElement = document.createElement('img')
        posterElement.src = game.poster
        posterElement.alt = game.title
        posterElement.classList.add('game-poster')
        gameCard.appendChild(posterElement)

        const descriptionElement = document.createElement('p')
        descriptionElement.textContent = '' + game.description
        gameCard.appendChild(descriptionElement)

        const whereToBuyElement = document.createElement('p')
        whereToBuyElement.textContent = 'Where To Buy: ' + game.whereToBuy
        gameCard.appendChild(whereToBuyElement)

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('delete-button')
        deleteButton.addEventListener('click', () => deleteGame(game.id))
        gameCard.appendChild(deleteButton)

        const homeButton = document.createElement('button')
        homeButton.textContent = 'Home Page'
        homeButton.classList.add('home-button')
        homeButton.addEventListener('click', () => redirectToHomePage())
        gameCard.appendChild(homeButton)

        gameDescriptionElement.appendChild(gameCard)
      })
      .catch(error => console.error('Error fetching game details:', error))

      function deleteGame(gameId) {
        const apiUrl = `https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit/${gameId}`
      
        fetch(apiUrl, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              const messageElement = document.createElement('p')
              messageElement.textContent = 'Game deleted successfully, redirecting to home page!'
              document.getElementById('game-description').appendChild(messageElement)
      
              setTimeout(() => {
                window.location.href = '/index.html'
              }, 5000) // 5 seconds delay until user gets redirected to home page
            } else {
              const messageElement = document.createElement('p')
              messageElement.textContent = 'Failed to delete the game.'
              document.getElementById('game-description').appendChild(messageElement)
            }
          })
          .catch(error => {
            console.error('Error deleting the game:', error)
            const messageElement = document.createElement('p')
            messageElement.textContent = 'An error occurred while deleting the game.'
            document.getElementById('game-description').appendChild(messageElement)
          })
      }

      function redirectToHomePage() {
        window.location.href = '/index.html'
      }