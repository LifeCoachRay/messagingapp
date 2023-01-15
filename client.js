const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
const imageInput = document.getElementById('image');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(messageInput.value) {
    socket.emit('send-text', messageInput.value);
    messageInput.value = '';
  }
  if(imageInput.files.length) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      socket.emit('send-image', e.target.result);
    }
    reader.readAsDataURL(file);
    imageInput.value = '';
  }
});

socket.on('http://localhost:3333/receive-text', (data) => {
  output.innerHTML += `<p>${data}</p>`;
});

socket.on('http://localhost:3333/receive-image', (data) => {
  output.innerHTML += `<img src="${data}" style="max-width: 100%;">`;
});

