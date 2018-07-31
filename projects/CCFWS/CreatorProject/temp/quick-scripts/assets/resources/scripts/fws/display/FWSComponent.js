(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/fws/display/FWSComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6bdf3qrlVZAPpPBQS4mVQtC', 'FWSComponent', __filename);
// resources/scripts/fws/display/FWSComponent.ts

/*
 * 组件脚本
 * @Author: 刘强
 * @Date: 2018-07-31 16:18:57
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:29:23
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FWSMvc = require("../mvc/FWSMvc");
var X = require("../utils/X");
var FWSComponent = /** @class */ (function (_super) {
    __extends(FWSComponent, _super);
    function FWSComponent() {
        var _this = _super.call(this) || this;
        _this.mvcDelegate = new FWSMvc.FMessageConnectionDelegate(_this);
        return _this;
    }
    FWSComponent.prototype.onEnable = function () {
        this.mvcDelegate.connect();
        X.trace("onEnable");
    };
    FWSComponent.prototype.onDisable = function () {
        this.mvcDelegate.disconnect();
        X.trace("onDisable");
    };
    FWSComponent = __decorate([
        ccclass
    ], FWSComponent);
    return FWSComponent;
}(cc.Component));
exports.default = FWSComponent;

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
        //# sourceMappingURL=FWSComponent.js.map
        