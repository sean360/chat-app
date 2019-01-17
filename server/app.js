//installed moduels
const express = require('express');
const socketIO = require('socket.io');

//node modules
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(publicPath);

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('Got disconnect!');
    });
});

server.listen(port, () => {
    console.log(`app is running on ${port}`);
});