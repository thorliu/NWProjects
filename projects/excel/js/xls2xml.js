var xls2xml = {
	tasks_xml: "",

	init: function()
	{
		$("#task .header a").click(xls2xml.openConfig);
		$("#config-ok").click(xls2xml.onConfigOK);
		$("#config-cancel").click(xls2xml.onConfigCancel);

		xls2xml.startup();	
	},

	startup: function()
	{
		xls2xml.loadConfig();
		xls2xml.loadTasks();
	},

	loadTasks: function()
	{

	},

	loadConfig: function()
	{

	},

	saveConfig: function()
	{

	},

	openConfig: function(e)
	{
		$("#task").hide();
		$("#config").show();
	},

	onConfigOK: function()
	{
		//TODO:

		xls2xml.onConfigCancel();
	},

	onConfigCancel: function()
	{
		$("#config").hide();
		$("#task").show();
	}
};