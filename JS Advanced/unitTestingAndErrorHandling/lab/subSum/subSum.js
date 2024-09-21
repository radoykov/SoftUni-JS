function subSum(arr, start, end) {
    if (Array.isArray(arr) == false) { return NaN; }
    if (start < 0) {
        start = 0;
    }
    if (end > arr.length - 1) {
        end = arr.length - 1;
    }
    if(arr.length == 0){return 0;}

    return arr.slice(start, end + 1).reduce((a, acc) => acc + Number(a));
}


export default subSum;