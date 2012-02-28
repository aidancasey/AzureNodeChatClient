var app = require('http').createServer(handler);
  
var io = require('socket.io').listen(app);  
var fs = require('fs');
var dateHelper = require("./dateHelper");
var azureStorageHelper = require("./azureStorageHelper");

var static = require('node-static');
var file = new(static.Server)('./public');

app.listen(process.env.port || 4567);

function handler (req, res) {
    req.addListener('end', function () {

    // Serve static files!
    file.serve(req, res);
  });
}

//is this the best way to persist stuff serverside ??

var nicknames = new Array();
      
io.sockets.on('connection', function (socket) 
              {
               console.log('in connect function socket...' + socket);
              socket.emit('update', { data: 'you are now connected' });


              socket.on('user message', function (data) {



                         console.log(data);

                         //back to self
                         socket.emit('update', { message: data, nick: 'socket.nickname', date : dateHelper.CurrentDateAndTime() });
                         //send to everyone
                         socket.broadcast.emit('update', { message: data, nick: 'socket.nickname' , date : dateHelper.CurrentDateAndTime()});

                         //how do I asynchronously log to azure storage here
                      azureStorageHelper.LogEntry();

                         }
                       );

              socket.on('my other event', function (data) {
                          console.log(data);
                          }
                        );

              socket.on('nickname', function (nick) {
                        nicknames.push({name: nick});
                        nicknames[nick] = socket.nickname = nick;
                        socket.broadcast.emit('announcement', { message: nick + ' has joined!',  date : dateHelper.CurrentDateAndTime() });
                        //hack broadcast sshould do this...
                        socket.emit('announcement', { message: nick + ' has joined !', date : dateHelper.CurrentDateAndTime() });
                        io.sockets.emit('nicknames', nicknames);
                            }
                        );

                }
              );
