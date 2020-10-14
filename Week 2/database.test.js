const loadDB = require('./database')

jest.setTimeout(10000);

describe('SQlite tests', () => {
    test('Check all airports have been loaded in', (done) => {
        loadDB(db => {
                db.get('SELECT COUNT(id) AS total FROM airports;', (err, resp) => {
                    expect(resp.total).toBe(28161)
                    done()
                })
        })
    })
})