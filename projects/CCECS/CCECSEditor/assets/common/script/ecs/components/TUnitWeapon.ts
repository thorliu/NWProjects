/*
 * @Author: 刘强 
 * @Date: 2018-10-13 11:55:25 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 13:24:46
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitWeapon extends TUnitComponentAbstract
{
	protected getKey():string
	{
		return "TUnitWeapon";
	}
}
export = TUnitWeapon;