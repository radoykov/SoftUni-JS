function solve() {
    String.prototype.ensureStart = function (str) {
        if (!this.includes(str)) {
            return str + this;// it will make new string
        }
        return String(this);
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.includes(str)) {
            return this + str;
        }
        return this;
    };

    String.prototype.isEmpty = function () {
        return this ? true : false
    };

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return String(this);
        }
        if (n < 4) {
            return '.'.repeat(n);
        }
        if (this.indexOf(' ') === -1) {
            return this.slice(0, n - 3) + '...';
        }
        const words = this.split(' ');
        let result = '';
        for (let word of words) {
            if ((result + word).length + 3 > n) {
                return result.trim() + '...';
            }
            result += word + ' ';
        }
    }
    String.format = function (string, ...params) {
        return string.replace(/{(\d+)}/g, function (match, number) {
            return typeof params[number] !== 'undefined' ? params[number] : match;
        });
    };
}

solve();

let str = 'my string';
str = str.ensureStart('my');     //'my string'
console.log(str);
str = str.ensureStart('hello '); //'hello my string'
console.log(str);
str = str.truncate(16);          //'hello my string'
console.log(str);
str = str.truncate(14);          //'hello my...'
console.log(str);
str = str.truncate(8);           //'hello...'
console.log(str);
str = str.truncate(4);           //'h...'
console.log(str);
str = str.truncate(2);           //'..'
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown'); // 'The quick brown fox
console.log(str);
str = String.format('jumps {0} {1}', 'dog'); // 'jumps dog {1}'
console.log(str);