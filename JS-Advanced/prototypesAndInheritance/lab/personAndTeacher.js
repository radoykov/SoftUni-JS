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
}

class Teacher extends Person {
    constructor(firstName, lastName, email, subject) {
        super(firstName, lastName);
        this.email = email;
        this.subject = subject;
    }
}


function personAndTeacher() {
    const person = new Person('Pesho', 'Ivanov');
    const teacher = new Teacher('Atanas', 'Lilov', 'atanas.@l.gmail', 'chemistry');

    return {
        person,
        teacher
    }
}

console.log(personAndTeacher());