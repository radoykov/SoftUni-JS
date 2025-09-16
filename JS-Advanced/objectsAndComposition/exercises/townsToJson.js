function townsToJson(arr) {
    const arrWithinObjects = [];
    arr.shift();

    for (let str of arr) {
        const [town, latitude, longitude] = str.split(/\s*\|\s*/).filter(val => Boolean(val));
        const townObject = {
            town,
            latitude: Number(latitude).toFixed(2),
            longitude: Number(longitude).toFixed(2),
        };
        arrWithinObjects.push(townObject);
    }

    return JSON.stringify(arrWithinObjects);
}

console.log(townsToJson(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
));

console.log(townsToJson(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']
));