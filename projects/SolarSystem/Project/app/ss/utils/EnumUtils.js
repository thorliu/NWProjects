"use strict";
const ObjectUtils = require("./ObjectUtils");
var EnumUtils;
(function (EnumUtils) {
    function contain(a, b) {
        if (!ObjectUtils.isEmpty(a) && !ObjectUtils.isEmpty(b)) {
            return (a & b) === b;
        }
        return false;
    }
    EnumUtils.contain = contain;
    function add(a, b) {
        if (ObjectUtils.isEmpty(a) && ObjectUtils.isEmpty(b)) {
            return 0;
        }
        else if (ObjectUtils.isEmpty(a)) {
            return b;
        }
        else if (ObjectUtils.isEmpty(b)) {
            return a;
        }
        else
            return a | b;
    }
    EnumUtils.add = add;
    function remove(a, b) {
        if (ObjectUtils.isEmpty(a)) {
            return 0;
        }
        else if (ObjectUtils.isEmpty(b)) {
            return a;
        }
        else {
            if ((a & b) == b) {
                return a - b;
            }
            else {
                return a;
            }
        }
    }
    EnumUtils.remove = remove;
})(EnumUtils || (EnumUtils = {}));
module.exports = EnumUtils;
//# sourceMappingURL=EnumUtils.js.map