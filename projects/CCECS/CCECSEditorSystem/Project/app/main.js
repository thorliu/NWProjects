/*
 * SolarSystem Main
 * @Author: thor.liu 
 * @Date: 2018-04-18 15:52:47 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 22:55:09
 */

const electron = require('electron');
const { app } = electron;
const { Menu } = electron;
const { BrowserWindow } = electron;
const { ipcMain } = electron;


const ECSEditor = require('./ss/ecseditor/ECSEditor');
const APIList = require('./ss/ecseditor/api/APIList');

APIList.init();
ECSEditor.getInstance().run();

let win;
function createWindow()
{
	win = new BrowserWindow({ width: 800, height: 600 });
	// win.loadURL(`file://${__dirname}/index.html`);
	win.loadURL(`http://10.1.38.241:7457/build/`);
	// win.backgroundColor = "#000";

	// win.webContents.openDevTools();
	win.on('closed', () =>
	{
		win = null;
		app.quit();
	});
};

app.on('ready', createWindow);
app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});

app.on('activate', () =>
{
	if (win === null)
	{
		createWindow();
	}
});

//NOTE: ------------------------------------------------------------------

// ipcMain.on("notifyByMain", (event, msg) =>
// {
	
// });

// ipcMain.on("notifyByRender", (event, msg) =>
// {

// });

//-----------------

// let dialogScreenPage = null;
// let dialogScreenPageController = null;
// let dialogScreenPageControllerUrl = null;
// function notifyAllWindows(args)
// {
// 	var wins = BrowserWindow.getAllWindows();
// 	for (var i = 0; i < wins.length; i++)
// 	{
// 		var iter = wins[i];
// 		if (iter && iter.webContents)
// 		{
// 			try
// 			{
// 				iter.send("notifyRenderer", args);
// 			}
// 			catch (err) { }
// 		}
// 	}
// };

// ipcMain.on('notifyMain', (event, args) =>
// {
// 	//NOTE: 打开屏幕页
// 	if (args.cmd === "openScreenPage")
// 	{
// 		var icon = args.icon;
// 		var label = args.label;
// 		var url = args.url;
// 		var controller = args.controller;

// 		dialogScreenPageControllerUrl = controller;

// 		if (!dialogScreenPage)
// 		{
// 			url = encodeURIComponent(url);
// 			dialogScreenPage = new BrowserWindow({ width: 800, height: 600 });
// 			dialogScreenPage.backgroundColor = "#000";
// 			dialogScreenPage.loadURL(`file://${__dirname}/screen.html?label=${label}&url=${url}`);
// 			dialogScreenPage.on('closed', () =>
// 			{
// 				if(dialogScreenPageController) dialogScreenPageController.close();
// 				dialogScreenPage = null;
// 			});
// 		}
// 		else
// 		{
// 			args.cmd = "onReplaceScreenPage";
// 			notifyAllWindows(args);
// 		}


// 		// dialogScreenPage.webContents.openDevTools();
// 		dialogScreenPage.show();
// 	}

// 	//NOTE: 打开控制台
// 	else if (args.cmd === "openScreenPageController")
// 	{
// 		if (!dialogScreenPage) return;
// 		if (dialogScreenPageController) dialogScreenPageController.close();

// 		var url = dialogScreenPageControllerUrl || "";
// 		dialogScreenPageController = new BrowserWindow({ width: 800, height: 600 });
// 		dialogScreenPageController.backgroundColor = "#000";
// 		dialogScreenPageController.loadURL(`file://${__dirname}/controller.html?url=${url}`);
// 		// dialogScreenPageController.openDevTools();
		
// 		dialogScreenPageController.on('closed', () =>
// 		{
// 			dialogScreenPageController = null;
// 		});
// 	}
// 	//NOTE: 打开屏幕页控制台
// 	else if(args.cmd === "openScreenPageDevTool")
// 	{
// 		if(dialogScreenPageController)
// 		{
// 			// dialogScreenPageController.openDevTools();
// 			dialogScreenPage.webContents.openDevTools();			
// 		}
// 	}

// 	//NOTE: 其它通知直接透传
// 	else
// 	{
// 		notifyAllWindows(args);
// 	}
// });



