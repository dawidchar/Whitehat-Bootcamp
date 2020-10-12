class Restaurant {
    constructor(name) {
        this.name = name
        this.menu = {}
        this.booking = {}
    }

    addMenu(Menu) {
        this.menu[Menu.id] = Menu
    }

    addBooking(fname,lname){
        this.booking[lname] = new Booking(fname,lname)
    }
}

class Menu {
    constructor(id, name){
        this.id = id
        this.name = name
        this.items = {}
    }

    addItem(item) {
        this.items[item.id] = item
    }
}

class Item {
    constructor(id,name,desc,price){
        this.id = id
        this.name = name
        this.description = desc
        this.price = price
    }
}

class Booking {
    constructor(fname,lname){
        this.firstname = fname
        this.lastname = lname
    }
}

module.exports = {Restaurant, Menu, Item, Booking}