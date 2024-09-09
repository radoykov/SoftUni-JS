function solve(arr) {

    const colection = [];

    const obj = {
        add(add) {
            colection.push(add);
        },
        remove(str) {
            colection.forEach((v, i) => {
                if (v === str) {
                    colection.splice(i, 1);
                }
            })
        },
        print() {
            console.log(colection.join(','));
        }
    }

    arr.forEach(v => {
        let [command, value] = v.split(' ');
        if (command == 'add') {
            obj.add(value);
        } else if (command == 'remove') {
            obj.remove(value);
        } else if (command == 'print') {
            obj.print();
        }

    });
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add pesho', 'add george', 'add peter', 'remove peter', 'print']);