/*
 * @Author: 刘强 
 * @Date: 2018-10-28 22:52:37 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 22:54:23
 */
import ECSEditor = require('../ECSEditor');
import APIStageList = require('./APIStageList');

module APIList
{
	export function init():void
	{
		ECSEditor.getInstance().api.push(new APIStageList.APIStageList());
	}
}
export = APIList;