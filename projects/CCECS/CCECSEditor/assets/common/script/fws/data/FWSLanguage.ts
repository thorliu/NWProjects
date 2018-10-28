/*
 * 多语言支持
 * @Author: 刘强 
 * @Date: 2018-08-10 10:57:05 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-27 11:29:32
 */

import FWSTool = require('../utils/FWSTool');
import X = require('../utils/X');
import FWSTask = require('../task/FWSTask');
import FWSEnv = require('../FWSEnv');
import WebClient = require('../net/WebClient');
import FWSINI = require('../utils/FWSINI');


module FWSLanguage
{
	/** 多语言数据 */
	const data: any = {};


	export function get(key: string, ...args:any[]): string
	{
		var ret: string = data[key];
		if (FWSTool.Str.isEmpty(ret))
		{
			return "<" + key + ">";
		}
		else
		{
			var a:any[] = args.slice(0);
			a.splice(0,0, ret);
			return FWSTool.Str.format.apply(null, a);
		}
	}

	export class LanguageLoader extends FWSTask.Task
	{
		protected _ini: string;

		constructor()
		{
			super("正在加载多语言配置");
		}

		public begin(): void
		{
			super.begin();
			if (this._alreadyBegin) return;
			this._alreadyBegin = true;
			var self: LanguageLoader = this;
			var url: string = FWSTool.Str.format(FWSEnv.RES_BASE_URL + "/config/{0}.ini", "zh-cn");

			WebClient.get(url, {}, this,
				(res: XMLHttpRequest) =>
				{
					let ini: string = res.responseText;
					FWSINI.parse(ini, data);

					self._alreadyCompoleted = true;

					if (this.onCompleted && this.onCompleted.handler)
					{
						this.onCompleted.handler.call(this.onCompleted.target, self, self);
					}
				},
				() =>
				{
					X.error("LanguageLoader 多语言加载失败");
					if (this.onError && this.onError.handler)
					{
						this.onError.handler.call(this.onError.target, self, self);
					}
				});
		}
	}
}

export = FWSLanguage;
// window["FWSLanguage"] = FWSLanguage;