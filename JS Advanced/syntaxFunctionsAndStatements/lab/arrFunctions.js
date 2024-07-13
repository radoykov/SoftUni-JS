function array(arr) {
    let sum1 = 0;
    let sum2 = 0;
    str = '';

    for (let num of arr) {
        sum1 += num;
        sum2 += (1 / num);
        str = str.concat(num);
    }
    console.log(sum1);
    console.log(sum2);
    console.log(str);
}

array([1, 2, 3]);
array([2, 4, 8, 16]);
