/*
 * @Author: thor.liu 
 * @Date: 2018-04-18 14:52:38 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-18 15:14:12
 */

import ObjectUtils = require('./ObjectUtils');

module StringUtils
{
	/**
	 * 获取一个移除了左边所有空白字符的新字符串
	 * @static
	 * @param {string} target 
	 * @returns {string} 
	 * @memberOf Str
	 */
	export function ltrim(target: string): string
	{
		return target.replace(/^\s+/g, "");
	}

	/**
	 * 获取一个移除了右边所有空白字符的新字符串
	 * @static
	 * @param {string} target 
	 * @returns {string} 
	 * @memberOf Str
	 */
	export function rtrim(target: string): string
	{
		return target.replace(/\s+$/g, "");
	}

	/**
	 * 获取一个移除了左边和右边所有空白字符的新字符串
	 * @static
	 * @param {string} target 
	 * @returns {string} 
	 * 
	 * @memberOf Str
	 */
	export function trim(target: string): string
	{
		return ltrim(rtrim(target));
	}

	/**
	 * 重复n个字符串的结果
	 * @param count 重复次数
	 * @param char 重复的内容
	 */
	export function repeat(count: number, char: string): string
	{
		var ret: string = "";
		for (var i: number = 0; i < count; i++)
		{
			ret += char;
		}
		return ret;
	}

	/**
	 * 在字符串的左边填充内容至指定位数
	 * @static
	 * @param {string} source 
	 * @param {number} count 
	 * @param {string} fill 
	 * @returns {string} 
	 * 
	 * @memberOf Str
	 */
	export function padLeft(source: string, count: number, fill: string): string
	{
		var ret: string = repeat(count, fill) + source;
		ret = ret.substr(ret.length - count);
		return ret;
	}

	/**
	 * 在字符串的右边填充内容至指定位数
	 * 
	 * @static
	 * @param {string} source 
	 * @param {number} count 
	 * @param {string} fill 
	 * @returns {string} 
	 * 
	 * @memberOf Str
	 */
	export function padRight(source: string, count: number, fill: string): string
	{
		var ret: string = source + repeat(count, fill);
		ret = ret.substr(0, count);
		return ret;
	}

	/**
	 * 判定字符串是否是个空白的
	 * @param {string} target 字符串
	 */
	export function isEmpty(target: string): boolean
	{
		if (target === null || target === undefined) return true;
		if (target.length === 0) return true;
		if (trim(target).length === 0) return true;

		return false;
	}

	/**
	 * 匹配字符串的多个结果
	 * @param {RegExp} re 正则表达式
	 * @param {string} str 字符串
	 */
	export function matchs(re: RegExp, str: string)
	{
		var result = new Array();

		var item = null;

		while ((item = re.exec(str)) !== null)
		{
			result.push(item);
		}

		return result;
	}

	/**
	 * 格式化字符串, 例如: format("{0}@{1}", "username", "domain.com") 返回 "username@domain.com"
	 * @param {string} template 模板内容，使用{数字}表示参数占位符
	 * @param {...string[]} args 参数内容
	 */
	export function format(template: string, ...args: string[]): string
	{
		var str: string = template + "";
		for (var i = 0; i < args.length; i++)
		{
			var re = new RegExp('\\{' + (i) + '\\}', 'gm');
			str = str.replace(re, args[i]);
		}
		return str;
	}

	/**
	 * 格式化字符串, 例如: formatObject("{username}@{domain}", {username: "AAAA", domain: "BBBB"}) 返回 "AAAA@BBBB"
	 * @param {string} template 模板内容，使用{path}表示参数占位符
	 * @param {any} obj 
	 */
	export function formatObject(template: string, obj: any): string
	{
		var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
		var ms = matchs(re, template);
		var str = template + "";
		for (var i = ms.length - 1; i >= 0; i--)
		{
			var m = ms[i];
			var mIndex = m.index;
			var mLength = m[0].length;
			var mKey = m[0].substr(1, mLength - 2);
			var mValue = ObjectUtils.getValue(obj, mKey);
			var mStr = mValue ? mValue.toString() : "";
			str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
		}
		return str;
	}

	/**
	 * 格式化字符串
	 * @param {string} template 模板内容
	 * @param {arny[]} ary 包含数据对象的数组
	 * @param {string} sep 分隔符内容
	 */
	export function formatArray(template: string, ary: any[], sep: string = ""): string
	{
		if (ary === null || ary === undefined || ary.length === 0) return "";

		var temp: string[] = [];

		for (var i: number = 0; i < ary.length; i++)
		{
			temp.push(formatObject(template, ary[i]));
		}

		return temp.join(sep);
	}
}
export = StringUtils;