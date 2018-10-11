/*
 * @Author: 刘强 
 * @Date: 2018-10-11 17:10:17 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:14:09
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitEntity extends TUnitComponentAbstract
{
	/** 当前位置 */
	public pos: cc.Vec2;

	/** 当前朝向 */
	public direct: number;

	protected onInit(): void
	{
		this.pos = cc.Vec2.ZERO;
		this.direct = 0;
	}

	protected getKey(): string
	{
		return "TUnitEntity";
	}
}

export = TUnitEntity;