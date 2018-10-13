/*
 * UILayers支持组件
 * @Author: 刘强 
 * @Date: 2018-09-29 19:30:24 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 09:55:10
 */
const { ccclass, property } = cc._decorator;
import UILayers = require('../UILayers');

@ccclass
export default class UILayersComponent extends cc.Component
{
	public onEnable():void
	{
		cc.director.getScene().addChild(UILayers.nodes().ui);
	}

	public onDisable():void
	{
		UILayers.removeSelf();
	}
}