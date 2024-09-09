function solve() {
    let str = '';
    const obj = {
        append(add) {
            str += add;
        },
        removeStart(num) {
            str = str.slice(num);
        },
        removeEnd(num) {
            str = str.slice(0, str.length - num);
        },
        print() {
            console.log(str);
        }
    }
    return obj;
}
let firstZeroTest = solve();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();

let secondZeroTest = solve();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();
