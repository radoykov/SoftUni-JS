function circleArea(num) {
    let type = typeof (num);
    if (type !== 'number') {
        return `We can not calculate the circle area, because we receive a ${type}.`;
    }
    let area = num ** 2 * Math.PI;
    area = area.toFixed(2);
    return area;
}


console.log(circleArea(5));
console.log(circleArea('name'));