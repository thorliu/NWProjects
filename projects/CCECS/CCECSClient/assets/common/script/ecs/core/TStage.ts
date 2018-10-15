/*
 * @Author: 刘强 
 * @Date: 2018-10-11 17:28:20 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 13:56:53
 */

import TECSCore = require('./TECSCore');
import TUnit = require('./TUnit');
import TStageDisplayComponent = require('../display/TStageDisplayComponent');
import TDisplayFacade = require('./TDisplayFacade');
import FWSTool = require('../../fws/utils/FWSTool');



class TStage
{
	/** 势力划分 */
	public forces: TECSCore.TForceInfo[];

	/** 所有单位 */
	protected units: TUnit[];

	/** 构造 */
	constructor()
	{
		this.forces = [];
		this.units = [];

		//----
		this.forces.push({
			name: "玩家",
			players: [
				{
					id: "1",
					type: TECSCore.TForceTypes.Player,
					name: "liuqiang"
				},
				{
					id: "2",
					type: TECSCore.TForceTypes.Player,
					name: "thor"
				}
			]
		});
	}

	/** 添加单位 */
	public add(unit: TUnit): void
	{
		if (this.units.indexOf(unit) >= 0) return;
		this.units.push(unit);

		if (unit.node)
		{
			if (FWSTool.Enum.contain(unit.staticAttributes, TECSCore.TUnitStaticAttributes.Projectile))
			{
				TDisplayFacade.stageDisplayComponent.projectile.addChild(unit.node);
			}
			else if (FWSTool.Enum.contain(unit.staticAttributes, TECSCore.TUnitStaticAttributes.Air))
			{
				TDisplayFacade.stageDisplayComponent.air.addChild(unit.node);
			}
			else
			{
				TDisplayFacade.stageDisplayComponent.ground.addChild(unit.node);
			}
		}
	}

	/** 移除单位 */
	public remove(unit: TUnit): void
	{
		var i: number = this.units.indexOf(unit);
		if (i >= 0)
		{
			this.units.splice(i, 1);
		}

		if (unit.node)
		{
			unit.node.removeFromParent(false);
		}
	}

	/** 清空单位 */
	public clear(): void
	{
		this.units.splice(0, this.units.length);
		TDisplayFacade.stageDisplayComponent.ground.removeAllChildren();
		TDisplayFacade.stageDisplayComponent.air.removeAllChildren();
		TDisplayFacade.stageDisplayComponent.projectile.removeAllChildren();
	}

	/** tick逻辑 */
	public onTick(d: number): void
	{
		for (var i: number = 0; i < this.units.length; i++)
		{
			var unit: TUnit = this.units[i];
			if (unit) unit.onTick(d);
		}
	}

	/** 获取所有单位 */
	public getUnits(): TUnit[]
	{
		return this.units;
	}
}

export = TStage;