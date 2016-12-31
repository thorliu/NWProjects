/*
 * SolarEditor UI
 * @Author: thor.liu 
 * @Date: 2016-12-31 14:52:33 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 19:39:21
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
	var key = $(target).attr("data-key");
	SolarUI.Delegate.execute("onModuleClick", [key]);
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
		var modItem = "<li data-key='" + mod.key + "' data-title='" + mod.name + "'><span class='icon-" + mod.icon + "'></span></li>";
		inst.append(modItem);
	}
	$("#layoutModules").show();
	var items = $("#layoutModules>ul>li");
	SolarEditorUI.switchModule(items[0]);
	items.click(SolarEditorUI.onModuleClick);
};



//-------------------------------------------------------------------