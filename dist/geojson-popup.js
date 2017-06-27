(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*!
  geojson-popup Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

'use strict';

var VERSION = '2.0.0-beta'; 

var superagent = require('superagent');
var utils = require('./src/utils');
var lodashish = {
  template: require('lodash.template'),
  extend: utils.extend,
  cdn: utils.cdn
};
var window = global; 

require('./src/popup-geojson-map')(window, superagent, lodashish, VERSION);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./src/popup-geojson-map":13,"./src/utils":14,"lodash.template":4,"superagent":6}],2:[function(require,module,exports){



if (typeof module !== 'undefined') {
  module.exports = Emitter;
}



function Emitter(obj) {
  if (obj) return mixin(obj);
};



function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}



Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};



Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};



Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};



Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};



Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};



Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],3:[function(require,module,exports){



var reInterpolate = /<%=([\s\S]+?)%>/g;

module.exports = reInterpolate;

},{}],4:[function(require,module,exports){
(function (global){

var reInterpolate = require('lodash._reinterpolate'),
    templateSettings = require('lodash.templatesettings');


var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;


var argsTag = '[object Arguments]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';


var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;


var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;


var reIsUint = /^(?:0|[1-9]\d*)$/;


var reNoMatch = /($^)/;


var reUnescapedString = /['\n\r\u2028\u2029\\]/g;


var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};


var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;


var root = freeGlobal || freeSelf || Function('return this')();


function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}


function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}


function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}


function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}


function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}


function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}


var objectProto = Object.prototype;


var hasOwnProperty = objectProto.hasOwnProperty;


var objectToString = objectProto.toString;


var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;


var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;


var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;


function arrayLikeKeys(value, inherited) {
  
  
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}


function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}


function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}


function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}


function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}


function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}


function baseToString(value) {
  
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}


function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}


function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}


function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}


function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}


function eq(value, other) {
  return value === other || (value !== value && other !== other);
}


function isArguments(value) {
  
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}


var isArray = Array.isArray;


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}


function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  return (objectToString.call(value) == errorTag) ||
    (typeof value.message == 'string' && typeof value.name == 'string');
}


function isFunction(value) {
  
  
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}


function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}


function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}


function toString(value) {
  return value == null ? '' : baseToString(value);
}


var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}


function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}


function template(string, options, guard) {
  
  
  
  var settings = templateSettings.imports._.templateSettings || templateSettings;

  if (guard && isIterateeCall(string, options, guard)) {
    options = undefined;
  }
  string = toString(string);
  options = assignInWith({}, options, settings, assignInDefaults);

  var imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
      importsKeys = keys(imports),
      importsValues = baseValues(imports, importsKeys);

  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";

  
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');

  
  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    
    
    return match;
  });

  source += "';\n";

  
  
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function() {
    return Function(importsKeys, sourceURL + 'return ' + source)
      .apply(undefined, importsValues);
  });

  
  
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}


var attempt = baseRest(function(func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});

module.exports = template;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash._reinterpolate":3,"lodash.templatesettings":5}],5:[function(require,module,exports){
(function (global){

var reInterpolate = require('lodash._reinterpolate');


var INFINITY = 1 / 0;


var symbolTag = '[object Symbol]';


var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);


var reEscape = /<%-([\s\S]+?)%>/g,
    reEvaluate = /<%([\s\S]+?)%>/g;


var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};


var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;


var root = freeGlobal || freeSelf || Function('return this')();


function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}


var escapeHtmlChar = basePropertyOf(htmlEscapes);


var objectProto = Object.prototype;


var objectToString = objectProto.toString;


var Symbol = root.Symbol;


var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;


var templateSettings = {

  
  'escape': reEscape,

  
  'evaluate': reEvaluate,

  
  'interpolate': reInterpolate,

  
  'variable': '',

  
  'imports': {

    
    '_': { 'escape': escape }
  }
};


function baseToString(value) {
  
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}


function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}


function toString(value) {
  return value == null ? '' : baseToString(value);
}


function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = templateSettings;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash._reinterpolate":3}],6:[function(require,module,exports){


var root;
if (typeof window !== 'undefined') { 
  root = window;
} else if (typeof self !== 'undefined') { 
  root = self;
} else { 
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var isFunction = require('./is-function');
var ResponseBase = require('./response-base');
var shouldRetry = require('./should-retry');



function noop(){};



var request = exports = module.exports = function(method, url) {
  
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;



request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};



var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };



function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}



function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}



 request.serializeObject = serialize;

 

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}



request.parseString = parseString;



request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};



 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};



function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); 

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}



function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}



function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  
  
  
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);



Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};



Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};



request.Response = Response;



function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; 
  this._header = {}; 
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      
      if (self.xhr) {
        
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; 
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; 
    }

    
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}



Emitter(Request.prototype);
RequestBase(Request.prototype);



Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};



Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};



Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { 
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': 
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};



Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};



Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};



Request.prototype.callback = function(err, res){
  
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};



Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};


Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};


Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};



Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};


Request.prototype._isHost = function _isHost(obj) {
  
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}



Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  
  this._callback = fn || noop;

  
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    
    
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      
      
      
    }
  }

  
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    
    return this.callback(err);
  }

  
  if (this._withCredentials) xhr.withCredentials = true;

  
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  
  this.emit('request', this);

  
  
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};



request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};



request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};



request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};



function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;



request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};



request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};



request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-function":7,"./is-object":8,"./request-base":9,"./response-base":10,"./should-retry":11,"component-emitter":2}],7:[function(require,module,exports){

var isObject = require('./is-object');

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;

},{"./is-object":8}],8:[function(require,module,exports){


function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],9:[function(require,module,exports){

var isObject = require('./is-object');



module.exports = RequestBase;



function RequestBase(obj) {
  if (obj) return mixin(obj);
}



function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}



RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};



RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};



RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};



RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};



RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};



RequestBase.prototype.retry = function retry(count){
  
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};



RequestBase.prototype._retry = function() {
  this.clearTimeout();

  
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};



RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};



RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};




RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};



RequestBase.prototype.getHeader = RequestBase.prototype.get;



RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};


RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};


RequestBase.prototype.field = function(name, val) {

  
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};


RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); 
  this.req && this.req.abort(); 
  this.clearTimeout();
  this.emit('abort');
  return this;
};



RequestBase.prototype.withCredentials = function(on){
  
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};



RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};



RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};




RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  
  if (!type) this.type('json');
  return this;
};




RequestBase.prototype.sortQuery = function(sort) {
  
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};



RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}

},{"./is-object":8}],10:[function(require,module,exports){



var utils = require('./utils');



module.exports = ResponseBase;



function ResponseBase(obj) {
  if (obj) return mixin(obj);
}



function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}



ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};



ResponseBase.prototype._setHeaderProperties = function(header){
    
    

    
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        
    }
};



ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    
    this.status = this.statusCode = status;
    this.statusType = type;

    
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":12}],11:[function(require,module,exports){
var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];


module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};

},{}],12:[function(require,module,exports){



exports.type = function(str){
  return str.split(/ *; */).shift();
};



exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};



exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};



exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};
},{}],13:[function(require,module,exports){
/*!
  popup-geojson-map Javascript.

  © Nick Freear, 2016-09-26 | License: MIT.
*/

module.exports = function (WIN, superagent, lodashish, VERSION) {
  'use strict';

  var defaults = {
    latLng: [ 51.505, -0.09 ], 
    zoom: 3,
    minZoom: 2,
    maxZoom: 12,  
    opacity: 1,
    mapId: 'mapid',
    popupTemplate: '#popup-template',
    templateSettings: {},
    checkProperty: 'audio_url',
    geoJson: '{cdn}/data/world-audio-geo.json',
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abc',
    
    
    
    
    
    lodashish: true,
    cdn: 'https://unpkg.com/geojson-popup@' + VERSION, 
    accessToken: '<%= ENV.ACCESS_TOKEN %>' 
  };

  var W = WIN || window;
  var JSON = W.JSON;
  var L = W.L;
  var request = superagent;
  var CFG = lodashish.extend(defaults, W.MAP_CFG); 
  var _ = CFG.lodashish ? lodashish : W._;

  CFG.version = VERSION;

  if (typeof CFG.popupTemplate === 'string') {
    CFG.popupTemplate = W.document.querySelector(CFG.popupTemplate).innerText;
  }

  W.console.debug('Map config:', CFG);

  var mymap = L.map(CFG.mapId).setView(CFG.latLng, CFG.zoom);
  var popupTemplateFn = _.template(CFG.popupTemplate, null, CFG.templateSettings);
  var accessToken = _.template(CFG.accessToken);

  L.tileLayer(CFG.tileUrl, {
    subdomains: CFG.subdomains,
    attribution: CFG.attribution,
    maxZoom: CFG.maxZoom,
    minZoom: CFG.minZoom,
    
    accessToken: accessToken(W.ENV || { ENV: {} })
  }).addTo(mymap);

  request
    .get(lodashish.cdn(CFG))
    .then(function (response) {
      var geoData = JSON.parse(response.text);

      W.console.debug('GeoJSON:', geoData);

      L.geoJson(geoData, {
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties[ CFG.checkProperty ]) {
            layer.bindPopup(popupTemplateFn(feature.properties));
          } else if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }
      }).addTo(mymap);
    },
    function (error) {
      W.console.error('Superagent HTTP error.', error, CFG.geoJson);
      
    });
};

},{}],14:[function(require,module,exports){


module.exports = {

  extend: extend,

  cdn: function (CFG) {
    var orig = CFG.geoJsonOrig = CFG.geoJson;

    CFG.geoJson = orig.replace('{cdn}', CFG.cdn);
    return CFG.geoJson;
  }
};


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



},{}]},{},[1])

