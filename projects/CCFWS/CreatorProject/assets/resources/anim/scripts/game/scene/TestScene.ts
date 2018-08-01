/*
 * 测试场景
 * @Author: 刘强 
 * @Date: 2018-07-31 16:14:10 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 15:15:23
 */


const { ccclass, property } = cc._decorator;

import X = require('../../fws/utils/X');
import FWSComponent = require('../../fws/display/FWSComponent');
import WebClient = require('../../fws/net/WebClient');
import UILayers = require('../../fws/display/UILayers');



@ccclass
export default class TestScene extends FWSComponent.default
{

    start()
    {
        this.node.addChild(UILayers.ui);

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
    }
}
