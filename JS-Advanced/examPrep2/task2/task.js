class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    set budget(num) {
        if (num < 0) {
            throw Error("The budget cannot be a negative number");
        }
        this._budget = num;
    }

    shopping(product) {

        if (this._budget < product[1]) {
            throw Error("Not enough money to buy this product");
        }
        this.products.push(product[0]);
        this._budget -= product[1];
        console.log(`You have successfully bought ${product[0]}!`);

    }

    recipes(recipe) {
        for (let product of recipe.productsList) {
            if (this.products.includes(product) == false) {
                throw Error("We do not have this product");
            }
        }
        this.dishes.push(recipe);
        console.log(`${recipe.recipeName} has been successfully cooked!`);
    }

    inviteGuests(name, dish) {
        if (this.dishes.includes(dish)) {
            throw Error("We do not have this dish");
        }
        if (this.guests[name] == true) {
            throw Error("This guest has already been invited");
        }
        this.guests[name] = dish;

        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let str = "";
        
        
        for(let guestName in this.guests) {
            let arr = this.dishes.filter(obj => obj.recipeName == this.guests[guestName]);;
            str += `${guestName} will eat ${this.guests[guestName]}, which consists of ${arr[0].productsList.join(', ')}. `;
        }
        return str;
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance()); //Ivan will eat Oshav, which consists of Fruits, Honey 
// Petar will eat Folded cabbage leaves filled with rice, which consists of Cabbage, Rice, Salt, Savory
// Georgi will eat Peppers filled with beans, which consists of Beans, Peppers, Salt

