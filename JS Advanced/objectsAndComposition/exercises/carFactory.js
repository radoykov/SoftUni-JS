function car(carOrdered) {
    const car = {};

    car.model = carOrdered.model;
    const smallEngine = { power: 90, volume: 1800 };
    const normalEngine = { power: 120, volume: 2400 };
    const monsterEngine = { power: 200, volume: 3500 };

    if (carOrdered.power <= 90) {
        car.engine = smallEngine;

    } else if (carOrdered.power > 90 && carOrdered.power <= 120) {
        car.engine = normalEngine;

    } else if (carOrdered.power > 120) {
        car.engine = monsterEngine;
    }
    const hatchback = {
        type: 'hatchback',
        color: carOrdered.color
    }

    const couple = {
        type: 'coupe',
        color: carOrdered.color
    }


    if (carOrdered.carriage == 'hatchback') {
        car.carriage = hatchback;
    } else {
        car.carriage = couple;
    }

    if (carOrdered.wheelsize % 2 == 0) {
        let a = Math.floor(carOrdered.wheelsize - 1)
        car.wheelsize = [a, a, a, a];
    }
    else {
        car.wheelsize = [carOrdered.wheelsize, carOrdered.wheelsize, carOrdered.wheelsize, carOrdered.wheelsize];
    }

    return car;
}

console.log(car({ model: 'VW Golf II', power: 90, color: 'blue', carriage: 'hatchback', wheelsize: 14 }));
console.log(car({ model: 'Opel Vectra', power: 110, color: 'grey', carriage: 'coupe', wheelsize: 17 }));