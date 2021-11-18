const request = require('postman-request')



const geocode = (address, callback) =>{
    //encodeURIComponent sirve en algunos casos por ejemplpo cuando el nombre de la ciudad
    //son varias palabras, por ejemplo Los Angeles
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicnVjYXR0byIsImEiOiJja3cweGsydThiOXh4MnBxd25wb2RidGl4In0.Z01dLRcoAU9RZ2pqv5Qcvw&limit=1'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback({
                error: 'Unable to connect to location services'
            })
        }
        else if(body.features.length === 0){
            callback({
                error:'Unable to find that location'
            })
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}



module.exports = geocode