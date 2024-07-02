function sum(n, m) {
    let start, finish;
    start = Number(n);
    finish = Number(m);

    let sum = 0;
    for (let i = start; i <= finish; i++) {
        sum += i;
    }
    console.log(sum);
}
sum('1', '5');
sum('-8', '20');