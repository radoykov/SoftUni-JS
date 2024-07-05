function sortNum(arr) {
    arr.sort((a, b) => a - b);
    arr2 = [];

    for (let i = 0; i < (arr.length / 2); i++){
        arr2.push(arr[i]);
        arr2.push(arr[arr.length -i - 1]);
    }
    return arr2;
}

console.log(sortNum([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));