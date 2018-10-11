/*
 * @Author: 刘强 
 * @Date: 2018-10-11 17:28:20 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:39:47
 */

import TECSCore = require('./TECSCore');
import TUnit = require('./TUnit');


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
	}

	/** 添加单位 */
	public add(unit: TUnit): void
	{
		if (this.units.indexOf(unit) >= 0) return;
		this.units.push(unit);
	}

	/** 移除单位 */
	public remove(unit: TUnit): void
	{
		var i: number = this.units.indexOf(unit);
		if (i >= 0)
		{
			this.units.splice(i, 1);
		}
	}

	/** 清空单位 */
	public clear(): void
	{
		this.units.splice(0, this.units.length);
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