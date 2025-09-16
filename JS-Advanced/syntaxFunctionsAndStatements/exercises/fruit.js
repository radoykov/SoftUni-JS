function fruitCalculation(fruit, weight, money) {
    let sum;
    weight = weight / 1000;
    sum = weight * money;
    return `I need $${sum.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruit}.`;
}

console.log(fruitCalculation('orange', 2500, 1.80));
console.log(fruitCalculation('apple', 1563, 2.35));
