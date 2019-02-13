//installed moduels
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const { isRealString } = require('./utils/validation');

const { Users } = require('./utils/users');

//node modules
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (chatDetail, callback) => {
        if (!isRealString(chatDetail.name) || !isRealString(chatDetail.room)) {
            return callback('Name and room name are required');
        }
        socket.join(chatDetail.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, chatDetail.name, chatDetail.room);

        io.to(chatDetail.room).emit('updateUserList', users.getUserList(chatDetail.room));
        socket.emit('newMessage', generateMessage('Admin', `Hey there... welcome ${chatDetail.name}`));
        socket.broadcast.to(chatDetail.room).emit('newMessage', generateMessage('Admin', `${chatDetail.name} has joined the chat`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        user = users.getUser(socket.id);
        io.emit('newMessage', generateMessage(user.name, message.body));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        user = users.getUser(socket.id);
        io.emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`app is running on ${port}`);
});

//socket.leave(roomName)

        //io.emit -> io.to(roomName).emit
        //this emits to every connected user
        //socket.broadcast.emit -> socket.broadcast.to(roomName).emit
        //send to everyone connected to socket server exept the current user
        //socket.emit
        //emits event to one user