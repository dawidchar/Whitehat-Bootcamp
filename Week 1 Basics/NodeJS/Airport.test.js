const am = require ('./airport') //Airport Manager
describe('Bag Tests', () => {
    test('Creating a bag without a weight throws the CORRECT error', () => {
        expect(() => {new am.Bag()}).toThrow('Bag must have a weight!')
    }),
    test('Can create a bag with a weight and then read that weight back', () =>{
        const newBag = new am.Bag(5)
        expect(newBag.weight).toBe(5)
    })
})


describe('Passenger Tests', () => {
    test('Set Passenger Name and have that name returned to as when called', () => {
        const newPassenger = new am.Passenger("Frank")
        expect(newPassenger.name).toBe("Frank")
    })

    test('Add a new Bag of the passenger and then grab the weight from the passenger', () => {
        const newPassenger = new am.Passenger("Frank")
        const newBag = new am.Bag(5)
        newPassenger.addBag(newBag)
        expect(newPassenger.bags[0].weight).toBe(5)
    })

    test('Passenger has mutliple bags we can then return the weight of all the bags together', () => {
        const newBag = new am.Bag(5)
        const newPassenger = new am.Passenger("Frank",newBag)
        newPassenger.addBag(new am.Bag(10))
        expect(newPassenger.getTotalWeight()).toBe(15)
    })

})

describe('Plane Tests', () => {
    test('Can create a Plane with a destination and then read that destination', () => {
        const newPlane = new am.Plane('JFK')
        expect(newPlane.dest).toBe('JFK')
    })
    test("Passangers Can Board the Plane and we should be able to output a passanger's bag's weight", () => {
        const newBag = new am.Bag(5)
        const newPassenger = new am.Passenger("Frank",newBag)
        newPassenger.addBag(new am.Bag(10))
        const newPlane = new am.Plane('JFK')
        newPlane.board(newPassenger)
        expect(newPlane.passengers[0].getTotalWeight()).toBe(15)
    })
})

describe('Airport Tests', () => {
    test('Check if a created Airport has a name', () => {
        const newAirport = new am.Airport('JFK')
        expect(newAirport.name).toBe('JFK')
    }),
    test('Can Create Mutliple Airports', () => {
        const airportList = ['JFK','BRS', 'LHR']
        const airports = {}
        airportList.forEach(airport => {
            airports[airport] = new am.Airport(airport)
        });
        expect(airports.JFK.name).toBe('JFK')
        expect(airports.BRS.name).toBe('BRS')
        expect(airports.LHR.name).toBe('LHR')
    })

    test('Planes can Land and Take Off of diffrent Airports', () => {
        const airportList = ['JFK','BRS', 'LHR']
        const airports = {}
        airportList.forEach(airport => {
            airports[airport] = new am.Airport(airport)
        });

        const newBag = new am.Bag(5)
        const newPassenger = new am.Passenger("Frank",newBag)
        newPassenger.addBag(new am.Bag(10))
        const newPlane = new am.Plane('JFK')
        newPlane.board(newPassenger)

        airports.LHR.addPlane(newPlane)
        airports.LHR.takeoff(newPlane,airports[newPlane.dest])

        expect(airports.JFK.planes[0].passengers[0].getTotalWeight()).toBe(15)

    })


})