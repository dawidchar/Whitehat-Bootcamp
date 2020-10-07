class Bag {
    constructor (weight) {
        if(!weight){throw new Error('Bag must have a weight!')}
        this.weight = weight
    }
}

class Passenger {
    constructor (name, bags) {
        this.name = name
        this.bags = (bags) ? [bags] : []
    }

    addBag(bag) {
        this.bags.push(bag)
    }

    getTotalWeight(){
        return this.bags.reduce((res,val) => {
            return res + val.weight
        },0)
    }
}

class Plane {
    constructor (destination){
        this.dest = destination
        this.passengers = []
    }

    changeDestination(newDest){
        this.dest = newDest
    }

    board(passengers){
        this.passengers.push(passengers)
    }
}

class Airport {
    constructor (name) {
        this.name = name
        this.planes = []
        this.passengers = []
    }

    addPlane(plane){
        this.planes.push(plane)
    }

    takeoff(plane,destination){
        const index = this.planes.indexOf(plane)
        this.planes.splice(index, 1)
        destination.land(plane)
    }

    land(plane){
        this.planes.push(plane)
    }

    
}







module.exports = {Bag, Passenger, Plane, Airport}