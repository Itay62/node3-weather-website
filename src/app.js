const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Itay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Itay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Help page',
        name: 'Itay'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longtitude, latitude, (error, weatherDescription) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: weatherDescription,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found",
        name: "Itay"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: "Itay"
    })
})

app.listen(3000, () => {
    console.log('Server is on!')
})