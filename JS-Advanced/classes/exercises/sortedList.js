class List {
    constructor() {
        this.arr = [];
        this.size = 0;
    }

    add(elemenent) {
        this.arr.push(elemenent);
        this.size++;
        this._sortArrAscending(this.arr);
    }

    remove(index) {
        this._validation(index, "remove")
        this.arr.splice(index, 1);
        this.size--;
    }
    
    get(index) {
        this._validation(index, "get")
        return this.arr[index];

    }
    _validation(index, nameFunc) {
        if (index < 0 || index >= this.size) {
            throw new Error(`Invalid index to ${nameFunc}`);
        }
    }
    _sortArrAscending(arr) {
        arr.sort((a, b) => a - b);
    }
};


let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
