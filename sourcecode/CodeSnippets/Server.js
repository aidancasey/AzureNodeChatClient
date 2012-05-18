var server = require("http");

function ProcessRequest(request,response)
{
	console.log("process request");
	
	response.writeHead(200,{"Content-Type" :"text/plain"});
	response.write("Hello Melbourne !");
	response.end();

}

server.createServer(ProcessRequest).listen(81);
console.log("I'm listening !");