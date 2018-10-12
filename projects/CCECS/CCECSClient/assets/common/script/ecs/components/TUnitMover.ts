/*
 * 移动方式
 * @Author: 刘强 
 * @Date: 2018-10-11 19:03:30 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 19:14:21
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitMover extends TUnitComponentAbstract
{
	/** 起始速度 */
	protected _speedStart: number;
	/** 获取或设置起始速度 */
	public get speedStart(): number
	{
		return this._speedStart;
	}
	public set speedStart(v: number)
	{
		this._speedStart = v;
	}

	/** 当前速度 */
	protected _speedCurrent: number;
	/** 获取或设置当前速度 */
	public get speedCurrent(): number
	{
		return this._speedCurrent;
	}
	public set speedCurrent(v: number)
	{
		this._speedCurrent = v;
	}


	/** 最快速度 */
	protected _speedMax: number;
	/** 获取或设置最快速度上限 */
	public get speedMax(): number
	{
		return this._speedMax;
	}
	public set speedMax(v: number)
	{
		this._speedMax = v;
	}

	/** 加速度 */
	protected _accelerate: number;
	/** 获取或设置加速性能 */
	public get accelerate(): number
	{
		return this._accelerate;
	}
	public set accelerate(v: number)
	{
		this._accelerate = v;
	}

	/** 减速度 */
	protected _decelerate: number;
	/** 获取或设置减速性能 */
	public get decelerate(): number
	{
		return this._decelerate;
	}
	public set decelerate(v: number)
	{
		this._decelerate = v;
	}

	/** 转身速度 */
	protected _turn: number;
	/** 获取或设置转身速度 */
	public get turn(): number
	{
		return this._turn;
	}
	public set turn(v: number)
	{
		this._turn = v;
	}


	/** 初始化 */
	protected onInit(): void
	{
		this._accelerate = 1;
		this._decelerate = 1;
		this._speedMax = 5;
		this._speedCurrent = 0;
		this._speedStart = 1;
		this._turn = 1;
	}

	protected getKey(): string
	{
		return "TUnitMover";
	}

	public onTick(d: number): void
	{
	}
}

export = TUnitMover;