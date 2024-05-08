document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault()
  
    // Display screen effect
    document.getElementById('screenEffect').style.display = 'block'
  
    const formData = new FormData(this)
    const newItem = {}
    formData.forEach((value, key) => {
        newItem[key] = value
    })
  
    // Fetching data to API
    fetch('https://65c5df9fe5b94dfca2e0746b.mockapi.io/PixelPursuit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block'
            setTimeout(() => {
              document.getElementById('successMessage').style.display = 'none'
            }, 5000) // Hide success message after 5 seconds
            this.reset()
        } else {
            console.error('Error:', error)
            alert('An error has occurred. please try again.')
        }
        // Hide screen effect regardless of success or failure
        document.getElementById('screenEffect').style.display = 'none'
    })
    .catch(error => {
        console.error('Error:', error)
        alert('An error has occurred. please try again.')
        // Hide screen effect in case of error
        document.getElementById('screenEffect').style.display = 'none'
    })
  })
  // Only allow numbers and 1 dot
  function validatePrice(input) {   

    input.value = input.value.replace(/[^0-9.]/g, '')

    input.value = input.value.replace(/^0+(?=\d)/, '')
    
    input.value = input.value.replace(/(\..*)\./g, '$1')

    let dotCount = (input.value.match(/\./g) || []).length
    if (dotCount > 1) {
        input.value = input.value.substring(0, input.value.lastIndexOf('.'))
    }
}
// Clear input field if any of these words were ever used, keep in mind that the whole text is going to be deleted in case of inappropriate language
const titleInput = document.getElementById('title')
const poster = document.getElementById('poster')
const descriptionInput = document.getElementById('description')
const whereToBuy = document.getElementById('whereToBuy')

const textFilter = document.getElementById('textFilter')

// Add event listeners to each input field
titleInput.addEventListener('input', checkForExplicitWords)
poster.addEventListener('input', checkForExplicitWords)
descriptionInput.addEventListener('input', checkForExplicitWords)
whereToBuy.addEventListener('input', checkForExplicitWords)

function checkForExplicitWords(event) {
    const inputText = event.target.value
    const explicitWords = ['n word', 'b word', 'i word', '', ''] // An array of explicit words
    let hasExplicitWord = false

    explicitWords.forEach(word => {
        if (inputText.toLowerCase().includes(word)) {
            event.target.value = ''
            hasExplicitWord = true
        }
    })

    // If explicit word found, display message
    if (hasExplicitWord) {
        textFilter.textContent = 'Please remain polite'
    } else {
        textFilter.textContent = ''
    }
}
