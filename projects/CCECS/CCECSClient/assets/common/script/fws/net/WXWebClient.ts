/*
 * 微信HTTP请求
 * @Author: 刘强 
 * @Date: 2018-08-22 14:56:32 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-22 15:38:38
 */

import X = require('../utils/X');
import FWSCommon = require('../core/FWSCommon');
import FWSEnv = require('../FWSEnv');
import FWSTool = require('../utils/FWSTool');
import HttpUtils = require('../utils/HttpUtils');


module WXWebClient
{
	/** GET请求 */
	export function get(
		uri: string,
		data: any,
		callbackTarget: any,
		successHandler: Function,
		failHandler: Function): boolean
	{
		var wx: any = window["wx"];
		if (!wx || !wx.request) return false;

		if (!HttpUtils.URL.isUrl(uri))
		{
			uri = FWSEnv.API_BASE_URL + uri;
		}

		wx.request({
			url: uri,
			data: data,
			header: {
				// "content-type": "application/x-www-form-urlencoded"
			},
			method: "GET",
			success: (res) =>
			{
				if (successHandler)
				{
					if (typeof (res.data) !== "string")
					{
						res.data = JSON.stringify(res.data);
					}

					successHandler.call(callbackTarget, {
						responseText: res.data
					});
				}
			},
			fail: (res) =>
			{
				console.log("request get fail: ", res);
				if (failHandler)
				{
					failHandler.call(callbackTarget, {
						responseText: ""
					});
				}
			}
		});


		return true;
	}

	/** 发起POST请求 */
	export function post(
		uri: string,
		data: any,
		callbackTarget: any,
		successHandler: Function,
		failHandler: Function): boolean
	{
		var wx: any = window["wx"];
		if (!wx || !wx.request) return false;

		if (!HttpUtils.URL.isUrl(uri))
		{
			uri = FWSEnv.API_BASE_URL + uri;
		}

		wx.request({
			url: uri,
			data: data,
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			success: (res) =>
			{
				if (successHandler)
				{
					if (typeof (res.data) !== "string")
					{
						res.data = JSON.stringify(res.data);
					}

					successHandler.call(callbackTarget, {
						responseText: res.data
					});
				}
			},
			fail: (res) =>
			{
				console.log("request post fail: ", res);
				if (failHandler)
				{
					failHandler.call(callbackTarget, {
						responseText: ""
					});
				}
			}
		});

		return true;
	}
}

export = WXWebClient;