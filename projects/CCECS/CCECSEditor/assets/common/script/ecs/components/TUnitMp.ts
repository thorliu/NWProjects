/*
 * 能量值模块
 * @Author: 刘强 
 * @Date: 2018-10-11 17:19:33 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:22:39
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitMp extends TUnitComponentAbstract
{
	protected onInit(): void
	{
		this._energy = 100;
		this._energyMax = 100;
	}

	protected getKey(): string
	{
		return "TUnitMp";
	}

	/** 当前能量值 */
	protected _energy: number;
	/** 获取或设置当前能量值 */
	public get energy(): number { return this._energy; }
	public set energy(v: number)
	{
		this._energy = Math.min(v, this._energyMax);
	}

	/** 当前能量值上限 */
	protected _energyMax: number;
	/** 获取或设置当前能量值上限 */
	public get energyMax(): number { return this._energyMax; }
	public set energyMax(v: number)
	{
		this._energyMax = v;
		this._energy = Math.min(this._energy, this._energyMax);
	}

}
export = TUnitMp;