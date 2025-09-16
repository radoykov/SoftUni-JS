class Person {
    constructor(...params) {
        if (params[0] != undefined) {
            this.firstName = params[0];
        }
        if (params[1] != undefined) {this.lastName = params[1];}
        if (params[2] != undefined) {this.age = params[2];}
        if (params[3] != undefined) {this.email = params[3];}
    }
    toString() {
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
    }
};

function personsTable() {
    const result = [];

    let person1 = new Person('Anna', 'Simpson', 22, 'anna@yahoo.com');
    let person2 = new Person('SoftUni');
    let person3 = new Person('Stephan', 'Johnson', '25');
    let person4 = new Person('Gabriel', 'Peterson', '24', 'g.p@gmail.com');

    result.push(person1);
    result.push(person2);
    result.push(person3);
    result.push(person4);

    return result;
}

console.log(personsTable());