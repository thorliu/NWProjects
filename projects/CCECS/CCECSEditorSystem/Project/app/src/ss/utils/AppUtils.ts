/*
 * 应用程序常用功能
 * @Author: thor.liu 
 * @Date: 2018-04-16 11:18:46 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 20:48:52
 */

import NodeHack = require('./NodeHack');

const ELECTRON = require("electron");
const APP = ELECTRON.remote.app;


module AppUtils
{
	/**
	 * 获取应用程序名称
	 */
	export function getName(): string
	{
		if (APP)
		{
			return APP.getName();
		}
		return "";
	}

	/**
	 * 获取应用程序版本号
	 */
	export function getVersion(): string
	{
		if (APP)
		{
			return APP.getVersion();
		}
		return "";
	}

	export function getLocale(): string
	{
		if (APP)
		{
			return APP.getLocale();
		}
		return "";
	}

	/**
	 * 添加最近访问的文档
	 * @param path 路径
	 */
	export function addRecentDocument(path: string): void
	{
		if (APP)
		{
			APP.addRecentDocument(path);
		}
	}

	/**
	 * 清除最近访问的文档
	 */
	export function clearRecentDocument(): void
	{
		if (APP)
		{
			APP.clearRecentDocuments();
		}
	}
}

export = AppUtils;
window["AppUtils"] = AppUtils;