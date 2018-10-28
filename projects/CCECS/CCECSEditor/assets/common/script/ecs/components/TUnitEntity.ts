/*
 * @Author: 刘强 
 * @Date: 2018-10-11 17:10:17 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-15 13:39:23
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');
import TUnitDelegateComponent = require('../core/TUnitDelegateComponent');

class TUnitEntity extends TUnitComponentAbstract
{
	/** 代理 */
	protected delegate:TUnitDelegateComponent.default;

	//----

	/** 当前位置 */
	public pos: cc.Vec2;

	/** 当前朝向 */
	public direct: number;

	/** 是否活着 */
	public alive: boolean = true;
	
	//----

	/** 初始化 */
	protected onInit(): void
	{
		this.pos = cc.Vec2.ZERO;
		this.direct = 0;
	}

	protected getKey(): string
	{
		return "TUnitEntity";
	}


	public onBind():void
	{
		this.delegate = this.unit.getComponent("TUnitDelegateComponent") as TUnitDelegateComponent.default;
	}

	public onUnbind():void
	{
		this.delegate = null;
	}

	public onTick(d:number):void
	{
		if(!this.delegate) return;

		this.delegate.node.setPosition(this.pos.x, this.pos.y);
	}
}

export = TUnitEntity;