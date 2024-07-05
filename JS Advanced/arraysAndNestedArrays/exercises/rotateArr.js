function rotate(arr, count) {
    let a;
    for (let i = 0; i < count; i++) {
        a = arr.pop();
        arr.unshift(a);
    }
    return arr.join(' ');
}

console.log(rotate(['1', '2', '3', '4'], 2));
console.log(rotate(['Banana', 'Orange', 'Coconut', 'Apple'], 15));
