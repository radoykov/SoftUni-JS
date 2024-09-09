function sortAscDescOrder(arr, delimiter) {
    if (delimiter == 'asc') {
        return arr.sort((a, b) => a - b);
    } else {
        return arr.sort((a, b) => b - a);
    }
}

console.log(sortAscDescOrder([14, 7, 17, 6, 8], 'asc'));
console.log(sortAscDescOrder([14, 7, 17, 6, 8], 'desc'));