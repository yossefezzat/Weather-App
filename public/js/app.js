const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const messageOne = document.querySelector('#weather')
const messageTwo = document.querySelector('#location')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })

})