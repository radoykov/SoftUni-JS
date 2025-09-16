import rgbToHexColor from './RGBToHEX.js';
import { expect } from 'chai';

describe('cardsProducer function', () => {
    it('only red', () => {
        expect(rgbToHexColor(255, 0, 0)).to.be.equal('#FF0000');
    });
    it('only blue', () => {
        expect(rgbToHexColor(0, 255, 0)).to.be.equal('#00FF00');
    });
    it('only green', () => {
        expect(rgbToHexColor(0, 0, 255)).to.be.equal('#0000FF');
    });
    it('color white', () => {
        expect(rgbToHexColor(255, 255, 255)).to.be.equal('#FFFFFF');
    });
    it('color black', () => {
        expect(rgbToHexColor(0, 0, 0)).to.be.equal('#000000');
    });
    it('random colors 1', () => {
        expect(rgbToHexColor(110, 74, 78)).to.be.equal('#6E4A4E');
    });
    it('random colors 2', () => {
        expect(rgbToHexColor(180, 182, 183)).to.be.equal('#B4B6B7');
    });
    it('random colors 3', () => {
        expect(rgbToHexColor(234, 68, 70)).to.be.equal('#EA4446');
    });
    it('random colors 4', () => {
        expect(rgbToHexColor(234, 68, 171)).to.be.equal('#EA44AB');
    });

    it('falsy values 1', () => {
        expect(rgbToHexColor(264, 68, 171)).to.be.undefined;
    });
    it('falsy values 2', () => {
        expect(rgbToHexColor(234, -1, 70)).to.be.undefined;
    });
    it('falsy values 3', () => {
        expect(rgbToHexColor(264, -1, 70)).to.be.undefined;
    });
    it('falsy values 4 str', () => {
        expect(rgbToHexColor(254, 10, '70')).to.be.undefined;
    });
});