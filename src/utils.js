/**
 *  Utility functions.
 *
 *  © Nick Freear, 2017 | License: MIT.
 */

module.exports = {

  extend: extend,

  cdn: function (CFG) {
    const orig = CFG.geoJsonOrig = CFG.geoJson;

    CFG.geoJson = orig.replace('{cdn}', CFG.cdn);
    return CFG.geoJson;
  }
};

// JuhQ (16 July 2015): https://gist.github.com/pbojinov/8f3765b672efec122f66#gistcomment-1493930
function extend () {
  const extended = {};
  let key;
  let prop;

  for (key in arguments) {
    const argument = arguments[key];
    for (prop in argument) {
      if (Object.prototype.hasOwnProperty.call(argument, prop)) {
        extended[prop] = argument[prop];
      }
    }
  }
  return extended;
}

/* function replaceObj (str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(re, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
} */
