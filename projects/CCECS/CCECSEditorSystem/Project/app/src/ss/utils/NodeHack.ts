/*
 * 访问NodeJS时的一些Hack
 * @Author: thor.liu 
 * @Date: 2018-04-15 20:39:25 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 21:07:27
 */

module NodeHack
{
	export function require(name:string):any
	{
		var win:any = window;
		if(win)
		{
			var r:Function = win.require;
			if(r)
			{
				return r(name);
			}
		}
	}
}
export = NodeHack;