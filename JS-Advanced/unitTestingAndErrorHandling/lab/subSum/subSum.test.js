import subSum from './subSum.js';
import { expect } from 'chai';

describe('subSum function', () => {
    it('test with ordinary numbers', () => {
        expect(subSum([10, 20, 30, 40, 50, 60], 1, 3)).to.be.equal(90);
    });
    it('test with first element is not a array', () => {
        expect(subSum('text', 0, 2)).to.be.NaN;
    });
    it('test with empty array', () => {
        expect(subSum([], 1, 2)).to.be.equal(0);
    });
    it('test with combinated array', () => {
        expect(subSum([10, 'twenty', 30, 40], 0, 2)).to.be.NaN;
    });
    it('test with minus start', () => {
        expect(Number(subSum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1).toFixed(1))).to.be.equal(3.3);
    });
    it('test with very big end', () => {
        expect(subSum([10, 20, 30, 40, 50, 60], 3, 300)).to.be.equal(150);
    });
    it('test with minus end and big end', () => {
        expect(subSum([10, 12, 14, 18, 7], -9, 188)).to.be.equal(61);
    });
});