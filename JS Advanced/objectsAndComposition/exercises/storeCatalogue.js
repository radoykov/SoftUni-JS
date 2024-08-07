function catalogue(arr) {
    arr = arr.sort();
    let lastLetter;
    while (arr.length != 0) {
        if (arr[0][0] != lastLetter) {
            lastLetter = arr[0][0];
            console.log(lastLetter);
        }
        let [product, price] = arr.shift().split(' : ');
        console.log(`  ${product}: ${price}`);
    }
}

catalogue(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']


);

catalogue(['Banana : 2',
    "Rubic's Cube : 5",
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']
);

