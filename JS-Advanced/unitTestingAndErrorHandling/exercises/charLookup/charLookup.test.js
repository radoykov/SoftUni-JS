import lookupChar from './charLookup.js'
import { expect } from 'chai'


describe('lookupChar function', () => {

    it('test with false values 1', () => {
        expect(lookupChar(['s', 'float'], 1)).to.be.undefined;
    });
    it('test with false values 2', () => {
        expect(lookupChar({ 'Strings are lorem ipsum.': 4 }, -8)).to.be.undefined;
    });
    it('test with false values 3', () => {
        expect(lookupChar('Strings are lorem ipsum.', 79)).to.be.equal('Incorrect index');
    });
    it('test with true values', () => {
        expect(lookupChar('Strings are lorem ipsum.', 10)).to.be.equal('e');
    });
    it('test with true values', () => {
        expect(lookupChar('Strings are lorem ipsum.', 4)).to.be.equal('n');
    });

});