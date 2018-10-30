/*
 * @Author: 刘强 
 * @Date: 2018-10-30 16:46:52 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-30 16:47:32
 */

const { ccclass, property } = cc._decorator;
import EditorContexts = require('../editor/EditorContexts');


@ccclass
export default class MainSceneComponent extends cc.Component
{
	public onEnable():void
	{
		EditorContexts.startup();
	}
}