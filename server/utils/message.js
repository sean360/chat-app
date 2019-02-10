const moment = require('moment');

const generateMessage = (from, body) => {
    return {
        from,
        body,
        dateCreated: moment().valueOf()
    }
};

const generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        body: `<a href="https://google.com/maps?q=${lat},${lng}" target="_blank">Shared Location</a>`,
        dateCreated: moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};