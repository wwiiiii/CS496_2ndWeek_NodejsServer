var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var clients = [];

app.listen(8124, function () { console.log('start listen');});

function getIdxBySockID(sockid)
{
    for (var i = 0 ; i < clients.length; i++)
    {
        if (clients[i].id == sockid) return i;
    }
}

function handler(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello from server');
}

io.sockets.on('connection', function (socket) {
    var clie = new Object();
    clie.id = socket.id;
    clients.push(clie);

    socket.on('init', function (data) {
        var cli = new Object();
        var idx = getIdxBySockID(socket.id);
        data = JSON.parse(data);
        clients[i].fbid = data.fbid;
        clients[i].name = data.name;
        //io.sockets.connected[cli.id].send('init', data);
        io.to(cli.id).emit('init', data);
        console.log('init');
        console.log(socket.id);
        console.log(cli);
        console.log(data);
    });

    socket.on('connect', function () {
        console.log('connet');
        console.log(socket.id);
    });

    socket.on('disconnect', function () {
        console.log('disconnet');
        console.log(socket.id);
    });
});