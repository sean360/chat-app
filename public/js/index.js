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
        let markup = `<li>
        <p>${message.body}</p>
        <p>From: ${message.from}</p>
        </li>`;

        document.querySelector('#messages').insertAdjacentHTML('beforeend', markup);
    });

    socket.emit('createMessage', {
        from: 'Json',
        body: 'hello there'
    }, (callback) => {
        console.log(callback);
    });

});

socket.on('disconnect', () => {
    console.log('Sean Left');
});

document.querySelector("#submit").addEventListener("click", (e) =>  {

    e.preventDefault();

    const message = document.querySelector("#messageBody").value;

    socket.emit('createMessage', {
        from: 'Admin',
        body: message
    }, (callback) => {
        console.log(callback);
    });
});



