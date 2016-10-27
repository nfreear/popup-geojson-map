/*!
  Web server for examples.

  In a terminal, type:
      npm run server
      # node bin/index.js

  In a browser, visit:
      http://localhost:9000/example/world.html

  http://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http

  © Nick Freear, 27 October 2016.
*/


/* global require, console */

var port = 9000;
var static = require('node-static');

var fileServer = new static.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port); //(8080);


console.info('Web server running...');
console.info('Visit: http://localhost:' + port + '/example/world.html');
console.info('Type control + C to exit.');
