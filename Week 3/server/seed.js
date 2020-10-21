const { sequelize, Restaurant, Menu, Item } = require('./models.js')
const data = require('./rstDB.json')

async function init() {
    await sequelize.sync().then(async () => {
        const taskQueue = data.map(async (json_restaurant) => {
            const restaurant = await Restaurant.create({ name: json_restaurant.name, image: json_restaurant.image })
            const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                const items = await Promise.all(_menu.items.map(({ name, price }) => Item.create({ name, price })))
                const menu = await Menu.create({ title: _menu.title })
                return menu.setItems(items)
            }))
            return await restaurant.setMenus(menus)
        })
        return Promise.all(taskQueue)
    })
}

module.exports = {init}