var app = require('express')();
var server = require('http').Server(app);
var    io = require('socket.io').listen(server)





app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    socket.on('channel', (room) => {
            socket.room= room;
            socket.join(room);
            console.log(room)
    });



    socket.on('message',  (message) => {
        socket.broadcast.in(socket.room).emit('message', {message: message});
    });

    socket.on('disconnect', () => {
        socket.leave(socket.room)
        console.log('disconnect '+socket.room)
    });

});

server.listen(8080);
