const socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.on('userJoined', (message) => {
        console.log(message);
    });

    socket.on('userGreeting', (greeting) => {
        console.log(greeting);
    });

    socket.on('newMessage', (message) => {
        console.log(message);
    });

});

socket.on('disconnect', () => {
    console.log('Sean Left');
});



