function printEl(arr, step) {
    arr.filter((element, index) => index % step == 0).forEach(element => console.log(element));

}
printEl(['5', '20', '31', '4', '20'], 2);
printEl(['dsa', 'asd', 'test', 'tset'], 2);
printEl(['1', '2', '3', '4', '5'], 6);