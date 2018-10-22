/*
 * @Author: thor.liu 
 * @Date: 2018-04-18 14:56:48 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-18 15:02:31
 */

module ObjectUtils
{
	/**
	 * 获取对象的某个特定的值
	 * @param data {any} 数据对象
	 * @param path {string} 路径
	 * @param def {any} 默认值 
	 */
	export function getValue(data: any, path: string, def: any = null): any
	{
		if (data === null || data === undefined) return def;
		if (typeof (data) !== "object") return def;

		try
		{
			if (data instanceof Array)
			{
				return eval("data" + path);	//data	[0].name
			}
			else
			{
				return eval("data." + path);	//data	.	name
			}
		}
		catch (err)
		{
			return def;
		}
	}

	/**
	 * 返回对象是否是空，或者未定义
	 * @param data {any} 对象
	 */
	export function isEmpty(data:any):boolean
	{
		return (data === null || data === undefined);
	}
}

export = ObjectUtils;