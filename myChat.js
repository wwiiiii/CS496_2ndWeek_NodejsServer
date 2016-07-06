var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var clients = {};
var chatlog = [];
app.listen(12345, function () { console.log('start listen');});

function handler(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello from server');
}

io.sockets.on('connection', function (socket) {
    socket.on('init', function (data) {
        clients[socket.id].myid = data.myid;
        io.to(socket.id).emit('init', chatlog);
        console.log('init');
        console.log(socket.id);
        console.log(clients[socket.id]);
        console.log(data);
        console.log(clients);
        console.log("");
    });
    socket.on('myChat', function (data) {
        var chat = clients[socket.id].myid + data.content;
        socket.broadcast.emit("otherChat", chat);
        chatlog.push(chat);
    });

    socket.on('disconnect', function () {
        console.log('disconnet');
        console.log(socket.id);
        delete clients[socket.id];
        console.log("");
    });
});
