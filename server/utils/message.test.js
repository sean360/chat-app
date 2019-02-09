const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        const from = 'Sean';
        const body = 'Hallo there';
        const message = generateMessage(from,body);
        
        expect(typeof message.dateCreated).toBe('number');
        expect(message).toMatchObject({from, body});
        
        
    })
});