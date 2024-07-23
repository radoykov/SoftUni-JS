function solve() {
    const arr = JSON.parse(document.querySelector('body section div#inputs textarea').value);
    let bestRestaurant = document.querySelector('body section div#outputs div#bestRestaurant p');
    let workers = document.querySelector('body section div#outputs div#workers p');

    const rest = breaker(arr);// [sum, names, nameRestaurant]
    let a = [];
    for (let i = 2; i < rest.length - 1; i += 2) {
        a.push(rest[i]);
    }
    let maxsalary = Number(a[0]);
    for (let i = 0; i < a.length; i++) {
        if (Number(a[i + 1]) > Number(a[i])) {
            maxsalary = Number(a[i + 1]);
        }
    }
    console.log(a);


    bestRestaurant.textContent = `Name: ${rest[rest.length - 1]} Average Salary: ${rest[0]} Best Salary: ${maxsalary.toFixed(2)}`;

    for (let i = 1; i < rest.length -1; i+=2) {
        workers.textContent += `Name: ${rest[i]} With Salary: ${rest[i+1]} `;
    }

}

function breaker(arr) {
    const all = [[]]; // [resNmae, names, sum];

    for (let restaurant of arr) {
        //convert arr of strings to [name, property ...] ansd get a name of the restaurant
        let [resName, names] = restaurant.split(' - ');
        names = names.split(', ');
        names = names.join(' ');
        names = names.split(' ');

        let sum = 0;
        for (let i = 1; i < names.length; i += 2) {
            sum += Number(names[i]);
        }
        sum = sum / (names.length / 2);
        sum = sum.toFixed(2);

        names.push(resName);
        names.unshift(sum);
        all.push(names);
    }
    let max = Number(all[1][0]);
    for (let i = 1; i < all.length - 1; i++) {
        if (Number(all[i + 1][0]) > Number(all[i][0])) {
            max = Number(all[i + 1][0]);
        }
    }

    for (let i = 1; i < all.length; i++) {
        if (all[i][0] == max) {
            console.log(all[i]);
            return all[i];
        }
    }
    return undefined;

}