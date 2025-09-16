import isOddOrEven from './evenOrOdd.js'
import { expect } from 'chai'


describe('isOddOrEven function', () => {

    it('test with false values 1', () => {
        expect(isOddOrEven(['a', 'b'])).to.be.undefined;
    });
    it('test with false values 2', () => {
        expect(isOddOrEven({a:'h'})).to.be.undefined;
    });
    it('test with false values 3', () => {
        expect(isOddOrEven(isOddOrEven)).to.be.undefined;
    });

    it('test to be even', () => {
        expect(isOddOrEven('abfjrudf')).to.be.equal("even");
    });
    it('test to be odd', () => {
        expect(isOddOrEven('aad')).to.be.equal("odd");
    });

    it('test with complicated string', () => {
        expect(isOddOrEven('aad s,s 7*sd7d dzxd 4,./d8/')).to.be.equal("odd");
    });
});