/*
 * 单位行为
 * @Author: 刘强 
 * @Date: 2018-10-20 21:49:24 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 01:46:30
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');
import TJoyBehavior = require('./behaviors/TJoyBehavior');


class TUnitBehavior extends TUnitComponentAbstract
{
	public type: TECSCore.TUnitBehaviorType

	protected getKey(): string
	{
		return "TUnitBehavior";
	}

	protected onInit(): void
	{
		super.onInit();

		this.type = TECSCore.TUnitBehaviorType.Joy;
	}


	public onTick(d: number): void
	{
		switch (this.type)
		{
			/** 摇杆 */
			case TECSCore.TUnitBehaviorType.Joy:
				TJoyBehavior.instance.onTick(d, this);
				break;
		}
	}
}

export = TUnitBehavior