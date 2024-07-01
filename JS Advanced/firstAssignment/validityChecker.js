function check(x1, y1, x2, y2) {
    function getResult(x1, y1, x2, y2) {
        //d=√((x2 – x1)² + (y2 – y1)²)
        let a = ((x2-x1)**2);
        let b = ((y2-y1)**2);

        let d = Math.sqrt(a+b);
        let result = Number.isInteger(d);
        return result ? 'valid': 'invalid';
    }

    return `(${x1}, ${y1}) to (0, 0) is ${getResult(x1, y1, 0, 0)}\n`+
    `(${x2}, ${y2}) to (0, 0) is ${getResult(x2, y2, 0, 0)}\n`+
    `(${x1}, ${y1}) to (${x2}, ${y2}) is ${getResult(x1, y1, x2, y2)}`;
}

console.log(check(3, 0, 0, 4));
console.log(check(2, 1, 1, 1));