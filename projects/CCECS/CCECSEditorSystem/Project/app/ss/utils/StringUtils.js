"use strict";
const ObjectUtils = require("./ObjectUtils");
var StringUtils;
(function (StringUtils) {
    function ltrim(target) {
        return target.replace(/^\s+/g, "");
    }
    StringUtils.ltrim = ltrim;
    function rtrim(target) {
        return target.replace(/\s+$/g, "");
    }
    StringUtils.rtrim = rtrim;
    function trim(target) {
        return ltrim(rtrim(target));
    }
    StringUtils.trim = trim;
    function repeat(count, char) {
        var ret = "";
        for (var i = 0; i < count; i++) {
            ret += char;
        }
        return ret;
    }
    StringUtils.repeat = repeat;
    function padLeft(source, count, fill) {
        var ret = repeat(count, fill) + source;
        ret = ret.substr(ret.length - count);
        return ret;
    }
    StringUtils.padLeft = padLeft;
    function padRight(source, count, fill) {
        var ret = source + repeat(count, fill);
        ret = ret.substr(0, count);
        return ret;
    }
    StringUtils.padRight = padRight;
    function isEmpty(target) {
        if (target === null || target === undefined)
            return true;
        if (target.length === 0)
            return true;
        if (trim(target).length === 0)
            return true;
        return false;
    }
    StringUtils.isEmpty = isEmpty;
    function matchs(re, str) {
        var result = new Array();
        var item = null;
        while ((item = re.exec(str)) !== null) {
            result.push(item);
        }
        return result;
    }
    StringUtils.matchs = matchs;
    function format(template, ...args) {
        var str = template + "";
        for (var i = 0; i < args.length; i++) {
            var re = new RegExp('\\{' + (i) + '\\}', 'gm');
            str = str.replace(re, args[i]);
        }
        return str;
    }
    StringUtils.format = format;
    function formatObject(template, obj) {
        var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
        var ms = matchs(re, template);
        var str = template + "";
        for (var i = ms.length - 1; i >= 0; i--) {
            var m = ms[i];
            var mIndex = m.index;
            var mLength = m[0].length;
            var mKey = m[0].substr(1, mLength - 2);
            var mValue = ObjectUtils.getValue(obj, mKey);
            var mStr = mValue ? mValue.toString() : "";
            str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
        }
        return str;
    }
    StringUtils.formatObject = formatObject;
    function formatArray(template, ary, sep = "") {
        if (ary === null || ary === undefined || ary.length === 0)
            return "";
        var temp = [];
        for (var i = 0; i < ary.length; i++) {
            temp.push(formatObject(template, ary[i]));
        }
        return temp.join(sep);
    }
    StringUtils.formatArray = formatArray;
})(StringUtils || (StringUtils = {}));
module.exports = StringUtils;
//# sourceMappingURL=StringUtils.js.map