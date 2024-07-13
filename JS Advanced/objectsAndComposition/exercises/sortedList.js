function createSortedList() {
    const object = {
        arr: [],
        add(elemenent) {
            object.arr.push(elemenent);
            object.arr.sort();
            object.size++;
        },
        remove(index) {
            if (index >= 0) {
                object.arr.splice(index, 1);
                object.arr.sort();
                object.size--;
            }
        },
        get(index) {
            return object.arr[index];
        },
        size: 0

    };

    return object;
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
