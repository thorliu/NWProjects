/*
 * @Author: 刘强 
 * @Date: 2018-10-28 19:12:13 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 23:26:13
 */


const { app } = require('electron');
const FS = require("fs");
const PATH = require("path");
const express = require("express");
const webServices = express();
const mime = require("mime");

import ECSEditorTypes = require('./ECSEditorTypes');


mime.define({
	'text/plain': ['atlas', 'csv', 'json'],
});

module ECSEditor
{
	export interface IECSEditorService
	{
		request(req: any, res: any, next: any, mime: any): boolean;
	}

	export class ECSEditorServiceAbstract implements IECSEditorService
	{
		public request(req: any, res: any, next: any, mime: any): boolean
		{
			if (this.check(req, res, next))
			{
				this.response(req, res, next, mime);
				return true;
			}
			else
			{
				return false;
			}
		}

		protected getAllQuery(req: any): string[]
		{
			var ret: string[] = req.url.split("/");
			ret.splice(0, 1);
			return ret;
		}

		protected check(req: any, res: any, next: any): boolean
		{
			return false;
		}

		protected response(req: any, res: any, next: any, mime: any): void
		{

		}
	}

	class ECSEditorClass
	{
		public web: string = "";
		protected running: boolean = false;
		protected port: number = 0;
		protected server: any;
		public api: any[];

		constructor()
		{
			this.api = [];
		}

		/** 启动 */
		public run(): void
		{
			if (this.running) return;
			this.running = true;

			this.loadConfig();
			this.initAPIs();
		}

		/** 列举文件 */
		public list(path: string): string[]
		{
			return FS.readdirSync(path);
		}

		/** 拼接路径 */
		public combie(a: string, b: string): string
		{
			return PATH.join(a, b);
		}

		/** 加载文件 */
		public loadFile(path: string): string
		{
			try
			{
				return FS.readFileSync(path, "utf8");
			}
			catch (err)
			{
			}

			return null;
		}

		/** 保存文件 */
		public saveFile(path: string, data: string): void
		{
			try
			{
				FS.writeFile(path, data, "utf8");
			} catch (err)
			{
			}
		}

		/** 加载JSON */
		public loadJson(path: string): any
		{
			try
			{
				return JSON.parse(this.loadFile(path));
			}
			catch (err)
			{
				return null;
			}
		}

		/** 保存JSON */
		public saveJson(path: string, data: any): void
		{
			try
			{
				this.saveFile(path, JSON.stringify(data));
			}
			catch (err) { }
		}

		/** 加载配置 */
		protected loadConfig(): void
		{
			var exePath: string = app.getAppPath();
			var configPath: string = PATH.join(exePath, "../app.json");
			var configData: any = this.loadJson(configPath);

			if (configData)
			{
				this.port = configData.port;
				this.web = PATH.join(exePath, configData.web);
			}

			console.log(exePath, configData);
		}

		/** 初始化接口 */
		protected initAPIs(): void
		{
			var self: ECSEditorClass = this;
			webServices.get("*", (req: any, res: any, next: any): void =>
			{
				try
				{
					res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
					res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
					res.header("X-Powered-By", ' 3.2.1');
					res.header("Content-Type", "text/plain");


					var matched: boolean = false;

					// res.send("<p>api:" + self.api.length + "</p>");

					for (var i: number = 0; i < self.api.length; i++)
					{
						if (self.api[i].request(req, res, next, mime))
						{
							// res.send("<p>i:" + i + "</p>");
							matched = true;
							break;
						}
					}

					if (!matched)
					{
						res.statusCode = 404;
						res.send("url not found");
					}
				}
				catch (err)
				{
					res.statusCode = 500;
					res.send('<p>' + err.message + '</p><p>' + err.stack.replace("\n", "<br/>") + '</p>');
				}
			});
			this.server = webServices.listen(this.port);
		}
	}

	var instance: ECSEditorClass;
	export function getInstance(): ECSEditorClass
	{
		if (!instance) instance = new ECSEditorClass();
		return instance;
	}
}

export = ECSEditor;