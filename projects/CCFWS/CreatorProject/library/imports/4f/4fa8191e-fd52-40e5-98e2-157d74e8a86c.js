"use strict";
cc._RF.push(module, '4fa81ke/VJA5ZjiFX106Khs', 'UILayers');
// resources/scripts/fws/display/UILayers.ts

/*
 * 界面层级结构
 * @Author: 刘强
 * @Date: 2018-08-01 10:49:03
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 11:03:07
 */
var createNode = function (name, parent) {
    var ret = new cc.Node();
    ret.name = name;
    ret.setAnchorPoint(0, 0);
    var widget = ret.addComponent(cc.Widget);
    widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight;
    widget.top = widget.bottom = widget.left = widget.right = 0;
    if (parent)
        parent.addChild(ret);
    return ret;
};
var UILayers;
(function (UILayers) {
    /** UI根节点 */
    UILayers.ui = createNode("ui");
    /** 背景层 */
    UILayers.background = createNode("frontground", UILayers.ui);
    /** 前景主节点 */
    var frontground = createNode("frontground", UILayers.ui);
    /** 普通前景层 */
    UILayers.frontground_normal = createNode("frontground_normal", frontground);
    /** 置顶前景层 */
    UILayers.frontground_top = createNode("frontground_top", frontground);
    /** 覆盖层 */
    UILayers.overlayer = createNode("overlayer", UILayers.ui);
    /** 屏蔽层 */
    UILayers.masklayer = createNode("masklayer", UILayers.ui);
    /** 弹出主节点 */
    var popuper = createNode("popuper", UILayers.ui);
    /** 普通弹出层 */
    UILayers.popuper_normal = createNode("popuper_normal", popuper);
    /** 置顶弹出层 */
    UILayers.popuper_top = createNode("popuper_top", popuper);
    /** 指引层 */
    UILayers.guide = createNode("guide", UILayers.ui);
})(UILayers || (UILayers = {}));
module.exports = UILayers;

cc._RF.pop();