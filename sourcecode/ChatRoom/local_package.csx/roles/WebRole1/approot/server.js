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
                console.log(socket);
                socket.emit('news', { data: 'you are now connected'});
 
   socket.on('message', function (content) {
                   console.log(data);
                   socket.broadcast('message',{message: content })
                     });
                    
    socket.on('my other event', function (data) {
                   console.log(data);  });
                 });
