const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cd9f657ab8ce19cd9f3686ceddc9496&query=' + latitude + ',' + longtitude + '&units=f'

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' and the humidity is ' + data.humidity)
        }
    })
}

module.exports = forecast