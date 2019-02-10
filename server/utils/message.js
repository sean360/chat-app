const generateMessage = (from, body) => {
    return {
        from,
        body,
        dateCreated: new Date().getTime()
    }
};

const generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        body: `<a href="https://google.com/maps?q=${lat},${lng}" target="_blank">Shared Location</a>`,
        dateCreated: new Date().getTime()
    }
};

module.exports = {generateMessage, generateLocationMessage};