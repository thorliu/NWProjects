/*
 * 本地小数据存取功能
 * @Author: 刘强 
 * @Date: 2018-08-08 10:46:41 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-08 10:54:56
 */

import X = require('./X');

module LocalStorageUtils
{
	/** 获取数据 */
	export function get(key: string): any
	{
		try
		{
			return JSON.parse(localStorage.getItem(key));
		}
		catch (err)
		{
			return null;
		}
	}

	/** 设置参数 */
	export function set(key: string, value: boolean | number | string | object | any[]): void
	{
		try
		{
			localStorage.setItem(key, JSON.stringify(value));
		}
		catch (err)
		{
			X.error(err);
		}
	}

	/** 删除参数 */
	export function del(key: string): void
	{
		localStorage.removeItem(key);
	}


}

export = LocalStorageUtils;
window["LocalStorageUtils"] = LocalStorageUtils;