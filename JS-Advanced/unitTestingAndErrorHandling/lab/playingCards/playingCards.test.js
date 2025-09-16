import cardsProducer from './requestValidator.js';
import {expect} from 'chai';

describe('cardsProducer function', () => {
    it('test happy way 1', () => { 
        let card = cardsProducer('A', 'S');
        expect(card.toString()).to.be.equal(`A♠`);
    });
    it('test happy way 2', () => { 
        let card = cardsProducer('10', 'H');
        expect(card.toString()).to.be.equal(`10♥`);
    });
    it('test happy way 3', () => { 
        let card = cardsProducer('2', 'D');
        expect(card.toString()).to.be.equal(`2♦`);
    });
    it('test happy way 4', () => { 
        let card = cardsProducer('Q', 'C');
        expect(card.toString()).to.be.equal(`Q♣`);
    });
    it('invalid face 1', () => { 
        expect(() => cardsProducer('1', 'H')).to.throw('Invalid face');
    });
    it('invalid face 2', () => { 
        expect(() => cardsProducer('j', 'S')).to.throw('Invalid face');
    });
    it('invalid suit 1', () => { 
        expect(() => cardsProducer('K', 'P')).to.throw('Invalid suit');
    });
    it('invalid suit 2', () => { 
        expect(() => cardsProducer('A', '1')).to.throw('Invalid suit');
    });
    it('invalid face and suit 1', () => { 
        expect(() => cardsProducer('S', 'A')).to.throw('Invalid face');
    });
    it('invalid face and suit 2', () => { 
        expect(() => cardsProducer('P', 'z')).to.throw('Invalid face');
    });
});