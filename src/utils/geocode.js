const request = require('request')
const geocode = (address, callback) => {
    const url_geo_location = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW91c3NlZmV6emF0IiwiYSI6ImNreDVjdXYzdjI0NHoycG9icmxzYjFhZ3UifQ.4FvBNFtD0Rra2FGXecHlVQ`
    request({
        'url': url_geo_location,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable connect location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode