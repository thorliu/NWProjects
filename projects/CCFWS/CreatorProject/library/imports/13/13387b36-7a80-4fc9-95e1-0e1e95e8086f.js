"use strict";
cc._RF.push(module, '13387s2eoBPyZXhDh6V6Ahv', 'TestScene');
// common/scripts/game/scene/TestScene.ts

/*
 * 测试场景
 * @Author: 刘强
 * @Date: 2018-07-31 16:14:10
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 19:08:24
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FWSComponent = require("../../fws/display/FWSComponent");
var proto = require("../../pb/proto");
// import UILayers = require('../../fws/display/UILayers');
var TestScene = /** @class */ (function (_super) {
    __extends(TestScene, _super);
    function TestScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestScene.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        //NOTE: PB
        debugger;
        var pb_obj = proto.TestMsgA.create({
            A: "Hello",
            B: 2,
            C: 2,
            D: true
        });
        var pb_encode = proto.TestMsgA.encode(pb_obj).finish();
        var pb_decode = proto.TestMsgA.decode(pb_encode);
        debugger;
        // this.node.addChild(UILayers.ui);
        //NOTE: HTTP请求 
        // WebClient.get("https://www.baidu.com", {}, this, 
        // (res) => {
        //     X.log("success", res);
        //     debugger
        // }, 
        // (res) => {
        //     X.log("fail", res);
        //     debugger
        // });
        //NOTE: SPINE
        // cc.loader.load("http://localhost:8888/spine/test.atlas", sp.SkeletonData, (err, sps)=>{
        //     debugger 
        // });
        // var spineAtlas: string = null;
        // var spineJson: string = null;
        // var spineTexture: cc.Texture2D = null;
        // var self:TestScene = this;
        // var test: Function = function ()
        // {
        //     if (spineAtlas === null) return;
        //     if (spineJson === null) return;
        //     // if (spineTexture === null) return;
        //     // var skelectonJson:string = JSON.parse(spineJson);
        //     var s:sp.SkeletonData = new sp.SkeletonData();
        //     s.atlasText = spineAtlas;
        //     s.skeletonJson = JSON.parse(spineJson);
        //     // s.textures = [spineTexture];
        //     // s.textures["http://localhost:8888/spine/test.png"];
        //     var a:sp.Skeleton = new cc.Node().addComponent(sp.Skeleton);
        //     // a.skeletonData = s;
        //     self.node.addChild(a.node);
        //     console.log("completed", spineAtlas, spineJson, spineTexture);
        // };
        // WebClient.get("http://localhost:8888/spine/test.json", {}, this,
        //     (res: XMLHttpRequest) =>
        //     {
        //         spineJson = res.responseText;
        //         test();
        //     },
        //     (res: XMLHttpRequest) =>
        //     {
        //     });
        // WebClient.get("http://localhost:8888/spine/test.atlas", {}, this,
        //     (res: XMLHttpRequest) => 
        //     {
        //         spineAtlas = res.responseText;
        //         test();
        //     },
        //     (res: XMLHttpRequest) =>
        //     {
        //     });
        // cc.loader.load("http://localhost:8888/spine/test.png", function (err, tex)
        // {
        //     if (!err)
        //     {
        //         spineTexture = tex;
        //         test();
        //     }
        // });
    };
    TestScene = __decorate([
        ccclass
    ], TestScene);
    return TestScene;
}(FWSComponent.default));
exports.default = TestScene;

cc._RF.pop();