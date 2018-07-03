/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/events/events.js":
/*!**********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/events/events.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/worker-loader/dist/cjs.js!./src/processing.worker.js":
/*!***************************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./src/processing.worker.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "8ad240a2b03287278064.worker.js");
};

/***/ }),

/***/ "./src/dropHandler.ts":
/*!****************************!*\
  !*** ./src/dropHandler.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// A small helper class that registers drag&drop events on the given
// element and emits an event for every gif that is dropped.
var DropHandler = /** @class */ (function (_super) {
    __extends(DropHandler, _super);
    function DropHandler(id) {
        var _this = _super.call(this) || this;
        _this._node = document.getElementById(id);
        _this._node.addEventListener('dragover', function (e) { return _this.handleDragOver(e); }, false);
        _this._node.addEventListener('drop', function (e) { return _this.handleDrop(e); }, false);
        return _this;
    }
    DropHandler.prototype._preventDefault = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    DropHandler.prototype.handleDrop = function (event) {
        var _this = this;
        this._preventDefault(event);
        Array.from(event.dataTransfer.files)
            .filter(function (file) { return file.type === 'image/gif'; })
            .forEach(function (gif) { return _this.emit('drop', gif); });
    };
    DropHandler.prototype.handleDragOver = function (event) {
        this._preventDefault(event);
    };
    return DropHandler;
}(events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]));
/* harmony default export */ __webpack_exports__["default"] = (DropHandler);


/***/ }),

/***/ "./src/fileConverter.ts":
/*!******************************!*\
  !*** ./src/fileConverter.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// The FileReader reads files and returns their content in
// a buffer.
var FileConverter = /** @class */ (function () {
    function FileConverter() {
    }
    // Reads the file and returns the content as a Uint8Array
    // wrapped inside a Promise.
    FileConverter.readAsByteArray = function (file) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var buffer = event.target.result;
                resolve(new Uint8Array(buffer));
            };
            reader.readAsArrayBuffer(file);
        });
    };
    // Reads the file or blob and returns a string containing a data
    // url that can be assigned to and img's src attribute.
    FileConverter.readAsDataUrl = function (file) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var buffer = event.target.result;
                resolve(buffer);
            };
            reader.readAsDataURL(file);
        });
    };
    // Converts a Uint8Array into a data url with the given mime type. Default
    // type is `'image/gif'`.
    FileConverter.convertToDataUrl = function (data, type) {
        if (type === void 0) { type = 'image/gif'; }
        var blob = new Blob([data], { type: type });
        return this.readAsDataUrl(blob);
    };
    return FileConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (FileConverter);


/***/ }),

/***/ "./src/gifDisplay.ts":
/*!***************************!*\
  !*** ./src/gifDisplay.ts ***!
  \***************************/
/*! exports provided: GifDisplay, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GifDisplay", function() { return GifDisplay; });
var GifDisplay = /** @class */ (function () {
    function GifDisplay(name, root) {
        this.name = name;
        this._root = document.getElementById(root);
        this._progress = document.createElement('progress');
        this._progress.classList.add('gif-progress');
        var title = document.createElement('h3'), titleText = document.createTextNode(name);
        title.appendChild(titleText);
        this._container = document.createElement('div');
        this._container.classList.add('single-result');
        this._container.appendChild(title);
        this._container.appendChild(this._progress);
        if (this._root.childNodes.length > 0) {
            this._root.insertBefore(this._container, this._root.childNodes[0]);
        }
        else {
            this._root.appendChild(this._container);
        }
    }
    GifDisplay.prototype.updateProgress = function (current, max) {
        this._progress.max = max;
        this._progress.value = current;
    };
    GifDisplay.prototype._createImage = function (src, filename) {
        var image = document.createElement('img');
        image.src = src;
        var link = document.createElement('a');
        link.href = src;
        link.download = filename;
        link.appendChild(image);
        return link;
    };
    GifDisplay.prototype.showGifs = function (filename, original, reversed) {
        this._container.removeChild(this._progress);
        var originalGif = this._createImage(original, filename), reversedGif = this._createImage(reversed, filename + "-reversed.gif");
        this._container.appendChild(originalGif);
        this._container.appendChild(reversedGif);
    };
    GifDisplay.prototype.showError = function (message, stack) {
        this._container.removeChild(this._progress);
        var errorDisplay = document.createElement('div');
        errorDisplay.innerHTML = "\n    <div class=\"error\">\n      It seems like I can't reverse that gif. Here are some details if you want to\n      <a class=\"error\" href=\"https://github.com/migerh/rustwasm-gif/issues/new\">file an issue</a>:\n    </div>\n    <div class=\"error\">\n      " + message + "\n    </div>\n    <div>\n      " + stack.replace(/\n/g, '<br />') + "\n    </div>";
        this._container.appendChild(errorDisplay);
    };
    return GifDisplay;
}());

/* harmony default export */ __webpack_exports__["default"] = (GifDisplay);


/***/ }),

/***/ "./src/gifReverser.ts":
/*!****************************!*\
  !*** ./src/gifReverser.ts ***!
  \****************************/
/*! exports provided: GifReverser, default, GifReversalJob, ProgressEvent, ProcessingErrorEvent, ReversedGif */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GifReverser", function() { return GifReverser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GifReversalJob", function() { return GifReversalJob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressEvent", function() { return ProgressEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessingErrorEvent", function() { return ProcessingErrorEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversedGif", function() { return ReversedGif; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fileConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fileConverter */ "./src/fileConverter.ts");
/* harmony import */ var worker_loader_processing_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! worker-loader!./processing.worker */ "./node_modules/worker-loader/dist/cjs.js!./src/processing.worker.js");
/* harmony import */ var worker_loader_processing_worker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(worker_loader_processing_worker__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var GifReverser = /** @class */ (function () {
    function GifReverser() {
        var _this = this;
        this._numberOfWorkers = navigator.hardwareConcurrency || 2;
        this._jobs = [];
        this._jobsWaitingForWorker = [];
        this._workers = Array.from(Array(this._numberOfWorkers).keys()).map(function () { return new worker_loader_processing_worker__WEBPACK_IMPORTED_MODULE_3___default.a(); });
        this._workers.forEach(function (w) { return w.onmessage = _this._handleMessage.bind(_this); });
        this._workers.forEach(function (w) { return w.onerror = _this._handleError.bind(_this); });
        this._availableWorkers = this._workers.slice();
        this._busyWorkers = [];
    }
    GifReverser.prototype._findJobById = function (id) {
        return this._jobs.find(function (j) { return j.id === id; });
    };
    GifReverser.prototype._removeJobById = function (id) {
        this._jobs = this._jobs.filter(function (j) { return j.id !== id; });
    };
    GifReverser.prototype._getNextWorker = function () {
        var worker = this._availableWorkers.pop();
        this._busyWorkers.push(worker);
        return worker;
    };
    GifReverser.prototype._getNextJob = function () {
        var job = this._jobsWaitingForWorker.shift();
        this._jobs.push(job);
        return job;
    };
    GifReverser.prototype._makeWorkerAvailable = function (worker) {
        this._busyWorkers = this._busyWorkers.filter(function (w) { return w !== worker; });
        this._availableWorkers.push(worker);
    };
    GifReverser.prototype._assignJobToWorker = function (job, worker) {
        worker.postMessage(job.getMessageForWorker());
    };
    GifReverser.prototype._distributeJobs = function () {
        var numberOfAvailableWorkers = this._availableWorkers.length, numberOfWaitingJobs = this._jobsWaitingForWorker.length, jobsToDistribute = Math.min(numberOfAvailableWorkers, numberOfWaitingJobs);
        for (var i = 0; i < jobsToDistribute; ++i) {
            this._assignJobToWorker(this._getNextJob(), this._getNextWorker());
        }
    };
    GifReverser.prototype._handleMessage = function (event) {
        var data = event.data, id = data.id, job = this._findJobById(id);
        switch (data.type) {
            case 'register_progress':
                job.numberOfFrames = data.numberOfFrames;
                break;
            case 'report_progress':
                job.emit('progress', __assign({}, data, { numberOfFrames: job.numberOfFrames }));
                break;
            case 'finished':
                this._removeJobById(id);
                this._makeWorkerAvailable(event.target);
                this._distributeJobs();
                job.emit('finished', data);
                break;
            case 'error':
                this._removeJobById(id);
                this._makeWorkerAvailable(event.target);
                this._distributeJobs();
                job.emit('error', data);
        }
    };
    // todo: route errors to the right job
    GifReverser.prototype._handleError = function (event) {
        event.preventDefault();
        console.error('An error occurred initializing the worker:', event.message, event.error);
    };
    GifReverser.prototype.process = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, name, id, job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fileConverter__WEBPACK_IMPORTED_MODULE_2__["default"].readAsByteArray(file)];
                    case 1:
                        buffer = _a.sent(), name = file.name, id = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])(), job = new GifReversalJob(id, name, buffer);
                        this._jobsWaitingForWorker.push(job);
                        this._distributeJobs();
                        return [2 /*return*/, job];
                }
            });
        });
    };
    return GifReverser;
}());

/* harmony default export */ __webpack_exports__["default"] = (GifReverser);
var GifReversalJob = /** @class */ (function (_super) {
    __extends(GifReversalJob, _super);
    function GifReversalJob(id, name, buffer) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.name = name;
        _this.buffer = buffer;
        return _this;
    }
    GifReversalJob.prototype.getMessageForWorker = function () {
        var _a = this, id = _a.id, name = _a.name, buffer = _a.buffer;
        return { id: id, name: name, buffer: buffer };
    };
    return GifReversalJob;
}(events__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]));

var ProgressEvent = /** @class */ (function () {
    function ProgressEvent() {
    }
    return ProgressEvent;
}());

var ProcessingErrorEvent = /** @class */ (function () {
    function ProcessingErrorEvent() {
    }
    return ProcessingErrorEvent;
}());

var ReversedGif = /** @class */ (function () {
    function ReversedGif() {
    }
    return ReversedGif;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropHandler */ "./src/dropHandler.ts");
/* harmony import */ var _gifReverser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gifReverser */ "./src/gifReverser.ts");
/* harmony import */ var _fileConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fileConverter */ "./src/fileConverter.ts");
/* harmony import */ var _gifDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gifDisplay */ "./src/gifDisplay.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




// This glues everything together. The Drophandler listens for drop events on
// the drop html element. Once a gif drops it will be passed over to the
// gif processor. Once the gif processor is finished reversing the gif we
// display it. To ensure that everything is properly initialized, we set
// everything up backwards.
// First we initialize the gif processor and…
var gifProcessor = new _gifReverser__WEBPACK_IMPORTED_MODULE_1__["GifReverser"](), rootNodeId = 'resultContainer';
// …define what happens when a job is finished.
var createJobFinishedHandler = function (display) { return function (data) {
    return __awaiter(this, void 0, void 0, function () {
        var name, buffer, reversedBuffer, originalGifData, reversedGifData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = data.name, buffer = data.buffer, reversedBuffer = data.reversedBuffer;
                    return [4 /*yield*/, _fileConverter__WEBPACK_IMPORTED_MODULE_2__["default"].convertToDataUrl(buffer)];
                case 1:
                    originalGifData = _a.sent();
                    return [4 /*yield*/, _fileConverter__WEBPACK_IMPORTED_MODULE_2__["default"].convertToDataUrl(reversedBuffer)];
                case 2:
                    reversedGifData = _a.sent();
                    display.showGifs(name, originalGifData, reversedGifData);
                    return [2 /*return*/];
            }
        });
    });
}; };
// Then we define what happens on a progress event.
var createJobProgressHandler = function (display) { return function (item) {
    display.updateProgress(item.currentFrame, item.numberOfFrames);
}; };
var createErrorHandler = function (display) { return function (event) {
    var message = event.message, stack = event.stack;
    display.showError(message, stack);
}; };
// Finally we set up the trigger for everything above.
var dropHandler = new _dropHandler__WEBPACK_IMPORTED_MODULE_0__["default"]('gif-file-drop');
dropHandler.on('drop', function handleDrop(file) {
    return __awaiter(this, void 0, void 0, function () {
        var job, display;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gifProcessor.process(file)];
                case 1:
                    job = _a.sent(), display = new _gifDisplay__WEBPACK_IMPORTED_MODULE_3__["GifDisplay"](file.name, rootNodeId);
                    job.on('progress', createJobProgressHandler(display));
                    job.on('finished', createJobFinishedHandler(display));
                    job.on('error', createErrorHandler(display));
                    return [2 /*return*/];
            }
        });
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3Npbmcud29ya2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9kcm9wSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsZUNvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lmRGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lmUmV2ZXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdTQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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XG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICByZXR1cm4gYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFdvcmtlcihfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiOGFkMjQwYTJiMDMyODcyNzgwNjQud29ya2VyLmpzXCIpO1xufTsiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG4vLyBBIHNtYWxsIGhlbHBlciBjbGFzcyB0aGF0IHJlZ2lzdGVycyBkcmFnJmRyb3AgZXZlbnRzIG9uIHRoZSBnaXZlblxuLy8gZWxlbWVudCBhbmQgZW1pdHMgYW4gZXZlbnQgZm9yIGV2ZXJ5IGdpZiB0aGF0IGlzIGRyb3BwZWQuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wSGFuZGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHByaXZhdGUgX25vZGU6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIHRoaXMuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4gdGhpcy5oYW5kbGVEcmFnT3ZlcihlKSwgZmFsc2UpO1xuICAgIHRoaXMuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB0aGlzLmhhbmRsZURyb3AoZSksIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ByZXZlbnREZWZhdWx0KGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgaGFuZGxlRHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5fcHJldmVudERlZmF1bHQoZXZlbnQpO1xuXG4gICAgQXJyYXkuZnJvbShldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpXG4gICAgICAuZmlsdGVyKChmaWxlOiBGaWxlKSA9PiBmaWxlLnR5cGUgPT09ICdpbWFnZS9naWYnKVxuICAgICAgLmZvckVhY2goKGdpZjogRmlsZSkgPT4gdGhpcy5lbWl0KCdkcm9wJywgZ2lmKSk7XG4gIH1cblxuICBoYW5kbGVEcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5fcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICB9XG59IiwiXG4vLyBUaGUgRmlsZVJlYWRlciByZWFkcyBmaWxlcyBhbmQgcmV0dXJucyB0aGVpciBjb250ZW50IGluXG4vLyBhIGJ1ZmZlci5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVDb252ZXJ0ZXIge1xuXG4gIC8vIFJlYWRzIHRoZSBmaWxlIGFuZCByZXR1cm5zIHRoZSBjb250ZW50IGFzIGEgVWludDhBcnJheVxuICAvLyB3cmFwcGVkIGluc2lkZSBhIFByb21pc2UuXG4gIHN0YXRpYyByZWFkQXNCeXRlQXJyYXkoZmlsZTogRmlsZSk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblxuICAgICAgICByZXNvbHZlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpO1xuICAgICAgfTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVhZHMgdGhlIGZpbGUgb3IgYmxvYiBhbmQgcmV0dXJucyBhIHN0cmluZyBjb250YWluaW5nIGEgZGF0YVxuICAvLyB1cmwgdGhhdCBjYW4gYmUgYXNzaWduZWQgdG8gYW5kIGltZydzIHNyYyBhdHRyaWJ1dGUuXG4gIHN0YXRpYyByZWFkQXNEYXRhVXJsKGZpbGU6IEZpbGUgfCBCbG9iKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gPHN0cmluZz4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblxuICAgICAgICByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICB9XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pXG4gIH1cblxuICAvLyBDb252ZXJ0cyBhIFVpbnQ4QXJyYXkgaW50byBhIGRhdGEgdXJsIHdpdGggdGhlIGdpdmVuIG1pbWUgdHlwZS4gRGVmYXVsdFxuICAvLyB0eXBlIGlzIGAnaW1hZ2UvZ2lmJ2AuXG4gIHN0YXRpYyBjb252ZXJ0VG9EYXRhVXJsKGRhdGE6IFVpbnQ4QXJyYXksIHR5cGU6IHN0cmluZyA9ICdpbWFnZS9naWYnKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZX0pO1xuICAgIHJldHVybiB0aGlzLnJlYWRBc0RhdGFVcmwoYmxvYik7XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgR2lmRGlzcGxheSB7XG4gIHByaXZhdGUgX3Jvb3Q6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwcml2YXRlIF9wcm9ncmVzczogSFRNTFByb2dyZXNzRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCByb290OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9vdCk7XG5cbiAgICB0aGlzLl9wcm9ncmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Byb2dyZXNzJyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgnZ2lmLXByb2dyZXNzJyk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyksXG4gICAgICB0aXRsZVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuYW1lKTtcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZVRleHQpO1xuXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NpbmdsZS1yZXN1bHQnKTtcbiAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9wcm9ncmVzcyk7XG5cbiAgICBpZiAodGhpcy5fcm9vdC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3Jvb3QuaW5zZXJ0QmVmb3JlKHRoaXMuX2NvbnRhaW5lciwgdGhpcy5fcm9vdC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQcm9ncmVzcyhjdXJyZW50OiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MubWF4ID0gbWF4O1xuICAgIHRoaXMuX3Byb2dyZXNzLnZhbHVlID0gY3VycmVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUltYWdlKHNyYzogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogSFRNTEFuY2hvckVsZW1lbnQge1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2Uuc3JjID0gc3JjO1xuXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSBzcmM7XG4gICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGxpbmsuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgcmV0dXJuIGxpbms7XG4gIH1cblxuICBwdWJsaWMgc2hvd0dpZnMoZmlsZW5hbWU6IHN0cmluZywgb3JpZ2luYWw6IHN0cmluZywgcmV2ZXJzZWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9wcm9ncmVzcyk7XG5cbiAgICBjb25zdCBvcmlnaW5hbEdpZiA9IHRoaXMuX2NyZWF0ZUltYWdlKG9yaWdpbmFsLCBmaWxlbmFtZSksXG4gICAgICByZXZlcnNlZEdpZiA9IHRoaXMuX2NyZWF0ZUltYWdlKHJldmVyc2VkLCBgJHtmaWxlbmFtZX0tcmV2ZXJzZWQuZ2lmYCk7XG5cbiAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQob3JpZ2luYWxHaWYpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChyZXZlcnNlZEdpZik7XG4gIH1cblxuICBwdWJsaWMgc2hvd0Vycm9yKG1lc3NhZ2U6IHN0cmluZywgc3RhY2s6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9wcm9ncmVzcyk7XG4gICAgY29uc3QgZXJyb3JEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlcnJvckRpc3BsYXkuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiPlxuICAgICAgSXQgc2VlbXMgbGlrZSBJIGNhbid0IHJldmVyc2UgdGhhdCBnaWYuIEhlcmUgYXJlIHNvbWUgZGV0YWlscyBpZiB5b3Ugd2FudCB0b1xuICAgICAgPGEgY2xhc3M9XCJlcnJvclwiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbWlnZXJoL3J1c3R3YXNtLWdpZi9pc3N1ZXMvbmV3XCI+ZmlsZSBhbiBpc3N1ZTwvYT46XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImVycm9yXCI+XG4gICAgICAke21lc3NhZ2V9XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgICR7c3RhY2sucmVwbGFjZSgvXFxuL2csICc8YnIgLz4nKX1cbiAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKGVycm9yRGlzcGxheSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2lmRGlzcGxheTsiLCJpbXBvcnQgeyB2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IEZpbGVDb252ZXJ0ZXIgZnJvbSAnLi9maWxlQ29udmVydGVyJztcbmltcG9ydCBXb3JrZXIgZnJvbSAnd29ya2VyLWxvYWRlciEuL3Byb2Nlc3Npbmcud29ya2VyJztcblxuZXhwb3J0IGNsYXNzIEdpZlJldmVyc2VyIHtcbiAgcHJpdmF0ZSBfam9iczogR2lmUmV2ZXJzYWxKb2JbXTtcbiAgcHJpdmF0ZSBfam9ic1dhaXRpbmdGb3JXb3JrZXI6IEdpZlJldmVyc2FsSm9iW107XG4gIHByaXZhdGUgX251bWJlck9mV29ya2VyczogbnVtYmVyID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgMjtcbiAgcHJpdmF0ZSBfd29ya2VyczogV29ya2VyW107XG4gIHByaXZhdGUgX2F2YWlsYWJsZVdvcmtlcnM6IFdvcmtlcltdO1xuICBwcml2YXRlIF9idXN5V29ya2VyczogV29ya2VyW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fam9icyA9IFtdO1xuICAgIHRoaXMuX2pvYnNXYWl0aW5nRm9yV29ya2VyID0gW107XG5cbiAgICB0aGlzLl93b3JrZXJzID0gQXJyYXkuZnJvbShBcnJheSh0aGlzLl9udW1iZXJPZldvcmtlcnMpLmtleXMoKSkubWFwKCgpID0+IG5ldyBXb3JrZXIoKSk7XG4gICAgdGhpcy5fd29ya2Vycy5mb3JFYWNoKHcgPT4gdy5vbm1lc3NhZ2UgPSB0aGlzLl9oYW5kbGVNZXNzYWdlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3dvcmtlcnMuZm9yRWFjaCh3ID0+IHcub25lcnJvciA9IHRoaXMuX2hhbmRsZUVycm9yLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5fYXZhaWxhYmxlV29ya2VycyA9IFsuLi50aGlzLl93b3JrZXJzXTtcbiAgICB0aGlzLl9idXN5V29ya2VycyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZEpvYkJ5SWQoaWQ6IHN0cmluZyk6IEdpZlJldmVyc2FsSm9iIHtcbiAgICByZXR1cm4gdGhpcy5fam9icy5maW5kKGogPT4gai5pZCA9PT0gaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSm9iQnlJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fam9icyA9IHRoaXMuX2pvYnMuZmlsdGVyKGogPT4gai5pZCAhPT0gaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TmV4dFdvcmtlcigpOiBXb3JrZXIge1xuICAgIGNvbnN0IHdvcmtlciA9IHRoaXMuX2F2YWlsYWJsZVdvcmtlcnMucG9wKCk7XG4gICAgdGhpcy5fYnVzeVdvcmtlcnMucHVzaCh3b3JrZXIpO1xuXG4gICAgcmV0dXJuIHdvcmtlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRKb2IoKTogR2lmUmV2ZXJzYWxKb2Ige1xuICAgIGNvbnN0IGpvYiA9IHRoaXMuX2pvYnNXYWl0aW5nRm9yV29ya2VyLnNoaWZ0KCk7XG4gICAgdGhpcy5fam9icy5wdXNoKGpvYik7XG5cbiAgICByZXR1cm4gam9iO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFrZVdvcmtlckF2YWlsYWJsZSh3b3JrZXI6IFdvcmtlcikge1xuICAgIHRoaXMuX2J1c3lXb3JrZXJzID0gdGhpcy5fYnVzeVdvcmtlcnMuZmlsdGVyKHcgPT4gdyAhPT0gd29ya2VyKTtcbiAgICB0aGlzLl9hdmFpbGFibGVXb3JrZXJzLnB1c2god29ya2VyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2lnbkpvYlRvV29ya2VyKGpvYjogR2lmUmV2ZXJzYWxKb2IsIHdvcmtlcjogV29ya2VyKSB7XG4gICAgd29ya2VyLnBvc3RNZXNzYWdlKGpvYi5nZXRNZXNzYWdlRm9yV29ya2VyKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzdHJpYnV0ZUpvYnMoKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZBdmFpbGFibGVXb3JrZXJzID0gdGhpcy5fYXZhaWxhYmxlV29ya2Vycy5sZW5ndGgsXG4gICAgICBudW1iZXJPZldhaXRpbmdKb2JzID0gdGhpcy5fam9ic1dhaXRpbmdGb3JXb3JrZXIubGVuZ3RoLFxuICAgICAgam9ic1RvRGlzdHJpYnV0ZSA9IE1hdGgubWluKG51bWJlck9mQXZhaWxhYmxlV29ya2VycywgbnVtYmVyT2ZXYWl0aW5nSm9icyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYnNUb0Rpc3RyaWJ1dGU7ICsraSkge1xuICAgICAgdGhpcy5fYXNzaWduSm9iVG9Xb3JrZXIodGhpcy5fZ2V0TmV4dEpvYigpLCB0aGlzLl9nZXROZXh0V29ya2VyKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UoZXZlbnQ6IE1lc3NhZ2VFdmVudCkge1xuICAgIGNvbnN0IGRhdGEgPSA8TWVzc2FnZUV2ZW50RGF0YT5ldmVudC5kYXRhLFxuICAgICAgaWQgPSBkYXRhLmlkLFxuICAgICAgam9iID0gdGhpcy5fZmluZEpvYkJ5SWQoaWQpO1xuXG4gICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3JlZ2lzdGVyX3Byb2dyZXNzJzpcbiAgICAgICAgam9iLm51bWJlck9mRnJhbWVzID0gZGF0YS5udW1iZXJPZkZyYW1lcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBvcnRfcHJvZ3Jlc3MnOlxuICAgICAgICBqb2IuZW1pdCgncHJvZ3Jlc3MnLCA8UHJvZ3Jlc3NFdmVudD57IC4uLmRhdGEsIG51bWJlck9mRnJhbWVzOiBqb2IubnVtYmVyT2ZGcmFtZXMgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmluaXNoZWQnOlxuICAgICAgICB0aGlzLl9yZW1vdmVKb2JCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5fbWFrZVdvcmtlckF2YWlsYWJsZSg8V29ya2VyPmV2ZW50LnRhcmdldCk7XG4gICAgICAgIHRoaXMuX2Rpc3RyaWJ1dGVKb2JzKCk7XG4gICAgICAgIGpvYi5lbWl0KCdmaW5pc2hlZCcsIDxSZXZlcnNlZEdpZj5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHRoaXMuX3JlbW92ZUpvYkJ5SWQoaWQpO1xuICAgICAgICB0aGlzLl9tYWtlV29ya2VyQXZhaWxhYmxlKDxXb3JrZXI+ZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fZGlzdHJpYnV0ZUpvYnMoKTtcbiAgICAgICAgam9iLmVtaXQoJ2Vycm9yJywgPFByb2Nlc3NpbmdFcnJvckV2ZW50PmRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRvZG86IHJvdXRlIGVycm9ycyB0byB0aGUgcmlnaHQgam9iXG4gIHByaXZhdGUgX2hhbmRsZUVycm9yKGV2ZW50OiBFcnJvckV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCBpbml0aWFsaXppbmcgdGhlIHdvcmtlcjonLCBldmVudC5tZXNzYWdlLCBldmVudC5lcnJvcik7XG4gIH1cblxuICBhc3luYyBwcm9jZXNzKGZpbGU6IEZpbGUpOiBQcm9taXNlPEdpZlJldmVyc2FsSm9iPiB7XG4gICAgY29uc3QgYnVmZmVyID0gYXdhaXQgRmlsZUNvbnZlcnRlci5yZWFkQXNCeXRlQXJyYXkoZmlsZSksXG4gICAgICB7IG5hbWUgfSA9IGZpbGUsXG4gICAgICBpZCA9IHY0KCksXG4gICAgICBqb2IgPSBuZXcgR2lmUmV2ZXJzYWxKb2IoaWQsIG5hbWUsIGJ1ZmZlcik7XG5cbiAgICB0aGlzLl9qb2JzV2FpdGluZ0Zvcldvcmtlci5wdXNoKGpvYik7XG4gICAgdGhpcy5fZGlzdHJpYnV0ZUpvYnMoKTtcblxuICAgIHJldHVybiBqb2I7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2lmUmV2ZXJzZXI7XG5cbmV4cG9ydCBjbGFzcyBHaWZSZXZlcnNhbEpvYiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHB1YmxpYyBudW1iZXJPZkZyYW1lczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYnVmZmVyOiBVaW50OEFycmF5KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZXNzYWdlRm9yV29ya2VyKCkge1xuICAgIGNvbnN0IHtpZCwgbmFtZSwgYnVmZmVyfSA9IHRoaXM7XG4gICAgcmV0dXJuIHtpZCwgbmFtZSwgYnVmZmVyfTtcbiAgfVxufVxuXG50eXBlIFJlZ2lzdGVyUHJvZ3Jlc3NFdmVudERhdGEgPSB7XG4gIHR5cGU6ICdyZWdpc3Rlcl9wcm9ncmVzcyc7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgbnVtYmVyT2ZGcmFtZXM6IG51bWJlcjtcbn1cblxudHlwZSBSZXBvcnRQcm9ncmVzc0V2ZW50RGF0YSA9IHtcbiAgdHlwZTogJ3JlcG9ydF9wcm9ncmVzcyc7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY3VycmVudEZyYW1lOiBudW1iZXI7XG59XG5cbnR5cGUgRmluaXNoZWRFdmVudERhdGEgPSB7XG4gIHR5cGU6ICdmaW5pc2hlZCc7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgYnVmZmVyOiBVaW50OEFycmF5O1xuICByZXZlcnNlZEJ1ZmZlcjogVWludDhBcnJheTtcbn1cblxudHlwZSBFcnJvckV2ZW50RGF0YSA9IHtcbiAgdHlwZTogJ2Vycm9yJyxcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG59XG5cbnR5cGUgTWVzc2FnZUV2ZW50RGF0YSA9IFJlZ2lzdGVyUHJvZ3Jlc3NFdmVudERhdGEgfCBSZXBvcnRQcm9ncmVzc0V2ZW50RGF0YSB8IEZpbmlzaGVkRXZlbnREYXRhIHwgRXJyb3JFdmVudERhdGE7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0V2ZW50IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjdXJyZW50RnJhbWU6IG51bWJlcjtcbiAgbnVtYmVyT2ZGcmFtZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2Nlc3NpbmdFcnJvckV2ZW50IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBSZXZlcnNlZEdpZiB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgYnVmZmVyOiBVaW50OEFycmF5O1xuICByZXZlcnNlZEJ1ZmZlcjogVWludDhBcnJheTtcbn0iLCJpbXBvcnQgRHJvcEhhbmRsZXIgZnJvbSAnLi9kcm9wSGFuZGxlcic7XG5pbXBvcnQge0dpZlJldmVyc2VyLCBSZXZlcnNlZEdpZiwgUHJvZ3Jlc3NFdmVudCwgUHJvY2Vzc2luZ0Vycm9yRXZlbnR9IGZyb20gJy4vZ2lmUmV2ZXJzZXInO1xuaW1wb3J0IEZpbGVDb252ZXJ0ZXIgZnJvbSAnLi9maWxlQ29udmVydGVyJztcbmltcG9ydCB7IEdpZkRpc3BsYXkgfSBmcm9tICcuL2dpZkRpc3BsYXknO1xuXG4vLyBUaGlzIGdsdWVzIGV2ZXJ5dGhpbmcgdG9nZXRoZXIuIFRoZSBEcm9waGFuZGxlciBsaXN0ZW5zIGZvciBkcm9wIGV2ZW50cyBvblxuLy8gdGhlIGRyb3AgaHRtbCBlbGVtZW50LiBPbmNlIGEgZ2lmIGRyb3BzIGl0IHdpbGwgYmUgcGFzc2VkIG92ZXIgdG8gdGhlXG4vLyBnaWYgcHJvY2Vzc29yLiBPbmNlIHRoZSBnaWYgcHJvY2Vzc29yIGlzIGZpbmlzaGVkIHJldmVyc2luZyB0aGUgZ2lmIHdlXG4vLyBkaXNwbGF5IGl0LiBUbyBlbnN1cmUgdGhhdCBldmVyeXRoaW5nIGlzIHByb3Blcmx5IGluaXRpYWxpemVkLCB3ZSBzZXRcbi8vIGV2ZXJ5dGhpbmcgdXAgYmFja3dhcmRzLlxuXG4vLyBGaXJzdCB3ZSBpbml0aWFsaXplIHRoZSBnaWYgcHJvY2Vzc29yIGFuZOKAplxuY29uc3QgZ2lmUHJvY2Vzc29yID0gbmV3IEdpZlJldmVyc2VyKCksXG4gIHJvb3ROb2RlSWQgPSAncmVzdWx0Q29udGFpbmVyJztcblxuLy8g4oCmZGVmaW5lIHdoYXQgaGFwcGVucyB3aGVuIGEgam9iIGlzIGZpbmlzaGVkLlxuY29uc3QgY3JlYXRlSm9iRmluaXNoZWRIYW5kbGVyID0gKGRpc3BsYXk6IEdpZkRpc3BsYXkpID0+IGFzeW5jIGZ1bmN0aW9uKGRhdGE6IFJldmVyc2VkR2lmKSB7XG4gIGNvbnN0IHtuYW1lLCBidWZmZXIsIHJldmVyc2VkQnVmZmVyfSA9IGRhdGE7XG4gIGNvbnN0IG9yaWdpbmFsR2lmRGF0YSA9IGF3YWl0IEZpbGVDb252ZXJ0ZXIuY29udmVydFRvRGF0YVVybChidWZmZXIpO1xuICBjb25zdCByZXZlcnNlZEdpZkRhdGEgPSBhd2FpdCBGaWxlQ29udmVydGVyLmNvbnZlcnRUb0RhdGFVcmwocmV2ZXJzZWRCdWZmZXIpO1xuXG4gIGRpc3BsYXkuc2hvd0dpZnMobmFtZSwgb3JpZ2luYWxHaWZEYXRhLCByZXZlcnNlZEdpZkRhdGEpO1xufTtcblxuLy8gVGhlbiB3ZSBkZWZpbmUgd2hhdCBoYXBwZW5zIG9uIGEgcHJvZ3Jlc3MgZXZlbnQuXG5jb25zdCBjcmVhdGVKb2JQcm9ncmVzc0hhbmRsZXIgPSAoZGlzcGxheTogR2lmRGlzcGxheSkgPT4gKGl0ZW06IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgZGlzcGxheS51cGRhdGVQcm9ncmVzcyhpdGVtLmN1cnJlbnRGcmFtZSwgaXRlbS5udW1iZXJPZkZyYW1lcyk7XG59O1xuXG5jb25zdCBjcmVhdGVFcnJvckhhbmRsZXIgPSAoZGlzcGxheTogR2lmRGlzcGxheSkgPT4gKGV2ZW50OiBQcm9jZXNzaW5nRXJyb3JFdmVudCkgPT4ge1xuICBjb25zdCB7bWVzc2FnZSwgc3RhY2t9ID0gZXZlbnQ7XG4gIGRpc3BsYXkuc2hvd0Vycm9yKG1lc3NhZ2UsIHN0YWNrKTtcbn07XG5cbi8vIEZpbmFsbHkgd2Ugc2V0IHVwIHRoZSB0cmlnZ2VyIGZvciBldmVyeXRoaW5nIGFib3ZlLlxuY29uc3QgZHJvcEhhbmRsZXIgPSBuZXcgRHJvcEhhbmRsZXIoJ2dpZi1maWxlLWRyb3AnKTtcbmRyb3BIYW5kbGVyLm9uKCdkcm9wJywgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRHJvcChmaWxlOiBGaWxlKSB7XG5cbiAgY29uc3Qgam9iID0gYXdhaXQgZ2lmUHJvY2Vzc29yLnByb2Nlc3MoZmlsZSksXG4gICAgZGlzcGxheSA9IG5ldyBHaWZEaXNwbGF5KGZpbGUubmFtZSwgcm9vdE5vZGVJZCk7XG5cbiAgam9iLm9uKCdwcm9ncmVzcycsIGNyZWF0ZUpvYlByb2dyZXNzSGFuZGxlcihkaXNwbGF5KSk7XG4gIGpvYi5vbignZmluaXNoZWQnLCBjcmVhdGVKb2JGaW5pc2hlZEhhbmRsZXIoZGlzcGxheSkpO1xuICBqb2Iub24oJ2Vycm9yJywgY3JlYXRlRXJyb3JIYW5kbGVyKGRpc3BsYXkpKTtcbn0pO1xuXG4iXSwic291cmNlUm9vdCI6IiJ9