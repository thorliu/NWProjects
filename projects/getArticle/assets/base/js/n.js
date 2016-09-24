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

//目录对话框
N_FileSystem.prototype.openDirectoryDialog = function (callback) {

	if (N.inApp()) {
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({ properties: ['openDirectory'] }, callback);
	}
	else {
		callback(null);
	}
};

//文件对话框
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

//读取文件
N_FileSystem.prototype.readFile = function (filename, callback) {
	if (N.inApp()) {
		this.fs.readFile(filename, "utf-8", callback);
	}
	else {
		callback(null, "");
	}
};

//写入文件
N_FileSystem.prototype.writeFile = function (filename, data, callback) {
	if (N.inApp()) {
		this.fs.writeFile(filename, data, callback);
	}
};

//列举文件
N_FileSystem.prototype.dir = function (path, callback) {
	if (N.inApp()) {
		this.fs.readdir(path, callback);
	}
	else {
		callback(null);
	}
};

//检查文件是否存在
N_FileSystem.prototype.fileStat = function (path) {
	if (N.inApp()) {
		return this.fs.statSync(path);
	}
	else {
		return null;
	}
};

//删除文件或目录
N_FileSystem.prototype.delete = function (path, callback) {
};

//创建目录
N_FileSystem.prototype.createDirectory = function (path, callback) {
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
// 读取文件
// N.FS.readFile("/Users/liuqiang/NWProjects/projects/excel/js/n.txt", function(err, data)
// {
// 	if(err)
// 	{
// 		alert("?");
// 	}
// 	else
// 	{
// 		console.log(data);
// 	}
// });

// 保存文件
// N.FS.writeFile("/Users/liuqiang/NWProjects/projects/excel/js/n.txt", "def汉字", function(err){
// 	if(err)
// 	{
// 		alert("?");
// 	}
// 	else
// 	{
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

//---------------- 文件
// 文件列表
// N.FS.dir("/Users/liuqiang/NWProjects/projects/excel/js", function(err, files){
// 	console.log(files);
// });


//文件信息
// console.log(N.FS.fileStat("/Users/liuqiang/NWProjects/projects/excel/js"));

//---------------- 对话框
//目录
// N.FS.openDirectoryDialog(function (filenames) {
// 	console.log(filenames);
// });

//文件-打开
// N.FS.openFileDialog([
// 	{ name: "text files", extensions: ["txt"] }
// ], true, function (filenames) {
// 	console.log(filenames);
// });