/*
 * @Author: 刘强 
 * @Date: 2018-10-28 22:52:37 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-29 00:07:29
 */
import ECSEditor = require('../ECSEditor');
import StaticFile = require('./StaticFile');
import APIStageList = require('./APIStageList');
import APISaveFile = require('./APISaveFile');


module APIList
{
	export function init(): void
	{
		ECSEditor.getInstance().api.push(new StaticFile.StaticFile());
		ECSEditor.getInstance().api.push(new APIStageList.APIStageList());
		ECSEditor.getInstance().api.push(new APISaveFile.APISaveFile());
	}
}
export = APIList;