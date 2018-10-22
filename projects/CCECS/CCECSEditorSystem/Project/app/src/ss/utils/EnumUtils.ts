/*
 * 枚举常用功能
 * @Author: thor.liu 
 * @Date: 2018-04-18 15:14:58 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-18 15:15:58
 */

import ObjectUtils = require('./ObjectUtils');

module EnumUtils
{
	/**
		 * 判定a中是否包含了b
		 * @static
		 * @param {number} a 
		 * @param {number} b 
		 * @returns {boolean} 
		 * 
		 * @memberOf Enum
		 */
	export function contain(a: number, b: number): boolean
	{
		if (!ObjectUtils.isEmpty(a) && !ObjectUtils.isEmpty(b))
		{
			return (a & b) === b;
		}
		return false;
	}

	/**
	 * 产生一个新的枚举值, 里面包含了a和b (按位或)
	 * 
	 * @static
	 * @param {number} a 
	 * @param {number} b 
	 * @returns {number} 
	 * 
	 * @memberOf Enum
	 */
	export function add(a: number, b: number): number
	{
		if (ObjectUtils.isEmpty(a) && ObjectUtils.isEmpty(b))
		{
			return 0;
		}
		else if (ObjectUtils.isEmpty(a))
		{
			return b;
		}
		else if (ObjectUtils.isEmpty(b))
		{
			return a;
		}
		else return a | b;
	}

	/**
	 * 返回一个新的枚举值, 从a中移除b
	 * @static
	 * @param {number} a 
	 * @param {number} b 
	 * @returns {number} 
	 * @memberOf Enum
	 */
	export function remove(a: number, b: number): number
	{
		if (ObjectUtils.isEmpty(a))
		{
			return 0;
		}
		else if (ObjectUtils.isEmpty(b))
		{
			return a;
		}
		else 
		{
			if ((a & b) == b)
			{
				return a - b;
			}
			else
			{
				return a;
			}
		}
	}
}

export = EnumUtils;