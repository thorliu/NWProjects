/*
 * @Author: 刘强 
 * @Date: 2018-10-11 16:41:37 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 16:45:24
 */

import TECSCore = require('./TECSCore');
import TUnit = require('./TUnit');

abstract class TUnitComponentAbstract implements TECSCore.IUnitComponent
{
	public unit: TUnit;

	constructor()
	{
		this.onInit();
	}

	protected getKey(): string
	{
		return "TUnitComponentAbstract";
	}

	protected onInit(): void
	{

	}

	public onTick(d: number): void
	{
	}

	public onBind(): void
	{
	}

	public onUnbind(): void
	{
	}

	public get key(): string { return this.getKey(); }

}

export = TUnitComponentAbstract;