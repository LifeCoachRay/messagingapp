const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('send-text', (text) => {
        console.log(`Received text: ${text}`);
        io.emit('receive-text', text);
    });

    socket.on('send-image', (image) => {
        console.log(`Received image: ${image}`);
        io.emit('receive-image', image);
    });
});

server.listen(3333, () => {
    console.log('Server is listening on port 3333');
});
