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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/processing.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pkg/gif.js":
/*!********************!*\
  !*** ./pkg/gif.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {


                (function() {
                    var wasm;
                    const __exports = {};
                    

const __wbg_f_log_log_n_target = console.log;

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer)
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

__exports.__wbg_f_log_log_n = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_f_log_log_n_target(varg0);
};

const __wbg_f_registerProgress_register_progress_n_target = self.registerProgress;

__exports.__wbg_f_registerProgress_register_progress_n = function(arg0, arg1, arg2, arg3, arg4) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    __wbg_f_registerProgress_register_progress_n_target(varg0, varg2, arg4);
};

const __wbg_f_reportProgress_report_progress_n_target = self.reportProgress;

__exports.__wbg_f_reportProgress_report_progress_n = function(arg0, arg1, arg2) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_f_reportProgress_report_progress_n_target(varg0, arg2);
};

let cachegetUint64Memory = null;
function getUint64Memory() {
    if (cachegetUint64Memory === null ||
        cachegetUint64Memory.buffer !== wasm.memory.buffer)
        cachegetUint64Memory = new BigUint64Array(wasm.memory.buffer);
    return cachegetUint64Memory;
}

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    return [ptr, arg.length];
}

__exports.get_dimension = function(arg0) {
    const [ptr0, len0] = passArray8ToWasm(arg0);
    try {
        return Dimension.__construct(wasm.get_dimension(ptr0, len0));
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
};

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer)
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

__exports.reverse_gif = function(arg0, arg1, arg2) {
    const [ptr0, len0] = passStringToWasm(arg0);
    const [ptr1, len1] = passStringToWasm(arg1);
    const [ptr2, len2] = passArray8ToWasm(arg2);
    const retptr = globalArgumentPtr();
    try {
        wasm.reverse_gif(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        const realRet = getArrayU8FromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 1);
        return realRet;
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        wasm.__wbindgen_free(ptr1, len1 * 1);
        wasm.__wbindgen_free(ptr2, len2 * 1);
    }
};

const __wbg_f_error_error_n_target = console.error;

__exports.__wbg_f_error_error_n = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);
    __wbg_f_error_error_n_target(varg0);
};

class Dimension {

                static __construct(ptr) {
                    return new Dimension(ptr);
                }

                constructor(ptr) {
                    this.ptr = ptr;
                }
            get width() {
    return wasm.__wbg_get_dimension_width(this.ptr);
}
set width(arg0) {
    return wasm.__wbg_set_dimension_width(this.ptr, arg0);
}get height() {
    return wasm.__wbg_get_dimension_height(this.ptr);
}
set height(arg0) {
    return wasm.__wbg_set_dimension_height(this.ptr, arg0);
}
            free() {
                const ptr = this.ptr;
                this.ptr = 0;
                wasm.__wbg_dimension_free(ptr);
            }
        }
__exports.Dimension = Dimension;

let slab = [];

let slab_next = 0;

function addHeapObject(obj) {
    if (slab_next === slab.length)
        slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

let stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

    return val.obj;

    }
}

__exports.__wbindgen_object_clone_ref = function(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1)
        return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
};

function dropRef(idx) {

    let obj = slab[idx >> 1];

    obj.cnt -= 1;
    if (obj.cnt > 0)
        return;

    // If we hit 0 then free up our space in the slab
    slab[idx >> 1] = slab_next;
    slab_next = idx >> 1;
}

__exports.__wbindgen_object_drop_ref = function(i) { dropRef(i); };

__exports.__wbindgen_string_new = function(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
};

__exports.__wbindgen_number_new = function(i) { return addHeapObject(i); };

__exports.__wbindgen_number_get = function(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number')
        return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
};

__exports.__wbindgen_undefined_new = function() { return addHeapObject(undefined); };

__exports.__wbindgen_null_new = function() {
    return addHeapObject(null);
};

__exports.__wbindgen_is_null = function(idx) {
    return getObject(idx) === null ? 1 : 0;
};

__exports.__wbindgen_is_undefined = function(idx) {
    return getObject(idx) === undefined ? 1 : 0;
};

__exports.__wbindgen_boolean_new = function(v) {
    return addHeapObject(v === 1);
};

__exports.__wbindgen_boolean_get = function(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
};

__exports.__wbindgen_symbol_new = function(ptr, len) {
    let a;
    if (ptr === 0) {
        a = Symbol();
    } else {
        a = Symbol(getStringFromWasm(ptr, len));
    }
    return addHeapObject(a);
};

__exports.__wbindgen_is_symbol = function(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
};

__exports.__wbindgen_string_get = function(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string')
        return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
};

__exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
};

__exports.__wbindgen_round = function(x) { return Math.round(x); };

                    function init(wasm_path) {
                        return fetch(wasm_path)
                            .then(response => response.arrayBuffer())
                            .then(buffer => WebAssembly.instantiate(buffer, { './gif': __exports }))
                            .then(({instance}) => {
                                wasm = init.wasm = instance.exports;
                                return;
                            });
                    };
                    self.wasm_bindgen = Object.assign(init, __exports);
                })();
            

/***/ }),

/***/ "./pkg/gif_bg.wasm":
/*!*************************!*\
  !*** ./pkg/gif_bg.wasm ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "97145c80eae2fdb6d4997157753aa0f8.wasm";

/***/ }),

/***/ "./src/processing.worker.js":
/*!**********************************!*\
  !*** ./src/processing.worker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Ideally, this file would be written in typescript as well but something is
// not working correctly. So for now at least this will be plain javascript.

// The next two functions `registerProgress` and `reportProgress` will be
// called from the rust wasm module. They have to be defined before importing
// the wasm module otherwise the import will fail.

// We just forward the data to the main thread. The main thread will add the
// gif to the progress module.
self.registerProgress = (id, name, numberOfFrames) => {
  self.postMessage({
    type: 'register_progress',
    id,
    name,
    numberOfFrames
  });
}

// This function will be called after every frame that was processed by the
// wasm module. All we do here is pass the information through to the main
// thread which will then update the progress bar.
self.reportProgress = (id, currentFrame) => {
  self.postMessage({
    type: 'report_progress',
    id,
    currentFrame
  });
}

// Import the wasm wrapper module generated by wasm-bindgen.
__webpack_require__(/*! ../pkg/gif */ "./pkg/gif.js");

// This does not really load the wasm module. This in fact is loaded through
// the webpack file-loader. This loader will copy the wasm file to the output
// folder and this require only gives us the path to the wasm module which can
// then be passd to the init function of the wasm_bindgen wrapper.
const wasmPath = __webpack_require__(/*! ../pkg/gif_bg.wasm */ "./pkg/gif_bg.wasm");

// Initialize the wasm module. We get back a promise that resolves once the
// wasm module was successfully initialized.
const gifModule = self.wasm_bindgen(wasmPath);

// Once we get a message from the main thread we can start processing the gif.
self.addEventListener('message', async (event) => {
  try {
    const { id, name, buffer } = event.data;

    // Make sure the wasm module is fully initialized.
    await gifModule;
    const gif = self.wasm_bindgen;

    // Reverse the gif.
    const reversedBuffer = gif.reverse_gif(id, name, buffer);

    // Tell the main thread that we're finished.
    self.postMessage({
      type: 'finished',
      id,
      name,
      buffer,
      reversedBuffer
    });
  } catch (e) {
    self.postMessage({
      type: 'error',
      id: event.data.id,
      name: event.data.name,
      message: e.message,
      stack: e.stack
    })
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGtnL2dpZi5qcyIsIndlYnBhY2s6Ly8vLi9wa2cvZ2lmX2JnLndhc20iLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3Npbmcud29ya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELFlBQVk7O0FBRWhFO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MseUJBQXlCOztBQUV4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpREFBaUQsaUNBQWlDOztBQUVsRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsc0JBQXNCOztBQUVoRTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkUscUJBQXFCO0FBQ2xHLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7O0FDL1JqQixpRjs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjs7QUFFOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRSIsImZpbGUiOiI4YWQyNDBhMmIwMzI4NzI3ODA2NC53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcHJvY2Vzc2luZy53b3JrZXIuanNcIik7XG4iLCJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3YXNtO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfX2V4cG9ydHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IF9fd2JnX2ZfbG9nX2xvZ19uX3RhcmdldCA9IGNvbnNvbGUubG9nO1xuXG5sZXQgY2FjaGVkRGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcblxubGV0IGNhY2hlZ2V0VWludDhNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkgPT09IG51bGwgfHxcbiAgICAgICAgY2FjaGVnZXRVaW50OE1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcilcbiAgICAgICAgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnk7XG59XG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21XYXNtKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyLCBwdHIgKyBsZW4pKTtcbn1cblxuX19leHBvcnRzLl9fd2JnX2ZfbG9nX2xvZ19uID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgIGxldCB2YXJnMCA9IGdldFN0cmluZ0Zyb21XYXNtKGFyZzAsIGFyZzEpO1xuICAgIF9fd2JnX2ZfbG9nX2xvZ19uX3RhcmdldCh2YXJnMCk7XG59O1xuXG5jb25zdCBfX3diZ19mX3JlZ2lzdGVyUHJvZ3Jlc3NfcmVnaXN0ZXJfcHJvZ3Jlc3Nfbl90YXJnZXQgPSBzZWxmLnJlZ2lzdGVyUHJvZ3Jlc3M7XG5cbl9fZXhwb3J0cy5fX3diZ19mX3JlZ2lzdGVyUHJvZ3Jlc3NfcmVnaXN0ZXJfcHJvZ3Jlc3NfbiA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQpIHtcbiAgICBsZXQgdmFyZzAgPSBnZXRTdHJpbmdGcm9tV2FzbShhcmcwLCBhcmcxKTtcbiAgICBsZXQgdmFyZzIgPSBnZXRTdHJpbmdGcm9tV2FzbShhcmcyLCBhcmczKTtcbiAgICBfX3diZ19mX3JlZ2lzdGVyUHJvZ3Jlc3NfcmVnaXN0ZXJfcHJvZ3Jlc3Nfbl90YXJnZXQodmFyZzAsIHZhcmcyLCBhcmc0KTtcbn07XG5cbmNvbnN0IF9fd2JnX2ZfcmVwb3J0UHJvZ3Jlc3NfcmVwb3J0X3Byb2dyZXNzX25fdGFyZ2V0ID0gc2VsZi5yZXBvcnRQcm9ncmVzcztcblxuX19leHBvcnRzLl9fd2JnX2ZfcmVwb3J0UHJvZ3Jlc3NfcmVwb3J0X3Byb2dyZXNzX24gPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XG4gICAgbGV0IHZhcmcwID0gZ2V0U3RyaW5nRnJvbVdhc20oYXJnMCwgYXJnMSk7XG4gICAgX193YmdfZl9yZXBvcnRQcm9ncmVzc19yZXBvcnRfcHJvZ3Jlc3Nfbl90YXJnZXQodmFyZzAsIGFyZzIpO1xufTtcblxubGV0IGNhY2hlZ2V0VWludDY0TWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQ2NE1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50NjRNZW1vcnkgPT09IG51bGwgfHxcbiAgICAgICAgY2FjaGVnZXRVaW50NjRNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpXG4gICAgICAgIGNhY2hlZ2V0VWludDY0TWVtb3J5ID0gbmV3IEJpZ1VpbnQ2NEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDY0TWVtb3J5O1xufVxuXG5mdW5jdGlvbiBwYXNzQXJyYXk4VG9XYXNtKGFyZykge1xuICAgIGNvbnN0IHB0ciA9IHdhc20uX193YmluZGdlbl9tYWxsb2MoYXJnLmxlbmd0aCAqIDEpO1xuICAgIGdldFVpbnQ4TWVtb3J5KCkuc2V0KGFyZywgcHRyIC8gMSk7XG4gICAgcmV0dXJuIFtwdHIsIGFyZy5sZW5ndGhdO1xufVxuXG5fX2V4cG9ydHMuZ2V0X2RpbWVuc2lvbiA9IGZ1bmN0aW9uKGFyZzApIHtcbiAgICBjb25zdCBbcHRyMCwgbGVuMF0gPSBwYXNzQXJyYXk4VG9XYXNtKGFyZzApO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBEaW1lbnNpb24uX19jb25zdHJ1Y3Qod2FzbS5nZXRfZGltZW5zaW9uKHB0cjAsIGxlbjApKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG4gICAgfVxufTtcblxubGV0IGNhY2hlZEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04Jyk7XG5cbmZ1bmN0aW9uIHBhc3NTdHJpbmdUb1dhc20oYXJnKSB7XG5cbiAgICBjb25zdCBidWYgPSBjYWNoZWRFbmNvZGVyLmVuY29kZShhcmcpO1xuICAgIGNvbnN0IHB0ciA9IHdhc20uX193YmluZGdlbl9tYWxsb2MoYnVmLmxlbmd0aCk7XG4gICAgZ2V0VWludDhNZW1vcnkoKS5zZXQoYnVmLCBwdHIpO1xuICAgIHJldHVybiBbcHRyLCBidWYubGVuZ3RoXTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlVOEZyb21XYXNtKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyIC8gMSwgcHRyIC8gMSArIGxlbik7XG59XG5cbmxldCBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IG51bGw7XG5mdW5jdGlvbiBnbG9iYWxBcmd1bWVudFB0cigpIHtcbiAgICBpZiAoY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPT09IG51bGwpXG4gICAgICAgIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gd2FzbS5fX3diaW5kZ2VuX2dsb2JhbF9hcmd1bWVudF9wdHIoKTtcbiAgICByZXR1cm4gY2FjaGVkR2xvYmFsQXJndW1lbnRQdHI7XG59XG5cbmxldCBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50MzJNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDMyTWVtb3J5ID09PSBudWxsIHx8XG4gICAgICAgIGNhY2hlZ2V0VWludDMyTWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKVxuICAgICAgICBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG5ldyBVaW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIHJldHVybiBjYWNoZWdldFVpbnQzMk1lbW9yeTtcbn1cblxuX19leHBvcnRzLnJldmVyc2VfZ2lmID0gZnVuY3Rpb24oYXJnMCwgYXJnMSwgYXJnMikge1xuICAgIGNvbnN0IFtwdHIwLCBsZW4wXSA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgW3B0cjEsIGxlbjFdID0gcGFzc1N0cmluZ1RvV2FzbShhcmcxKTtcbiAgICBjb25zdCBbcHRyMiwgbGVuMl0gPSBwYXNzQXJyYXk4VG9XYXNtKGFyZzIpO1xuICAgIGNvbnN0IHJldHB0ciA9IGdsb2JhbEFyZ3VtZW50UHRyKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgd2FzbS5yZXZlcnNlX2dpZihyZXRwdHIsIHB0cjAsIGxlbjAsIHB0cjEsIGxlbjEsIHB0cjIsIGxlbjIpO1xuICAgICAgICBjb25zdCBtZW0gPSBnZXRVaW50MzJNZW1vcnkoKTtcbiAgICAgICAgY29uc3QgcHRyID0gbWVtW3JldHB0ciAvIDRdO1xuICAgICAgICBjb25zdCBsZW4gPSBtZW1bcmV0cHRyIC8gNCArIDFdO1xuICAgICAgICBjb25zdCByZWFsUmV0ID0gZ2V0QXJyYXlVOEZyb21XYXNtKHB0ciwgbGVuKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIsIGxlbiAqIDEpO1xuICAgICAgICByZXR1cm4gcmVhbFJldDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjEsIGxlbjEgKiAxKTtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMiwgbGVuMiAqIDEpO1xuICAgIH1cbn07XG5cbmNvbnN0IF9fd2JnX2ZfZXJyb3JfZXJyb3Jfbl90YXJnZXQgPSBjb25zb2xlLmVycm9yO1xuXG5fX2V4cG9ydHMuX193YmdfZl9lcnJvcl9lcnJvcl9uID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgIGxldCB2YXJnMCA9IGdldFN0cmluZ0Zyb21XYXNtKGFyZzAsIGFyZzEpO1xuICAgIHZhcmcwID0gdmFyZzAuc2xpY2UoKTtcbiAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShhcmcwLCBhcmcxICogMSk7XG4gICAgX193YmdfZl9lcnJvcl9lcnJvcl9uX3RhcmdldCh2YXJnMCk7XG59O1xuXG5jbGFzcyBEaW1lbnNpb24ge1xuXG4gICAgICAgICAgICAgICAgc3RhdGljIF9fY29uc3RydWN0KHB0cikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERpbWVuc2lvbihwdHIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHB0cikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHB0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXQgd2lkdGgoKSB7XG4gICAgcmV0dXJuIHdhc20uX193YmdfZ2V0X2RpbWVuc2lvbl93aWR0aCh0aGlzLnB0cik7XG59XG5zZXQgd2lkdGgoYXJnMCkge1xuICAgIHJldHVybiB3YXNtLl9fd2JnX3NldF9kaW1lbnNpb25fd2lkdGgodGhpcy5wdHIsIGFyZzApO1xufWdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHdhc20uX193YmdfZ2V0X2RpbWVuc2lvbl9oZWlnaHQodGhpcy5wdHIpO1xufVxuc2V0IGhlaWdodChhcmcwKSB7XG4gICAgcmV0dXJuIHdhc20uX193Ymdfc2V0X2RpbWVuc2lvbl9oZWlnaHQodGhpcy5wdHIsIGFyZzApO1xufVxuICAgICAgICAgICAgZnJlZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwdHIgPSB0aGlzLnB0cjtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IDA7XG4gICAgICAgICAgICAgICAgd2FzbS5fX3diZ19kaW1lbnNpb25fZnJlZShwdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5fX2V4cG9ydHMuRGltZW5zaW9uID0gRGltZW5zaW9uO1xuXG5sZXQgc2xhYiA9IFtdO1xuXG5sZXQgc2xhYl9uZXh0ID0gMDtcblxuZnVuY3Rpb24gYWRkSGVhcE9iamVjdChvYmopIHtcbiAgICBpZiAoc2xhYl9uZXh0ID09PSBzbGFiLmxlbmd0aClcbiAgICAgICAgc2xhYi5wdXNoKHNsYWIubGVuZ3RoICsgMSk7XG4gICAgY29uc3QgaWR4ID0gc2xhYl9uZXh0O1xuICAgIGNvbnN0IG5leHQgPSBzbGFiW2lkeF07XG5cbiAgICBzbGFiX25leHQgPSBuZXh0O1xuXG4gICAgc2xhYltpZHhdID0geyBvYmosIGNudDogMSB9O1xuICAgIHJldHVybiBpZHggPDwgMTtcbn1cblxubGV0IHN0YWNrID0gW107XG5cbmZ1bmN0aW9uIGdldE9iamVjdChpZHgpIHtcbiAgICBpZiAoKGlkeCAmIDEpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBzdGFja1tpZHggPj4gMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsID0gc2xhYltpZHggPj4gMV07XG5cbiAgICByZXR1cm4gdmFsLm9iajtcblxuICAgIH1cbn1cblxuX19leHBvcnRzLl9fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZiA9IGZ1bmN0aW9uKGlkeCkge1xuICAgIC8vIElmIHRoaXMgb2JqZWN0IGlzIG9uIHRoZSBzdGFjayBwcm9tb3RlIGl0IHRvIHRoZSBoZWFwLlxuICAgIGlmICgoaWR4ICYgMSkgPT09IDEpXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KGdldE9iamVjdChpZHgpKTtcblxuICAgIC8vIE90aGVyd2lzZSBpZiB0aGUgb2JqZWN0IGlzIG9uIHRoZSBoZWFwIGp1c3QgYnVtcCB0aGVcbiAgICAvLyByZWZjb3VudCBhbmQgbW92ZSBvblxuICAgIGNvbnN0IHZhbCA9IHNsYWJbaWR4ID4+IDFdO1xuICAgIHZhbC5jbnQgKz0gMTtcbiAgICByZXR1cm4gaWR4O1xufTtcblxuZnVuY3Rpb24gZHJvcFJlZihpZHgpIHtcblxuICAgIGxldCBvYmogPSBzbGFiW2lkeCA+PiAxXTtcblxuICAgIG9iai5jbnQgLT0gMTtcbiAgICBpZiAob2JqLmNudCA+IDApXG4gICAgICAgIHJldHVybjtcblxuICAgIC8vIElmIHdlIGhpdCAwIHRoZW4gZnJlZSB1cCBvdXIgc3BhY2UgaW4gdGhlIHNsYWJcbiAgICBzbGFiW2lkeCA+PiAxXSA9IHNsYWJfbmV4dDtcbiAgICBzbGFiX25leHQgPSBpZHggPj4gMTtcbn1cblxuX19leHBvcnRzLl9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmID0gZnVuY3Rpb24oaSkgeyBkcm9wUmVmKGkpOyB9O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl9zdHJpbmdfbmV3ID0gZnVuY3Rpb24ocCwgbCkge1xuICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KGdldFN0cmluZ0Zyb21XYXNtKHAsIGwpKTtcbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX251bWJlcl9uZXcgPSBmdW5jdGlvbihpKSB7IHJldHVybiBhZGRIZWFwT2JqZWN0KGkpOyB9O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl9udW1iZXJfZ2V0ID0gZnVuY3Rpb24obiwgaW52YWxpZCkge1xuICAgIGxldCBvYmogPSBnZXRPYmplY3Qobik7XG4gICAgaWYgKHR5cGVvZihvYmopID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICBnZXRVaW50OE1lbW9yeSgpW2ludmFsaWRdID0gMTtcbiAgICByZXR1cm4gMDtcbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX3VuZGVmaW5lZF9uZXcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFkZEhlYXBPYmplY3QodW5kZWZpbmVkKTsgfTtcblxuX19leHBvcnRzLl9fd2JpbmRnZW5fbnVsbF9uZXcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYWRkSGVhcE9iamVjdChudWxsKTtcbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX2lzX251bGwgPSBmdW5jdGlvbihpZHgpIHtcbiAgICByZXR1cm4gZ2V0T2JqZWN0KGlkeCkgPT09IG51bGwgPyAxIDogMDtcbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX2lzX3VuZGVmaW5lZCA9IGZ1bmN0aW9uKGlkeCkge1xuICAgIHJldHVybiBnZXRPYmplY3QoaWR4KSA9PT0gdW5kZWZpbmVkID8gMSA6IDA7XG59O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl9ib29sZWFuX25ldyA9IGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gYWRkSGVhcE9iamVjdCh2ID09PSAxKTtcbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX2Jvb2xlYW5fZ2V0ID0gZnVuY3Rpb24oaSkge1xuICAgIGxldCB2ID0gZ2V0T2JqZWN0KGkpO1xuICAgIGlmICh0eXBlb2YodikgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdiA/IDEgOiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAyO1xuICAgIH1cbn07XG5cbl9fZXhwb3J0cy5fX3diaW5kZ2VuX3N5bWJvbF9uZXcgPSBmdW5jdGlvbihwdHIsIGxlbikge1xuICAgIGxldCBhO1xuICAgIGlmIChwdHIgPT09IDApIHtcbiAgICAgICAgYSA9IFN5bWJvbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSBTeW1ib2woZ2V0U3RyaW5nRnJvbVdhc20ocHRyLCBsZW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZEhlYXBPYmplY3QoYSk7XG59O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl9pc19zeW1ib2wgPSBmdW5jdGlvbihpKSB7XG4gICAgcmV0dXJuIHR5cGVvZihnZXRPYmplY3QoaSkpID09PSAnc3ltYm9sJyA/IDEgOiAwO1xufTtcblxuX19leHBvcnRzLl9fd2JpbmRnZW5fc3RyaW5nX2dldCA9IGZ1bmN0aW9uKGksIGxlbl9wdHIpIHtcbiAgICBsZXQgb2JqID0gZ2V0T2JqZWN0KGkpO1xuICAgIGlmICh0eXBlb2Yob2JqKSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGNvbnN0IFtwdHIsIGxlbl0gPSBwYXNzU3RyaW5nVG9XYXNtKG9iaik7XG4gICAgZ2V0VWludDMyTWVtb3J5KClbbGVuX3B0ciAvIDRdID0gbGVuO1xuICAgIHJldHVybiBwdHI7XG59O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl90aHJvdyA9IGZ1bmN0aW9uKHB0ciwgbGVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGdldFN0cmluZ0Zyb21XYXNtKHB0ciwgbGVuKSk7XG59O1xuXG5fX2V4cG9ydHMuX193YmluZGdlbl9yb3VuZCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCk7IH07XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5pdCh3YXNtX3BhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaCh3YXNtX3BhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihidWZmZXIgPT4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnVmZmVyLCB7ICcuL2dpZic6IF9fZXhwb3J0cyB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoe2luc3RhbmNlfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXNtID0gaW5pdC53YXNtID0gaW5zdGFuY2UuZXhwb3J0cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLndhc21fYmluZGdlbiA9IE9iamVjdC5hc3NpZ24oaW5pdCwgX19leHBvcnRzKTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiOTcxNDVjODBlYWUyZmRiNmQ0OTk3MTU3NzUzYWEwZjgud2FzbVwiOyIsIi8vIElkZWFsbHksIHRoaXMgZmlsZSB3b3VsZCBiZSB3cml0dGVuIGluIHR5cGVzY3JpcHQgYXMgd2VsbCBidXQgc29tZXRoaW5nIGlzXG4vLyBub3Qgd29ya2luZyBjb3JyZWN0bHkuIFNvIGZvciBub3cgYXQgbGVhc3QgdGhpcyB3aWxsIGJlIHBsYWluIGphdmFzY3JpcHQuXG5cbi8vIFRoZSBuZXh0IHR3byBmdW5jdGlvbnMgYHJlZ2lzdGVyUHJvZ3Jlc3NgIGFuZCBgcmVwb3J0UHJvZ3Jlc3NgIHdpbGwgYmVcbi8vIGNhbGxlZCBmcm9tIHRoZSBydXN0IHdhc20gbW9kdWxlLiBUaGV5IGhhdmUgdG8gYmUgZGVmaW5lZCBiZWZvcmUgaW1wb3J0aW5nXG4vLyB0aGUgd2FzbSBtb2R1bGUgb3RoZXJ3aXNlIHRoZSBpbXBvcnQgd2lsbCBmYWlsLlxuXG4vLyBXZSBqdXN0IGZvcndhcmQgdGhlIGRhdGEgdG8gdGhlIG1haW4gdGhyZWFkLiBUaGUgbWFpbiB0aHJlYWQgd2lsbCBhZGQgdGhlXG4vLyBnaWYgdG8gdGhlIHByb2dyZXNzIG1vZHVsZS5cbnNlbGYucmVnaXN0ZXJQcm9ncmVzcyA9IChpZCwgbmFtZSwgbnVtYmVyT2ZGcmFtZXMpID0+IHtcbiAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgdHlwZTogJ3JlZ2lzdGVyX3Byb2dyZXNzJyxcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIG51bWJlck9mRnJhbWVzXG4gIH0pO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGV2ZXJ5IGZyYW1lIHRoYXQgd2FzIHByb2Nlc3NlZCBieSB0aGVcbi8vIHdhc20gbW9kdWxlLiBBbGwgd2UgZG8gaGVyZSBpcyBwYXNzIHRoZSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRvIHRoZSBtYWluXG4vLyB0aHJlYWQgd2hpY2ggd2lsbCB0aGVuIHVwZGF0ZSB0aGUgcHJvZ3Jlc3MgYmFyLlxuc2VsZi5yZXBvcnRQcm9ncmVzcyA9IChpZCwgY3VycmVudEZyYW1lKSA9PiB7XG4gIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6ICdyZXBvcnRfcHJvZ3Jlc3MnLFxuICAgIGlkLFxuICAgIGN1cnJlbnRGcmFtZVxuICB9KTtcbn1cblxuLy8gSW1wb3J0IHRoZSB3YXNtIHdyYXBwZXIgbW9kdWxlIGdlbmVyYXRlZCBieSB3YXNtLWJpbmRnZW4uXG5yZXF1aXJlKFwiLi4vcGtnL2dpZlwiKTtcblxuLy8gVGhpcyBkb2VzIG5vdCByZWFsbHkgbG9hZCB0aGUgd2FzbSBtb2R1bGUuIFRoaXMgaW4gZmFjdCBpcyBsb2FkZWQgdGhyb3VnaFxuLy8gdGhlIHdlYnBhY2sgZmlsZS1sb2FkZXIuIFRoaXMgbG9hZGVyIHdpbGwgY29weSB0aGUgd2FzbSBmaWxlIHRvIHRoZSBvdXRwdXRcbi8vIGZvbGRlciBhbmQgdGhpcyByZXF1aXJlIG9ubHkgZ2l2ZXMgdXMgdGhlIHBhdGggdG8gdGhlIHdhc20gbW9kdWxlIHdoaWNoIGNhblxuLy8gdGhlbiBiZSBwYXNzZCB0byB0aGUgaW5pdCBmdW5jdGlvbiBvZiB0aGUgd2FzbV9iaW5kZ2VuIHdyYXBwZXIuXG5jb25zdCB3YXNtUGF0aCA9IHJlcXVpcmUoJy4uL3BrZy9naWZfYmcud2FzbScpO1xuXG4vLyBJbml0aWFsaXplIHRoZSB3YXNtIG1vZHVsZS4gV2UgZ2V0IGJhY2sgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGVcbi8vIHdhc20gbW9kdWxlIHdhcyBzdWNjZXNzZnVsbHkgaW5pdGlhbGl6ZWQuXG5jb25zdCBnaWZNb2R1bGUgPSBzZWxmLndhc21fYmluZGdlbih3YXNtUGF0aCk7XG5cbi8vIE9uY2Ugd2UgZ2V0IGEgbWVzc2FnZSBmcm9tIHRoZSBtYWluIHRocmVhZCB3ZSBjYW4gc3RhcnQgcHJvY2Vzc2luZyB0aGUgZ2lmLlxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCwgbmFtZSwgYnVmZmVyIH0gPSBldmVudC5kYXRhO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3YXNtIG1vZHVsZSBpcyBmdWxseSBpbml0aWFsaXplZC5cbiAgICBhd2FpdCBnaWZNb2R1bGU7XG4gICAgY29uc3QgZ2lmID0gc2VsZi53YXNtX2JpbmRnZW47XG5cbiAgICAvLyBSZXZlcnNlIHRoZSBnaWYuXG4gICAgY29uc3QgcmV2ZXJzZWRCdWZmZXIgPSBnaWYucmV2ZXJzZV9naWYoaWQsIG5hbWUsIGJ1ZmZlcik7XG5cbiAgICAvLyBUZWxsIHRoZSBtYWluIHRocmVhZCB0aGF0IHdlJ3JlIGZpbmlzaGVkLlxuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogJ2ZpbmlzaGVkJyxcbiAgICAgIGlkLFxuICAgICAgbmFtZSxcbiAgICAgIGJ1ZmZlcixcbiAgICAgIHJldmVyc2VkQnVmZmVyXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICBpZDogZXZlbnQuZGF0YS5pZCxcbiAgICAgIG5hbWU6IGV2ZW50LmRhdGEubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIHN0YWNrOiBlLnN0YWNrXG4gICAgfSlcbiAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==