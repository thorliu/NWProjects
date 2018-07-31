"use strict";
cc._RF.push(module, 'bb175f/FydMlYQk1mzCYMzo', 'FWSEnv');
// resources/scripts/fws/FWSEnv.ts

/*
 * 环境参数
 * @Author: 刘强
 * @Date: 2018-07-31 15:20:34
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:15:31
 */
var FWSEnv;
(function (FWSEnv) {
    // NOTE: 基础参数
    /** 是否开启调试功能 */
    FWSEnv.DEBUG = true;
    /** 是否使用生产环境 */
    FWSEnv.PROD = false;
    /** 是否模拟器环境 */
    FWSEnv.SIMULATOR = true;
    // NOTE: 高级参数
    /** 是否开启高级调试功能 */
    FWSEnv.DEBUG_ADVANCED = FWSEnv.DEBUG && FWSEnv.SIMULATOR && true;
})(FWSEnv || (FWSEnv = {}));
module.exports = FWSEnv;

cc._RF.pop();