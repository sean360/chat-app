const generateMessage = (from, body) => {
    return {
        from,
        body,
        dateCreated: new Date().getTime()
    }
};

module.exports = {generateMessage};