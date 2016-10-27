/*!
  Simple JSON linter for '.env.js' files.
*/

/* global require, console */

var envfile = '.env.js';
var fs = require('fs');
var script = fs.readFileSync(envfile, 'utf8');

//script = script.replace(/(.*=|^\/\/.*|^;.*)/g, '');
script = script.replace(/[\n;]/g, '').replace(/.*=/, '');

var obj = JSON.parse(script);

console.info('File contains valid JSON: ' + envfile);
console.log(obj);
