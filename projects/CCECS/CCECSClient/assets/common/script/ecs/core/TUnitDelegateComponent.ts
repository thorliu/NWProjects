/*
 * @Author: 刘强 
 * @Date: 2018-10-12 11:25:33 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 13:18:17
 */


const { ccclass, property } = cc._decorator;
import TUnit = require('./TUnit');
import TECSCore = require('./TECSCore');


/*
	TUnit::components[k,v]

	---------------------------------

	Node:
		TUnitDelegateComponent
*/


@ccclass
export default class TUnitDelegateComponent extends cc.Component implements TECSCore.IUnitComponent
{
	public unit:TUnit;

	constructor()
	{
		super();
	}

	public onTick(d:number):void
	{
	}
	
	public onBind():void
	{
	}

	public onUnbind():void
	{
	}

	protected getKey():string
	{
		return "TUnitDelegateComponent";
	}

	public get key():string { return this.getKey(); }

}