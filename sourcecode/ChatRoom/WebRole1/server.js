var app = require('http').createServer(handler)  
, io = require('socket.io').listen(app)  
, fs = require('fs')

app.listen(process.env.port || 4567);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) { 
       if (err) {      res.writeHead(500);
             return res.end('Error loading index.html');
                 } 
                 
                    res.writeHead(200); 
                       res.end(data); 
                        });
                }

                io.sockets.on('connection', function (socket) {
                    console.log('in connect function socket...' + socket);
                    socket.emit('update', { data: 'you are now connected' });

                   socket.on('user message', function (data) {
                        console.log('what it looks like');
                        console.log(data);

                        //back to self
                        socket.emit('update', { message: data, nick: socket.nickname });

                        //send to everyone
                        socket.broadcast.emit('update', { message: data, nick: socket.nickname });
                    });

                    socket.on('my other event', function (data) {
                        console.log(data);
                    });


                    // this bit to do with nick names....
                    var nicknames = {};
                    socket.on('nickname', function (nick) {

                        nicknames[nick] = socket.nickname = nick;
                        socket.broadcast.emit('announcement', { message: nick + ' has joined', nick: socket.nickname });

                        //hack broadcast sshould do this...
                        socket.emit('announcement', { message: nick + ' has joined', nick: socket.nickname });

                        io.sockets.emit('nicknames', nicknames);

                    });




                });




