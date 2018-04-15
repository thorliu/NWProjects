/*
 * SolarSystem Client Core Application.ts
 * @Author: thor.liu 
 * @Date: 2018-04-15 19:31:13 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-15 20:42:51
 */

import FileSystem = require('./ss/io/FileSystem');


/// <reference path="../SolarSystem.d.ts" /> 
/// <reference path="../jquery.d.ts" /> 
/// <reference path="../typings/index.d.ts" />
module Application
{
	export function startUp(): void
	{
		// window.alert("Application::startUp");

		FileSystem.File.save("/Users/liuqiang/Documents/temp/temp/test.txt", "Hello 中文", function ()
		{
			debugger
		});

		FileSystem.File.load("/Users/liuqiang/Documents/temp/temp/CMSModel.cs", function()
		{
			debugger
		});
		
	}
}
export = Application;
Application.startUp();