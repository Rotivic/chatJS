const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join('C:\\Users\\rock_\\Desktop\\MIS_PROYECTOS\\ChatJS')));

app.get('/', (req, res) => {
    res.sendFile(path.join('index.html'));
});

io.on('connection', (socket) => {
    io.to(socket.id).emit('chat message', {username: 'System', message: 'Bienvenido al chat'});
    // socket.broadcast.emit('chat message', {message: 'Bienvenido al chat'})
    console.log('Se ha conectado un usuario', socket.id);
    socket.on('chat message', (msg) =>{
        socket.broadcast.emit('chat message', { username: msg.username, message: msg.message })
        
    })

    socket.on('disconnecting', (reason) => {
        // console.log("ta luego")
        socket.broadcast.emit('chat message', {username: 'System', message: 'Se ha marchado un usuario'});
    });
  
});



server.listen(3000, () => {
  console.log('listening on *:3000');

});