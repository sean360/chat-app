const socket = io();

const scrollToBottom = () => {
    //selectors
    const messages = document.querySelector('#messages');
    const newMessageTag = document.getElementsByClassName('message');
    const newMessage = newMessageTag[newMessageTag.length - 1];
    //heights
    const clientHeight = messages.clientHeight;
    const scrollTop = messages.scrollTop;
    const scrollHeight = messages.scrollHeight;
    const newMessageHeight = newMessage.clientHeight;
    if (newMessageTag.length > 1) {
        const lastMessage = newMessage.previousElementSibling;
        const lastMessageHeight = lastMessage.clientHeight;

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop = messages.scrollHeight;
        }
    }

};

const fetchData = () => {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    return data;
};

chatDetail = fetchData();

socket.on('connect', () => {

    socket.emit('join', chatDetail, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    });
});

socket.on('disconnect', (user) => {
   
    console.log('Sean Left');
});

socket.on('updateUserList', (users) => {

  let listItems = users.reduce((result, name) => {
    
result += `<li>${name}</li>`;
    
    return result;
  }, ''); 
  resultElement = document.querySelector('.online__users');

  resultElement.innerHTML = '';
  
// Set the inner HTML
resultElement.innerHTML = listItems;
    
});

 //receive new text message
 socket.on('newMessage', (message) => {
    const formatedDate = moment(message.dateCreated);

    const source = document.getElementById("message-template").innerHTML;
    const template = Handlebars.compile(source);

    const context = {
        from: message.from,
        body: message.body,
        dateCreated: formatedDate.format('h:mm a')
    };
    const html = template(context);

    document.querySelector('#messages').insertAdjacentHTML('beforeEnd', html);
    scrollToBottom();
});

//receive new location
socket.on('newLocationMessage', (message) => {
    const formatedDate = moment(message.dateCreated);

    const source = document.getElementById("location-template").innerHTML;
    const template = Handlebars.compile(source);

    const context = {
        from: message.from,
        body: message.body,
        dateCreated: formatedDate.format('h:mm a')
    };
    const html = template(context);

    document.querySelector('#messages').insertAdjacentHTML('beforeEnd', html);
    scrollToBottom();
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

document.querySelector("#submit").addEventListener("click", (e) => {

    e.preventDefault();
    createMessage();
});

//location
const locationButton = document.querySelector('#send-location');

const getLocation = () => {

    locationButton.setAttribute('disabled', true);
    locationButton.innerText = 'Finding Location...';

    if (!navigator.geolocation) {
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

const addFocus = () => {
    
    const textBox = document.querySelector('#messageBody');

    textBox.focus();
}

document.querySelector('#messageBody').addEventListener('click', () => {
    addFocus();
})





