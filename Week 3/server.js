const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const { sequelize, Restaurant, Menu, Item } = require('./server/models.js')
const seed = require('./server/seed.js')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        currency: function (cur) {
            return cur.toLocaleString('en-GB', {
                style: 'currency',
                currency: 'GBP',
            })
        }
    }
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{ model: Menu, as: 'menus', include: { model: Item, as: 'items' } }],
        nest: true
    })
    restaurants.map(rst => {
        let sum = 0
        rst.menus.map(el => sum += el.items.length)
        rst['itemsum'] = sum
    });
    res.render('rsts', { restaurants })
})

app.get('/rst/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [{ model: Item, as: 'items' }],
        nest: true
    })
    res.render('rst', { rst: restaurant, menus })
})

app.post('/rst/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.redirect(`/rst/${restaurant.id}`)
})

app.get('/rst/:id/delete', (req, res) => {
    Restaurant.findByPk(req.params.id)
        .then(rst => {
            rst.destroy()
            res.redirect('/')
        })
})

app.post('/rst/:id/menu', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.create(req.body)
    await restaurant.addMenu(menu)
    res.redirect(`/rst/${req.params.id}`)
})


app.get('/rst/:id/menu/:menuid/delete', async (req, res) => {
    const menu = await Menu.findByPk(req.params.menuid)
    await menu.destroy()
    res.redirect(`/rst/${req.params.id}`)
})

app.post('/rst/:id/menu/:menuid/edit', async (req, res) => {
    const menu = await Menu.findByPk(req.params.menuid)
    await menu.update(req.body)
    res.redirect(`/rst/${req.params.id}`)
})

app.post('/rst/:id/menu/:menuid/item', async (req, res) => {
    const menu = await Menu.findByPk(req.params.menuid)
    const item = await Item.create(req.body)
    await menu.addItem(item)
    res.redirect(`/rst/${req.params.id}`)
})

app.post('/rst/:id/menu/:menuid/item/:itemid/edit', async (req, res) => {
    const item = await Item.findByPk(req.params.itemid)
    await item.update(req.body)
    res.redirect(`/rst/${req.params.id}`)
})

app.get('/rst/:id/menu/:menuid/item/:itemid/delete', async (req, res) => {
    const item = await Item.findByPk(req.params.itemid)
    await item.destroy()
    res.redirect(`/rst/${req.params.id}`)
})

{/* <script>
console.log("HELPER")
Handlebars.registerHelper('currency', function (cur) {
    return cur.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });
})
</script> */}

app.listen(3000, async () => {
    await seed.init()
    console.log('web server running on port 3000')
})