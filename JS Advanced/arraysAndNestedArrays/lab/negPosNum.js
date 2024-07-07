function nums(arr) {
    let newArr = [];
    for (num of arr) {
        if(num<0){
            newArr.unshift(num);
        } else if(num >=0){
            newArr.push(num);
        }

    }

    return newArr.join('\n');
}

console.log(nums([7, -2, 8, 9]));
console.log('---');
console.log(nums([3, -2, 0, -1]));