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

io.sockets.on('connection', function(socket){
    socket.on('init', function (data) {
        var cli = new Object();
        cli.fbid = data.fbid;
        cli.name = data.name;
        cli.id = socket.id;
        clients.push(cli);
        io.sockets.socket(cli.id).send('init', data);
    });
});