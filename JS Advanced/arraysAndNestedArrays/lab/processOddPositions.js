function oddPositions(arr){
    return arr.filter((a, i) => i % 2 !== 0)
    .map(x => x * 2)
    .reverse()
    .join(' ');

}

console.log(oddPositions([10, 15, 20, 25]));
console.log(oddPositions([3, 0, 10, 4, 7, 3]));