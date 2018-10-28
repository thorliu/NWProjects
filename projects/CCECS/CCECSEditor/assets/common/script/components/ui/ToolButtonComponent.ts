/*
 * 工具按钮脚本
 * @Author: 刘强 
 * @Date: 2018-10-27 17:50:52 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-27 17:54:16
 */

const { ccclass, property } = cc._decorator;

@ccclass
export class ToolButtonComponent extends cc.Component
{
	@property(cc.String)
	public key:string = "";

	public onClick():void
	{
	}
}
