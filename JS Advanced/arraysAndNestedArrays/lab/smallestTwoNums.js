function smallestNums(arr) {
    let small = [];
    small[0] = arr.reduce((acc, c) => (c < acc ? acc = c : acc), arr[0]);
    arr.splice(arr.indexOf(small[0]), 1);
    small[1] = arr.reduce((acc, c) => (c < acc ? acc = c : acc), arr[0]);
    console.log(small.join(' '));
}
smallestNums([30, 15, 50, 5]);
smallestNums([3, 0, 10, 4, 7, 3]);