/*
 * SolarEditor UI
 * @Author: thor.liu 
 * @Date: 2016-12-31 14:52:33 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 16:08:53
 */

const SolarEditorUI = {};


///切换模块时
SolarEditorUI.switchModule = function (target) {
	$("#layoutModules>ul>li").removeClass("selected");
	$(target).addClass("selected");
};

///点击模块时
SolarEditorUI.onModuleClick = function (e) {
	var target = e.currentTarget;
	SolarEditorUI.switchModule(target);
	console.log("SolarEditorUI.onModuleClick", target);
	return false;
};

///安装模块导航条
SolarEditorUI.setupModules = function () {
	var list = SolarCore.SolarEditor.current.modules;

	if (list.length == 0) {
		$("#layoutOutline").hide();
		$("#layoutContent").hide();
	}

	if (list.length <= 1) {
		$("#layoutModules").hide();
		return;
	}

	var inst = $("#layoutModules>ul");
	inst.html("");

	for (var i = 0; i < list.length; i++) {
		var mod = list[i];
		var modItem = "<li><span class='icon-cog'></span></li>";
		inst.append(modItem);
	}
	$("#layoutModules").show();
	$("#layoutModules>ul>li").click(SolarEditorUI.onModuleClick);
};



//-------------------------------------------------------------------