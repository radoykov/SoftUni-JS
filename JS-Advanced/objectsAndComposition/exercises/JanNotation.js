function calc(arr) {
    let mapper = {
        '+': function (a, b) {
            return a + b;
        },
        '-': function (a, b) {
            return a - b;
        },
        '*': function (a, b) {
            return a * b;
        },
        '/': function (a, b) {
            return a / b;
        }
    }

    let list = [];
    for (let el of arr){
        if (typeof el === 'number') {
            list.push(el);
        } else {
            let action = mapper[el];
            if (list.length >= 2) {
                let b = list.pop();
                let a = list.pop();
                list.push(action(a, b));
            } else {
                return 'Error: not enough operands!';
            }
        }
    }

    if (list.length > 1) {
        return 'Error: too many operands!';
    } else {
        return list[0];
    }
}



console.log(calc([3, 4, '+']));
console.log(calc([5, 3, 4, '*', '-']));
console.log(calc([7, 33, 8, '-']));
console.log(calc([15, '/']));