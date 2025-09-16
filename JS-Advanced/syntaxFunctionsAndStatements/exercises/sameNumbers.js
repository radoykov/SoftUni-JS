function same(number) {
    const str = number.toString();
    let flag = true;
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[0] != str[i]) {
            flag = false;
        }
        sum += Number(str[i]);
    }

    return `${flag}\n${sum}`;
}

console.log(same(2222222));
console.log(same(1234));