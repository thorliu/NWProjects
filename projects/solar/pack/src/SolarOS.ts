/*
 * 操作系统功能
 * @Author: thor.liu 
 * @Date: 2016-12-30 11:44:21 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 13:02:43
 */
module SolarOS {

	/**
	 * 文件系统功能
	 */
	export class FileSystem {
		static FS: any;
		static PATH: any;

		/**
		 * 复制文件或者目录
		 * @param path1 原路径
		 * @param path2 新路径
		 */
		static copy(path1: string, path2: string): void {
			if (FileSystem.FS) { } else return;
			if (FileSystem.FS.existsSync(path1)) {
				if (FileSystem.FS.statSync(path1).isDirectory()) {
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
			if (FileSystem.FS) {
				try {
					FileSystem.FS.createReadStream(path1).pipe(FileSystem.FS.createWriteStream(path2));
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
			if (FileSystem.FS) { } else return;
			FileSystem.createDirectory(path2);
			var files = new Array();
			if (FileSystem.FS.existsSync(path1)) {
				files = FileSystem.FS.readdirSync(path1);
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var curPath = FileSystem.getJoinPath(path1, file);
					var dstPath = FileSystem.getJoinPath(path2, file);
					if (FileSystem.FS.statSync(curPath).isDirectory()) {
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
			if (FileSystem.FS) {
				try {
					FileSystem.FS.renameSync(path1, path2);
				}
				catch (err) {
				}
			}
		}

		/**
		 * 创建目录
		 */
		static createDirectory(path: string): void {
			if (FileSystem.FS) {
				FileSystem.FS.mkdirSync(path);
			}
		}

		/**
		 * 列举目录和文件
		 * @param path 路径
		 * @param callback 回调(err, files)
		 */
		static list(path: string, callback: Function): void {
			if (FileSystem.FS) {
				FileSystem.FS.readdir(path, callback);
			}
		}

		/**
		 * 获取文件目录信息
		 * @param path 路径
		 */
		static stat(path: string): any {
			if (FileSystem.FS) {
				try {
					return FileSystem.FS.statSync(path);
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
			if (FileSystem.FS) { } else return;
			if (FileSystem.FS.existsSync(path)) {
				if (FileSystem.FS.statSync(path).isDirectory()) {
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
			if (FileSystem.FS) {
				try {
					FileSystem.FS.unlinkSync(path);
				} catch (err) { }
			}
		}

		/**
		 * 删除目录
		 * @param path 路径
		 */
		static deleteDirectory(path: string): void {
			if (FileSystem.FS) { } else return;
			var files = new Array();
			if (FileSystem.FS.existsSync(path)) {
				files = FileSystem.FS.readdirSync(path);
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var curPath = FileSystem.getJoinPath(path, file);
					if (FileSystem.FS.statSync(curPath).isDirectory()) {
						FileSystem.deleteDirectory(curPath);
					}
					else {
						FileSystem.FS.unlinkSync(curPath);
					}
				}
				FileSystem.FS.rmdirSync(path);
			}
		}


		/**
		 * 加载文件
		 * @param path 路径
		 * @param callback 回调(error, data)
		 * @param encoding 编码
		 */
		static loadFile(path: string, callback: Function, encoding: string): void {
			if (FileSystem.FS) {
				if (encoding) { } else encoding = "utf8";
				FileSystem.FS.readFile(path, encoding, callback);
			}
			else {
				callback(true, null);	//error, data
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
			if (FileSystem.FS) {
				if (encoding) { } else encoding = "utf8";
				FileSystem.FS.writeFile(path, data, callback);
			}
			else {
				callback(true);		//error
			}
		}

		/**
		 * 获取所在路径
		 * @param path 文件路径
		 */
		static getDirectory(path: string): string {
			if (FileSystem.PATH) {
				return FileSystem.PATH.dirname(path);
			}
			return null;
		}

		/**
		 * 获取文件名
		 * @param path 文件路径
		 */
		static getFilename(path: string): string {
			if (FileSystem.PATH) {
				return FileSystem.PATH.basename(path);
			}
			return null;
		}

		/**
		 * 获取文件类型
		 * @param path 文件路径
		 */
		static getFileType(path: string): string {
			if (FileSystem.PATH) {
				return FileSystem.PATH.extname(path);
			}
			return null;
		}

		/**
		 * 组合路径
		 * @param aPath 路径a
		 * @param bPath 路径b
		 */
		static getJoinPath(aPath: string, bPath: string): string {
			if (FileSystem.PATH) {
				return FileSystem.PATH.join(aPath, bPath);
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

			if (FileSystem.PATH) {
				return FileSystem.PATH.join.apply(null, c);
			}

			return null;
		}
	}

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
		static ELECTRON: any;
		static DIALOG: any;

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
			if (UI.DIALOG) {
				UI.DIALOG.showOpenDialog({
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
			if (UI.DIALOG) {
				UI.DIALOG.showSaveDialog({
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
			if (UI.DIALOG) {
				UI.DIALOG.showErrorBox(title, content);
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

			if (UI.DIALOG) {
				UI.DIALOG.showMessageBox({
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