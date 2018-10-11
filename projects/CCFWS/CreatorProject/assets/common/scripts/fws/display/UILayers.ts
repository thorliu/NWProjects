/*
 * 界面层级结构
 * @Author: 刘强 
 * @Date: 2018-08-01 10:49:03 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 16:15:58
 */

// const createNode = function (name:string, parent?: cc.Node): cc.Node
// {
// 	var ret: cc.Node = new cc.Node();
// 	ret.name = name;
// 	ret.setAnchorPoint(0, 0);
// 	var widget: cc.Widget = ret.addComponent(cc.Widget);
// 	widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight;
// 	widget.top = widget.bottom = widget.left = widget.right = 0;

// 	if (parent) parent.addChild(ret);

// 	return ret;
// };

module UILayers
{
	// /** UI根节点 */
	// export const ui: cc.Node = createNode("ui");
	// /** 背景层 */
	// export const background: cc.Node = createNode("frontground", ui);
	// /** 前景主节点 */
	// const frontground: cc.Node = createNode("frontground", ui);
	// /** 普通前景层 */
	// export const frontground_normal: cc.Node = createNode("frontground_normal", frontground);
	// /** 置顶前景层 */
	// export const frontground_top: cc.Node = createNode("frontground_top", frontground);
	// /** 覆盖层 */
	// export const overlayer:cc.Node = createNode("overlayer", ui);
	// /** 屏蔽层 */
	// export const masklayer:cc.Node = createNode("masklayer", ui);
	// /** 弹出主节点 */
	// const popuper:cc.Node = createNode("popuper", ui);
	// /** 普通弹出层 */
	// export const popuper_normal:cc.Node = createNode("popuper_normal", popuper);
	// /** 置顶弹出层 */
	// export const popuper_top:cc.Node = createNode("popuper_top", popuper);
	// /** 指引层 */
	// export const guide:cc.Node = createNode("guide", ui);
}

export = UILayers;