(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/common/scripts/fws/net/WebClient.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '71519x7ShlO4qzTFQMuJnLw', 'WebClient', __filename);
// resources/scripts/fws/net/WebClient.ts

/*
 * web请求 (短连接)
 * @Author: 刘强
 * @Date: 2018-07-16 17:37:04
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 14:24:57
 */
var HttpUtils = require("../utils/HttpUtils");
var FWSEnv = require("../FWSEnv");
var WebClient;
(function (WebClient) {
    /** GET超时时间 */
    WebClient.GET_OVERTIME = 1000 * 5;
    /** POST超时时间 */
    WebClient.POST_OVERTIME = 1000 * 10;
    /**
     * uri检查方法类型
     */
    WebClient.uriChecker = function (uri, data) {
        if (!data)
            return uri;
        // data.appid = 2;
        // data.token = "abcdefghijklmnopqrstuvwxyz";
        // data.time = new Date().getTime();
        var ret = uri + "";
        var keys = Object.keys(data);
        if (keys.length === 0)
            return ret;
        if (ret.indexOf("?") < 0) {
            ret += "?";
        }
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var v = data[k];
            v = encodeURIComponent(v);
            ret += "&" + k + "=" + v;
        }
        return ret;
    };
    /**
     * POST参数检查器
     */
    WebClient.postChecker = function (data) {
        if (typeof (data) !== "object")
            return "";
        var arr = new Array();
        var i = 0;
        for (var attr in data) {
            arr[i] = attr + "=" + encodeURIComponent(data[attr]);
            i++;
        }
        return arr.join("&");
    };
    /** 发起GET请求 */
    function get(uri, data, callbackTarget, successHandler, failHandler) {
        if (!HttpUtils.URL.isUrl(uri)) {
            uri = FWSEnv.API_BASE_URL + uri;
        }
        var request = new XMLHttpRequest();
        var url = WebClient.uriChecker ? WebClient.uriChecker(uri, data) : uri;
        request.open("GET", url);
        request.timeout = WebClient.GET_OVERTIME;
        request.setRequestHeader("content-type", "text/plain;charset=UTF-8");
        request.onerror = request.ontimeout = function () {
            if (request.readyState !== 4) {
                if (failHandler)
                    failHandler.call(callbackTarget, request);
            }
        };
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                    if (successHandler)
                        successHandler.call(callbackTarget, request);
                }
                else {
                    if (failHandler)
                        failHandler.call(callbackTarget, request);
                }
            }
        };
        request.send();
    }
    WebClient.get = get;
    /** 发起POST请求 */
    function post(uri, getData, postData, callbackTarget, successHandler, failHandler) {
        if (!HttpUtils.URL.isUrl(uri)) {
            uri = FWSEnv.API_BASE_URL + uri;
        }
        var request = new XMLHttpRequest();
        var url = WebClient.uriChecker ? WebClient.uriChecker(uri, getData) : uri;
        request.open("POST", url, true);
        request.timeout = WebClient.POST_OVERTIME;
        request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        request.onerror = request.ontimeout = function () {
            if (request.readyState !== 4) {
                if (failHandler)
                    failHandler.call(callbackTarget, request);
            }
        };
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                    if (successHandler)
                        successHandler.call(callbackTarget, request);
                }
                else {
                    if (failHandler)
                        failHandler.call(callbackTarget, request);
                }
            }
        };
        if (WebClient.postChecker)
            postData = WebClient.postChecker(postData);
        request.send(postData);
    }
    WebClient.post = post;
})(WebClient || (WebClient = {}));
module.exports = WebClient;
// const GLOBAL_YY = window["GLOBAL_YY"] || {};
// GLOBAL_YY.YYWebClient = YYWebClient;

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
        //# sourceMappingURL=WebClient.js.map
        