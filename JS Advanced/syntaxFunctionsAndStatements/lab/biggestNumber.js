function bignum(num1, num2, num3) {
    if (num1 > num2 && num1 > num3) {
        return `The largest number is ${num1}.`;
    } else if (num2 > num1 && num2 > num3) {
        return `The largest number is ${num2}.`;
    } else if (num3 > num2 && num3 > num1) {
        return `The largest number is ${num3}.`;

    }
}

console.log(bignum(5, -3, 16));
console.log(bignum(-3, -5, -22.5));