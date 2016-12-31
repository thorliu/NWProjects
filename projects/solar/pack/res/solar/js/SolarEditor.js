/*
 * SolarEditor
 * @Author: thor.liu 
 * @Date: 2016-12-31 14:46:17 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 22:08:06
 */

const SolarEditorSettings = {};

///初始化NodeJS模块
SolarEditorSettings.initNodeJS = function () {
	if (typeof (require) != "undefined") {

		SolarOS.UI.ELECTRON = require("electron");
		SolarOS.UI.DIALOG = require("electron").remote.dialog;

		SolarOS.FileSystem.FS = require("fs");
		SolarOS.FileSystem.PATH = require("path");
	}
};

///初始化编辑器模块
SolarEditorSettings.initModules = function () {

	for (var i = 0; i < 5; i++) {
		//测试
		var moduleTest = new SolarCore.ModuleFileAbstract("test", "测试", "bookmark");
		SolarCore.SolarEditor.current.modules.push(moduleTest);
	}
};

///启动
SolarEditorSettings.startup = function () {
	SolarEditorSettings.initNodeJS();
	SolarEditorSettings.initModules();

	SolarEditorUI.setupModules();

	SolarEditorUI.setupToolbar("#toolbarOutline", [
		{ key: "btn1", name: "Test", icon: "cog", type: SolarCore.CommandType.Button },
		{ key: "btn2", name: "Test", icon: "cog", type: SolarCore.CommandType.Button },
		{ key: "btn3", name: "Test", icon: "cog", type: SolarCore.CommandType.Button }
	]);

};

//-------------------------------------------------------------------

const $ = require("jquery");
$(document).ready(function () {
	SolarEditorSettings.startup();
});