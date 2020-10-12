const rst = require('./Restaurant')

describe('Restaurant Tests', () => {
    test('Restaurant has a name', () => {
        const MCrst = new rst.Restaurant('McDonalds') 
        expect(MCrst.name).toBe('McDonalds')
    })
    test("Restaurant's menu has a name", () => {
        const MCrst = new rst.Restaurant('McDonalds')
        const MCsavermenu = new rst.Menu('MCsavermenu','Saver Menu')
        MCrst.addMenu(MCsavermenu)
        expect(MCrst.menu.MCsavermenu.name).toBe('Saver Menu')
    })

    test('Restaurant has a booking with a name', () =>{
        const MCrst = new rst.Restaurant('McDonalds')
        MCrst.addBooking('Dawid','Charzewski')
        expect(MCrst.booking.Charzewski.firstname).toBe('Dawid')
    })
})

describe('Menu Tests', () => {
    test('Menu has items with a name and price and is within a Restaurant instance', () => {
        const MCrst = new rst.Restaurant('McDonals')
        const MCmenu = new rst.Menu('MainMenu','Menu')
        const MCchickennuggets = new rst.Item('ChkenNug20','Chicken Nuggets 20pcs', '20 Pack of Chicken Nuggets', 4.99)
        const MCtriplecheeseburger = new rst.Item('TriCB','Triple Cheeseburger', 'Triple Cheeseburger', 2.19)
        MCmenu.addItem(MCchickennuggets)
        MCmenu.addItem(MCtriplecheeseburger)
        MCrst.addMenu(MCmenu)
        expect(MCrst.menu.MainMenu.items.ChkenNug20.name).toBe('Chicken Nuggets 20pcs')
        expect(MCrst.menu.MainMenu.items.ChkenNug20.price).toBe(4.99)
        expect(MCrst.menu.MainMenu.items.TriCB.name).toBe('Triple Cheeseburger')
        expect(MCrst.menu.MainMenu.items.TriCB.price).toBe(2.19)
    })
})