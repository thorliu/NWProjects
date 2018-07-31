"use strict";
cc._RF.push(module, 'bb175f/FydMlYQk1mzCYMzo', 'FWSEnv');
// resources/scripts/fws/FWSEnv.ts

/*
 * 环境参数
 * @Author: 刘强
 * @Date: 2018-07-31 15:20:34
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:39:15
 */
var FWSEnv;
(function (FWSEnv) {
    // NOTE: 基础参数
    /** 是否开启调试功能 */
    FWSEnv.DEBUG = CC_DEBUG;
    /** 是否使用生产环境 */
    FWSEnv.PROD = false;
    /** 是否模拟器环境 */
    FWSEnv.SIMULATOR = true;
    /** 是否编辑器环境 */
    FWSEnv.EDITOR = CC_EDITOR;
    // NOTE: 高级参数
    /** 是否开启高级调试功能 */
    FWSEnv.DEBUG_ADVANCED = FWSEnv.DEBUG && FWSEnv.SIMULATOR && true;
    /** 是否跟踪MVC通知 */
    FWSEnv.DEBUG_MVC_TRACE = FWSEnv.DEBUG && true;
    /** 是否跟踪CONTEXT开关 */
    FWSEnv.DEBUG_CONTEXT_TRACE = FWSEnv.DEBUG && false;
})(FWSEnv || (FWSEnv = {}));
module.exports = FWSEnv;

cc._RF.pop();