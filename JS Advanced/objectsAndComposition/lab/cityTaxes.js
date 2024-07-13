function cityTaxes(name, population, treasury) {
    const myObject = {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes() {
            return myObject.treasury += myObject.population * myObject.taxRate;
        },
        applyGrowth(percentage) {
            return myObject.population += myObject.population * percentage / 100;
        },
        applyRecession(percentage) {
            return myObject.population -= myObject.population * percentage / 100;
        }
    }
    return myObject;
}


const city =
    cityTaxes('Tortuga',
        7000,
        15000);
console.log(city);

city.collectTaxes();
console.log(city.treasury);
city.applyGrowth(5);
console.log(city.population);

