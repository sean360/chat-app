const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        const from = 'Sean';
        const body = 'Hallo there';
        const message = generateMessage(from,body);
        
        expect(typeof message.dateCreated).toBe('number');
        expect(message).toMatchObject({from, body});
        
        
    })
});

describe('generateLocationMessage', () => {
    it('should return the correct location object', () => {
        const from = 'Sean';
        const lat = 1;
        const lng = 1;

        const message = generateLocationMessage(from, lat, lng);

        expect(typeof message.dateCreated).toBe('number');
        expect(message.body).toBe('<a href="https://google.com/maps?q=1,1" target="_blank">Shared Location</a>');
        expect(message).toHaveProperty('from', 'Sean');

    });
});