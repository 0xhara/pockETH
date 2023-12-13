/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/inherits";
exports.ids = ["vendor-chunks/inherits"];
exports.modules = {

/***/ "(ssr)/./node_modules/inherits/inherits.js":
/*!*******************************************!*\
  !*** ./node_modules/inherits/inherits.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("try {\n    var util = __webpack_require__(/*! util */ \"util\");\n    /* istanbul ignore next */ if (typeof util.inherits !== \"function\") throw \"\";\n    module.exports = util.inherits;\n} catch (e) {\n    /* istanbul ignore next */ module.exports = __webpack_require__(/*! ./inherits_browser.js */ \"(ssr)/./node_modules/inherits/inherits_browser.js\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHMuanMiLCJtYXBwaW5ncyI6IkFBQUEsSUFBSTtJQUNGLElBQUlBLE9BQU9DLG1CQUFPQSxDQUFDO0lBQ25CLHdCQUF3QixHQUN4QixJQUFJLE9BQU9ELEtBQUtFLFFBQVEsS0FBSyxZQUFZLE1BQU07SUFDL0NDLE9BQU9DLE9BQU8sR0FBR0osS0FBS0UsUUFBUTtBQUNoQyxFQUFFLE9BQU9HLEdBQUc7SUFDVix3QkFBd0IsR0FDeEJGLHNIQUF5QjtBQUMzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3BvY2tldGgvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHMuanM/NzI2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJ0cnkge1xuICB2YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHR5cGVvZiB1dGlsLmluaGVyaXRzICE9PSAnZnVuY3Rpb24nKSB0aHJvdyAnJztcbiAgbW9kdWxlLmV4cG9ydHMgPSB1dGlsLmluaGVyaXRzO1xufSBjYXRjaCAoZSkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5oZXJpdHNfYnJvd3Nlci5qcycpO1xufVxuIl0sIm5hbWVzIjpbInV0aWwiLCJyZXF1aXJlIiwiaW5oZXJpdHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/inherits/inherits.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

eval("if (typeof Object.create === \"function\") {\n    // implementation from standard node.js 'util' module\n    module.exports = function inherits(ctor, superCtor) {\n        if (superCtor) {\n            ctor.super_ = superCtor;\n            ctor.prototype = Object.create(superCtor.prototype, {\n                constructor: {\n                    value: ctor,\n                    enumerable: false,\n                    writable: true,\n                    configurable: true\n                }\n            });\n        }\n    };\n} else {\n    // old school shim for old browsers\n    module.exports = function inherits(ctor, superCtor) {\n        if (superCtor) {\n            ctor.super_ = superCtor;\n            var TempCtor = function() {};\n            TempCtor.prototype = superCtor.prototype;\n            ctor.prototype = new TempCtor();\n            ctor.prototype.constructor = ctor;\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2NrZXRoLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanM/ZTNjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiT2JqZWN0IiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImluaGVyaXRzIiwiY3RvciIsInN1cGVyQ3RvciIsInN1cGVyXyIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJUZW1wQ3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxPQUFPQSxPQUFPQyxNQUFNLEtBQUssWUFBWTtJQUN2QyxxREFBcUQ7SUFDckRDLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxTQUFTQyxJQUFJLEVBQUVDLFNBQVM7UUFDaEQsSUFBSUEsV0FBVztZQUNiRCxLQUFLRSxNQUFNLEdBQUdEO1lBQ2RELEtBQUtHLFNBQVMsR0FBR1IsT0FBT0MsTUFBTSxDQUFDSyxVQUFVRSxTQUFTLEVBQUU7Z0JBQ2xEQyxhQUFhO29CQUNYQyxPQUFPTDtvQkFDUE0sWUFBWTtvQkFDWkMsVUFBVTtvQkFDVkMsY0FBYztnQkFDaEI7WUFDRjtRQUNGO0lBQ0Y7QUFDRixPQUFPO0lBQ0wsbUNBQW1DO0lBQ25DWCxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsU0FBU0MsSUFBSSxFQUFFQyxTQUFTO1FBQ2hELElBQUlBLFdBQVc7WUFDYkQsS0FBS0UsTUFBTSxHQUFHRDtZQUNkLElBQUlRLFdBQVcsWUFBYTtZQUM1QkEsU0FBU04sU0FBUyxHQUFHRixVQUFVRSxTQUFTO1lBQ3hDSCxLQUFLRyxTQUFTLEdBQUcsSUFBSU07WUFDckJULEtBQUtHLFNBQVMsQ0FBQ0MsV0FBVyxHQUFHSjtRQUMvQjtJQUNGO0FBQ0YiLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/inherits/inherits_browser.js\n");

/***/ })

};
;