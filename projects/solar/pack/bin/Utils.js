var Utils;
(function (Utils) {
    class StrUtils {
        static trim(src) {
            return src.replace(/^\s+/g, "").replace(/\s+$/g, "");
        }
        static htmlEncode(src) {
            var s = "";
            var str = src + "";
            if (str.length == 0)
                return "";
            s = str.replace(/&/g, "&gt;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\'/g, "'");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");
            return s;
        }
        static htmlDecode(src) {
            var s = "";
            var str = src + "";
            if (str.length == 0)
                return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, "");
            s = s.replace(/'/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br>/g, "\n");
            s = s.replace(/&#39;/g, "\'");
            return s;
        }
        static urlEncode(src) {
            return encodeURI(src);
        }
        static urlDecode(src) {
            return decodeURI(src);
        }
        static matchs(src, re) {
            var result = new Array();
            var str = src + "";
            var item = null;
            while ((item = re.exec(str)) !== null) {
                result.push(item);
            }
            return result;
        }
        static format(src, ...args) {
            var str = src + "";
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        }
        static formatData(src, data) {
            var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
            var ms = Utils.StrUtils.matchs(src, re);
            var str = src + "";
            for (var i = ms.length - 1; i >= 0; i--) {
                var m = ms[i];
                var mIndex = m.index;
                var mLength = m[0].length;
                var mKey = m[0].substr(1, mLength - 2);
                var mValue = Utils.StrUtils.getDataValue(data, mKey);
                var mStr = mValue ? mValue.toString() : "";
                str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
            }
            return str;
        }
        static formatArray(src, spec, ary) {
            if (!src)
                return "";
            if (!ary)
                return src + "";
            var str = src + "";
            var ret = "";
            for (var i = 0; i < ary.length; i++) {
                if (i > 0)
                    ret += spec;
                ret += Utils.StrUtils.formatData(str, ary[i]);
            }
            return ret;
        }
        static getDataValue(data, key) {
            if (data) { }
            else
                return null;
            var ks = key.split(".");
            var temp = data;
            for (var i = 0; i < ks.length; i++) {
                var k = ks[i];
                if (k != "") {
                    temp = temp[k];
                }
            }
            return temp;
        }
        static getQuery(name) {
            var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return decodeURI(result[1]);
        }
        static getQueryData() {
            var queryString = document.location.search + "";
            queryString = queryString.trim().replace(/^\?/g, "");
            var items = queryString.split("&");
            var ret = new Object();
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemAry = item.split("=");
                if (itemAry.length == 2) {
                    var k = Utils.StrUtils.urlDecode(itemAry[0]);
                    k = Utils.StrUtils.trim(k);
                    var v = Utils.StrUtils.urlDecode(itemAry[1]);
                    v = Utils.StrUtils.trim(v);
                    if (k.length > 0) {
                        ret[k] = v;
                    }
                }
            }
            return ret;
        }
    }
    Utils.StrUtils = StrUtils;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map