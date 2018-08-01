(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/anim/scripts/fws/utils/HttpUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ef95nVr/BNIYE5BAEOgGL0', 'HttpUtils', __filename);
// resources/scripts/fws/utils/HttpUtils.ts

/*
 * Http 常用功能
 * @Author: 刘强
 * @Date: 2018-07-16 17:47:09
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-16 17:47:29
 */
var HttpUtils;
(function (HttpUtils) {
    /**
     * URL正则表达式
     */
    var regexUrl = /^(http|https):\/\/([^\/\:]+)(:\d+)?([^\?\#]*)(\?[^#]*)?(#[^\r\n]*)?$/;
    /**
     * 添加一个k/v参数字符串
     * @export
     * @param {string} src
     * @param {string} name
     * @param {*} value
     * @returns {string}
     */
    function addParam(src, name, value) {
        var ret = src + "";
        if (!name)
            return ret;
        if (value === null || value === undefined)
            return ret;
        if (ret.length > 0)
            ret += "&";
        ret += encodeURIComponent(name);
        ret += "=";
        ret += encodeURIComponent(value.toString());
        return ret;
    }
    HttpUtils.addParam = addParam;
    /**
     * 获取k/v参数集的字符串
     * @export
     * @param {*} data
     * @returns {string}
     */
    function getParams(data) {
        var ret = "";
        if (data && typeof (data) === "object") {
            for (var key in data) {
                var value = data[key];
                ret = addParam(ret, key.toString(), value);
            }
        }
        return ret;
    }
    HttpUtils.getParams = getParams;
    /**
     * 检查是否是合法的URL地址
     * @param uri
     */
    function isUrl(uri) {
        if (uri.toLowerCase() === "about:blank")
            return true;
        else
            return regexUrl.test(uri);
    }
    HttpUtils.isUrl = isUrl;
    /**
     * URL地址处理类, 仅限http/https方案
     * @class URL
     */
    var URL = /** @class */ (function () {
        /**
         * 构造
         * @param {string} uri 参考地址
         * @param {string} baseUrl 基础地址
         * @memberof URL
         */
        function URL(uri, baseUrl) {
            this._scheme = "";
            this._host = "";
            this._port = 0;
            this._path = "";
            this._query = "";
            this._anchor = "";
            this.parse(uri, baseUrl);
        }
        /**
         * 检查URL是否合法
         * @param {string} uri
         * @returns {boolean}
         * @memberof URL
         */
        URL.isUrl = function (uri) {
            return HttpUtils.isUrl(uri);
        };
        /**
         * 解析URL地址
         * @protected
         * @param {string} uri 参考地址
         * @param {string} baseUrl 基础地址
         * @memberof URL
         */
        URL.prototype.parse = function (uri, baseUrl) {
            if (!uri)
                return;
            var url = uri;
            if (baseUrl && baseUrl.length > 0) {
                if (baseUrl.substr(baseUrl.length - 1, 1) === "/" || uri.substr(0, 1) === "/") {
                    url = baseUrl + uri;
                }
                else {
                    url = baseUrl + "/" + uri;
                }
            }
            if (!regexUrl.test(url))
                return;
            var ps = regexUrl.exec(url);
            this._scheme = (ps[1] ? ps[1] : "");
            this._host = (ps[2] ? ps[2] : "");
            if (ps[3] && ps[3].length > 1) {
                this._port = parseInt(ps[3].substr(1));
            }
            else
                this._port = 0;
            this._path = (ps[4] ? ps[4] : "");
            //query
            if (ps[5] && ps[5].length > 1) {
                this._query = ps[5].substr(1);
            }
            else
                this._query = "";
            //anchor
            if (ps[6] && ps[6].length > 1) {
                this._anchor = ps[6].substr(1);
            }
            else
                this._anchor = "";
        };
        /**
         * 添加一个请求参数
         * @param {string} name
         * @param {*} value
         * @memberof URL
         */
        URL.prototype.addQueryParam = function (name, value) {
            this._query = addParam(this._query, name, value);
        };
        /**
         * 添加一个锚点参数
         * @param {string} name
         * @param {*} value
         * @memberof URL
         */
        URL.prototype.addAnchorParam = function (name, value) {
            this._anchor = addParam(this._anchor, name, value);
        };
        /**
         * 设置请求数据
         * @param {*} data
         * @memberof URL
         */
        URL.prototype.setQueryParams = function (data) {
            this._query = getParams(data);
        };
        /**
         * 设置锚点数据
         * @param {*} data
         * @memberof URL
         */
        URL.prototype.setAnchorParams = function (data) {
            this._anchor = getParams(data);
        };
        /**
         * 获取URL地址字符串
         * @returns {string}
         * @memberof URL
         */
        URL.prototype.toString = function () {
            var ret = "";
            ret += this._scheme + "://";
            ret += this._host;
            if (this._port > 0) {
                ret += ":" + this._port.toString();
            }
            ret += this._path;
            if (this._query && this._query.length > 0) {
                ret += "?" + this._query;
            }
            if (this._anchor && this._anchor.length > 0) {
                ret += "#" + this._anchor;
            }
            return ret;
        };
        Object.defineProperty(URL.prototype, "scheme", {
            //属性
            /**
             * 获取或设置地址方案(HTTP/HTTPS)
             * @type {string}
             * @memberof URL
             */
            get: function () {
                return this._scheme;
            },
            set: function (v) {
                this._scheme = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URL.prototype, "host", {
            /**
             * 获取或设置主机地址(域名或者端口)
             * @type {string}
             * @memberof URL
             */
            get: function () {
                return this._host;
            },
            set: function (v) {
                this._host = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URL.prototype, "port", {
            /**
             * 获取或设置端口号
             * @type {number}
             * @memberof URL
             */
            get: function () {
                return this._port;
            },
            set: function (v) {
                this._port = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URL.prototype, "path", {
            /**
             * 获取或设置路径
             * @type {string}
             * @memberof URL
             */
            get: function () {
                return this._path;
            },
            set: function (v) {
                this._path = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URL.prototype, "query", {
            /**
             * 获取或设置请求参数(GET)
             * @type {string}
             * @memberof URL
             */
            get: function () {
                return this._query;
            },
            set: function (v) {
                this._query = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URL.prototype, "anchor", {
            /**
             * 获取或设置锚点参数
             * @type {string}
             * @memberof URL
             */
            get: function () {
                return this._anchor;
            },
            set: function (v) {
                this._anchor = v;
            },
            enumerable: true,
            configurable: true
        });
        return URL;
    }());
    HttpUtils.URL = URL;
})(HttpUtils || (HttpUtils = {}));
module.exports = HttpUtils;
// SAMPLE:
// var u = new HttpUtils.URL("http://www.163.com:8080/abcde/ddd/p/1232345.html?a=1&b=2&c=3#abcdefg");
// var u = new HttpUtils.URL("/module/api", "http://poker.smzy.cc:8080");
// u.addQueryParam("token","OOOOOOO");
// u.addQueryParam("userid", "10175000062");
// u.addAnchorParam("gameuuid", "XXXXXXXX");
// console.log(u);
// console.log(u.toString());

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HttpUtils.js.map
        