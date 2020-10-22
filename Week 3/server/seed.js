const { sequelize, Restaurant, Menu, Item } = require('./models.js')
var fs = require('fs');
const data = require('./rstDB.json')

async function populate() {
    const taskQueue = data.map(async (json_restaurant) => {
        const restaurant = await Restaurant.create({ name: json_restaurant.name, image: json_restaurant.image })
        const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
            const items = await Promise.all(_menu.items.map(({ name, price }) => Item.create({ name, price })))
            const menu = await Menu.create({ title: _menu.title })
            return menu.setItems(items)
        }))
        return await restaurant.setMenus(menus)
    })
    return await Promise.all(taskQueue)
}

async function init() {
    // if (fs.existsSync('./server/data.db')) fs.unlinkSync('./server/data.db')
    // if (fs.existsSync('./server/data.db-journal')) fs.unlinkSync('./server/data.db-journal')
    await sequelize.sync().then(async () => {
        await Restaurant.count().then(async c => {
            if (c === 0) {
                console.log('Database is being populated with data, please wait\x1b[36m...')
                await populate()
                await Restaurant.count().then(async c => { console.log('\x1b[36mNew RSTs\x1b[0m', c) })
                await Menu.count().then(async c => { console.log('\x1b[36mNew Menus\x1b[0m', c) })
                await Item.count().then(async c => { console.log('\x1b[36mNew Items\x1b[0m', c) })
            }

        })
    })
}

module.exports = { init }