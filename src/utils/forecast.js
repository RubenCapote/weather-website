const request = require ('postman-request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ba5b252587b78e1582903d63c96f00ca&query='+lat+','+long
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to find weather services', undefined)
        }else if(body.error){
            callback('No valid coordinates. Try again', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
        }
    })
}

module.exports = forecast