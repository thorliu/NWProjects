/*
 * 访问NodeJS时的一些Hack
 * @Author: thor.liu 
 * @Date: 2018-04-15 20:39:25 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-15 20:41:04
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