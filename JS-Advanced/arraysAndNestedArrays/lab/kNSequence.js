function sequence(n, k) {
    let arr = [];
    arr[0] = 1;
    for (let i = 1; i < n; i++) {
        let slice = arr.slice(-k);
        let sum = slice.reduce((acc, c) => acc += c, 0)

        arr[i] = sum;
    }
    return arr;
}

console.log(sequence(6, 3));
console.log(sequence(8, 2));