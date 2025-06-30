import { expect } from 'chai'
import numberOperations from "./numOperations.js";

describe("Num Operations", () => {
    it("pow num", () => {
        expect(numberOperations.powNumber(3)).to.be.equal(27);
        expect(numberOperations.powNumber(5)).to.be.equal(3125);
    });
    it("number checker", () => {
        expect(() => numberOperations.numberChecker('pesho').to.throw("The input is not a number!"));
        expect(numberOperations.numberChecker(50)).to.be.equal('The number is lower than 100!');
        expect(numberOperations.numberChecker(120)).to.be.equal('The number is greater or equal to 100!');
    });
    it("sum arrays", () => {
        expect(numberOperations.sumArrays([1, 2], [3, 4, 5, 6])).to.be.deep.equal([4, 6, 5, 6]);
    });
});