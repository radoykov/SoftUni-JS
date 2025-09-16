function isMagic(arr) {
    let flag = true;
    let sum1, sum2;
    for (let i = 0; i < arr.length; i++) {
        sum1 = 0;
        sum2 = 0;
        for (let k = 0; k < arr.length; k++) {
            sum1 += arr[i][k];
            sum2 += arr[k][i];
        }
        if (sum1 != sum2) {
            flag = false;
        }
    }
    return flag;
}

console.log(isMagic([[4, 5, 6], [6, 5, 4], [5, 5, 5]]));
console.log(isMagic([[11, 32, 45], [21, 0, 1], [21, 1, 1]]));
console.log(isMagic([[1, 0, 0], [0, 0, 1], [0, 1, 0]]));