var server = require("http");




function ProcessRequest(request,response)
{

	response.writeHead(200,{"Content-Type" : "text/plain"});
	response.write("Hello Melb");
	response.end();
}

server.createServer(ProcessRequest).listen(81);
console.log("Im Listening");
