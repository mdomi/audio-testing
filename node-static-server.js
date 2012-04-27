var static = require('node-static');
var port = parseInt(process.argv[2], 10);
var fileServer = new static.Server('.', {
    cache: false
});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file
				console.log('HTTP/' + request.httpVersion + ' ' 
					+ request.method + ' ' + request.url + ' ' 
					+ err.status);
                // Respond to the client
				if (err.status === 404) {
					fileServer.serveFile('./404.html', 404, {}, request, response);
				}
                //response.writeHead(err.status, err.headers);
                //response.end();
            } else {
				console.log('HTTP/' + request.httpVersion + ' ' 
					+ request.method + ' ' + request.url + ' ' 
					+ response.statusCode);
			}
        });
    });
}).listen(port);