const socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    //receive new text message
    socket.on('newMessage', (message) => {
        let markup = `<li>
        <p>${message.body}</p>
        <p>From: ${message.from}</p>
        </li>`;

        document.querySelector('#messages').insertAdjacentHTML('beforeend', markup);
    });

    //receive new location
    socket.on('newLocationMessage', (message) => {
        let markup = `<li>
        <p>${message.from}: ${message.body}</p>
        `;

        document.querySelector('#messages').insertAdjacentHTML('beforeend', markup);
    });

});

socket.on('disconnect', () => {
    console.log('Sean Left');
});

//create message
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

//location
const locationButton = document.querySelector('#send-location');

const getLocation = () => {
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }, () => {
            return alert('Cannot get your location');
        });
    }
};

locationButton.addEventListener('click', getLocation);





