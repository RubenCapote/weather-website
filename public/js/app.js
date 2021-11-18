console.log('Client side JavaScript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) =>{
        console.log(data)
    })
})


//challenge: fetch weather

//1. setup call to fetch weather for Boston
//2. Get the parse JSON response. if error print error if no error print data
//3. test

//el then sirve para hacerlo asynchronous
//fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
//    response.json().then((data) =>{
//        if(data.error){
//            console.log(data.error)
//        }
//        else{
//            console.log(data.location)
//            console.log(data.fdata)
//        }
//    })
//})

//aqui es donde seleccionamos del html lo que es el input del usuario
//como parameter ponemos la etiqueta referencia a donde estamos metiendo data
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

//los id se seleccionan con # y las clases con .
//aqui estamos seleccionando los dos paragraphs que tenemos en index
//y que es donde vamos a escribir el resultado
const messageOne = document.querySelector('#msg1')

const messageTwo = document.querySelector('#msg2')


//messageOne.textContent = 'From JavaScript'


//cada vez que pulsemos submit, sucederá esto
weatherForm.addEventListener('submit', (e) =>{
    //para evitar que se recargue automaticamente la pagina
    e.preventDefault()

    const location = search.value

    //printeamos esto hasta que cargue el resultado y limpiamos también lo que
    //pudiera haber de antes
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //aqui hacemos referencia parcial a la url que necesitamos para fetch el weather
    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.fdata
            }
        })
    })

})


//challenge: input value to get weather

//1. migrate fetch call into submit callback
//2. use search text as address query string value
//3. test