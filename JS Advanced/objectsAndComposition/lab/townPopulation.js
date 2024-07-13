function townPopulation(arr) {
    let newObject = {};

    for (let kV of arr) {
        let [name, population] = kV.split(' <-> ');
        population = Number(population);

        if (newObject[name] != undefined) {
            population += newObject[name];
        }

        newObject[name] = population;
    }

    for (let num in newObject) {
        console.log(`${num} : ${newObject[num]}`);
    }
    
}

townPopulation(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
);
console.log('---');
townPopulation(['Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000']
);