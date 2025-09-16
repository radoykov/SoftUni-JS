import { expect } from 'chai'
import dealership from "./dealership.js";

describe("Dealership", () => {
    describe('newCarCost', () => {
        it('newCarCost with discount', () => {
            expect(dealership.newCarCost("Audi A8 D5", 80000)).to.be.equal(55000);
        });
        it('newCarCost without discount', () => {
            expect(dealership.newCarCost("Audi A8 KK", 80000)).to.be.equal(80000);
        });
    });
    describe('carEquipment', () => {
        it('carEquipment with extras ', () => {
            expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [0, 2, 3])).to.be.deep.equal(['heated seats', 'sport rims', 'navigation']);
        });
        it('carEquipment without extras ', () => {
            expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [])).to.be.deep.equal([]);
        });
    });
    describe('euroCategory', () => {
        it('euroCategory upper than 4 ', () => {
            expect(dealership.euroCategory(6)).to.be.equal('We have added 5% discount to the final price: 14250.');
        });
        it('euroCategory less than 4', () => {
            expect(dealership.euroCategory(2)).to.be.equal('Your euro category is low, so there is no discount from the final price!');
        });
    });
}); 