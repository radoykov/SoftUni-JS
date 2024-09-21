import printDeckOfCards from './deckOfCards.js';
import {expect} from 'chai';

describe('cardsProducer function', () => {
    it('testing with truety variables 1', () => { 
        expect(printDeckOfCards(['AS', '10D', 'KH', '2C'])).to.be.equal(`A♠ 10♦ K♥ 2♣`);
    });
    it('testing with truety variables 2', () => { 
        expect(printDeckOfCards(['5S', '3D', 'QD', '2C'])).to.be.equal(`5♠ 3♦ Q♦ 2♣`);
    });
    it('testing with falsy variables', () => { 
        expect(printDeckOfCards(['5S', '3D', 'QD', '1C'])).to.be.equal(`Invalid card: 1C`);
    });
    
});