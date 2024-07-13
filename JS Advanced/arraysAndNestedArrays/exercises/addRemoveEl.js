function addRem(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'add') {
            result[i] = i + 1;
        } else if (arr[i] == 'remove') {
            result.splice(i - 1, 1)
        }
    }

    if (result.length <= 0) {
        console.log('Empty');
    }
    for (let i = 0; i < result.length; i++) {

        if (result[i] != undefined) {
            console.log(result[i]);
        }
    }
}

addRem(['add', 'add', 'add', 'add']);
addRem(['add', 'add', 'remove', 'add', 'add']);
addRem(['remove', 'remove', 'remove']);