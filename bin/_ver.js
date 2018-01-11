#!/usr/bin/env node

/**
 * CLI. Implant `package.version` in index.js, README.md etc.
 *
 * @copyright © Nick Freear, 04-June-, 25-June-2017.
 * @license   MIT
 * @see       https://github.com/nfreear/gaad-widget
 */

const replace = require('replace');
const INDEX_JS = path('/../index.js');
const README = path('/../README.md');
// const TEST_HTML = path('/../example/world.html');
const PKG = require('../package.json');
const VERSION_TAG = PKG.version; // Was: .replace(/\.0(-.+)?/, '$1');
const LEAFLET_VER = PKG.peerDependencies.leaflet;

console.warn('VERSION_TAG :', VERSION_TAG);
console.warn('Leaflet JS  :', LEAFLET_VER);

replace({
  paths: [ INDEX_JS ],
  regex: /VERSION = '.+';(.+Auto.)?/,
  replacement: version('VERSION = \'%s\'; // <Auto>'),
  count: true,
  recursive: false
});

replace({
  paths: [ INDEX_JS ],
  regex: /@version \d\.\d\.\d(-[.\w]+)?/,
  replacement: version('@version %s'),
  count: true,
  recursive: false
});

replace({
  paths: [ README ],  // TEST_HTML ?
  regex: /\/(geojson-popup|popup-geojson-map)(\/|@)(\d\.\d\.\d(-[.\w]+)?)/g,
  replacement: version('/geojson-popup$2%s'),
  count: true,
  recursive: false
});

replace({
  paths: [ ex('historic'), ex('resume'), ex('world') ],
  regex: /leaflet\@\d\.\d\.\d/g,
  replacement: 'leaflet@' + LEAFLET_VER,
  count: true,
  recursive: false
});

function ex (base) {
  return require('path').join(__dirname, '../example', base + '.html');
}

function path (file) {
  return require('path').join(__dirname, file);
}

function version (str) {
  return str.replace('%s', VERSION_TAG);
}
