/*
 * SolarSystem Client Core Application.ts
 * @Author: thor.liu 
 * @Date: 2018-04-15 19:31:13 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-16 10:45:58
 */

import FileSystem = require('./ss/io/FileSystem');


/// <reference path="../SolarSystem.d.ts" /> 
/// <reference path="../jquery.d.ts" /> 
/// <reference path="../typings/index.d.ts" />
module Application
{
	export function startUp(): void
	{
		FileSystem.File.copy("/Users/liuqiang/Documents/temp/temp/test", "/Users/liuqiang/Documents/temp/temp/test2");
		
	}
}
export = Application;
Application.startUp();