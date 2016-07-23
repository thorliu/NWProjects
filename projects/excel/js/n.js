/*************
 * Note-Webkit Utils by liuqiang(thor.liu@outlook.com) 2016
 */
var N = {
	inited: false,

	inApp: (typeof (require) != "undefined"),
	gui: null,
	menubar: null,
	win: null,
	fs: null,
	app: null,
	fspath: null,

	onLoad: function () {
		alert(N.options.get("Test"));
	},

	// core
	init: function () {
		if (N.inited) return;
		N.inited = true;

		//-----

		if (!N.inApp) return;

		N.gui = N.require("nw.gui");
		N.menubar = new N.gui.Menu({ type: "menubar" });
		N.win = N.gui.Window;
		N.fs = N.require("fs");
		N.app = N.gui.App;
		N.fspath = N.require("path");

		//----

		$.queue(document, "N.init", N.options.load);
		$.queue(document, "N.init", N.onLoad);

		$.dequeue(document, "N.init");
	},
	require: function (src) {
		if (N.inApp) return require(src);
		else return null;
	},
	// app
	appName: function () {
		if (N.inApp) return N.gui.App.manifest.name;
		else return "$appName";
	},
	appVersion: function () {
		if (N.inApp) return N.gui.App.manifest.version;
		else return "0.0.0";
	},
	// ui
	setupMenuBar: function () {
		if (!N.inApp) return;
		N.win.get().menu = N.menubar;
	},
	// file
	loadFile: function (path, callback) {	//callback(error, data)
		if (!N.inApp) return;
		N.fs.readFile(path, "utf8", callback);
	},
	saveFile: function (path, data, callback) {	//callback(error)
		if (!N.inApp) return;
		N.fs.writeFile(path, data, callback);
	},
	fileStat: function (path, callback) {	//callback(err,stats)
		if (!N.inApp) return;
		N.fs.stat(path, callback);
	},
	deleteFile: function (path) {
		//TODO:
	},
	deleteDirectory: function (path) {
		//TODO:
	},
	createDirectory: function (path) {
		//TODO:
	},
	dir: function (path, callback) //callback (err, files)
	{
		if (!N.inApp) return;
		else N.fs.readdir(path, callback);
	}
};

//---user options
N.options = {
	data: {},
	load: function () {
		if (!N.inApp) return;
		var data = JSON.stringify(N.options.data);
		var file = "options.json";
		var folder = N.app.dataPath + "";
		file = N.fspath.join(folder, file);

		N.loadFile(file, function (err, data) {
			if (err) {

			}
			else {
				N.options.data = jQuery.parseJSON(data);
				$.dequeue(document, "N.init");
			}
		});
	},
	save: function () {
		if (!N.inApp) return;
		var data = JSON.stringify(N.options.data);
		var file = "options.json";
		var folder = N.app.dataPath + "";
		file = N.fspath.join(folder, file);

		N.saveFile(file, data, function (err) {

		});
	},
	get: function (key) {
		return N.options.data[key];
	},
	set: function (key, value) {
		N.options.data[key] = value;

		if (!N.inApp) return;

		N.options.save();
	}
};