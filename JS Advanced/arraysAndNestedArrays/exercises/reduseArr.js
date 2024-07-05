function myReduce(arr) {
    flag = true;
    arr2 = [];
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= max) {
            arr2.push(arr[i]);
            max = arr[i];
        }
    }
    return arr2;

}
console.log(myReduce([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(myReduce([1, 2, 3, 4]));
console.log(myReduce([20, 3, 2, 15, 6, 1]));