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

class Teacher extends Person {
    constructor(firstName, lastName, email, subject) {
        super(firstName, lastName);
        this.email = email;
        this.subject = subject;
    }
    toString() {
        return `${super.toString()} ${this.email} ${this.subject}`;
    }
}

class Student extends Person {
    constructor(firstName, lastName, email, course) {
        super(firstName, lastName);
        this.email = email;
        this.course = course;
    }
    toString() {
        return `${super.toString()}, email: ${this.email}, course: ${this.course}`;
    }
}

function toStringExtension() {
    const x = new Person('Pesho', 'Ivanov');
    const y = new Teacher('Atanas', 'Lilov', 'atanas@gmail.com', 'chemistry');
    const z = new Student('Gosho', 'Penov', 'g.p@gmail.com', 'matematics');


    return {
        x,
        y,
        z
    }
}


console.log(toStringExtension());
console.log(toStringExtension().y.toString());