const am = require('./airport') //Airport Manager
describe('Bag Tests', () => {
    test('Creating a bag without a weight throws the CORRECT error', () => {
        expect(() => { new am.Bag() }).toThrow('Bag must have a weight!')
    }),
        test('Can create a bag with a weight and then read that weight back', () => {
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
        const newPassenger = new am.Passenger("Frank", { bags: newBag })
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
        const newPassenger = new am.Passenger("Frank", { bags: newBag })
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
            const airportList = ['JFK', 'BRS', 'LHR']
            const airports = {}
            airportList.forEach(airport => {
                airports[airport] = new am.Airport(airport)
            });
            expect(airports.JFK.name).toBe('JFK')
            expect(airports.BRS.name).toBe('BRS')
            expect(airports.LHR.name).toBe('LHR')
        })

    test('Planes can Land and Take Off of diffrent Airports', () => {
        const airportList = ['JFK', 'BRS', 'LHR']
        const airports = {}
        airportList.forEach(airport => {
            airports[airport] = new am.Airport(airport)
        });

        const newBag = new am.Bag(5)
        const newPassenger = new am.Passenger("Frank", { bags: newBag })
        newPassenger.addBag(new am.Bag(10))
        const newPlane = new am.Plane('JFK')
        newPlane.board(newPassenger)

        airports.LHR.addPlane(newPlane)
        airports.LHR.takeoff(newPlane)

        newPlane.changeDestination("BRS")

        expect(airports.JFK.planes[0].passengers[0].getTotalWeight()).toBe(15)

    })
})

describe('Person Inheritance', () => {
    test('Check new passanger is an instance of passanger', () => {
        const newPassenger = new am.Passenger('Sam')
        expect(newPassenger instanceof am.Passenger).toBeTruthy()
    })

    test('Check new CrewMember is an instance of CrewMember and has access to the position/rank info', () => {
        const newCrewmember = new am.CrewMember('Sam', {position:'Captain'})
        expect(newCrewmember instanceof am.CrewMember).toBeTruthy()
        expect(newCrewmember.position).toBe('Captain')
    })

    test('Board Both passangers and Crewmembers and have them placed correctly', () => {
        const newCrewmember = new am.CrewMember('Frank', {position:'Captain'})
        const newPassenger = new am.Passenger('Sam')
        const newPlane = new am.Plane('JFK')
        const planePassangers = [newCrewmember,newPassenger]
        newPlane.board(planePassangers)

        expect(newPlane.crew[0].position).toBe('Captain')
        expect(newPlane.passengers[0].name).toBe('Sam')
        
        console.log("-".repeat(20))
        console.log(newPlane)
        console.log("-".repeat(20))
    })
})