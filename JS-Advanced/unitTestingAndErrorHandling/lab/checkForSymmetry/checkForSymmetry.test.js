import isSymmetric from './checkForSymmetry.js';
import {expect} from 'chai';

describe('isSymmetric function', () => {
    it('happy way 1', () => { 
        expect(isSymmetric([1, 2, 3, 3, 2, 1])).to.be.true;
    });
    it('happy way 2', () => { 
        expect(isSymmetric([1, 1])).to.be.true;
    });
    it('test with odd count numbers', () => { 
        expect(isSymmetric([1, 2, 3, 2, 1])).to.be.true;
    });
    it('test with no sym arr', () => { 
        expect(isSymmetric([1, 3, 2, 1])).to.be.false;
    });
    it('tets with no array', () => { 
        expect(isSymmetric("test")).to.be.false;
    });
});