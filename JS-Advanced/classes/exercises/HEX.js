class Hex {
    constructor(value){
        this.value = value;
    }

    valueOf(){
        return this.value;
    }
    toString(){
        return '0x' + this.value.toString(16).toUpperCase();
    }

    plus(number){
        let val = new Hex(this.value + number);
        return val;
    }

    minus(number){
        let val = new Hex(this.value - number);
        return val;
    }

    parse(string){
        string = string.slice(2);
        return parseInt(string, 16);
    }
};


let FF = new Hex(255);
console.log(FF.toString());// 0xFF
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());// 0xF
console.log(a.plus(b).toString()==='0xF');// true
console.log(a.parse('0xFF'));
