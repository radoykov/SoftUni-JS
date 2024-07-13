function cities(arrStr) {
    const object = {};

    for (const str of arrStr) {
        const [city, product, priceStr] = str.split(" | ");
        const price = Number(priceStr);

        if (!object[product] || price < object[product].price) {
            object[product] = { price, city };
        }
    }

    for (const product in object) {
        console.log(`${product} -> ${object[product].price} (${object[product].city})`);
    }
}

cities(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']
);