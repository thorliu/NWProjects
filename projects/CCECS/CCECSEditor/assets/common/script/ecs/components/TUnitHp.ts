/*
 * 生命值模块
 * @Author: 刘强 
 * @Date: 2018-10-11 17:19:20 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:22:32
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitHp extends TUnitComponentAbstract
{
	protected onInit(): void
	{
		this._life = 100;
		this._lifeMax = 100;
	}

	protected getKey(): string
	{
		return "TUnitHp";
	}

	/** 当前生命值 */
	protected _life: number;
	/** 获取或设置当前生命值 */
	public get life(): number { return this._life; }
	public set life(v: number)
	{
		this._life = Math.min(v, this._lifeMax);
	}

	/** 当前生命值上限 */
	protected _lifeMax: number;
	/** 获取或设置当前生命值上限 */
	public get lifeMax(): number { return this._lifeMax; }
	public set lifeMax(v: number)
	{
		this._lifeMax = v;
		this._life = Math.min(this._life, this._lifeMax);
	}

}
export = TUnitHp;