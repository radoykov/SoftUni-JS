function heroicInventor(input) {
    let result = [];

    for (let iterator of input) {
        let [name, level, items] = iterator.split(' / ');
        level = Number(level);
        items = items ? items.split(', ') : [];

        result.push({ name, level, items });

    }
    console.log(JSON.stringify(result));
}

heroicInventor(['Isacc / 25 / Apple, GravityGun', 'Derek / 12 / BarrelVest, DestructionSword', 'Hes / 1 / Desolator, Sentinel, Antara']);
heroicInventor(['Jake / 1000 / Gauss, HolidayGrenade']);