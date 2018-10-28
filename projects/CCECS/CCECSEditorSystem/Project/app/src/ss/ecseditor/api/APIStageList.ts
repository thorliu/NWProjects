/*
 * @Author: 刘强 
 * @Date: 2018-10-28 21:42:25 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 23:34:26
 */

import ECSEditorTypes = require('../ECSEditorTypes');
import ECSEditor = require('../ECSEditor');
const FS = require("fs");


export class APIStageList extends ECSEditor.ECSEditorServiceAbstract
{
	private regex: RegExp = new RegExp("^/api/stages/\\d+$");
	private fileType: RegExp = new RegExp("\\.json$");

	constructor()
	{
		super();
	}

	public check(req: any, res: any, next: any): boolean
	{
		return this.regex.test(req.url);
	}

	public response(req: any, res: any, next: any, mime: any): void
	{
		super.response(req, res, next, mime);

		var args: string[] = this.getAllQuery(req);

		var data: any[] = [];
		var ret: ECSEditorTypes.HttpResponseData = {
			code: ECSEditorTypes.HttpRetCodes.ParamsError,
			data: data
		};

		if (args.length >= 3)
		{
			ret.code = ECSEditorTypes.HttpRetCodes.SUCCESS;

			try
			{
				var path: string = ECSEditor.getInstance().web;
				path = ECSEditor.getInstance().combie(path, "/res/stages/" + args[2]);
				var files: string[] = ECSEditor.getInstance().list(path);

				for (var i: number = 0; i < files.length; i++)
				{
					var file: string = files[i];
					if (!this.fileType.test(file)) continue;

					data.push(file.substr(0, file.length - 5));
				}
			}
			catch (err)
			{
				ret.code = ECSEditorTypes.HttpRetCodes.Unknow;
			}
		}

		res.send(JSON.stringify(ret));
	}
}


// ECSEditor.getInstance().api.push(new APIStageList());