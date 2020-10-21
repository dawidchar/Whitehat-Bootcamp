const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const { sequelize, Restaurant, Menu, Item } = require('./server/models.js')
const seed = require('./server/seed.js')
const app = express()
// app.use(sass.middleware({ src: __dirname + '/public' }));


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}) 

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus', include: {model: Item, as: 'items'}}],
        nest: true
    })
    restaurants.map(rst => {
        let sum = 0
        rst.menus.map(el => sum+=el.items.length)
        rst['itemsum'] = sum
    });
    res.render('rsts', { restaurants })
})

app.get('/rst/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    res.render('restaurant', {restaurant, menus})
})


app.listen(3000, async () => {
    await seed.init()
    console.log('web server running on port 3000')
})