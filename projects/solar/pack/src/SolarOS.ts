/*
 * 操作系统功能
 * @Author: thor.liu 
 * @Date: 2016-12-30 11:44:21 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-30 15:19:26
 */
module SolarOS {

	/**
	 * 文件系统功能
	 */
	export class FileSystem {
		static FS: any;
		static PATH: any;
		
		/*
		 * TODO: copy
		 * TODO: move
		 * TODO: rename
		 */

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
			
			return null;
		}
	}
}