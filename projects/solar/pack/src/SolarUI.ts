/*
 * UI界面
 * @Author: thor.liu 
 * @Date: 2017-01-15 18:26:25 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-01-15 19:10:54
 */

/// <reference path="../typings/index.d.ts" />
const $ = require("jQuery");

module SolarUI
{
	/**
	 * 编辑器界面
	 */
	export class SolarEditorUI
	{
		static _instance: SolarEditorUI;
		static get instance(): SolarEditorUI
		{
			if (!SolarUI.SolarEditorUI._instance) SolarUI.SolarEditorUI._instance = new SolarUI.SolarEditorUI();
			return SolarUI.SolarEditorUI._instance;
		}

		constructor()
		{
		}
	}
}