function cooking(number, oper1, oper2, oper3, oper4, oper5) {
    let num;
    num = Number(number);
    let a = 0;
    a = calc(oper1, num);
    a = calc(oper2, a);
    a = calc(oper3, a);
    a = calc(oper4, a);
    a = calc(oper5, a);
}

function calc(variable, num) {
    switch (variable) {
        case "chop":
            num = num / 2;
            break;
        case "dice":
            num = Math.sqrt(num);
            break;
        case "spice":
            num += 1;
            break;
        case "bake":
            num = num * 3;
            break;
        case "fillet":
            num = num - (num * 20 / 100)
            break;
    }
    console.log(num);
    return num;
}

cooking('32', 'chop', 'chop', 'chop', 'chop', 'chop');
console.log('\n');
cooking('9', 'dice', 'spice', 'chop', 'bake', 'fillet');