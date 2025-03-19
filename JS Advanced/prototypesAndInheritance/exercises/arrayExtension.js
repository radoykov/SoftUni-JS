function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (n) {
        const result = [];
        for (let i = n; i < this.length; i++) {
            result.push(this[i]);
        }

        return result;
    };

    Array.prototype.take = function (n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push(this[i]);
        }

        return result;
    };

    Array.prototype.sum = function () {
        return this.reduce((acc, c) => acc + c, 0);
    };

    Array.prototype.average = function () {
        return this.sum() / this.length;
    };
}

solve();
const arr = [1, 2, 3, 4, 5, 6];

console.log(arr.last());
console.log(arr.skip(3));
console.log(arr.take(3));
console.log(arr.sum());
console.log(arr.average());