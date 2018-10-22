/*
 * @Author: thor.liu 
 * @Date: 2018-04-18 15:16:54 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-18 15:17:50
 */

module RandomUtils
{
	/**
		 * 获取一个浮点随机数
		 * @static
		 * @param {number} min 
		 * @param {number} max 
		 * @returns {number} 
		 * @memberOf Random
		 */
	export function getFloat(min: number, max: number): number
	{
		return (Math.random() * (max - min)) + min;
	}

	/**
	 * 获取一个整数随机数
	 * @static
	 * @param {number} min 
	 * @param {number} max 
	 * @returns {number} 
	 * @memberOf Random
	 */
	export function getInt(min: number, max: number): number
	{
		return Math.round(RandomUtils.getFloat(min, max));
	}

	/**
	 * 从数组中随机取一个成员
	 * @static
	 * @param {Array<any>} ary 
	 * @returns {*} 
	 * @memberOf Random
	 */
	export function getArray(ary: Array<any>): any
	{
		if (ary && ary.length > 0)
		{
			var i: number = RandomUtils.getInt(0, ary.length - 1);
			return ary[i];
		}
		return null;
	}

	/**
	 * 根据机率权重值, 从数组中随机取一个成员
	 * @static
	 * @param {Array<any>} ary 
	 * @param {Array<number>} prob 
	 * @returns {*} 
	 * @memberOf Random
	 */
	export function getArrayByProbability(ary: Array<any>, prob: Array<number>): any
	{
		if (ary && ary.length > 0 && prob && prob.length === ary.length)
		{
			var max: number = 0;
			for (var i: number = 0; i < prob.length; i++)
			{
				max += prob[i];
			}

			var r: number = RandomUtils.getInt(0, max);
			var tmpMin: number = 0;
			var tmpMax: number = 0;
			for (var i: number = 0; i < prob.length; i++)
			{
				tmpMax += prob[i];
				//check

				if (r >= tmpMin && r <= tmpMax)
				{
					return ary[i];
				}

				tmpMin += prob[i];
			}

		}
		return null;
	}

	export function toArray(ary: Array<any>): Array<any>
	{
		var arr: Array<any> = ary.slice(0);

		var len: number = arr.length;
		for (var i: number = 0; i < len - 1; i++)
		{
			var idx: number = Math.floor(Math.random() * (len - i));
			var temp = arr[idx];
			arr[idx] = arr[len - i - 1];
			arr[len - i - 1] = temp;
		}

		return arr;
	}
}

export = RandomUtils;