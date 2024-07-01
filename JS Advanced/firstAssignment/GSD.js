function GSD(num1, num2) {
    while (num2 != 0) {
        let temp = num2;
        num2 = num1 % num2;
        num1 = temp;
    }
    return num1;
}

console.log(GSD(15, 5));
console.log(GSD(2154, 458));