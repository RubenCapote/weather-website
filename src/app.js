//chekcing git, ignore this
//core modules usually before npm modules
const path = require('path')
//express es un web framework para Node que nos va a hacer más simple trabajar con
//web servers
const express = require('express')

//aqui importamos el modulo hbs
const hbs = require('hbs')

//importamos las utils necesarias para hacer fetch del weather
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//para coger la ruta del directorio donde estamos
//console.log(__dirname)
//usando path, podemos editar el directorio para ir a donde queremos
//console.log(path.join(__dirname, '../public'))
//para coger la ruta del archivo que estamos
//console.log(__filename)

//aqui iniciamos express
const app = express()

//mejor crear una constante en la que se almacene el directorio y luego poder reusarlo
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//to customize our server. To use static assets
app.use(express.static(publicDirectoryPath))




//challenge: create a partial for the footer

//1. setup template "Created by me"
//2. render partial at the bottom
//3. test



//esto es para poder usar hbs (handlebars), que nos va a servir para añadir
//dynamic content
app.set('view engine','hbs')
//para cambair la ruta predefinida donde se encuentran nuestras views
app.set('views', viewsPath)
//para indicar el directorio donde se encuentran nuestros partials
hbs.registerPartials(partialsPath)


//hemos quitado index.html y vamos a usar hbs para hacerlo dinamico
//no hace falta importar ruta ni nada de eso, hbs lo hace automatico
app.get('', (req, res) =>{
    //el segundo argumento son los values que van a ser dinamicos y se le van
    // a pasar al hbs
    res.render('index', {
        title: 'Weather App',
        name: 'Rubén'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About',
        name: 'Rubén C'
    })
})



//challenge: create a template for help

//1. setup help template to render help message 
//2. setup help route and render template with example msg
//3. test


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rubén Capote'
    })
})


//challenge: create 2 html files

//1. create one for about
//2. create one for help
//3. remove old route handlers
//4. test



//esta es la forma de hacer gets usando express, bastante sencillo;
//recibe la ruta y una función y luego mandamos la respuesta
//serving up HTML
//NO LONGER NECESSARY desde que hemos añadido un index.html, que automaticamente
//se inicia al ir a la root de nuestro server
//app.get('', (req, res) =>{
//    res.send('<h1>Weather</h1>')
//})

//no necesarios porque usamos static assets
//serving up JSON
//app.get('/help', (req, res) =>{
//    res.send({
//        name: 'Rubén',
//        age: 21
//    })
//})


//challenge: set up two new routes

//1. setup about route and render page title
//2. setup weather route and render page title
//3. test



//challenge: update routes

//1. setup route to render a title with HTML
//2. setup weather route to send back JSON
//3. test

//no necesarios porque usamos static assets
//app.get('/about', (req, res) =>{
//    res.send('<h1>About page</h1>')
//})


//challenge: update weather endpoint to accept addresses

//1. no address --> error
//2. address --> send JSON back
//3. add address property to JSON to return it
//3. test


//challenge: wire up weather

//1. require geocode/forecast utils
//2. use address to geocode
//3. use coordinates to get forecast
//4. send back real forecast and location


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    //hemos añadido el vacío para lat long loc en el caso de que la address no sea
    //valida pues no explote todo
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send(error)
        }
        forecast(latitude, longitude, (ferror, fdata) =>{
            if (ferror){
                return res.send(ferror)
            }

            res.send({
                fdata,
                location,
                address: req.query.address
            })
        })
    })

})



//ejemplo para enseñarnos como meter queries en una request y esas cosas
app.get('/products', (req, res) =>{
    //si el campo search no está en la query, pues no se runea
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //esto nos enseña que el req.query tenemos todos los campos que le pasamos
    //en la url 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//aqui para que nos lleve a la de help aunque hayamos intentado
//ir a una dentro que no existe
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'Help article',
        reason: 'Article does not exist'
    })
})

//wildcard o asterisco en express indica que todas aquellas páginas no
//declaradas (es decir, que no existan) te lleven aqui
//ademas hay que poner esto al final para que no coja otras posibles
//rutas y nos las lleve tambien aqui
app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page',
        reason: 'Page does not exist'
    })
})



//challenge: create and render 404 page with hbs

//1. setup template to render header and footer
//2. setup template to render error msg in paragraph
//3. render template for both 404 routes
//4. test




//app.com
//app.com/help
//app.com/about


//aqui siempre iniciamos el server en un port usando listen
app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})