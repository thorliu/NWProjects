var FWSUtils;
(function (FWSUtils) {
    function trim(src) {
        return src.replace(/^\s+/g, "").replace(/\s+$/g, "");
    }
    FWSUtils.trim = trim;
    function htmlEncode(src) {
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
    FWSUtils.htmlEncode = htmlEncode;
    function htmlDecode(src) {
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
    FWSUtils.htmlDecode = htmlDecode;
    function urlEncode(src) {
        return encodeURI(src);
    }
    FWSUtils.urlEncode = urlEncode;
    function urlDecode(src) {
        return decodeURI(src);
    }
    FWSUtils.urlDecode = urlDecode;
    function matchs(src, re) {
        var result = new Array();
        var str = src + "";
        var item = null;
        while ((item = re.exec(str)) !== null) {
            result.push(item);
        }
        return result;
    }
    FWSUtils.matchs = matchs;
    function format(src, ...args) {
        var str = src + "";
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
    FWSUtils.format = format;
    function formatData(src, data) {
        var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
        var ms = FWSUtils.matchs(src, re);
        var str = src + "";
        for (var i = ms.length - 1; i >= 0; i--) {
            var m = ms[i];
            var mIndex = m.index;
            var mLength = m[0].length;
            var mKey = m[0].substr(1, mLength - 2);
            var mValue = FWSUtils.getDataValue(data, mKey);
            var mStr = mValue ? mValue.toString() : "";
            str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
        }
        return str;
    }
    FWSUtils.formatData = formatData;
    function formatArray(src, spec, ary) {
        if (!src)
            return "";
        if (!ary)
            return src + "";
        var str = src + "";
        var ret = "";
        for (var i = 0; i < ary.length; i++) {
            if (i > 0)
                ret += spec;
            ret += FWSUtils.formatData(str, ary[i]);
        }
        return ret;
    }
    FWSUtils.formatArray = formatArray;
    function getDataValue(data, key) {
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
    FWSUtils.getDataValue = getDataValue;
    function getQuery(name) {
        var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return decodeURI(result[1]);
    }
    FWSUtils.getQuery = getQuery;
    function getQueryData() {
        var queryString = document.location.search + "";
        queryString = queryString.trim().replace(/^\?/g, "");
        var items = queryString.split("&");
        var ret = new Object();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemAry = item.split("=");
            if (itemAry.length == 2) {
                var k = FWSUtils.urlDecode(itemAry[0]);
                k = FWSUtils.trim(k);
                var v = FWSUtils.urlDecode(itemAry[1]);
                v = FWSUtils.trim(v);
                if (k.length > 0) {
                    ret[k] = v;
                }
            }
        }
        return ret;
    }
    FWSUtils.getQueryData = getQueryData;
})(FWSUtils || (FWSUtils = {}));
//# sourceMappingURL=FWSUtils.js.map