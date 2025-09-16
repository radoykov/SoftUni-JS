class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {

        if (this.capacity == this.vehicles.length) {
            throw Error("Not enough parking space.");
        } else {
            this.vehicles.push({
                carModel,
                carNumber,
                payed: false
            });
            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }
    }
    removeCar(carNumber) {
        const car = this.vehicles.filter(e => e.carNumber == carNumber);
        if (car.length == 0) {
            throw Error("The car, you're looking for, is not found.");
        }
        if (car[0].payed == false) {
            throw Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }
        this.vehicles.splice((this.vehicles.indexOf(car)), 1);

        return `${carNumber} left the parking lot.`;
    }
    pay(carNumber) {
        const car = this.vehicles.filter(e => e.carNumber == carNumber);
        if (car.length == 0) {
            throw Error(`${carNumber} is not in the parking lot.`);
        }
        if (car[0].payed == true) {
            throw Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        car[0].payed = true;

        return `${carNumber}'s driver successfully payed for his stay.`;
    }
    getStatistics(carNumber = false) {
        if (carNumber == false) {
            const res = [`The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`];
            this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));
            this.vehicles.forEach(e => res.push(`${e.carModel} == ${e.carNumber} - ${e.payed ? "Has payed" : "Not payed"}`));

            return res.join('\n');
        } else {
            const car = this.vehicles.filter(e => e.carNumber == carNumber);

            return `${car.carModel} == ${car.carNumber} - ${e.payed ? "Has payed" : "Not payed"}`;
        }
    }
};

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
/*
The Volvo t600, with a registration number TX3691CA, parked.
The Parking Lot has 11 empty spots left.
Volvo t600 == TX3691CA - Not payed
TX3691CA's driver successfully payed for his stay.
TX3691CA left the parking lot.
*/