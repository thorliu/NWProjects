/*
 * web请求 (短连接)
 * @Author: 刘强 
 * @Date: 2018-07-16 17:37:04 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 14:24:57
 */


import HttpUtils = require('../utils/HttpUtils');
import FWSEnv = require('../FWSEnv');
import X = require('../utils/X');



module WebClient
{
	/** GET超时时间 */
	export const GET_OVERTIME: number = 1000 * 5;

	/** POST超时时间 */
	export const POST_OVERTIME: number = 1000 * 10;

	/**
	 * uri检查方法类型
	 * @export
	 * @interface uriCheckerType
	 */
	export interface uriCheckerType
	{
		(uri: string, data: any): string
	}

	/**
	 * 参数对象检查方法类型
	 * @export
	 * @interface dataCheckerType
	 */
	export interface dataCheckerType
	{
		(data: any): void
	}

	/**
	 * uri检查方法类型
	 */
	export var uriChecker: uriCheckerType = function (uri: string, data: any): string
	{
		if (!data) return uri;

		// data.appid = 2;
		// data.token = "abcdefghijklmnopqrstuvwxyz";
		// data.time = new Date().getTime();

		var ret: string = uri + "";

		

		var keys: string[] = Object.keys(data);
		if(keys.length === 0) return ret;

		if (ret.indexOf("?") < 0)
		{
			ret += "?";
		}

		for (var i: number = 0; i < keys.length; i++)
		{
			let k: string = keys[i];
			let v: any = data[k];
			v = encodeURIComponent(v);
			ret += "&" + k + "=" + v;
		}

		return ret;
	}

	/**
	 * POST参数检查器
	 */
	export var postChecker: dataCheckerType = function (data: any): any
	{
		if (typeof (data) !== "object") return "";

		var arr: any[] = new Array();
		var i: number = 0;
		for (var attr in data)
		{
			arr[i] = attr + "=" + encodeURIComponent(data[attr]);
			i++;
		}

		return arr.join("&");
	}

	/** 发起GET请求 */
	export function get(
		uri: string,
		data: any,
		callbackTarget: any,
		successHandler: Function,
		failHandler: Function): void
	{
		if (!HttpUtils.URL.isUrl(uri))
		{
			uri = FWSEnv.API_BASE_URL + uri;
		}

		var request: XMLHttpRequest = new XMLHttpRequest();
		var url: string = uriChecker ? uriChecker(uri, data) : uri;
		request.open("GET", url);
		request.timeout = GET_OVERTIME;
		request.setRequestHeader("content-type", "text/plain;charset=UTF-8");
		request.onerror = request.ontimeout = function (): void
		{
			if (request.readyState !== 4)
			{
				if (failHandler) failHandler.call(callbackTarget, request);
			}
		};
		request.onreadystatechange = function (): void
		{
			if (request.readyState === 4)
			{
				if ((request.status >= 200 && request.status < 300) || request.status == 304)
				{
					if (successHandler) successHandler.call(callbackTarget, request);
				}
				else
				{
					if (failHandler) failHandler.call(callbackTarget, request);
				}
			}
		};
		request.send();

	}

	/** 发起POST请求 */
	export function post(
		uri: string,
		getData: any,
		postData: any,
		callbackTarget: any,
		successHandler: Function,
		failHandler: Function): void
	{
		if (!HttpUtils.URL.isUrl(uri)) 
		{
			uri = FWSEnv.API_BASE_URL + uri;
		}

		var request: XMLHttpRequest = new XMLHttpRequest();
		var url: string = uriChecker ? uriChecker(uri, getData) : uri;
		request.open("POST", url, true);
		request.timeout = POST_OVERTIME;
		request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		request.onerror = request.ontimeout = function ()
		{
			if (request.readyState !== 4)
			{
				if (failHandler) failHandler.call(callbackTarget, request);
			}
		}
		request.onreadystatechange = function ()
		{
			if (request.readyState == 4)
			{
				if ((request.status >= 200 && request.status < 300) || request.status == 304)
				{
					if (successHandler) successHandler.call(callbackTarget, request);
				}
				else
				{
					if (failHandler) failHandler.call(callbackTarget, request);
				}
			}
		}

		if (postChecker) postData = postChecker(postData);
		request.send(postData);
	}
}

export = WebClient;

// const GLOBAL_YY = window["GLOBAL_YY"] || {};
// GLOBAL_YY.YYWebClient = YYWebClient;