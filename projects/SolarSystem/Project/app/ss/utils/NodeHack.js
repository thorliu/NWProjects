"use strict";
var NodeHack;
(function (NodeHack) {
    function require(name) {
        var win = window;
        if (win) {
            var r = win.require;
            if (r) {
                return r(name);
            }
        }
    }
    NodeHack.require = require;
})(NodeHack || (NodeHack = {}));
module.exports = NodeHack;
//# sourceMappingURL=NodeHack.js.map