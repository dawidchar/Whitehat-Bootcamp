const {sequelize, Restaurant, Menu, Item} = require('./sequelize.js')
const data = require('./rstDB.json')

beforeAll(async () => {
    await sequelize.sync().then(async () => {
        const taskQueue = data.map(async (json_restaurant) => {
                const restaurant = await Restaurant.create({name: json_restaurant.name, image: json_restaurant.image})
                const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                    const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                    const menu = await Menu.create({title: _menu.title})
                    return menu.setItems(items)
                }))
                return await restaurant.setMenus(menus)
            })
        return Promise.all(taskQueue)
    })
})

describe('Test DB Relationships', () => {
    test('restaurants have menus', async () => {
        const rst = await Restaurant.create({name: 'Ronalds', image: 'http://some.image.url'})
        const menu = await Menu.create({title: 'set 1'})
        await rst.addMenu(menu)
        const menus = await rst.getMenus()
        expect(menus[0].title).toBe('set 1')
    })
    test('Cafe Monico', async () => {
        const rst = await Restaurant.findOne({where: {name: "Cafe Monico"}, include: [{all: true, nested: true}]});
        expect(rst.menus[1].items[0].name).toBe('Croissant')
    })
}) 