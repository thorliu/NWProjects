"use strict";
var ObjectUtils;
(function (ObjectUtils) {
    function getValue(data, path, def = null) {
        if (data === null || data === undefined)
            return def;
        if (typeof (data) !== "object")
            return def;
        try {
            if (data instanceof Array) {
                return eval("data" + path);
            }
            else {
                return eval("data." + path);
            }
        }
        catch (err) {
            return def;
        }
    }
    ObjectUtils.getValue = getValue;
    function isEmpty(data) {
        return (data === null || data === undefined);
    }
    ObjectUtils.isEmpty = isEmpty;
})(ObjectUtils || (ObjectUtils = {}));
module.exports = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map