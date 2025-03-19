
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        Object.defineProperty(this, "fullName", {
            get: function () {
                return `${this.firstName} ${this.lastName}`;
            },
            set: function (value) {
                const arr = value.split(' ');

                if (arr[0] && arr[1]) {

                    this.firstName = arr[0];
                    this.lastName = arr[1];
                }
            },
        });
    }
    toString() {
        return `${this.firstName} ${this.lastName}`;
    }
}

function extendProrotype(classToExtend) {
    classToExtend.prototype.species = "Human";
    classToExtend.prototype.toSpeciesString = function(){
        return `I am a ${this.species}. ${this.toString()}`
    };
}

extendProrotype(Person);
const x = new Person("Gosho", "Toshkov");

console.log(x.toSpeciesString());