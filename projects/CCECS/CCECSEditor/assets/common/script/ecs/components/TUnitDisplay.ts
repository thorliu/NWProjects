/*
 * @Author: 刘强 
 * @Date: 2018-10-11 17:53:45 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:54:34
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');

class TUnitDisplay extends TUnitComponentAbstract
{
	protected getKey(): string
	{
		return "TUnitDisplay";
	}
}

export = TUnitDisplay;