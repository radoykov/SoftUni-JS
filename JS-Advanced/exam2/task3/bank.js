class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }
    newCustomer(customer) {//{firstName, lastName, personalId, totalMoney, [transactions]} => customer
        if (this.allCustomers.some(e => e.personalId == customer.personalId)) {
            throw Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        }
        customer.totalMoney = 0;
        customer.transactions = [];
        this.allCustomers.push(customer);
        return customer;
    }
    depositMoney(personalId, amount) {
        let element = this.allCustomers.find(e => e.personalId == personalId);
        if (element == undefined) {
            throw Error("We have no customer with this ID!");
        }
        element.totalMoney += amount;
        element.transactions.push(`${element.firstName} ${element.lastName} made deposit of ${amount}$!`);
        return `${element.totalMoney}$`;
    }
    withdrawMoney(personalId, amount) {
        let element = this.allCustomers.find(e => e.personalId == personalId);
        if (element == undefined) {
            throw Error("We have no customer with this ID!");
        }
        if (element.totalMoney - amount < 0) {
            throw Error(`${element.firstName} ${element.lastName} does not have enough money to withdraw that amount!”`);
        }
        element.totalMoney -= amount;
        element.transactions.push(`${element.firstName} ${element.lastName} withdrew ${amount}$!`);

        return `${element.totalMoney}$`;
    }
    customerInfo(personalId) {
        let element = this.allCustomers.find(e => e.personalId == personalId);
        if (element == undefined) {
            throw Error("We have no customer with this ID!");
        }
        let res = `Bank name: ${this._bankName}\nCustomer name: ${element.firstName} ${element.lastName}\nCustomer ID: ${element.personalId}\nTotal Money: ${element.totalMoney}$\nTransactions:\n`;

        for (let i = element.transactions.length - 1; i >= 0; i--) {
            res += `${i + 1}. ${element.transactions[i]}\n`;
        }
        return res;
    }
}

let bank = new Bank("SoftUni Bank");

console.log(bank.newCustomer({ firstName: "Svetlin", lastName: "Nakov", personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: "Mihaela", lastName: "Mileva", personalId: 4151596 }));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
/*{ firstName: ‘Svetlin’, lastName: ‘Nakov’, personalId: 6233267 } 
{ firstName: ‘Mihaela’, lastName: ‘Mileva’, personalId: 4151596 }
500$
375$
Bank name: SoftUni Bank
Customer name: Svetlin Nakov
Customer ID: 6233267
Total Money: 375$
Transactions:
3. Svetlin Nakov withdrew 125$!
2. Svetlin Nakov made depostit of 250$!
1. Svetlin Nakov made depostit of 250$!
*/