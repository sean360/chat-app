//installed moduels
const express = require('express');
const socketIO = require('socket.io');

//node modules
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', generateMessage('Admin', 'Hey there... welcome username'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the board'));
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from,message.body));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.lat, coords.lng));
    });

    socket.on('disconnect', () => {
        console.log('Got disconnect!');
    });
});

server.listen(port, () => {
    console.log(`app is running on ${port}`);
});