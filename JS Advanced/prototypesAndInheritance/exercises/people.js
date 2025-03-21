function solve() {

    class Employee {
        constructro(name, age) {
            if (new.target === Employee) {// to ensure whether this is instanted from derived class
                throw new Error("Cannot instantiate directly");
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }

        work() {
            let currTask = this.tasks.shift();
            console.log(this.name + currTask);
            this.tasks.push(currTask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push('is working on a simple task.');
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push('is working on a complicated task.');
            this.tasks.push('is taking time off work.');
            this.tasks.push('is supervising junior workers.');
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push('is preparing a quarterly report.');
            this.tasks.push('scheduled a meeting.');
        }

        getSalary() {
            return this.salary + this.divident;
        }
    }

    return { Employee, Junior, Senior, Manager };
}
console.log(solve());