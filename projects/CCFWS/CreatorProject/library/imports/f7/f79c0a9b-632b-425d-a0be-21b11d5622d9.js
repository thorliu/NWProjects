"use strict";
cc._RF.push(module, 'f79c0qbYytCXaC+IbEdViLZ', 'X');
// resources/scripts/fws/utils/X.ts

/*
 * 调试功能
 * @Author: 刘强
 * @Date: 2018-07-31 15:40:50
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:16:01
 */
var FWSEnv = require("../FWSEnv");
var X;
(function (X) {
    /** 获取任意内容的文本信息 */
    function getString(args) {
        var ret = "";
        var ary = [];
        if (args !== null && args !== undefined) {
            for (var i = 0; i < args.length; i++) {
                var a = args[i];
                if (a === null)
                    ary.push("NULL");
                else if (a === undefined)
                    ary.push("UNDEFINED");
                else
                    ary.push(a.toString());
            }
        }
        ret = ary.join(" ");
        return ret;
    }
    /** 执行控制台指令 */
    function executeConsole(api, args) {
        var handler = console[api];
        if (!handler)
            return;
        if (FWSEnv.DEBUG_ADVANCED) {
            handler.apply(null, args);
        }
        else {
            handler.call(null, getString(args));
        }
    }
    /**
     * 输出普通日志
     * @param args 内容
     */
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG)
            return;
        executeConsole("log", args);
    }
    X.log = log;
    /**
     * 输出信息日志
     * @param args 内容
     */
    function info() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG)
            return;
        executeConsole("info", args);
    }
    X.info = info;
    /**
     * 输出警告日志
     * @param args 内容
     */
    function warn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG)
            return;
        executeConsole("warn", args);
    }
    X.warn = warn;
    /**
     * 输出借误日志
     * @param args 内容
     */
    function error() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG)
            return;
        executeConsole("error", args);
    }
    X.error = error;
    /**
     * 按照指定的颜色输出日志
     * @param color {ConsoleColor} 按照
     * @param args 任意内容
     */
    function color(color) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        var msg = getString(args);
        console.log("%c" + msg, "color:" + color);
    }
    X.color = color;
    /** 开始一段可展开和收起的日志项(展开状态) */
    function group() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.group.apply(null, args);
    }
    X.group = group;
    /** 开始一段可展开和收起的日志项(收起状态) */
    function groupCollapsed() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.groupCollapsed.apply(null, args);
    }
    X.groupCollapsed = groupCollapsed;
    /** 结束一段可展开和收起的日志项 */
    function groupEnd() {
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.groupEnd();
    }
    X.groupEnd = groupEnd;
    /** 表格形式输出数据 */
    function table() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.table.apply(null, args);
    }
    X.table = table;
    /** 计时开始 */
    function time() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.time();
    }
    X.time = time;
    /** 计时结束 */
    function timeEnd() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.timeEnd();
    }
    X.timeEnd = timeEnd;
    /** 输出堆栈调用 */
    function trace() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!FWSEnv.DEBUG_ADVANCED)
            return;
        console.trace.apply(null, args);
    }
    X.trace = trace;
})(X || (X = {}));
window["X"] = X;
module.exports = X;

cc._RF.pop();