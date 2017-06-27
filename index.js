/*!
  geojson-popup Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

'use strict';

var superagent = require('superagent');
var lodash = {
  template: require('lodash.template'),
  extend: require('./src/utils').extend
};
var window = global || window;

require('./src/popup-geojson-map')(window, superagent, lodash);
