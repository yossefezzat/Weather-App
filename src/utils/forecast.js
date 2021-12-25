const request = require('request')
const forecast = (latitude, longitude, location, callback) => {
    const url = 'https://api.darksky.net/forecast/b1c8269eae15abee95388be42cd4d9ca/' + latitude + ',' + longitude + '?units=si'
    request({
        'url': url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect weather service', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                weather: response.body.daily.data[0].summary + ' It is currently ' + Math.floor(response.body.currently.temperature) + ' degree and Its ' + response.body.hourly.summary,
                location: location
            })

        }
    })
}
module.exports = forecast