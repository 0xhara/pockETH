"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/isows";
exports.ids = ["vendor-chunks/isows"];
exports.modules = {

/***/ "(ssr)/./node_modules/isows/_esm/index.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_esm/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebSocket: () => (/* binding */ WebSocket)\n/* harmony export */ });\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ \"(ssr)/./node_modules/ws/wrapper.mjs\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/isows/_esm/utils.js\");\n\n\nconst WebSocket = (()=>{\n    try {\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getNativeWebSocket)();\n    } catch  {\n        if (ws__WEBPACK_IMPORTED_MODULE_0__.WebSocket) return ws__WEBPACK_IMPORTED_MODULE_0__.WebSocket;\n        return ws__WEBPACK_IMPORTED_MODULE_0__;\n    }\n})(); //# sourceMappingURL=index.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBaUM7QUFDZTtBQUN6QyxNQUFNRSxZQUFZLENBQUM7SUFDdEIsSUFBSTtRQUNBLE9BQU9ELDZEQUFrQkE7SUFDN0IsRUFDQSxPQUFNO1FBQ0YsSUFBSUQseUNBQW9CLEVBQ3BCLE9BQU9BLHlDQUFvQjtRQUMvQixPQUFPQSwrQkFBVUE7SUFDckI7QUFDSixLQUFLLENBQ0wsaUNBQWlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9ja2V0aC8uL25vZGVfbW9kdWxlcy9pc293cy9fZXNtL2luZGV4LmpzP2EyYmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgV2ViU29ja2V0XyBmcm9tIFwid3NcIjtcbmltcG9ydCB7IGdldE5hdGl2ZVdlYlNvY2tldCB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZ2V0TmF0aXZlV2ViU29ja2V0KCk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgaWYgKFdlYlNvY2tldF8uV2ViU29ja2V0KVxuICAgICAgICAgICAgcmV0dXJuIFdlYlNvY2tldF8uV2ViU29ja2V0O1xuICAgICAgICByZXR1cm4gV2ViU29ja2V0XztcbiAgICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbIldlYlNvY2tldF8iLCJnZXROYXRpdmVXZWJTb2NrZXQiLCJXZWJTb2NrZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_esm/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/isows/_esm/utils.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_esm/utils.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getNativeWebSocket: () => (/* binding */ getNativeWebSocket)\n/* harmony export */ });\nfunction getNativeWebSocket() {\n    if (typeof WebSocket !== \"undefined\") return WebSocket;\n    if (typeof global.WebSocket !== \"undefined\") return global.WebSocket;\n    if (typeof window.WebSocket !== \"undefined\") return window.WebSocket;\n    if (typeof self.WebSocket !== \"undefined\") return self.WebSocket;\n    throw new Error(\"`WebSocket` is not supported in this environment\");\n} //# sourceMappingURL=utils.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2VzbS91dGlscy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBU0E7SUFDWixJQUFJLE9BQU9DLGNBQWMsYUFDckIsT0FBT0E7SUFDWCxJQUFJLE9BQU9DLE9BQU9ELFNBQVMsS0FBSyxhQUM1QixPQUFPQyxPQUFPRCxTQUFTO0lBQzNCLElBQUksT0FBT0UsT0FBT0YsU0FBUyxLQUFLLGFBQzVCLE9BQU9FLE9BQU9GLFNBQVM7SUFDM0IsSUFBSSxPQUFPRyxLQUFLSCxTQUFTLEtBQUssYUFDMUIsT0FBT0csS0FBS0gsU0FBUztJQUN6QixNQUFNLElBQUlJLE1BQU07QUFDcEIsRUFDQSxpQ0FBaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2NrZXRoLy4vbm9kZV9tb2R1bGVzL2lzb3dzL19lc20vdXRpbHMuanM/ODBhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0TmF0aXZlV2ViU29ja2V0KCkge1xuICAgIGlmICh0eXBlb2YgV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gV2ViU29ja2V0O1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsLldlYlNvY2tldCAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5XZWJTb2NrZXQ7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gd2luZG93LldlYlNvY2tldDtcbiAgICBpZiAodHlwZW9mIHNlbGYuV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gc2VsZi5XZWJTb2NrZXQ7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiYFdlYlNvY2tldGAgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50XCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIl0sIm5hbWVzIjpbImdldE5hdGl2ZVdlYlNvY2tldCIsIldlYlNvY2tldCIsImdsb2JhbCIsIndpbmRvdyIsInNlbGYiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_esm/utils.js\n");

/***/ })

};
;