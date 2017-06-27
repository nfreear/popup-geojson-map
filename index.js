/*!
  geojson-popup Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

'use strict';

var VERSION = '2.0.0-beta'; // <Auto>

var superagent = require('superagent');
var utils = require('./src/utils');
var lodashish = {
  template: require('lodash.template'),
  extend: utils.extend,
  cdn: utils.cdn
};
var window = global; // || window;

require('./src/popup-geojson-map')(window, superagent, lodashish, VERSION);
