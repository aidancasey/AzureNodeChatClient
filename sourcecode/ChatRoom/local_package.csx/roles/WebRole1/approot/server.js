var app = require('http').createServer(handler);
  
var io = require('socket.io').listen(app);  
var fs = require('fs');

var static = require('node-static');
var file = new(static.Server)('./public');

app.listen(process.env.port || 4567);

function handler (req, res) {
    req.addListener('end', function () {

    // Serve static files!
    file.serve(req, res);
  });
}

var nicknames = new Array();
      
io.sockets.on('connection', function (socket) {
      console.log('in connect function socket...' + socket);
       socket.emit('update', { data: 'you are now connected' });


      socket.on('user message', function (data) {



                 console.log(data);

                 //back to self
                 socket.emit('update', { message: data, nick: 'socket.nickname', date : CurrentDateAndTime() });
                 //send to everyone
                 socket.broadcast.emit('update', { message: data, nick: 'socket.nickname' , date : CurrentDateAndTime()});
                 }
               );

      socket.on('my other event', function (data) {
                  console.log(data);
                  }
                );

      socket.on('nickname', function (nick) {
                nicknames.push({name: nick});
                nicknames[nick] = socket.nickname = nick;
                socket.broadcast.emit('announcement', { message: nick + ' has joined!',  date : CurrentDateAndTime() });
                //hack broadcast sshould do this...
                socket.emit('announcement', { message: nick + ' has joined !', date : CurrentDateAndTime() });
                io.sockets.emit('nicknames', nicknames);
                    }
                );

                }
              );

function CurrentDateAndTime()
{
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
if (month < 10){
  month = "0" + month;
}

var day = currentTime.getDate()
if (day < 10){
  day = "0" + day;
}

var year = currentTime.getFullYear()

var hours = currentTime.getHours();

var minutes = currentTime.getMinutes();
if (minutes < 10){
  minutes = "0" + minutes;
}
var seconds = currentTime.getSeconds();
if (seconds < 10){
  seconds = "0" + seconds;
}

  var now =  day + '/' + month + '/' + year + '   :' +  hours + ':' + minutes + ':' + seconds;
return now;  
}


