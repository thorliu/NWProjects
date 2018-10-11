(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/common/scripts/fws/core/FWSCommon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3b9b1voCItLbZTBaUp61OEl', 'FWSCommon', __filename);
// resources/scripts/fws/core/FWSCommon.ts

/*
 * 通用类型定义，方法简写之类的
 * @Author: 刘强
 * @Date: 2018-07-18 11:24:49
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:21:22
 */
///<reference path="../../../../../creator.d.ts"/>
var FWSMvc = require("../mvc/FWSMvc");
var FWSCommon;
(function (FWSCommon) {
    /** 切换到指定id的context */
    function gotoID(id) {
        FWSMvc.ContextManager().gotoID(id);
    }
    FWSCommon.gotoID = gotoID;
})(FWSCommon || (FWSCommon = {}));
module.exports = FWSCommon;

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
        //# sourceMappingURL=FWSCommon.js.map
        