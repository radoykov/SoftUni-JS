function diaSum(arr) {
    let arr2 = [0, 0];
    for (let i = 0; i < arr.length; i++) {
        arr2[0] += arr[i][i];
        arr2[1] += arr[i][arr.length - i - 1];
    }
    return arr2.join(' ');
}

console.log(diaSum([[20, 40], [10, 60]]));
console.log(diaSum([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]));