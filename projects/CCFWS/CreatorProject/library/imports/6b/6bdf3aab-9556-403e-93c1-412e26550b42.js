"use strict";
cc._RF.push(module, '6bdf3qrlVZAPpPBQS4mVQtC', 'FWSComponent');
// resources/scripts/fws/display/FWSComponent.ts

/*
 * 组件脚本
 * @Author: 刘强
 * @Date: 2018-07-31 16:18:57
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:30:33
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FWSMvc = require("../mvc/FWSMvc");
var X = require("../utils/X");
var FWSComponent = /** @class */ (function (_super) {
    __extends(FWSComponent, _super);
    /** 构造 */
    function FWSComponent() {
        var _this = _super.call(this) || this;
        _this.mvcDelegate = new FWSMvc.FMessageConnectionDelegate(_this);
        return _this;
    }
    /** 组件可用时 */
    FWSComponent.prototype.onEnable = function () {
        this.mvcDelegate.connect();
        X.trace("onEnable");
    };
    /** 组件不可用时 */
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