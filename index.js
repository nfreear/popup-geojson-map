/*!
  geojson-popup Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

'use strict';

const VERSION = '2.3.0'; // <Auto>

const superagent = require('superagent');
const utils = require('./src/utils');
const lodashish = {
  template: require('lodash.template'),
  extend: utils.extend,
  cdn: utils.cdn
};
const window = global; // || window;

require('./src/popup-geojson-map')(window, superagent, lodashish, VERSION);
