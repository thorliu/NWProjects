////////////////////////////////////////////////////////////////	N

var N = {
	inApp: function () {
		if (typeof (require) != "undefined") {
			return true;
		}
		else {
			return false;
		}
	}
	, create: function (mod) {
		if (N.inApp()) {
			return require(mod);
		}
		else return null;
	}
};

////////////////////////////////////////////////////////////////	N_FileSystem

var N_FileSystem = function () {
	this.init();
};

TClass.extend(N_FileSystem, TObject);
N_FileSystem.prototype.init = function () {
	this.fs = N.create("fs");
	this.electron = N.create("electron");
};

/*
	showOpenDialog([browserWindow, ]options[, callback])

	options Object
	title String
	defaultPath String
	buttonLabel String - Custom label for the confirmation button, when left empty the default label will be used.
	filters Array
	properties Array - Contains which features the dialog should use, can contain openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles.
	callback Function (optional)


	{
		filters: [
			{name: 'Images', extensions: ['jpg', 'png', 'gif']},
			{name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
			{name: 'Custom File Type', extensions: ['as']},
			{name: 'All Files', extensions: ['*']}
		]
	}
*/
N_FileSystem.prototype.openDirectoryDialog = function (callback) {

	if (N.inApp()) {
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({ properties: ['openDirectory'] }, callback);
	}
	else {
		callback(null);
	}
};

N_FileSystem.prototype.openFileDialog = function (types, multiselect, callback) {
	if (N.inApp()) {
		const {dialog} = require('electron').remote;
		var opts = ["openFile"];
		if (multiselect) opts.push("multiSelections");

		var optArray = { properties: opts, filters: types };
		dialog.showOpenDialog(optArray, callback);
	}
	else {
		callback(null);
	}
};

N_FileSystem.prototype.readFile = function (filename, encoding, callback) {
	if (N.inApp()) {
		this.fs.readFile(filename, encoding, callback);
	}
	else {
		callback(null, "");
	}
};

N.FS = new N_FileSystem();

////////////////////////////////////////////////////////////////	禁用拖入

window.ondragover = function (e) {
	e.preventDefault();
	return false;
};
window.ondrop = function (e) {
	e.preventDefault();
	return false;
};

////////////////////////////////////////////////////////////////	TEST

// N.FS.readFile("/Users/liuqiang/NWProjects/projects/excel/js/n.js1","utf8",function(err, data)
// {
// 	if(err)
// 	{
// 		alert("?");
// 	}
// 	else
// 	{
// 		alert(data);
// 	}
// });


//---------------- 	菜单
// var template = [
// 	{
// 		label: 'Edit',
// 		submenu: [
// 			{
// 				label: 'item1',
// 				click: function () { alert("?"); }
// 			},
// 			{
// 				type: 'separator'
// 			}
// 		],
// 	}
// ];

// var remote = require('electron').remote;
// var Menu = remote.Menu;
// var menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

//---------------- 对话框
//目录
// N.FS.openDirectoryDialog(function (filenames) {
// 	console.log(filenames);
// });

//文件-打开
N.FS.openFileDialog([
	{ name: "text files", extensions: ["txt"] }
], true, function (filenames) {
	console.log(filenames);
});