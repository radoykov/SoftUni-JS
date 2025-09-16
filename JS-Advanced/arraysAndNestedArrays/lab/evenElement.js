function evenEl(arr) {
    let arr2 = arr.filter((value, index) => index % 2 == 0).join(' ');
    
    return arr2;
}

console.log(evenEl(['20', '30', '40', '50', '60']));
console.log(evenEl(['5', '10']));