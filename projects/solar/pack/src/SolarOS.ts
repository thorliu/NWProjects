/*
 * 操作系统功能
 * @Author: thor.liu 
 * @Date: 2016-12-30 11:44:21 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-30 13:57:58
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
		 * TODO: exists
		 * TODO: delete
		 */

		/**
		 * 创建目录
		 */
		static createDirectory(path:string):void {
			if(FileSystem.FS)
			{
				FileSystem.FS.mkdirSync(path);
			}
		}

		/**
		 * 列举目录和文件
		 * @param path 路径
		 * @param callback 回调(err, files)
		 */
		static list(path:string, callback: Function):void {
			if(FileSystem.FS)
			{
				FileSystem.FS.readdir(path, callback);
			}
		}

		static stat(path:string):any {
			if(FileSystem.FS)
			{
				return FileSystem.FS.statSync(path);
			}
			return null;
		}

		/**
		 * 删除文件
		 * @param path 路径
		 */
		static deleteFile(path: string):void {
			if(FileSystem.FS)
			{
				FileSystem.FS.unlinkSync(path);
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
			else
			{
				callback(true);		//error
			}
		}
	}
}