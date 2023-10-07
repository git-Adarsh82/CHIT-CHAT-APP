const socket = io('http://localhost:8000');

const messageInput = document.getElementById('messageinp');
const sendForm = document.getElementById('send-container');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

const Uname = prompt("Enter your name to join");
if (Uname) {
    socket.emit('new-user-joined', Uname);

    sendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    });

    socket.on('user-joined', name => {
        append(`${name} just joined CHIT-CHAT`, 'right');
    });

    socket.on('receive', data => {
        append(`${data.name}: ${data.message}`, 'left');
    });

    socket.on('left', data => {
        append(`${Uname}: left the CHIT-CHAT`, 'left');
    });


} else {
    alert("Please enter a name to join the chat.");
}
