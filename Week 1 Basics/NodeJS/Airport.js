const fs = require('fs')

class Bag {
    constructor(weight) {
        if (!weight) { throw new Error('Bag must have a weight!') }
        this.weight = weight
    }
}

class Person {
    constructor(name, meta) {
        this.name = name
        this.bags = (meta) ? (meta.bags) ? (meta.bags.length > 1) ? meta.bags : [meta.bags] : [] : []
    }

    addBag(bag) {
        this.bags.push(bag)
    }

    getTotalWeight() {
        return this.bags.reduce((res, val) => {
            return res + val.weight
        }, 0)
    }
}

class Passenger extends Person {

}

class CrewMember extends Person {
    constructor(name, meta) {
        super(name, meta)
        this.position = (meta) ? (meta.position) ? meta.position : "" : "" //i.e. Captain
    }
}

class Plane {
    constructor(destination) {
        this.dest = destination
        this.passengers = []
        this.crew = []
    }

    changeDestination(newDest) {
        this.dest = newDest
    }

    board(passengers) {
        const globalThis = this
        function pushPerson(curPerson) {
            if (curPerson instanceof CrewMember) {
                globalThis.crew.push(curPerson)
            } else if (curPerson instanceof Passenger) {
                globalThis.passengers.push(curPerson)
            }
        }
        if (passengers.length) {
            passengers.forEach(pushPerson);
        } else {
            pushPerson(passengers)
        }
    }
}

class Airport {
    static List = {}
    constructor(name) {
        this.name = name
        this.planes = []
        this.passengers = []
        this.constructor.List[name] = this
    }


    addPlane(plane) {
        this.planes.push(plane)
    }

    takeoff(plane) {
        const index = this.planes.indexOf(plane)
        this.planes.splice(index, 1)
        this.constructor.List[plane.dest].land(plane)
    }

    land(plane) {
        this.planes.push(plane)
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            fs.readFile('./Airports.json', 'utf-8' ,(err, data) => {
                if(err) { return reject(err) }
                const airportsData = JSON.parse(String(data))
                const airportData = Object.keys(airportsData).filter((aCode) => {
                    return airportsData[aCode].iata == this.name
                }).map(x => airportsData[x])[0]
                return resolve(airportData)
            })
        })
    }
}


1
module.exports = { Bag, Passenger, Plane, Airport, CrewMember }