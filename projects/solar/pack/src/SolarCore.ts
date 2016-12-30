/*
 * Solar核心定义
 * @Author: thor.liu 
 * @Date: 2016-12-29 16:12:29 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-29 16:56:53
 */
module SolarCore {

	///数据输出接口
	export interface IDataWriter {
		/**
		 * 输出
		 * @param path 路径
		 * @param data 数据
		 * @param extra 扩展信息
		 */
		write(path: string, data: any, extra: any): boolean;
	}

	///数据输入接口
	export interface IDataReader {
		/**
		 * @param path 路径
		 * @param extra 扩展信息
		 * @returns 数据
		 */
		read(path: string, extra: any): any;
	}

	// --------------------------------------------------------------

	///文件处理方法
	export class FileHandler {
		/**
		 * 构造
		 * @param fType 文件扩展名
		 * @param fName 文件说明
		 * @param loadMethod 读取方法
		 * @param saveMethod 保存方法
		 * @param importMethod 导入方法
		 * @param exportMethod 导出方法
		 */
		constructor(fType: string, fName: string, loadMethod: IDataReader, saveMethod: IDataWriter, importMethod: IDataReader, exportMethod: IDataWriter) {
			this._type = fType;
			this._name = fName;
			this._load = loadMethod;
			this._save = saveMethod;
			this._import = importMethod;
			this._export = exportMethod;
		}

		private _type: string;
		private _name: string;
		private _load: IDataReader;
		private _save: IDataWriter;
		private _import: IDataReader;
		private _export: IDataWriter;

		///获取文件扩展名
		public get type(): string { return this._type; }
		///获取文件描述
		public get name(): string { return this._name; }
		///获取文件读取方法
		public get load(): IDataReader { return this._load; }
		///获取文件保存方法
		public get save(): IDataWriter { return this._save; }
		///获取文件导入方法
		public get import(): IDataReader { return this._import; }
		///获取文件导出方法
		public get export(): IDataWriter { return this._export; }

	}

	/**
	 * 模块抽象类
	 */
	export class ModuleAbstract {

		/**
		 * 构造
		 * @param modKey 模块标识
		 * @param modName 模块名称
		 */
		constructor(modKey: string, modName: string) {
			this._key = modKey;
			this._name = modName;

			this.onInit();
		}

		/**
		 * 初始化时
		 */
		public onInit() { }

		/**
		 * 启动时
		 */
		public onEnter() { }

		/**
		 * 退出时
		 */
		public onLeave() { }

		/**
		 * 获取模块名称
		 */
		public get name(): string { return this._name; }
		private _name: string;

		/**
		 * 获取模块标识
		 */
		public get key(): string { return this._key; }
		private _key: string;
	}

	/**
	 * 文件类模块
	 */
	export class ModuleFileAbstract extends ModuleAbstract {
		/**
		 * 构造
		 * @param modKey 模块标识
		 * @param modName 模块名称
		 */
		constructor(modKey: string, modName: string) {
			super(modKey, modName);
		}
	}

	/**
	 * 编辑器实例
	 */
	export class SolarEditor {

		static _current: SolarEditor;

		/**
		 * 获取实例
		 */
		static get current(): SolarEditor {
			if (SolarEditor._current) { } else {
				SolarEditor._current = new SolarEditor();
			}
			return SolarEditor._current;
		}

		/**
		 * 构造
		 */
		private constructor() {
			this._modules = new Array<ModuleAbstract>();
		}

		/**
		 * 启动
		 */
		public startup(window: any): void {
		}

		/**
		 * 获取模块列表
		 */
		public get modules(): Array<ModuleAbstract> {
			return this._modules;
		}
		private _modules: Array<ModuleAbstract>;
	}
}