const sh = require('./scooter')

describe('Scooter Hire', () => {
    test('Can Hire Scooter', async () =>{
        const station = new sh.Station()
        const scooter = new sh.Scooter(25)
        station.chargeScooter(scooter)
        const hiredscooter = await station.hireScooter()
        expect(hiredscooter.id).toEqual(25)
    })

    test('Person can hire and return the scooter while someone else waits for a scooter', async () => {
        const station = new sh.Station()
        const scooter = new sh.Scooter(25)
        const rider1 = new sh.Person('Frank')
        const rider2 = new sh.Person('Jennifer')
        station.chargeScooter(scooter)
        let hiredscooter = await station.hireScooter()
        rider1.rideScooter(hiredscooter,station)
        hiredscooter = await station.hireScooter()
        rider2.rideScooter(hiredscooter,station)
        console.log(rider2)
        expect(rider2.scooter.id).toEqual(25)
    })
})