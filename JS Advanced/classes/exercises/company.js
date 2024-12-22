class Company {
    constructor() {
        this.departments = [];
    }
    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department) {
            throw new Error("Invalid input!");
        }
        if (salary < 0) {
            throw new Error("Invalid input!");
        }

        const result = {
            username,
            salary,
            position,
            department
        };


        this.departments.push(result);

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {

        const obj = this.departments.reduce((acc, obj) => {
            if (acc[obj.department] === undefined) {
                acc[obj.department] = { "salary": 0, "count": 0 }
            }
            acc[obj.department].salary += obj.salary;
            acc[obj.department].count++;
            return acc;
        }, {});
        

        for (const key in obj) {
            obj[key] = obj[key].salary / obj[key].count;
        }
        let avgMax = Math.max(...Object.values(obj));
        let nameAvgMax;


        for (let key in obj) {
            if (obj[key] == avgMax) {
                nameAvgMax = key;
            }
        }
        let str = ''

        str += `Best Department is: ${nameAvgMax}\n Average salary: ${avgMax.toFixed(2)}\n`

        const arrPeople = this.departments.reduce((acc, obj) => {
            if (obj.department === nameAvgMax) {
                acc.push(obj);
            }
            return acc;
        }, []);

        const res = arrPeople.sort((a, b) => b.salary - a.salary || a.username.localeCompare(b.username))
                .map(x => `${x.username} ${x.salary} ${x.position} ${x.department}`);
        return str + res.join('\n');

    }
};


let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());


// Best Department is: Construction
// Average salary: 1500.00
// Stan 2000 architect
// Stanimir 2000 engineer
// Pesho 1500 electrical engineer
// Slavi 500 dyer
