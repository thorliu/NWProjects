var ScreenPageControllerContent = {};
ScreenPageControllerContent.onLoad = function()
{
	if(os) os.initScreenPageControllerComponents();
	$("#btnSave").click(function(e)
	{
		if(os) os.submitScreenPageControllerOptionsEx();
		return false;
	});
};