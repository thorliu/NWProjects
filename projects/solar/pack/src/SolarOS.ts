/*
 * 系统功能
 * @Author: thor.liu 
 * @Date: 2017-01-15 17:00:59 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-01-15 18:38:27
 */

/// <reference path="../typings/index.d.ts" />
module SolarOS
{

	//-------------------------------------------------------------- Core

	/**
	 * NodeJs + Electron 常用功能接口
	 */
	export class NodeCore
	{
		static _instance: NodeCore = null;
		static get instance(): NodeCore
		{
			if (!NodeCore._instance) NodeCore._instance = new SolarOS.NodeCore();
			return NodeCore._instance;
		}

		constructor()
		{
			this._FS = require("fs");
			this._PATH = require("path");
			this._APP = require("electron").remote.app;

			this._ELECTRON = require("electron");
			this._DIALOG = require("electron").remote.dialog;
			this._MENU = require("electron").remote.Menu;
			this._MENU_ITEM = require("electron").remote.MenuItem;

			//----
			this._jQuery = require("jQuery");
		}


		public get FS(): any { return this._FS; }
		private _FS: any;

		public get PATH(): any { return this._PATH; }
		private _PATH: any;

		public get APP(): any { return this._APP; }
		private _APP: any;

		public get ELECTRON(): any { return this._ELECTRON; }
		private _ELECTRON: any;

		public get DIALOG(): any { return this._DIALOG; }
		private _DIALOG: any;

		public get MENU(): any { return this._MENU; }
		private _MENU: any;

		public get MENU_ITEM(): any { return this._MENU_ITEM; }
		private _MENU_ITEM: any;

		//----

		public get JQuery():any { return this._jQuery; }
		private _jQuery:any;
	}

	//-------------------------------------------------------------- Files

	/**
	 * 文件系统功能
	 */
	export class FileSystem 
	{
		/**
		 * 复制文件或者目录
		 * @param path1 原路径
		 * @param path2 新路径
		 */
		static copy(path1: string, path2: string): void {
			if (NodeCore.instance.FS) { } else return;
			if (NodeCore.instance.FS.existsSync(path1)) {
				if (NodeCore.instance.FS.statSync(path1).isDirectory()) {
					FileSystem.copyDirectory(path1, path2);
				}
				else {
					FileSystem.copyFile(path1, path2);
				}
			}
		}

		/**
		 * 复制文件
		 * @param path1 原路径
		 * @param path2 新路径
		 */
		static copyFile(path1: string, path2: string): void {
			if (NodeCore.instance.FS) {
				try {
					NodeCore.instance.FS.createReadStream(path1).pipe(NodeCore.instance.FS.createWriteStream(path2));
				} catch (err) {
				}
			}
		}

		/**
		 * 复制目录
		 * @param path1 原路径
		 * @param path2 新路径
		 */
		static copyDirectory(path1: string, path2: string): void {
			if (NodeCore.instance.FS) { } else return;
			FileSystem.createDirectory(path2);
			var files = new Array();
			if (NodeCore.instance.FS.existsSync(path1)) {
				files = NodeCore.instance.FS.readdirSync(path1);
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var curPath = FileSystem.getJoinPath(path1, file);
					var dstPath = FileSystem.getJoinPath(path2, file);
					if (NodeCore.instance.FS.statSync(curPath).isDirectory()) {
						FileSystem.copyDirectory(curPath, dstPath);
					}
					else {
						FileSystem.copyFile(curPath, dstPath);
					}
				}
			}
		}

		/**
		 * 移动/改名
		 * @param path1 原路径
		 * @param path2 新路径
		 */
		static move(path1: string, path2: string): void {
			if (NodeCore.instance.FS) {
				try {
					NodeCore.instance.FS.renameSync(path1, path2);
				}
				catch (err) {
				}
			}
		}

		/**
		 * 创建目录
		 */
		static createDirectory(path: string): void {
			if (NodeCore.instance.FS) {
				try {
					NodeCore.instance.FS.mkdirSync(path);
				} catch (err) { }
			}
		}

		/**
		 * 列举目录和文件
		 * @param path 路径
		 */
		static list(path: string, callback: Function): Array<string> {
			if (NodeCore.instance.FS) {
				var ret = NodeCore.instance.FS.readdirSync(path);

				for (var i = 0; i < ret.length; i++) {
					ret[i] = FileSystem.getJoinPath(path, ret[i]);
				}

				return ret;
			}
			return [];
		}

		/**
		 * 获取文件目录信息
		 * @param path 路径
		 */
		static stat(path: string): any {
			if (NodeCore.instance.FS) {
				try {
					return NodeCore.instance.FS.statSync(path);
				} catch (err) {
					return null;
				}
			}
			return null;
		}

		/**
		 * 删除文件或者目录
		 * @param path 路径
		 */
		static del(path: string): void {
			if (NodeCore.instance.FS) { } else return;
			if (NodeCore.instance.FS.existsSync(path)) {
				if (NodeCore.instance.FS.statSync(path).isDirectory()) {
					FileSystem.deleteDirectory(path);
				}
				else {
					FileSystem.deleteFile(path);
				}
			}
		}

		/**
		 * 删除文件
		 * @param path 路径
		 */
		static deleteFile(path: string): void {
			if (NodeCore.instance.FS) {
				try {
					NodeCore.instance.FS.unlinkSync(path);
				} catch (err) { }
			}
		}

		/**
		 * 删除目录
		 * @param path 路径
		 */
		static deleteDirectory(path: string): void {
			if (NodeCore.instance.FS) { } else return;
			var files = new Array();
			if (NodeCore.instance.FS.existsSync(path)) {
				files = NodeCore.instance.FS.readdirSync(path);
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var curPath = FileSystem.getJoinPath(path, file);
					if (NodeCore.instance.FS.statSync(curPath).isDirectory()) {
						FileSystem.deleteDirectory(curPath);
					}
					else {
						NodeCore.instance.FS.unlinkSync(curPath);
					}
				}
				NodeCore.instance.FS.rmdirSync(path);
			}
		}


		/**
		 * 加载文件
		 * @param path 路径
		 * @param callback 回调(error, data)
		 * @param encoding 编码
		 */
		static loadFile(path: string, callback: Function, encoding: string): void {
			if (NodeCore.instance.FS) {
				if (encoding) { } else encoding = "utf8";
				NodeCore.instance.FS.readFile(path, encoding, callback);
			}
			else {
				callback(true, null);	//error, data
			}
		}

		/**
		 * 立即加载文件
		 */
		static loadFileNow(path: string, encoding: string): any {
			try {
				return NodeCore.instance.FS.readFileSync(path, encoding);
			}
			catch (err) {
				return null;
			}
		}

		/**
		 * 保存文件
		 * @param path 路径
		 * @param data 内容
		 * @param callback 回调(error)
		 * @param encoding 编码(utf8)
		 */
		static saveFile(path: string, data: string, callback: Function, encoding: string): void {
			if (NodeCore.instance.FS) {
				if (encoding) { } else encoding = "utf8";
				NodeCore.instance.FS.writeFile(path, data, encoding, callback);
			}
			else {
				callback(true);		//error
			}
		}

		/**
		 * 立即保存文件
		 */
		static saveFileNow(path: string, data: string, encoding: string): void {
			try {
				if (encoding) { } else encoding = "utf8";
				NodeCore.instance.FS.writeFileSync(path, data, encoding);
			}
			catch (err) {
			}
		}

		/**
		 * 获取所在路径
		 * @param path 文件路径
		 */
		static getDirectory(path: string): string {
			if (NodeCore.instance.PATH) {
				return NodeCore.instance.PATH.dirname(path);
			}
			return null;
		}

		/**
		 * 获取文件名
		 * @param path 文件路径
		 */
		static getFilename(path: string): string {
			if (NodeCore.instance.PATH) {
				return NodeCore.instance.PATH.basename(path);
			}
			return null;
		}

		/**
		 * 获取文件类型
		 * @param path 文件路径
		 */
		static getFileType(path: string): string {
			if (NodeCore.instance.PATH) {
				return NodeCore.instance.PATH.extname(path);
			}
			return null;
		}

		/**
		 * 组合路径
		 * @param aPath 路径a
		 * @param bPath 路径b
		 */
		static getJoinPath(aPath: string, bPath: string): string {
			if (NodeCore.instance.PATH) {
				return NodeCore.instance.PATH.join(aPath, bPath);
			}
			return null;
		}

		/**
		 * 相对路径
		 * @param aPath 路径a
		 * @param bPath 路径b
		 */
		static getRefPath(aPath: string, bPath: string): string {
			var a = aPath.split(/[\\\/]/g);
			var b = bPath.split(/[\\\/]/g);

			var c = new Array();
			var check = true;

			for (var i = 0; i < b.length; i++) {
				var bItem = b[i];
				var aItem = null;
				if (i < a.length) aItem = a[i];

				// if (aItem) { } else check = false;
				if (aItem != bItem) check = false;

				if (check) continue;

				c.push(bItem);
			}

			if (NodeCore.instance.PATH) {
				return NodeCore.instance.PATH.join.apply(null, c);
			}

			return null;
		}

		/**
		 * 获取程序路径
		 */
		static getAppPath(): string {
			if (NodeCore.instance.APP) {
				return NodeCore.instance.APP.getAppPath();
			}
			return null;
		}

		/**
		 * 获取用户主目录
		 */
		static getHomePath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("home"); else return null;
		}

		/**
		 * 获取程序数据目录
		 */
		static getAppDataPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("appData"); else return null;
		}

		/**
		 * 获取用户数据目录
		 */
		static getUserDataPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("userData"); else return null;
		}

		/**
		 * 获取临时目录
		 */
		static getTempPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("temp"); else return null;
		}

		/**
		 * 获取执行文件目录
		 */
		static getExePath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("exe"); else return null;
		}

		/**
		 * 获取模块目录
		 */
		static getModulePath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("module"); else return null;
		}

		/**
		 * 获取桌面目录
		 */
		static getDesktopPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("desktop"); else return null;
		}

		/**
		 * 获取文档目录
		 */
		static getDocumentsPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("documents"); else return null;
		}

		/**
		 * 获取下载目录
		 */
		static getDownloadPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("downloads"); else return null;
		}

		/**
		 * 获取音乐目录
		 */
		static getMusicPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("music"); else return null;
		}

		/**
		 * 获取图片目录
		 */
		static getPicturePath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("pictures"); else return null;
		}

		/**
		 * 获取视频目录
		 */
		static getVideoPath(): string {
			if (NodeCore.instance.APP) return NodeCore.instance.APP.getPath("videos"); else return null;
		}
	}

	//-------------------------------------------------------------- Application

	/**
	 * 应用程序功能
	 */
	export class Application {
		///获取程序名称
		static getName(): string {
			if (NodeCore.instance.APP) {
				return NodeCore.instance.APP.getName();
			}
			return null;
		}
		///获取程序版本号
		static getVersion(): string {
			if (NodeCore.instance.APP) {
				return NodeCore.instance.APP.getVersion();
			}
			return null;
		}
		static getLocale(): string {
			if (NodeCore.instance.APP) {
				return NodeCore.instance.APP.getLocale();
			}
			return null;
		}
		static addRecentDocument(path: string): void {
			if (NodeCore.instance.APP) {
				NodeCore.instance.APP.addRecentDocument(path);
			}
		}
		static clearRecentDocuments(): void {
			if (NodeCore.instance.APP) {
				NodeCore.instance.APP.clearRecentDocuments();
			}
		}
	}

	//-------------------------------------------------------------- User data

	/**
	 * 用户数据
	 */
	export class UserData {
		static data: any;
		static inited: boolean;
		/**
		 * 初始化
		 */
		static init(): void {
			if (SolarOS.UserData.inited) return;
			SolarOS.UserData.inited = true;
			SolarOS.UserData.data = new Object();
		}

		/**
		 * 获取配置文件路径
		 */
		static getFilePath(): string {
			var basePath = FileSystem.getDocumentsPath();
			var folderName = Application.getName();
			var fileName = "UserData.json";

			if (basePath && folderName && fileName) {
				var ret = FileSystem.getJoinPath(basePath, folderName);
				ret = FileSystem.getJoinPath(ret, fileName);
				return ret;
			}

			return null;
		}

		/**
		 * 加载配置文件
		 */
		static load(): void {
			SolarOS.UserData.init();
			try {
				var jsonStr = FileSystem.loadFileNow(UserData.getFilePath(), null);
				SolarOS.UserData.data = JSON.parse(jsonStr);
			}
			catch (err) {
			}
		}

		/**
		 * 保存配置文件
		 */
		static save(): void {
			SolarOS.UserData.init();
			try {
				var userDataPath = UserData.getFilePath();
				var userDataFolderPath = FileSystem.getDirectory(userDataPath);
				FileSystem.createDirectory(userDataFolderPath);
				var jsonStr = JSON.stringify(SolarOS.UserData.data);
				FileSystem.saveFileNow(UserData.getFilePath(), jsonStr, null);
			}
			catch (err) {
			}
		}

		/**
		 * 获取配置数据
		 */
		static getValue(key: string, def: any): any {
			SolarOS.UserData.init();

			if (SolarOS.UserData.data) {
				if (SolarOS.UserData.data[key]) {
					return SolarOS.UserData.data[key];
				}
			}

			return def;
		}

		/**
		 * 设置配置数据
		 */
		static setValue(key: string, value: any): void {
			SolarOS.UserData.init();

			SolarOS.UserData.data[key] = value;
		}
	}

	//-------------------------------------------------------------- UI

	/**
	 * 消息框图标类型
	 */
	export class MessageBoxIcons {
		static None: string = "none";
		static Info: string = "info";
		static Error: string = "error";
		static Question: string = "question";
		static Warning: string = "warning";
	}

	/**
	 * 界面交互
	 */
	export class UI {

		/**
		 * 对话框: 打开文件
		 */
		static showOpenFile(filters: any, callback: Function): void {
			filters = [
				{ name: "json files", extensions: ["json"] }		//['*']
			];

			/*
				options Object
				- title String (optional)
				- defaultPath String (optional)
				- buttonLabel String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
				- filters FileFilter[] (optional)
				- properties String[] - (optional) - Contains which features the dialog should use, can contain openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles.
			*/
			if (NodeCore.instance.DIALOG) {
				NodeCore.instance.DIALOG.showOpenDialog({
					properties: ["openFile"],		//['openFile', 'openDirectory', 'multiSelections', 'createDirectory', 'showHiddenFiles']
					filters: filters
				}, callback);

				return;
			}
			callback(null);
		}

		/**
		 * 对话框: 保存文件
		 */
		static showSaveFile(filters: any, callback: Function): void {
			filters = [
				{ name: "json files", extensions: ["json"] }		//['*']
			];

			/*
				options Object
				- title String (optional)
				- defaultPath String (optional)
				- buttonLabel String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
				- filters FileFilter[] (optional)
			*/
			if (NodeCore.instance.DIALOG) {
				NodeCore.instance.DIALOG.showSaveDialog({
					filters: filters
				}, callback);

				return;
			}

			callback(null);
		}

		/**
		 * 对话框: 错误
		 */
		static showErrorBox(title: string, content: string): void {
			if (NodeCore.instance.DIALOG) {
				NodeCore.instance.DIALOG.showErrorBox(title, content);
			}
		}

		/**
		 * 弹出消息框
		 * @param title 标题
		 * @param content 内容
		 * @param icon 图标 (参考SolarOS.MessageBoxIcons)
		 * @param buttons 按钮文本的数组
		 * @param defaultButtonIndex 默认按钮索引
		 * @param cancelButtonIndex 取消按钮索引
		 * @param callback 回调方法
		 */
		static showMessageBox(title: string, content: string, icon: string, buttons: Array<string>, defaultButtonIndex: number, cancelButtonIndex: number, callback: Function): void {

			if (NodeCore.instance.DIALOG) {
				NodeCore.instance.DIALOG.showMessageBox({
					title: title,
					message: content,
					type: icon,
					buttons: buttons,
					defaultId: defaultButtonIndex,
					cancelId: cancelButtonIndex
				}, callback);
			}
		}

		/**
		 * 弹出一个<确定>框
		 * @param title 标题
		 * @param content 内容
		 * @param callback 回调方法
		 */
		static showInfoBox(title: string, content: string, callback: Function): void {
			UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK"], 0, 0, callback);
		}

		/**
		 * 弹出一个<确定><取消>框
		 * @param title 标题
		 * @param content 内容
		 * @param callback 回调方法
		 */
		static showInfoBox_OK_CANCEL(title: string, content: string, callback: Function): void {
			UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK", "Cancel"], 0, 1, callback);
		}

		/**
		 * 弹出一个<是><否>框
		 * @param title 标题
		 * @param content 内容
		 * @param callback 回调方法
		 */
		static showInfoBox_YES_NO(title: string, content: string, callback: Function): void {
			UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No"], 0, 1, callback);
		}

		/**
		 * 弹出一个<是><否><取消>确定框
		 * @param title 标题
		 * @param content 内容
		 * @param callback 回调方法
		 */
		static showInfoBox_YES_NO_CANCEL(title: string, content: string, callback: Function): void {
			UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No", "Cancel"], 0, 2, callback);
		}
	}
}