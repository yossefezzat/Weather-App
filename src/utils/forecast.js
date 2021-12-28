const request = require('request')
const forecast = (latitude, longitude, location, callback) => {
    const url = 'https://api.darksky.net/forecast/b1c8269eae15abee95388be42cd4d9ca/' + latitude + ',' + longitude + '?units=si'
    request({
        'url': url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('unable to connect weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                weather: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh +
                    ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.',
                location: location
            })

        }
    })
}
module.exports = forecast