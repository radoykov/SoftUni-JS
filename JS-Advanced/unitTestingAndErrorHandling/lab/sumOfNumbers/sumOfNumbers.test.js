import sum from './sumOfNumbers.js';
import {expect} from 'chai';

describe('sum function', () => {
    it('test with single number', () =>{
        expect(sum([1])).to.be.equal(1);
    });
    it('test with three same numbers', () =>{
        expect(sum([10, 10, 10])).to.be.equal(30);
    });
    it('test with different numbers', () =>{
        expect(sum([1, 2, -9])).to.be.equal(-6);
    });
    it('test with minus numbers', () =>{
        expect(sum([-1, -9, -5])).to.be.equal(-15);
    });
});