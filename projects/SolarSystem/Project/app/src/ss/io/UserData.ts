/*
 * 用户数据
 * @Author: thor.liu 
 * @Date: 2018-04-16 11:22:59 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-16 11:34:09
 */

import AppUtils = require('../utils/AppUtils');
import FileSystem = require('./FileSystem');

module UserData
{
	var _data: any;

	function getFilePath(): string
	{
		var basePath: string = FileSystem.Path.documentsPath;
		var folderName: string = AppUtils.getName();
		var fileName: string = "UserData.json";

		if (basePath && folderName && fileName)
		{
			var ret: string = FileSystem.Path.combiePath(basePath, folderName);
			ret = FileSystem.Path.combiePath(ret, fileName);
			return ret;
		}
		return null;
	}

	/** 当前用户数据 */
	export class current
	{
		/** 加载数据 */
		static load(): void
		{
			try
			{
				var path: string = getFilePath();
				var jsonStr: string = FileSystem.File.loadNow(path);
				_data = JSON.parse(jsonStr);
			}
			catch (err)
			{
			}
		}

		/** 保存数据 */
		static save(): void
		{
			try
			{
				var path: string = getFilePath();
				var folderPath: string = FileSystem.Path.getDirectory(path);
				FileSystem.File.createDirectory(folderPath);
				var jsonStr: string = JSON.stringify(_data);
				FileSystem.File.saveNow(path, jsonStr);
			}
			catch (err)
			{
			}
		}

		/** 获取数据对象 */
		static get data(): any
		{
			if (!_data) _data = {};
			return _data;
		}
	}
}

export = UserData;