/*
 * 一个简单的MVC框架
 * @Author: thor.liu 
 * @Date: 2017-01-17 10:36:31 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-01-17 11:53:13
 */
module SolarMVC 
{
	/**
	 * 一个常用的字典类
	 */
	export class Dict<T> {
		private _dict: Object;

		/**
		 * 构造
		 */
		constructor(data: Object = null)
		{
			this._dict = new Object();

			if (data)
			{
				for (var k in data)
				{
					var v = data[k];
					this._dict[k] = v;
				}
			}
		}

		/**
		 * 获取指定键的值
		 * @param key 键
		 */
		public getItem(key: string): T
		{
			return this._dict[key];
		}

		/**
		 * 设置指定键的值
		 * @param key 键
		 * @param value 值
		 */
		public setItem(key: string, value: T): void
		{
			this._dict[key] = value;
		}

		/**
		 * 删除指定键以及值
		 * @param key 键
		 */
		public deleteKey(key: string): T
		{
			var ret = this._dict[key];
			delete this._dict[key];
			return ret;
		}

		/**
		 * 判定是否包含指定的键
		 * @param key 键
		 */
		public containKey(key: string): boolean
		{
			return this.keys.indexOf(key) >= 0;
		}

		/**
		 * 判定是否包含指定的值
		 * @param value 值
		 */
		public containValue(value: T): boolean
		{
			return this.values.indexOf(value) >= 0;
		}

		/**
		 * 清空所有内容
		 */
		public clear(): void
		{
			for (var key in this._dict)
			{
				delete this._dict[key];
			}
		}

		/**
		 * 转换成普通对象
		 */
		public toObject(): Object
		{
			var ret = new Object();
			for (var k in this._dict)
			{
				var v = this._dict;
				ret[k] = v;
			}
			return ret;
		}

		/**
		 * 转换成字符串信息
		 */
		public toString(): string
		{
			return JSON.stringify(this._dict);
		}

		/**
		 * 获取所有的键名称
		 */
		public get keys(): Array<string>
		{
			var ret: Array<string> = new Array<string>();
			for (var key in this._dict)
			{
				ret.push(key);
			}
			return ret;
		}

		/**
		 * 获取所有的值
		 */
		public get values(): Array<T>
		{
			var ret: Array<T> = new Array<T>();
			for (var key in this._dict)
			{
				ret.push(this._dict[key]);
			}
			return ret;
		}

		/**
		 * 获取包含的数据数量
		 */
		public get count(): number
		{
			return this.keys.length;
		}

	}

	/**
	 * 一个常用的列表类
	 */
	export class List<T>{
		private _list: Array<T>;
		/**
		 * 构造
		 */
		constructor()
		{
			this._list = new Array<any>();
		}

		/**
		 * 获取指定索引的项目
		 * @param index 索引
		 */
		public at(index: number): T
		{
			return this._list[index];
		}

		/**
		 * 添加项目
		 * @param item 项目
		 */
		public add(item: T): T
		{
			this._list.push(item);
			return item;
		}

		/**
		 * 移除项目
		 * @param item 项目
		 */
		public remove(item: T): T
		{
			var i = this._list.indexOf(item);
			this._list.splice(i, 1);
			return item;
		}

		/**
		 * 插入项目
		 * @param item 项目
		 * @param index 索引
		 */
		public insert(item: T, index: number): T
		{
			this._list.splice(index, 0, item);
			return item;
		}

		/**
		 * 移除指定索引的项目
		 * @param index 索引
		 */
		public removeAt(index: number): T
		{
			var ret = this._list[index];
			this._list.splice(index, 1);
			return ret;
		}

		/**
		 * 清空所有项目
		 */
		public clear(): void
		{
			this._list.splice(0, this._list.length);
		}

		/**
		 * 查找项目
		 * @param item 目标项目
		 */
		public indexOf(item: T): number
		{
			return this._list.indexOf(item);
		}

		/**
		 * 转换成普通数组
		 */
		public toArray(): Array<T>
		{
			return this._list.slice(0, 0);
		}

		/**
		 * 转换成字符串信息
		 */
		public toString(): string
		{
			return JSON.stringify(this._list);
		}

		/**
		 * 获取长度
		 */
		public get length(): number
		{
			return this._list.length;
		}
	}

	/**
	 * 指令
	 */
	export class Command 
	{
		constructor(cmdName: string, cmdCategory: string)
		{
			this.name = cmdName;
			this.category = cmdCategory;
			this.args = new Object();
		}

		/**
		 * 指令名称
		 */
		public name: string;

		/**
		 * 指令类型
		 */
		public category: string;

		/**
		 * 指令参数
		 */
		public args: any;
	}

	/**
	 * 指令队列
	 */
	export class CommandQueue
	{
		private _queue: List<Command>;

		/**
		 * 构造
		 */
		constructor()
		{
			this._queue = new List<Command>();
		}

		/**
		 * 添加
		 */
		public add(cmd: Command): void
		{
			this._queue.add(cmd);
		}

		/**
		 * 移除
		 */
		public remove(): Command
		{
			if (this._queue.length > 0)
			{
				return this._queue.removeAt(0);
			}
			return null;
		}

		/**
		 * 清空
		 */
		public clear():void
		{
			this._queue.clear();
		}

		/**
		 * 获取字符串信息
		 */
		public toString(): string
		{
			return this._queue.toString();
		}

		/**
		 * 获取长度
		 */
		public get length(): number
		{
			return this._queue.length;
		}

		/**
		 * 获取第一个
		 */
		public get current(): Command
		{
			if (this._queue.length > 0)
			{
				return this._queue.at(0);
			}
			return null;
		}

	}

	/**
	 * 指令路由
	 */
	export class CommandRouter
	{
		static _instance: CommandRouter;
		static get instance(): CommandRouter
		{
			if (!CommandRouter._instance)
			{
				CommandRouter._instance = new SolarMVC.CommandRouter();
			}
			return CommandRouter._instance;
		}


		private _queues: Dict<CommandQueue>;

		/**
		 * 构造
		 */
		constructor()
		{
			this._queues = new Dict<CommandQueue>();
		}

		/**
		 * 清除指定队列的消息
		 */
		public clearQueueMessages(category: string): void
		{
			var queue:CommandQueue = this._queues.getItem(category);
			queue.clear();
		}

		/**
		 * 清除所有队列的消息
		 */
		public clearAllQueueMessages(): void
		{
			var keys:Array<string> = this._queues.keys;
			for(var i:number = 0; i < keys.length; i ++)
			{
				this.clearQueueMessages(keys[i]);
			}
		}

		/**
		 * 发送指令
		 */
		public send(cmd: Command): void
		{
		}

		/**
		 * 推送指令
		 */
		public push(cmd: Command): void
		{
		}
	}
}


