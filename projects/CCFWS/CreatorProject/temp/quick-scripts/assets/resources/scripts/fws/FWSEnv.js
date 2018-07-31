(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/fws/FWSEnv.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb175f/FydMlYQk1mzCYMzo', 'FWSEnv', __filename);
// resources/scripts/fws/FWSEnv.ts

/*
 * 环境参数
 * @Author: 刘强
 * @Date: 2018-07-31 15:20:34
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:28:28
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
    // NOTE: 高级参数
    FWSEnv.EDITOR = CC_EDITOR;
    /** 是否开启高级调试功能 */
    FWSEnv.DEBUG_ADVANCED = FWSEnv.DEBUG && FWSEnv.SIMULATOR && true;
})(FWSEnv || (FWSEnv = {}));
module.exports = FWSEnv;

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
        //# sourceMappingURL=FWSEnv.js.map
        