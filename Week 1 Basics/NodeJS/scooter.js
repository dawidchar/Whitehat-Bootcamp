const events = require('events');
const event = new events.EventEmitter();

class Person {
    constructor(name){
        this.name = name
        this.scooter
    }

    rideScooter (scooter, station) {
        this.scooter = scooter
        setTimeout((scooter, station) => {
            this.scooter = null
            station.chargeScooter(scooter)
        }, 100, scooter,station);
    }
}

class Scooter {
    constructor(id) {
        this.charged = false
        this.id = id
    }
}

class Station {
    constructor() {
        this.scooters = []
    }

    addScooter(scooter){
        this.scooters.push(scooter)
    }

    chargeScooter (scooter) {
        setTimeout((scooter) => {
            scooter.charged = true
            this.addScooter(scooter)
            event.emit('ScooterAvailable')
        }, 2000, scooter);
    }

    async hireScooter () {
        if (this.scooters.length > 0) {
            return this.scooters.pop()
        }else {
           await this.waitforScooter()
           return this.hireScooter()
        }
    }

    waitforScooter () {
        return new Promise((resolve,reject) =>{
            event.on('ScooterAvailable',() => {
                return resolve()
            })
        })
    }
}

module.exports = {Person, Scooter, Station}