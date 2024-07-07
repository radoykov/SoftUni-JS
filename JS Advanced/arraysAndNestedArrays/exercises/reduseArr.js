function reducer(acc, c,){
    if (c >= acc[acc.length - 1] || acc.length == 0) {
        acc.push(c);
    }
    return acc;
}
function myReduce(arr) {

    return arr.reduce(reducer, []);
}
console.log(myReduce([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(myReduce([1, 2, 3, 4]));
console.log(myReduce([20, 3, 2, 15, 6, 1]));