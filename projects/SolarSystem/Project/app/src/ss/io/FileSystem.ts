/*
 * 封装的文件系统功能
 * @Author: thor.liu 
 * @Date: 2018-04-15 20:20:07 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-15 20:41:53
 */

import NodeHack = require('../utils/NodeHack');
const FS = NodeHack.require("fs");
const PATH = NodeHack.require("path");


module FileSystem
{
	export class File
	{
		/**
		 * 加载文件
		 * @param path 文件路径
		 * @param callback 回调方法
		 */
		static load(path: string, callback: Function = null): void
		{
			if (FS) FS.readFile(path, "utf8", callback);
			else if (callback) callback(true);
		}

		/**
		 * 保存文件
		 * @param path 文件路径
		 * @param data 文件内容
		 * @param callback 回调方法
		 */
		static save(path: string, data: string, callback: Function = null): void
		{
			if (FS) FS.writeFile(path, data, "utf8", callback);
			else if (callback) callback(true);
		}
	}
}

export = FileSystem;