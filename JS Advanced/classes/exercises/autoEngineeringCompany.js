class Car {
    constructor(arr) {
        this.arr = arr;
    }

    showCars() {
        const obj = this.arr.reduce((res, current) => {
            let [brand, model, count] = current.split(' | ');
            count = Number(count);
            if (!res.has(brand)) {
                res.set(brand, new Map);
            }
            if (!res.get(brand).has(model)) {
                res.get(brand).set(model, 0);
            }
            let value = Number(res.get(brand).get(model));
            res.get(brand).set(model, value + count);

            return res;

        }, new Map);

        let resStr = [];
        for (let [brand, model] of obj.entries()) {

            let result = `${brand}\n`;

            for (let [name, quantity] of model.entries()) {
                result += `###${name} -> ${quantity}\n`;
            }

            resStr.push(result.trim());
        }

        return resStr.join('\n');
    }
};

let a = new Car(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);

console.log(a.showCars());

// Audi
// ###Q7 -> 1000
// ###Q6 -> 100
// BMW
// ###X5 -> 1000
// ###X6 -> 100
// Citroen
// ###C4 -> 145
// ###C5 -> 10
// Volga
// ###GAZ-24 -> 1000000
// Lada
// ###Niva -> 1000000
// ###Jigula -> 1000000
