
module.exports = {
  extend: extend
};

// JuhQ (16 July 2015): https://gist.github.com/pbojinov/8f3765b672efec122f66#gistcomment-1493930
function extend () {
  var extended = {};
  var key;
  var prop;

  for (key in arguments) {
    var argument = arguments[ key ];
    for (prop in argument) {
      if (Object.prototype.hasOwnProperty.call(argument, prop)) {
        extended[ prop ] = argument[ prop ];
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
