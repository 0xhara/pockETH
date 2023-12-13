/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/toggle-selection";
exports.ids = ["vendor-chunks/toggle-selection"];
exports.modules = {

/***/ "(ssr)/./node_modules/toggle-selection/index.js":
/*!************************************************!*\
  !*** ./node_modules/toggle-selection/index.js ***!
  \************************************************/
/***/ ((module) => {

eval("module.exports = function() {\n    var selection = document.getSelection();\n    if (!selection.rangeCount) {\n        return function() {};\n    }\n    var active = document.activeElement;\n    var ranges = [];\n    for(var i = 0; i < selection.rangeCount; i++){\n        ranges.push(selection.getRangeAt(i));\n    }\n    switch(active.tagName.toUpperCase()){\n        case \"INPUT\":\n        case \"TEXTAREA\":\n            active.blur();\n            break;\n        default:\n            active = null;\n            break;\n    }\n    selection.removeAllRanges();\n    return function() {\n        selection.type === \"Caret\" && selection.removeAllRanges();\n        if (!selection.rangeCount) {\n            ranges.forEach(function(range) {\n                selection.addRange(range);\n            });\n        }\n        active && active.focus();\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2NrZXRoLy4vbm9kZV9tb2R1bGVzL3RvZ2dsZS1zZWxlY3Rpb24vaW5kZXguanM/NWJhZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gIGlmICghc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gIH1cbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgdmFyIHJhbmdlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvbi5yYW5nZUNvdW50OyBpKyspIHtcbiAgICByYW5nZXMucHVzaChzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKSk7XG4gIH1cblxuICBzd2l0Y2ggKGFjdGl2ZS50YWdOYW1lLnRvVXBwZXJDYXNlKCkpIHsgLy8gLnRvVXBwZXJDYXNlIGhhbmRsZXMgWEhUTUxcbiAgICBjYXNlICdJTlBVVCc6XG4gICAgY2FzZSAnVEVYVEFSRUEnOlxuICAgICAgYWN0aXZlLmJsdXIoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGFjdGl2ZSA9IG51bGw7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxlY3Rpb24udHlwZSA9PT0gJ0NhcmV0JyAmJlxuICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgIGlmICghc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgIHJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3RpdmUgJiZcbiAgICBhY3RpdmUuZm9jdXMoKTtcbiAgfTtcbn07XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInNlbGVjdGlvbiIsImRvY3VtZW50IiwiZ2V0U2VsZWN0aW9uIiwicmFuZ2VDb3VudCIsImFjdGl2ZSIsImFjdGl2ZUVsZW1lbnQiLCJyYW5nZXMiLCJpIiwicHVzaCIsImdldFJhbmdlQXQiLCJ0YWdOYW1lIiwidG9VcHBlckNhc2UiLCJibHVyIiwicmVtb3ZlQWxsUmFuZ2VzIiwidHlwZSIsImZvckVhY2giLCJyYW5nZSIsImFkZFJhbmdlIiwiZm9jdXMiXSwibWFwcGluZ3MiOiJBQUNBQSxPQUFPQyxPQUFPLEdBQUc7SUFDZixJQUFJQyxZQUFZQyxTQUFTQyxZQUFZO0lBQ3JDLElBQUksQ0FBQ0YsVUFBVUcsVUFBVSxFQUFFO1FBQ3pCLE9BQU8sWUFBYTtJQUN0QjtJQUNBLElBQUlDLFNBQVNILFNBQVNJLGFBQWE7SUFFbkMsSUFBSUMsU0FBUyxFQUFFO0lBQ2YsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlQLFVBQVVHLFVBQVUsRUFBRUksSUFBSztRQUM3Q0QsT0FBT0UsSUFBSSxDQUFDUixVQUFVUyxVQUFVLENBQUNGO0lBQ25DO0lBRUEsT0FBUUgsT0FBT00sT0FBTyxDQUFDQyxXQUFXO1FBQ2hDLEtBQUs7UUFDTCxLQUFLO1lBQ0hQLE9BQU9RLElBQUk7WUFDWDtRQUVGO1lBQ0VSLFNBQVM7WUFDVDtJQUNKO0lBRUFKLFVBQVVhLGVBQWU7SUFDekIsT0FBTztRQUNMYixVQUFVYyxJQUFJLEtBQUssV0FDbkJkLFVBQVVhLGVBQWU7UUFFekIsSUFBSSxDQUFDYixVQUFVRyxVQUFVLEVBQUU7WUFDekJHLE9BQU9TLE9BQU8sQ0FBQyxTQUFTQyxLQUFLO2dCQUMzQmhCLFVBQVVpQixRQUFRLENBQUNEO1lBQ3JCO1FBQ0Y7UUFFQVosVUFDQUEsT0FBT2MsS0FBSztJQUNkO0FBQ0YiLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdG9nZ2xlLXNlbGVjdGlvbi9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/toggle-selection/index.js\n");

/***/ })

};
;