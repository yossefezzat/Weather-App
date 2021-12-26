const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


const app = express()
const port = process.env.PORT || 3000

//configure paths for express
const pathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pathDir))


app.get('', (req, res) => {
    res.render('index', {
        name: 'Youssef Ezzat',
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Youssef Ezzat',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Youssef Ezzat',
        title: 'Help',
        helpText: 'this is some help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, location, (error, {
            weather,
            location
        } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                weather,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Youssef Ezzat',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server listen to port ${port}...`)
})