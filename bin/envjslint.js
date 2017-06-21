/*!
  Simple JSON linter for '.env.js' files.
*/

/* global require, console */

const envfile = '.env.js';
const fs = require('fs');
var script = fs.readFileSync(envfile, 'utf8');

//script = script.replace(/(.*=|^\/\/.*|^;.*)/g, '');
script = script.replace(/[\n;]/g, '').replace(/.*=/, '');

const obj = JSON.parse(script);

console.info('File contains valid JSON: ' + envfile);
console.log(obj);
