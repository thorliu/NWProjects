/*
 * @Author: 刘强 
 * @Date: 2018-10-12 11:25:33 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 13:40:38
 */


const { ccclass, property } = cc._decorator;
import TUnit = require('./TUnit');
import TECSCore = require('./TECSCore');

@ccclass
export default class TUnitDelegateComponent extends cc.Component implements TECSCore.IUnitComponent
{
	public unit:TUnit;

	/** 构造 */
	constructor()
	{
		super();
	}

	//NOTE: 逻辑层 -------------

	/** tick逻辑 */
	public onTick(d:number):void
	{
	}
	
	/** unit绑定时 */
	public onBind():void
	{
	}

	/** unit解除绑定时 */
	public onUnbind():void
	{
	}

	/** 供unit查询的key */
	protected getKey():string
	{
		return "TUnitDelegateComponent";
	}

	/** 供unit查询的key */
	public get key():string { return this.getKey(); }


	//NOTE: 显示层 -------------

	/** node激活时 */
	public onEnable():void
	{
	}

	/** node屏蔽时 */
	public onDisable():void
	{
	}

	/** 逐帧 */
	public update(d:number):void
	{
	}
}