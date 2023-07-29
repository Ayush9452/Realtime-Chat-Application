const socket = io('http://localhost:5000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.Container');

var audio = new Audio('snd_fragment_retrievewav-14728.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, `right`);
    socket.emit('send', message);
    messageinput.value = '';
})

const name = prompt("Enter Your Name To Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})