
var app = require('http').createServer(httpHandler);
app.listen(process.env.port || 4567);

  
var io = require('socket.io').listen(app);  
var fs = require('fs');
var dateHelper = require("./dateHelper");
var azureStorageHelper = require("./azureStorageHelper");

var static = require('node-static');
var file = new(static.Server)('./public');


function httpHandler (req, res) {
    req.addListener('end', function () {

    // Serve static files!
    file.serve(req, res);
  });
}

//persist nick names
var nicknames = new Array();
      
//socket handlers...
io.sockets.on('connection', function (socket) 
              {

              //send message to whoever just connected
              socket.emit('update', { message: 'welcome to the chatroom please enter a nick name...',nick:'',date : dateHelper.CurrentDateAndTime() });

              socket.on('user message', function (data) {
                         //back to self

                         var timestamp =dateHelper.CurrentDateAndTime();

                         socket.emit('update', { message: data, nick: socket.nickname, date : timestamp });
                         //send to everyone
                         socket.broadcast.emit('update', { message: data, nick: socket.nickname , date : timestamp});
                         azureStorageHelper.LogEntry(data,socket.nickname);
                         }
                       );

              socket.on('nickname', function (nick) {
                        nicknames.push({name: nick});
                        nicknames[nick] = socket.nickname = nick;
                        socket.broadcast.emit('announcement', { message: nick + ' has joined!',  date : dateHelper.CurrentDateAndTime() });
                        socket.emit('announcement', { message: nick + ' has joined !', date : dateHelper.CurrentDateAndTime() });
                        io.sockets.emit('nicknames', nicknames);
                            }
                        );
                }
              );