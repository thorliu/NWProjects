/*
 * @Author: 刘强 
 * @Date: 2018-10-28 23:38:23 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 23:55:42
 */

import ECSEditorTypes = require('../ECSEditorTypes');
import ECSEditor = require('../ECSEditor');
var fs = require("fs");

export class StaticFile extends ECSEditor.ECSEditorServiceAbstract
{
	protected regex: RegExp = new RegExp("^/res/");
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
		var path: string = req.url;

		path = ECSEditor.getInstance().combie(
			ECSEditor.getInstance().web, path);

		// var data: string = ECSEditor.getInstance().loadFile(path);

		fs.readFile(path, function (err, data)
		{
			if (err)
			{
				res.statusCode = 404;
				res.send("url not found");
			}
			else
			{
				res.setHeader("Content-Type", mime.lookup(path));
				res.send(data);
			}
		});
	}
}