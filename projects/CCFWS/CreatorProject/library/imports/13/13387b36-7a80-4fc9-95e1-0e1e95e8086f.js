"use strict";
cc._RF.push(module, '13387s2eoBPyZXhDh6V6Ahv', 'TestScene');
// resources/scripts/game/scene/TestScene.ts

/*
 * 测试场景
 * @Author: 刘强
 * @Date: 2018-07-31 16:14:10
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:27:29
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FWSComponent = require("../../fws/display/FWSComponent");
var TestScene = /** @class */ (function (_super) {
    __extends(TestScene, _super);
    function TestScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestScene = __decorate([
        ccclass
    ], TestScene);
    return TestScene;
}(FWSComponent.default));
exports.default = TestScene;

cc._RF.pop();