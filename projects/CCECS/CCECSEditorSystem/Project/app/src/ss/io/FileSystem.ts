/*
 * 封装的文件系统功能
 * @Author: thor.liu 
 * @Date: 2018-04-15 20:20:07 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-22 11:11:19
 */

import NodeHack = require('../utils/NodeHack');
const FS = NodeHack.require("fs");
const PATH = NodeHack.require("path");
const ELECTRON = NodeHack.require("electron");
const APP = ELECTRON.remote.app;
const DIALOG = ELECTRON.remote.dialog;
const MENU = ELECTRON.remote.Menu;
const MENUITEM = ELECTRON.remote.MenuItem;


module FileSystem
{
	/** 加载文件的回调接口 */
	export interface LoadFileCallback 
	{
		/**
		 * @param err 错误信息
		 * @param data 返回数据
		 */
		(err: Error, data?: string): void

	}

	/** 保存文件的回调接口 */
	export interface SaveFileCallback
	{
		/**
		 * @param err 错误信息
		 */
		(err: Error): void
	}

	/** 文件操作 */
	export class File
	{
		/**
		 * 加载文件
		 * @param path 文件路径
		 * @param callback 回调方法
		 */
		static load(path: string, callback: LoadFileCallback = null): void
		{
			if (FS) FS.readFile(path, "utf8", callback);
			else if (callback) callback(new Error("FS模块未找到"));
		}

		/**
		 * 保存文件
		 * @param path 文件路径
		 * @param data 文件内容
		 * @param callback 回调方法
		 */
		static save(path: string, data: string, callback: SaveFileCallback = null): void
		{
			if (FS) FS.writeFile(path, data, "utf8", callback);
			else if (callback) callback(new Error("FS模块未找到"));
		}

		/**
		 * 立即加载文件(同步操作)
		 * @param path 文件路径
		 */
		static loadNow(path:string):string
		{
			try
			{
				return FS.readFileSync(path, "utf8");
			}
			catch(err)
			{
			}

			return null;
		}

		/**
		 * 立即保存文件(同步操作)
		 * @param path 
		 * @param data 
		 */
		static saveNow(path:string, data:string):void
		{
			try
			{
				FS.writeFile(path, data, "utf8");
			}
			catch(err)
			{
			}
		}

		/**
		 * 复制目录或者文件
		 * @param source 原始路径
		 * @param target 目标路径
		 */
		static copy(source: string, target: string): void
		{
			if (!FS) return;

			if (FS.existsSync(source))
			{
				if (FS.statSync(source).isDirectory())
				{
					File.copyDirectory(source, target);
				}
				else
				{
					File.copyFile(source, target);
				}
			}
		}

		/**
		 * 复制目录
		 * @param source 原始路径
		 * @param target 目标路径
		 */
		static copyDirectory(source: string, target: string): void
		{
			if (!FS) return;
			try
			{
				File.createDirectory(target);
				var files: string[] = [];
				if (FS.existsSync(source))
				{
					files = FS.readdirSync(source);
					for (var i: number = 0; i < files.length; i++)
					{
						var file: string = files[i];
						var curPath: string = Path.combiePath(source, file);
						var dstPath: string = Path.combiePath(target, file);
						if (FS.statSync(curPath).isDirectory())
						{
							this.copyDirectory(curPath, dstPath);
						}
						else
						{
							this.copyFile(curPath, dstPath);
						}
					}
				}
			}
			catch (err)
			{
			}
		}

		/**
		 * 复制文件
		 * @param source 原始路径
		 * @param target 目标路径
		 */
		static copyFile(source: string, target: string): void
		{
			if (!FS) return;
			try
			{
				FS.createReadStream(source).pipe(FS.createWriteStream(target));
			}
			catch (err)
			{
			}
		}

		/**
		 * 创建目录
		 * @param path 路径
		 */
		static createDirectory(path: string): void
		{
			if (!FS) return;
			try
			{
				FS.mkdirSync(path);
			}
			catch (err)
			{
			}
		}

		/**
		 * 移动/改名
		 * @param source 原始路径
		 * @param target 目标路径
		 */
		static move(source: string, target: string): void
		{
			if (!FS) return;
			FS.renameSync(source, target);
		}

		/**
		 * 列举目录和文件
		 * @param path 路径
		 */
		static list(path: string): string[]
		{
			if (FS)
			{
				var ret: string[] = FS.readdirSync(path);
				for (var i: number = 0; i < ret.length; i++)
				{
					ret[i] = Path.combiePath(path, ret[i]);
				}
				return ret;
			}
			return [];
		}

		/**
		 * 获取信息
		 * @param path 路径
		 */
		static getInfo(path: string): any
		{
			if (FS)
			{
				try
				{
					return FS.statSync(path);
				}
				catch (err)
				{
				}
			}
			return null;
		}

		/**
		 * 删除目录或者文件
		 * @param path 路径
		 */
		static del(path: string): void
		{
			if (!FS) return;
			if (File.isExists(path))
			{
				if (File.isDirectory(path))
				{
					File.delDirectory(path);
				}
				else
				{
					File.delFile(path);
				}
			}
		}

		/**
		 * 删除文件
		 * @param path 路径
		 */
		static delFile(path: string): void
		{
			if (!FS) return;
			try
			{
				FS.unlinkSync(path);
			}
			catch (err)
			{
			}
		}

		/**
		 * 删除目录
		 * @param path 路径
		 */
		static delDirectory(path: string): void
		{
			if (!FS) return;
			var files: string[] = [];
			if (File.isExists(path))
			{
				files = File.list(path);
				for (var i: number = 0; i < files.length; i++)
				{
					var file: string = files[i];
					var curPath: string = Path.combiePath(path, file);
					if (File.isDirectory(curPath))
					{
						File.delDirectory(curPath);
					}
					else
					{
						File.delFile(curPath);
					}
				}
				FS.rmdirSync(path);
			}
		}


		/**
		 * 判定指定的路径是否存在
		 * @param path 
		 */
		static isExists(path: string): boolean
		{
			if (FS)
			{
				return FS.existsSync(path);
			}
			return false;
		}

		/**
		 * 判定指定的路径是否是目录
		 * @param path 
		 */
		static isDirectory(path: string): boolean
		{
			if (FS)
			{
				return FS.statSync(path).isDirectory();
			}
			return false;
		}
	}

	/** 路径操作 */
	export class Path
	{
		/**
		 * 获取所在的路径
		 * @param path 文件路径
		 */
		static getDirectory(path: string): string
		{
			if (PATH) return PATH.dirname(path);
			return null;
		}

		/**
		 * 获取文件名
		 * @param path 文件路径
		 */
		static getFilename(path: string): string
		{
			if (PATH) return PATH.basename(path);
			return null;
		}

		/**
		 * 获取文件类型
		 * @param path 文件路径
		 */
		static getFileType(path: string): string
		{
			if (PATH) return PATH.extname(path);
			return null;
		}

		/**
		 * 获取两个路径
		 * @param a a路径
		 * @param b b路径
		 */
		static combiePath(a: string, b: string): string
		{
			if (PATH) return PATH.join(a, b);
			return null;
		}

		/** 获取程序目录 */
		static get appPath(): string { return APP ? APP.getAppPath() : null; }
		/** 获取用户主目录 */
		static get homePath(): string { return APP ? APP.getPath("home") : null; }
		/** 获取程序数据目录 */
		static get appDataPath(): string { return APP ? APP.getPath("appData") : null; }
		/** 获取用户数据目录 */
		static get userDataPath(): string { return APP ? APP.getPath("userData") : null; }
		/** 获取临时目录 */
		static get tempPath(): string { return APP ? APP.getPath("temp") : null; }
		/** 获取执行文件目录 */
		static get exePath(): string { return APP ? APP.getPath("exe") : null; }
		/** 获取模块目录 */
		static get modulePath(): string { return APP ? APP.getPath("module") : null; }
		/** 获取桌面目录 */
		static get desktopPath(): string { return APP ? APP.getPath("desktop") : null; }
		/** 获取文档目录 */
		static get documentsPath(): string { return APP ? APP.getPath("documents") : null; }
		/** 获取下载目录 */
		static get downloadPath(): string { return APP ? APP.getPath("downloads") : null; }
		/** 获取音乐目录 */
		static get musicPath(): string { return APP ? APP.getPath("music") : null; }
		/** 获取图片目录 */
		static get picturesPath(): string { return APP ? APP.getPath("pictures") : null; }
		/** 获取视频目录 */
		static get videosPath(): string { return APP ? APP.getPath("videos") : null; }
	}
}

export = FileSystem;
window["FileSystem"] = FileSystem;