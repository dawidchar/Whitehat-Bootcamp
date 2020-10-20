const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', (request, response) => {
    response.render('home', {date: new Date()})
})

app.get('/about', (request, response) => {
    response.render('about', {name: 'Dawid'})
})

app.listen(3000, () => console.log('web server running on port 3000'))