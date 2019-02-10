const socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    //receive new text message
    socket.on('newMessage', (message) => {
        let markup = `<li>
        <p>${message.from}: ${message.body}</p>
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
const createMessage = () => {

    const messageTextBox = document.querySelector("#messageBody");

    socket.emit('createMessage', {
        from: 'User',
        body: messageTextBox.value
    }, (callback) => {
        console.log(callback);
        messageTextBox.value = '';
    });
}

document.querySelector("#submit").addEventListener("click", (e) =>  {

    e.preventDefault();
    createMessage();
});

//location
const locationButton = document.querySelector('#send-location');

const getLocation = () => {

    locationButton.setAttribute('disabled', true);
    locationButton.innerText = 'Finding Location...';

    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
        
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            locationButton.removeAttribute('disabled');
            locationButton.innerText = 'Send Location';
        }, () => {
            locationButton.removeAttribute('disabled');
            locationButton.innerText = 'Send Location';
            return alert('Cannot get your location');
        });
    }
};

locationButton.addEventListener('click', getLocation);





