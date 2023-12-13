"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/split-on-first";
exports.ids = ["vendor-chunks/split-on-first"];
exports.modules = {

/***/ "(ssr)/./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\nmodule.exports = (string, separator)=>{\n    if (!(typeof string === \"string\" && typeof separator === \"string\")) {\n        throw new TypeError(\"Expected the arguments to be of type `string`\");\n    }\n    if (separator === \"\") {\n        return [\n            string\n        ];\n    }\n    const separatorIndex = string.indexOf(separator);\n    if (separatorIndex === -1) {\n        return [\n            string\n        ];\n    }\n    return [\n        string.slice(0, separatorIndex),\n        string.slice(separatorIndex + separator.length)\n    ];\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3BsaXQtb24tZmlyc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFFQUEsT0FBT0MsT0FBTyxHQUFHLENBQUNDLFFBQVFDO0lBQ3pCLElBQUksQ0FBRSxRQUFPRCxXQUFXLFlBQVksT0FBT0MsY0FBYyxRQUFPLEdBQUk7UUFDbkUsTUFBTSxJQUFJQyxVQUFVO0lBQ3JCO0lBRUEsSUFBSUQsY0FBYyxJQUFJO1FBQ3JCLE9BQU87WUFBQ0Q7U0FBTztJQUNoQjtJQUVBLE1BQU1HLGlCQUFpQkgsT0FBT0ksT0FBTyxDQUFDSDtJQUV0QyxJQUFJRSxtQkFBbUIsQ0FBQyxHQUFHO1FBQzFCLE9BQU87WUFBQ0g7U0FBTztJQUNoQjtJQUVBLE9BQU87UUFDTkEsT0FBT0ssS0FBSyxDQUFDLEdBQUdGO1FBQ2hCSCxPQUFPSyxLQUFLLENBQUNGLGlCQUFpQkYsVUFBVUssTUFBTTtLQUM5QztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9ja2V0aC8uL25vZGVfbW9kdWxlcy9zcGxpdC1vbi1maXJzdC9pbmRleC5qcz85NDUxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBzZXBhcmF0b3IpID0+IHtcblx0aWYgKCEodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcGFyYXRvciA9PT0gJ3N0cmluZycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIGFyZ3VtZW50cyB0byBiZSBvZiB0eXBlIGBzdHJpbmdgJyk7XG5cdH1cblxuXHRpZiAoc2VwYXJhdG9yID09PSAnJykge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdGNvbnN0IHNlcGFyYXRvckluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuXHRpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRzdHJpbmcuc2xpY2UoMCwgc2VwYXJhdG9ySW5kZXgpLFxuXHRcdHN0cmluZy5zbGljZShzZXBhcmF0b3JJbmRleCArIHNlcGFyYXRvci5sZW5ndGgpXG5cdF07XG59O1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzdHJpbmciLCJzZXBhcmF0b3IiLCJUeXBlRXJyb3IiLCJzZXBhcmF0b3JJbmRleCIsImluZGV4T2YiLCJzbGljZSIsImxlbmd0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/split-on-first/index.js\n");

/***/ })

};
;