class juice {
    constructor(arr) {
        this.arr = arr;
    }

    sumUpBottles() {
        const result = this.arr.reduce((arr, v) => {
            let [name, qual] = v.split(' => ');
            qual = Number(qual);

            arr[0][name] == undefined ? arr[0][name] = qual : arr[0][name] += qual;
            if(qual >= 1000 && arr[1][name] == undefined){
                arr[1][name] = name;
            }
            return arr;
        }, [{}, {}]);

        for(let val in result[1]){

            console.log(`${val} => ${Math.floor(result[0][val] / 1000)}`);
        }
    }
};

const a = new juice(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
);

a.sumUpBottles();

const b = new juice(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
);
console.log('------');
b.sumUpBottles();