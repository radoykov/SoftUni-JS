import { expect } from 'chai'
import pizzUni from "./pizzaCode.js";

describe("Pizza code for test", () => {
    const obj = {
        orderedPizza: false,
        orderedDrink: false,
        status: false
    };
    describe("method makeAnOrder", () => {
        it("ordered pizza is false", () => {
            expect(() => pizzUni.makeAnOrder(obj)).to.be.throw('You must order at least 1 Pizza to finish the order.');
        });
        it("ordered pizza is true and do not have a drink", () => {
            obj.orderedPizza = "Margarita";
            expect(pizzUni.makeAnOrder(obj)).to.be.equal(`You just ordered ${obj.orderedPizza}`);
        });
        it("ordered pizza is true and have a drink", () => {
            obj.orderedPizza = "Margarita";
            obj.orderedDrink = "Coca-Cola";
            expect(pizzUni.makeAnOrder(obj)).to.be.equal(`You just ordered ${obj.orderedPizza} and ${obj.orderedDrink}.`);
        });
    });

    describe("method getRemainingWork", () => {
        const arr = [{
            pizzaName: "Margarita",
            drinkName: "Fanta",
            status: "not ready"
        }, {
            pizzaName: "Chik-chirick",
            drinkName: "Water",
            status: "not ready"
        }];
        it("arr with not ready orders", () => {
            expect(pizzUni.getRemainingWork(arr)).to.be.equal(`The following pizzas are still preparing: Margarita, Chik-chirick.`);
        });
        it("arr with ready orders", () => {
            arr[0].status = "ready";
            arr[1].status = "ready";
            expect(pizzUni.getRemainingWork([])).to.equal("All orders are complete!");
        });
    });

    describe("method orderType", () => {

        it("For Carry Out", () => {
            expect(pizzUni.orderType(20, "Carry Out")).to.be.equal(18);
        });
        it("For Delivery", () => {
            expect(pizzUni.orderType(20, "Delivery")).to.be.equal(20);
        });
    });
});