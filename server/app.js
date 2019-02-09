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

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            body: message.body,
            date: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Got disconnect!');
    });
});

server.listen(port, () => {
    console.log(`app is running on ${port}`);
});