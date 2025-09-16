function biggestEl(matrix) {
    const flatArray = matrix.flat();
    return flatArray.reduce((acc, c) =>Math.max(acc, c));
}
console.log(biggestEl([[20, 50, 10], [8, 33, 145]]));
console.log(biggestEl([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]));