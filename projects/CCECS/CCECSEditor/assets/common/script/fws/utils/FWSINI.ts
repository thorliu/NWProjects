/*
 * 简单INI文件解释, 不支持章节
 * @Author: 刘强 
 * @Date: 2018-08-10 11:00:01 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-10 11:39:01
 */

import FWSTool = require('./FWSTool');
module FWSINI
{
	/**
	 * 解释ini内容为kv结构
	 * @param ini {string} ini文件内容
	 * @param data {any} 一个用于存放kv数据的对象
	 */
	export function parse(ini: string, data: any): void
	{
		let lines: string[] = ini.split(/[\r\n]+/gm);

		for (let i: number = 0; i < lines.length; i++)
		{
			let line: string = FWSTool.Str.trim(lines[i]);
			if (line.length === 0) continue;
			var spec: number = line.indexOf("=");
			if (spec < 0) continue;
			let k: string = line.substr(0, spec);
			let v: string = line.substr(spec + 1);
			k = FWSTool.Str.trim(k);
			v = FWSTool.Str.trim(v);
			v = v.replace(/\\n/g, "\n");	//转义换行符号
			if (k.length === 0) continue;

			data[k] = v;
		}
	}
}

export = FWSINI;
