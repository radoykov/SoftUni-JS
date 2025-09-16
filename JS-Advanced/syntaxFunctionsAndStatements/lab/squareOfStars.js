function stars(num) {
    if (num == undefined) {
        num = 5;
    }
    for (let i = 0; i < num; i++) {
        console.log('* '.repeat(num));
    }
}
stars(1);
console.log('------');
stars(2);
console.log('------');

stars(5);
console.log('------');

stars();
