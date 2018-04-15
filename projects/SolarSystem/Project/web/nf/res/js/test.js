var ScreenPageContent = {
	onLoad: function ()
	{
		//测试代码: 显示os对象的日志
		console.log("test", os);

		//测试代码: 弹框显示FileSystem.getAppPath()的返回值
		if (FileSystem)
		{
			alert(FileSystem.getAppPath());
		}
	},

	requestData: function ()
	{
		//测试代码: 加载数据, 并生成每个屏幕页的HTML内容
		ScreenPageContent.pages = [
			"第1页", "第2页", "第3页"
		];

		//测试代码: 通知APP, 页面内容已经加载就绪
		if (os) os.notify({ cmd: "ScreenPageContentPagesCompleted" });
	},

	pages: [],

	/**
	 * 每一页的内容放在哪个节点下(JQuery选择器指定)
	 */
	containerSelector: "#screenFg"
};