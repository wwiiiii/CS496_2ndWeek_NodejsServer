var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var clients = [];

app.listen(8124, function () { console.log('start listen');});

function handler(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello from server');
}

io.sockets.on('connection', function (socket) {

    socket.on('init', function (data) {
        var cli = new Object();
        cli.fbid = data.fbid;
        cli.name = data.name;
        cli.id = socket.id;
        clients.push(cli);
        //io.sockets.connected[cli.id].send('init', data);
        io.to(cli.id).emit('init', data);
        console.log('init');
        console.log(socket.id);
        console.log(cli);
    });

    socket.on('connect', function () {
        console.log('disconnet');
        console.log(socket.id);
    });

    socket.on('disconnect', function () {
        console.log('disconnet');
        console.log(socket.id);
    });
});