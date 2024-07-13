function printEl(arr, step) {
   return  arr.filter((element, index) => index % step == 0);

}
console.log(printEl(['5', '20', '31', '4', '20'], 2));
console.log(printEl(['dsa', 'asd', 'test', 'tset'], 2));
console.log(printEl(['1', '2', '3', '4', '5'], 6));