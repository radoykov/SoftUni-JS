function calculator(num1, num2, string) {
    switch (string) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        case '**':
            return Math.pow(num1, num2);
    }
}
console.log(calculator(5, 6, '+'));
console.log(calculator(3, 5.5, '*'));
