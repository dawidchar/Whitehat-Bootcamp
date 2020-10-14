const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:') //('./testDB.db', sqlite3.OPEN_READWRITE)
const rstDB = require('./rstDB.json')
const dev = false

function loadRst(cb) {
    if (rstDB.length === 0) return cb(db)
    const rst = rstDB.pop()
    const SQL = `INSERT INTO restaurants(${Object.keys(rst).splice(0, 2).join(",")}) VALUES(${Object.values(rst).splice(0, 2).map((el) => `'${el}'`).join(",")});`
    if(dev) console.log(SQL)
    db.run(SQL, function (err) {
        if (err) console.error(err)
        loadMenu(rst.menus, this.lastID, function () {
            loadRst(cb)
        })
    })
}

function loadMenu(menuData, rstID, cb) {
    if (menuData.length === 0) return cb()
    const menu = menuData.pop()
    const SQL = `INSERT INTO menus(${Object.keys(menu)[0]},restaurant_id) VALUES('${Object.values(menu)[0]}','${rstID}');`
    if(dev) console.log(SQL)
    db.run(SQL, function (err) {
        if (err) console.error(err)
        loadItem(menu.items, this.lastID, function () {
            loadMenu(menuData, rstID, cb)
        })
    })
}

function loadItem(itemData, menuID, cb) {
    if (itemData.length === 0) return cb()
    const item = itemData.pop()
    const SQL = `INSERT INTO items(${Object.keys(item).join(",")},menu_id) VALUES(${Object.values(item).map((el) => `'${el}'`).join(",")},'${menuID}');`
    if(dev) console.log(SQL)
    db.run(SQL, function (err) {
        if (err) console.error(err)
        loadItem(itemData, menuID, cb)
    })
}

function loadData(cb) {
    db.exec(`
        CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);
        CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);
        CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT, menu_id INTEGER);
    `, function (err) {
        if (err) console.error(err)
        loadRst(cb)
    })
}

loadData(() => {
    db.all("SELECT * FROM restaurants;", function(err, resp) {
        if (err) console.error(err)
        console.log(resp)
    })
})