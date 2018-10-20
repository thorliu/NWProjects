/*
 * @Author: 刘强 
 * @Date: 2018-10-21 01:38:47 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 01:52:39
 */

import TECSCore = require('../../core/TECSCore');
import TJoy = require('../../core/TJoy');
import TUnit = require('../../core/TUnit');
import TUnitMover = require('../TUnitMover');
import TUnitEntity = require('../TUnitEntity');
import TUnitWeapon = require('../TUnitWeapon');



var _instance: TJoyBehavior;
class TJoyBehavior implements TECSCore.IUnitBehavior
{
	private constructor()
	{
	}

	public onTick(d: number, behavior: TECSCore.IUnitComponent): void
	{
		var unit: TUnit = behavior.unit;
		var entity: TUnitEntity = unit.getComponent(TECSCore.UnitComponentKeys.TUnitBehavior) as TUnitEntity;
		var mover: TUnitMover = unit.getComponent(TECSCore.UnitComponentKeys.TUnitMover) as TUnitMover;
		var weapon: TUnitWeapon = unit.getComponent(TECSCore.UnitComponentKeys.TUnitWeapon) as TUnitWeapon;

		//更新移动和转向状态
		if (TJoy.direct === null || TJoy.direct === undefined)
		{
			if (mover) mover.running = false;
		}
		else
		{
			if (entity) entity.direct = TJoy.direct;
			if (mover) mover.running = true;
		}

		//更新武器系统状态
		if(weapon)
		{
			//TODO: open fire
		}
	}

	static get instance(): TJoyBehavior
	{
		if (!_instance)
		{
			_instance = new TJoyBehavior();
		}
		return _instance;
	}
}

export = TJoyBehavior;