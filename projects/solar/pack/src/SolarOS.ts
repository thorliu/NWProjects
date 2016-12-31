/*
 * 操作系统功能
 * @Author: thor.liu 
 * @Date: 2016-12-30 11:44:21 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 11:36:37
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
}