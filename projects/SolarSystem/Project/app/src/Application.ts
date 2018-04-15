/*
 * SolarSystem Client Core Application.ts
 * @Author: thor.liu 
 * @Date: 2018-04-15 19:31:13 
 * @Last Modified by:   thor.liu 
 * @Last Modified time: 2018-04-15 19:31:13 
 */

/// <reference path="../jquery.d.ts" /> 
module Application
{
	export function startUp(): void
	{
		window.alert("Application::startUp");
	}
}
export = Application;
Application.startUp();