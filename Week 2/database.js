const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:')
const airports = require('./airports.json')


function insert(airports, callback) {
    if (airports.length === 0) return callback(db)
        const airport = airports.pop()
        db.run(`INSERT INTO airports(${Object.keys(airport).join(",")}) VALUES(${Object.values(airport).map((el)=>`'${el}'`).join(",")});`, function(err) {
            insert(airports, callback)
    })

}

function loadTable(callback) {
    db.run('CREATE TABLE airports(id INTEGER PRIMARY KEY, icao TEXT, iata TEXT, name TEXT, city TEXT, state TEXT, country TEXT, elevation INTEGER, lat FLOAT, lon FLOAT, tz TEXT);', 
    function () {
        insert(airports, callback)})
}
module.exports = loadTable 