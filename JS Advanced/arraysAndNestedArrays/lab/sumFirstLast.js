function sumFirstLast(arr){
    //arr = arr.map(Number)
    let sum = 0;
    sum += Number([...arr].pop());
    sum += Number([...arr].shift());
    return sum;
}

console.log(sumFirstLast(['20', '30', '40']));
console.log(sumFirstLast(['5', '10']));
console.log(sumFirstLast(['15']));