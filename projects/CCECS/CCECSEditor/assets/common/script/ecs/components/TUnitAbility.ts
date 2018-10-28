/*
 * @Author: 刘强 
 * @Date: 2018-10-13 11:55:25 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 13:29:31
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitAbility extends TUnitComponentAbstract
{
	protected getKey():string
	{
		return "TUnitAbility";
	}
}
export = TUnitAbility;