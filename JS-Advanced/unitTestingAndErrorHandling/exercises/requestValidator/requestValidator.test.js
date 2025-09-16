import validator from './requestValidator.js'
import { expect } from 'chai'

describe('validator function', () => {

    it('happy way 1', () => {
        const input = {
            method: 'GET',
            uri: 'svn.public.catalog',
            version: 'HTTP/1.1',
            message: ''
        };

        expect(validator(input))
            .to.be.deep.equal(input);
    });
    it('happy way 2', () => {
        expect(() => validator({
            method: 'OPTIONS',
            uri: 'git.master',
            version: 'HTTP/1.1',
            message: '-recursive'
        }
        )).to.throw('Invalid request header: Invalid Method');
    });
    it('happy way 3', () => {
        expect(() => validator({
            method: 'POST',
            uri: 'home.bash',
            message: 'rm -rf /*'
        }
        )).to.throw('Invalid request header: Invalid Version');
    });
});