/*
 * @Author: 刘强 
 * @Date: 2018-10-28 23:44:30 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-29 00:06:38
 */

import ECSEditorTypes = require('../ECSEditorTypes');
import ECSEditor = require('../ECSEditor');

export class APISaveFile extends ECSEditor.ECSEditorServiceAbstract
{
	private regex: RegExp = new RegExp("^/api/save/");
	public check(req: any, res: any, next: any): boolean
	{
		return this.regex.test(req.url);
	}

	public response(req: any, res: any, next: any, mime: any): void
	{
		super.response(req, res, next, mime);

		var ret: ECSEditorTypes.HttpResponseData = {
			code: ECSEditorTypes.HttpRetCodes.PARAM_ERROR,
		};

		//TOOD: 保存文件

		res.send(JSON.stringify(ret));
	}
}