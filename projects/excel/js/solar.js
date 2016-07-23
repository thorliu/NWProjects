var SS = {
	// init
	initCore: function () {
		N.init();
	},

	// menubar
	initMenuBar: function () {
		if (!N.inApp) return false;
		//TODO: 定义菜单

		return false;
	},

	// splash
	initSplash: function () {

		// $("#splash").fadeIn(1000);
		// $("#splash>H1").html(T.format("{0} {1}", N.appName(), N.appVersion()));
		
		// $(document).delay(2000).queue(
		// 	function()
		// 	{
		// 		$("#main").show();
		// 		$("#splash").remove();
		// 		u.resize();
		// 	});

			// //---- test

			// var path = "/Users/liuqiang/Sites/node-webkit/solar/css/test.css";
			// N.saveFile(path, "你好", function(err)
			// {
			// 	if(err) alert(err);
			// });
	},

	// startup
	startup: function () {
		SS.initCore();
		if(SS.initMenuBar())
		{
			N.setupMenuBar();
		}
		SS.initSplash();
	}
};

//----
$(document).ready(SS.startup);