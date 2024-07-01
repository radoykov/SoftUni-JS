function same(number) {
    const str = number.toString();
    let flag = true;
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        let next = str[i+1];
        let current = Number(str[i]);
        if (str[i] != str[i + 1] && next != undefined) {
            flag = false;
        }
        sum += current;
    }
    return `${flag}\n${sum}`;
}

 console.log(same(2222222));
 console.log(same(1234));