import createCalculator from './addAndSubtract.js';
import {expect} from 'chai';

describe('createCalculator function', () => {
    it('happy way 1', () => { 
        const obj = createCalculator();
        obj.add(2);
        obj.add(5);
        obj.subtract(9)
        expect(obj.get()).to.be.equal(-2);
    });
    it('happy way 2', () => { 
        const obj = createCalculator();
        obj.add(2);
        obj.add(5);
        expect(obj.get()).to.be.equal(7);
    });
    it('error', () => { 
        const obj = createCalculator();
        obj.add('2a');
        obj.add(5);
        obj.subtract(9)
        expect(obj.get()).to.be.NaN;
    });
});