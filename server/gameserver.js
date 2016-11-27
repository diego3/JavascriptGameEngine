

// Create an HTTP Server
var http = require('http');
 
// Create a simple web server that returns the same response for any request
var server = http.createServer(function(request,response){
    console.log('Received HTTP request for url ', request.url);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("This is a simple node.js HTTP server.");
});
 
// Listen on port 8080
server.listen(8080,function(){
    console.log('Server has started listening on port 8080');
});