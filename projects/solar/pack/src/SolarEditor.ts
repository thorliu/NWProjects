/*
 * 编辑器架构
 * @Author: thor.liu 
 * @Date: 2017-01-15 18:44:24 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-01-15 21:31:29
 */
module SolarEditor
{
	//-------------------------------------------------------------- Core

	/**
	 * 数据输出接口
	 */
	export interface IDataWriter
	{
		write(data: any, path: string): boolean;
	}

	/**
	 * 数据读取接口
	 */
	export interface IDataReader
	{
		read(path: string): any;
	}

	/**
	 * JSON对象的通用文件处理方法
	 */
	export class JsonDataFileHandlers implements IDataReader, IDataWriter
	{
		constructor()
		{
		}

		/**
		 * 保存对象至json格式文件
		 */
		public write(data: any, path: string): boolean
		{
			var jsonData: string = JSON.stringify(data);
			SolarOS.FileSystem.saveFileNow(path, jsonData, null);
			return true;
		}

		/**
		 * 从文件读取
		 */
		public read(path: string): any
		{
			var jsonData: string = SolarOS.FileSystem.loadFileNow(path, null);
			try
			{
				return JSON.parse(jsonData);
			} catch (err)
			{
			}
			return null;
		}
	}

	//-------------------------------------------------------------- Modules

	/**
	 * 编辑器模块
	 */
	export class Module
	{
		constructor()
		{
		}

		public key: string;
		public name: string;
		public icon: string;
		public saveHandler: IDataWriter;
		public loadHandler: IDataReader;
		public exportHandler: IDataWriter;
		public importHandler: IDataReader;
	}

	/**
	 * 编辑器模块管理
	 */
	export class Modules
	{
		static _instance: Modules;
		/**
		 * 获取实例
		 */
		static get instance(): Modules
		{
			if (!SolarEditor.Modules._instance)
			{
				SolarEditor.Modules._instance = new SolarEditor.Modules();
			}
			return SolarEditor.Modules._instance;
		}

		/**
		 * 构造
		 */
		constructor()
		{
			this._mods = new Array<Module>();
		}

		/**
		 * 加载模块列表
		 */
		public loadMods():void
		{
		}

		/**
		 * 启动
		 */
		public startup():void
		{
			
		}

		/**
		 * 获取模块列表
		 */
		public get mods(): Array<Module>
		{
			return this._mods;
		}
		private _mods: Array<Module>;
	}
}