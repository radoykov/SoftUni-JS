import mathEnforcer from './mathEnforcer.js'
import { expect } from 'chai'

describe('validator function', () => {

    it('happy way 1', () => {
        expect(mathEnforcer.addFive(-4)).to.be.equal(1);
    });
    it('happy way 2', () => {
        expect(mathEnforcer.subtractTen(-4)).to.be.equal(-14);
    });
    it('happy way 3', () => {
        expect(mathEnforcer.sum(5, 4)).to.be.equal(9);
    });
    it('happy way 4', () => {
        expect(mathEnforcer.sum(-4, -8)).to.be.equal(-12);
    });
    it('happy way 5', () => {
        expect(mathEnforcer.addFive(4)).to.be.equal(9);
    });
    it('test with wrong args', () => {
        expect(mathEnforcer.addFive('5')).to.be.undefined;
    });
    it('test with wrong args', () => {
        expect(mathEnforcer.subtractTen('5')).to.be.undefined;
    });
    it('test with wrong args', () => {
        expect(mathEnforcer.sum('5', '6')).to.be.undefined;
    });
    it('test with float args', () => {
        expect(mathEnforcer.sum(5.6, 6.2)).to.be.equal(11.8);
    });
});