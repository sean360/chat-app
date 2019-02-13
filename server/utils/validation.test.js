const expect = require('expect');

//import the function to test

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should return valid string', () => {

        const foo = 'foo';
        const bar = ' ';

        const valid = isRealString(foo);
        const invalid = isRealString(bar)

        expect(valid).toBeTruthy();
        expect(invalid).toBeFalsy();

    });
});