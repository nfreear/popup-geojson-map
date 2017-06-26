/*!
  Web server for examples.

  In a terminal, type:
      npm start
      # node bin/index.js

  In a browser, visit:
      http://localhost:9000/example/world.html

  http://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http

  © Nick Freear, 27 October 2016.
*/


/* global require, console, __dirname */

const PORT = 9000;
const static = require('node-static');
const path = require('path').join;
const fileServer = new static.Server(path(__dirname, '..'));

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(PORT); //(8080);


console.info('Web server running...');
console.info('Visit: http://localhost:%d/example/world.html', PORT);
console.info('Type control + C to exit.');
