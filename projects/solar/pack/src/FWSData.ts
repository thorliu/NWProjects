/*
 * 数据相关的基础功能
 * @Author: thor.liu 
 * @Date: 2017-02-23 12:46:35 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-02-25 18:41:18
 */

module FWSData
{
	/**
	 * 事件参数
	 * @export
	 * @class EventArgs
	 */
	export class EventArgs
	{
		private _sender: any;

		/**
		 * 构造
		 * @param {*} sender 
		 * @memberOf EventArgs
		 */
		constructor(sender: any)
		{
			this._sender = sender;
		}

		/**
		 * 获取事件发送者
		 * @readonly
		 * @type {*}
		 * @memberOf EventArgs
		 */
		public get sender(): any
		{
			return this._sender;
		}
	}

	/**
	 * 数据属性改变事件参数
	 * @export
	 * @class DataPropertyChangeEventArgs
	 * @extends {EventArgs}
	 */
	export class DataPropertyChangeEventArgs extends EventArgs
	{
		private _propertyName: string;
		private _source: any;
		private _newValue: any;
		private _oldValue: any;

		/**
		 * Creates an instance of DataPropertyChangeEventArgs.
		 * @param {*} sender 
		 * @param {*} source 
		 * @param {string} propertyName 
		 * @param {*} newValue 
		 * @param {*} oldValue 
		 * 
		 * @memberOf DataPropertyChangeEventArgs
		 */
		constructor(sender: any, source: any, propertyName: string, newValue: any, oldValue: any)
		{
			super(sender);
			this._source = source;
			this._propertyName = propertyName;
			this._newValue = newValue;
			this._oldValue = oldValue;
		}

		/**
		 * 获取数据源对象
		 * @readonly
		 * @type {*}
		 * @memberOf DataPropertyChangeEventArgs
		 */
		public get source(): any { return this._source; }

		/**
		 * 获取属性名称
		 * @readonly
		 * @type {string}
		 * @memberOf DataPropertyChangeEventArgs
		 */
		public get propertyName(): string { return this._propertyName; }

		/**
		 * 获取属性的新值
		 * @readonly
		 * @type {*}
		 * @memberOf DataPropertyChangeEventArgs
		 */
		public get newValue(): any { return this._newValue; }

		/**
		 * 获取属性的老值
		 * 
		 * @readonly
		 * @type {*}
		 * @memberOf DataPropertyChangeEventArgs
		 */
		public get oldValue(): any { return this._oldValue; }
	}

	/**
	 * 数据字典改变事件类型
	 * @export
	 * @enum {number}
	 */
	export enum DataCollectionChangeType
	{
		/**
		 * 清空成员时
		 */
		Clear,
		/**
		 * 添加成员时
		 */
		Add,
		/**
		 * 移除成员时
		 */
		Remove,
		/**
		 * 修改成员时
		 */
		Modify
	}

	/**
	 * 数据字典改变事件参数
	 * @export
	 * @class DataDictChangeEventArgs
	 * @extends {EventArgs}
	 */
	export class DataDictChangeEventArgs extends EventArgs
	{
		private _source: any;
		private _key: string;
		private _oldValue: any;
		private _newValue: any;
		private _type: DataCollectionChangeType;

		constructor(sender: any, type: DataCollectionChangeType, source: any, key: string, oldValue: any, newValue: any)
		{
			super(sender);

			this._source = source;
			this._key = key;
			this._oldValue = oldValue;
			this._newValue = newValue;
			this._type = type;
		}

		/**
		 * 改变方式
		 * @readonly
		 * @type {DataCollectionChangeType}
		 * @memberOf DataDictChangeEventArgs
		 */
		public get type(): DataCollectionChangeType { return this._type; }

		/**
		 * 数据源对象
		 * @readonly
		 * @type {*}
		 * @memberOf DataDictChangeEventArgs
		 */
		public get source(): any { return this._source; }

		/**
		 * 老值
		 * @readonly
		 * @type {*}
		 * @memberOf DataDictChangeEventArgs
		 */
		public get oldValue(): any { return this._oldValue; }

		/**
		 * 新值
		 * @readonly
		 * @type {*}
		 * @memberOf DataDictChangeEventArgs
		 */
		public get newValue(): any { return this._newValue; }

		/**
		 * 键名
		 * @readonly
		 * @type {string}
		 * @memberOf DataDictChangeEventArgs
		 */
		public get key(): string { return this._key; }
	}

	/**
	 * 数据列表改变事件参数
	 * @export
	 * @class DataListChangeEventArgs
	 * @extends {EventArgs}
	 */
	export class DataListChangeEventArgs extends EventArgs
	{
		private _source: any;
		private _index: number;
		private _oldValue: any;
		private _newValue: any;
		private _type: DataCollectionChangeType;

		/**
		 * Creates an instance of DataListChangeEventArgs.
		 * @param {*} sender 
		 * @param {DataCollectionChangeType} type 
		 * @param {*} source 
		 * @param {number} index 
		 * @param {*} newValue 
		 * @param {*} oldValue 
		 * 
		 * @memberOf DataListChangeEventArgs
		 */
		constructor(sender: any, type: DataCollectionChangeType, source: any, index: number, newValue: any, oldValue: any)
		{
			super(sender);

			this._type = type;
			this._source = source;
			this._index = index;
			this._newValue = newValue;
			this._oldValue = oldValue;
		}

		/**
		 * 数据改变方式
		 * @readonly
		 * @type {DataCollectionChangeType}
		 * @memberOf DataListChangeEventArgs
		 */
		public get type(): DataCollectionChangeType { return this._type; }

		/**
		 * 数据源对象
		 * @readonly
		 * @type {*}
		 * @memberOf DataListChangeEventArgs
		 */
		public get source(): any { return this._source; }

		/**
		 * 索引
		 * @readonly
		 * @type {number}
		 * @memberOf DataListChangeEventArgs
		 */
		public get index(): number { return this._index; }

		/**
		 * 新值
		 * @readonly
		 * @type {*}
		 * @memberOf DataListChangeEventArgs
		 */
		public get newValue(): any { return this._newValue; }

		/**
		 * 老值
		 * @readonly
		 * @type {*}
		 * @memberOf DataListChangeEventArgs
		 */
		public get oldValue(): any { return this._oldValue; }
	}

	/**
	 * 数据绑定模式
	 * @export
	 * @enum {number}
	 */
	export enum DataBindMode
	{
		/**
		 * 一次性同步
		 */
		Once,
		/**
		 * 单向更新绑定
		 */
		OneWay,
		/**
		 * 双向更新绑定
		 */
		TwoWay
	}

	/**
	 * 数据绑定关系
	 * 
	 * @export
	 * @class DataBindLink
	 */
	export class DataBindLink
	{
		private _source: any;
		private _target: any;
		private _mode: DataBindMode;
		private _options: any;
		private _type: string;

		constructor(type: string, source: any, target: any, mode: DataBindMode, options?: any)
		{
			this._type = type;
			this._source = source;
			this._target = target;
			this._mode = mode;
			this._options = options;
		}

		public get type(): string { return this._type; }
		public get source(): any { return this._source; }
		public get target(): any { return this._target; }
		public get mode(): any { return this._mode; }
		public get options(): any { return this._options; }
	}

	/**
	 * 数据绑定管理器
	 * 
	 * @class DataBindManager
	 */
	class DataBindManager
	{
		static _isntance: DataBindManager;

		private _links: Array<DataBindLink>;

		/**
		 * Creates an instance of DataBindManager.
		 * 
		 * @memberOf DataBindManager
		 */
		constructor()
		{
			this._links = new Array<DataBindLink>();
		}

		/**
		 * 通知数据改变事件
		 * @param {EventArgs} e 
		 * @memberOf DataBindManager
		 */
		public distEvent(e: EventArgs): void
		{
			var cloneList: Array<DataBindLink> = this._links.slice(0);

			for (var i: number = 0; i < cloneList.length; i++)
			{
				var lk: DataBindLink = cloneList[i];
				var handler: Function = this["on" + lk.type + "Change"];
				if (!handler) continue;

				if(e.sender === lk.source)
				{
					if(lk.mode === DataBindMode.TwoWay 
					|| lk.mode === DataBindMode.OneWay)
					{
						handler.call(this, e, lk, false);
					}
				}
				else if(e.sender === lk.target && lk.mode === DataBindMode.TwoWay)
				{
					handler.call(this, e, lk, true);
				}
			}
		}

		/**
		 * 添加绑定关系
		 * @param {string} type
		 * @param {*} source 
		 * @param {*} target 
		 * @param {DataBindMode} mode 
		 * @param {*} options 
		 * @returns {void} 
		 * @memberOf DataBindManager
		 */
		public add(type: string, source: any, target: any, mode: DataBindMode, options: any): void
		{
			var link: DataBindLink = this.find(source, target);
			if (link) return;

			link = new DataBindLink(type, source, target, mode, options);
			this._links.push(link);
		}

		/**
		 * 查找绑定关系
		 * @param {*} source 
		 * @param {*} target 
		 * @returns {DataBindLink} 
		 * 
		 * @memberOf DataBindManager
		 */
		public find(source: any, target: any): DataBindLink
		{
			for (var i: number = 0; i < this._links.length; i++)
			{
				var link: DataBindLink = this._links[i];

				if (link.source === source && link.target === target) return link;
			}
			return null;
		}

		/**
		 * 查找数据源
		 * @param {*} source 
		 * @returns {DataBindLink} 
		 * @memberOf DataBindManager
		 */
		public findSource(source: any): DataBindLink
		{
			for (var i: number = 0; i < this._links.length; i++)
			{
				var link: DataBindLink = this._links[i];
				if (link.source === source) return link;
			}
			return null;
		}

		/**
		 * 查找目标
		 * @param {*} target 
		 * @returns {DataBindLink} 
		 * @memberOf DataBindManager
		 */
		public findTarget(target: any): DataBindLink
		{
			for (var i: number = 0; i < this._links.length; i++)
			{
				var link: DataBindLink = this._links[i];
				if (link.target === target) return link;
			}
			return null;
		}

		/**
		 * 获取绑定特定目标的数据源
		 * @param {*} target 
		 * @returns {Array<DataBindLink>} 
		 * @memberOf DataBindManager
		 */
		public getBindSources(target: any): Array<DataBindLink>
		{
			var ret: Array<DataBindLink> = new Array<DataBindLink>();

			for (var i: number = 0; i < this._links.length; i++)
			{
				var link: DataBindLink = this._links[i];
				if (link.target === target)
				{
					ret.push(link);
				}
			}
			return ret;
		}

		/**
		 * 获取绑定特定数据源的目标
		 * @param {*} source 
		 * @returns {Array<DataBindLink>} 
		 * @memberOf DataBindManager
		 */
		public getBindTargets(source: any): Array<DataBindLink>
		{
			var ret: Array<DataBindLink> = new Array<DataBindLink>();

			for (var i: number = 0; i < this._links.length; i++)
			{
				var link: DataBindLink = this._links[i];
				if (link.source === source)
				{
					ret.push(link);
				}
			}
			return ret;
		}

		/**
		 * 移除所有特定数据源的绑定
		 * @param {*} source 
		 * @memberOf DataBindManager
		 */
		public removeLinksBySource(source: any): void
		{
			for (var i: number = this._links.length - 1; i >= 0; i--)
			{
				var link: DataBindLink = this._links[i];
				if (link.source !== source) continue;
				this._links.splice(i, 1);
			}
		}

		/**
		 * 移除所有特定目标的绑定
		 * @param {*} target 
		 * @memberOf DataBindManager
		 */
		public removeLinksByTarget(target: any): void
		{
			for (var i: number = this._links.length - 1; i >= 0; i--)
			{
				var link: DataBindLink = this._links[i];
				if (link.target !== target) continue;
				this._links.splice(i, 1);
			}
		}

		/**
		 * 移除所有绑定
		 * @memberOf DataBindManager
		 */
		public removeAll(): void
		{
			this._links.splice(0, this._links.length);
		}

		/**
		 * 对象属性改变
		 * @private
		 * @param {DataPropertyChangeEventArgs} e 
		 * @param {DataBindLink} lk
		 * @param {boolean} twoway 
		 * @memberOf DataBindManager
		 */
		private onPropertiesChange(e: DataPropertyChangeEventArgs, lk: DataBindLink, twoway: boolean): void
		{
			var src = null;
			var tag = null;
			var srcName = "";
			var tagName = "";

			//options { target: source }
			if(twoway)
			{
				//反向
				src = lk.target;
				tag = lk.source;
				srcName = e.propertyName;
				tagName = lk.options[srcName];
			}
			else
			{
				//正向
				src = lk.source;
				tag = lk.target;
				srcName = e.propertyName;
				for(var k in lk.options)
				{
					var v = lk.options[k];
					if(v === srcName)
					{
						tagName = k;
						break;
					}
				}
			}

			if(!srcName || !tagName) return;
			tag[tagName] = src[srcName];
			
		}

		/**
		 * 列表成员改变
		 * @private
		 * @param {DataListChangeEventArgs} e 
		 * @param {DataBindLink} lk
		 * @param {boolean} twoway 
		 * @memberOf DataBindManager
		 */
		private onListChange(e: DataListChangeEventArgs, lk: DataBindLink, twoway: boolean): void
		{
			console.log("onListChange", e, lk, twoway);
		}

		/**
		 * 字典成员改变
		 * @private
		 * @param {DataDictChangeEventArgs} e 
		 * @param {DataBindLink} lk
		 * @param {boolean} twoway 
		 * @memberOf DataBindManager
		 */
		private onDictChange(e: DataDictChangeEventArgs, lk: DataBindLink, twoway: boolean): void
		{
			console.log("onDictChange", e, lk, twoway);
		}
	}

	/**
	 * 获取数据绑定管理器实例
	 * 
	 * @returns {DataBindManager} 
	 */
	function getDataBindManager(): DataBindManager
	{
		if (!DataBindManager._isntance)
		{
			DataBindManager._isntance = new DataBindManager();
		}
		return DataBindManager._isntance;
	}

	/**
	 * 拷贝属性值
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {*} [options] 
	 */
	export function copyProperties(source: any, target: any, options?: any): void
	{
		if(!options) return;

		for(var k in options)
		{
			var v = options[k];
			target[v] = source[k];
		}
	}

	/**
	 * 拷贝列表成员
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {*} [options] 
	 */
	export function copyList(source: any, target: any, options?: any): void
	{
	}

	/**
	 * 拷贝字典成员
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {*} [options] 
	 */
	export function copyDict(source: any, target: any, options?: any): void
	{
	}



	/**
	 * 建立数据属性绑定
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {DataBindMode} mode 
	 * @param {*} options 
	 */
	export function bindProperties(source: any, target: any, mode: DataBindMode, options?: any): void
	{
		if (source && target && source !== target) { } else return;
		if (mode !== DataBindMode.Once)
		{
			getDataBindManager().add("Properties", source, target, mode, options);
		}
		copyProperties(source, target, options);
	}

	/**
	 * 建立列表成员绑定
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {DataBindMode} mode 
	 * @param {*} [options] 
	 */
	export function bindList(source: any, target: any, mode: DataBindMode, options?: any): void
	{
		if (source && target && source !== target) { } else return;
		if (mode !== DataBindMode.Once)
		{
			getDataBindManager().add("List", source, target, mode, options);
		}

		copyList(source, target, options);
	}

	/**
	 * 建立字典成员绑定
	 * @export
	 * @param {*} source 
	 * @param {*} target 
	 * @param {DataBindMode} mode 
	 * @param {*} [options] 
	 */
	export function bindDict(source: any, target: any, mode: DataBindMode, options?: any): void
	{
		if (source && target && source !== target) { } else return;
		if (mode !== DataBindMode.Once)
		{
			getDataBindManager().add("Dict", source, target, mode, options);

		}
		copyDict(source, target, options);
	}

	/**
	 * 解除数据源的数据绑定
	 * @export
	 * @param {*} source 
	 */
	export function unbindBySource(source: any): void
	{
		getDataBindManager().removeLinksBySource(source);
	}

	/**
	 * 解除目标对象的数据绑定
	 * @export
	 * @param {*} target 
	 */
	export function unbindByTarget(target: any): void
	{
		getDataBindManager().removeLinksByTarget(target);
	}

	//-----------------------------------------------------------

	/**
	 * 依赖属性 (提供属性值绑定的数据源的主要实现方法)
	 * @export
	 * @class DependentProperties
	 */
	export class DependentProperties {
		
		private _owner:any;
		private _properties:Object;

		/**
		 * 构造
		 * @param {*} owner 
		 * @memberOf DependentProperties
		 */
		constructor(owner:any) {
			this._owner = owner;
			this._properties = new Object();
		}

		/**
		 * 获取属性值
		 * @param {string} name 
		 * @param {*} [defValue] 
		 * @returns {*} 
		 * @memberOf DependentProperties
		 */
		public get(name:string, defValue?:any):any
		{
			if(this._properties.hasOwnProperty(name))
			{
				return this._properties[name];
			}
			return defValue;
		}

		/**
		 * 设置属性值
		 * @param {string} name 
		 * @param {*} newValue 
		 * @memberOf DependentProperties
		 */
		public set(name:string, newValue:any):void
		{
			if(this._properties[name] === newValue) return;
			var oldValue:any = this._properties[name];
			this._properties[name] = newValue;
			getDataBindManager().distEvent(new DataPropertyChangeEventArgs(this._owner, this._owner, name, newValue, oldValue));
		}

		/**
		 * 清空内容
		 * @memberOf DependentProperties
		 */
		public clear():void
		{
			for(var k in this._properties)
			{
				delete this._properties[k];
			}
		}
	}

	/**
	 * 依赖对象 (用于数据绑定的数据对象的抽象类)
	 * @export
	 * @class DependentObject
	 */
	export class DependentObject {
		private __DP:DependentProperties;
		/**
		 * 构造
		 * @memberOf DependentObject
		 */
		constructor(){
			this.__DP = new DependentProperties(this);
		}

		/**
		 * 获取属性值
		 * @private
		 * @param {string} name 
		 * @param {*} [defValue] 
		 * @returns {*} 
		 * @memberOf DependentObject
		 */
		public get(name:string, defValue?:any):any{
			return this.__DP.get(name, defValue);
		}
		/**
		 * 设置属性值
		 * @param {string} name 
		 * @param {*} newValue 
		 * 
		 * @memberOf DependentObject
		 */
		public set(name:string, newValue:any):void
		{
			this.__DP.set(name, newValue);
		}

		/**
		 * 清空属性值
		 * @memberOf DependentObject
		 */
		public clear():void
		{
			this.__DP.clear();
		}
	}

	/**
	 * 字典
	 * @export
	 * @class Dict
	 * @template T 
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
			if (this._dict[key] === value) return;

			if (this.containKey(key))
			{
				var oldValue: T = this._dict[key];
				this._dict[key] = value;
				getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Modify, this, key, oldValue, value));
			}
			else
			{
				this._dict[key] = value;
				getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Add, this, key, oldValue, value));
			}
		}

		/**
		 * 删除指定键以及值
		 * @param key 键
		 */
		public deleteKey(key: string): void
		{
			if (!this.containKey(key)) return;

			var ret = this._dict[key];
			delete this._dict[key];

			getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Remove, this, key, ret, null));
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
			if (this.count == 0) return;
			for (var key in this._dict)
			{
				delete this._dict[key];
			}

			getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Clear, this, null, null, null));
		}

		/**
		 * 转换成普通对象
		 */
		public toObject(): Object
		{
			var ret = new Object();
			for (var k in this._dict)
			{
				var v = this._dict[k];
				ret[k] = v;
			}
			return ret;
		}

		/**
		 * 转换成字符串信息
		 */
		public toString(): string
		{
			return "Dict " + JSON.stringify(this._dict);
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
	 * 列表
	 * @export
	 * @class List
	 * @template T 
	 */
	export class List<T>{
		private _list: Array<T>;
		/**
		 * 构造
		 */
		constructor()
		{
			this._list = new Array<T>();
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
		 * 设置指定索引的项目
		 * @param {T} item 
		 * @param {number} index 
		 * @memberOf List
		 */
		public modify(item: T, index: number): void
		{
			if (index < 0 || index >= this._list.length) return;
			if (this._list[index] === item) return;
			var oldValue: T = this._list[index];
			this._list[index] = item;

			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Modify, this, index, item, oldValue));
		}

		/**
		 * 添加项目
		 * @param item 项目
		 */
		public add(item: T): T
		{
			this._list.push(item);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this._list.length - 1, item, null));
			return item;
		}

		/**
		 * 移除项目
		 * @param item 项目
		 */
		public remove(item: T): T
		{
			var i = this._list.indexOf(item);
			if (i < 0) return;
			this._list.splice(i, 1);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, i, null, item));
			return item;
		}

		/**
		 * 插入项目
		 * @param item 项目
		 * @param index 索引
		 */
		public insert(item: T, index: number): T
		{
			if (index < 0 || index > this._list.length - 1) return;
			this._list.splice(index, 0, item);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, index, item, null));
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
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, index, null, ret));
			return ret;
		}

		/**
		 * 清空所有项目
		 */
		public clear(): void
		{
			if (this._list.length == 0) return;
			this._list.splice(0, this._list.length);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
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
			return this._list.slice(0);
		}

		/**
		 * 转换成字符串信息
		 */
		public toString(): string
		{
			return "List [" + this._list.toString() + "]";
		}

		/**
		 * 使用分隔符将所有成员拼成一个字符串
		 */
		public join(separator: string): string
		{
			return this._list.join(separator);
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
	 * 队列
	 * @export
	 * @class Queue
	 * @template T 
	 */
	export class Queue<T>{

		private _list: Array<T>;

		/**
		 * Creates an instance of Queue.
		 * @memberOf Queue
		 */
		constructor()
		{
			this._list = new Array<T>();
		}

		/**
		 * 添加一个成员到队列尾部
		 * @param {T} item 
		 * @memberOf Queue
		 */
		public add(item: T): void
		{
			this._list.push(item);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this.length - 1, item, null));
		}

		/**
		 * 从队列头部移除一个成员
		 * @returns {T} 
		 * @memberOf Queue
		 */
		public remove(): T
		{
			var ret: T = null;
			if (this._list.length > 0) ret = this._list.shift(); else return null;
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, 0, ret, null));
			return ret;
		}

		/**
		 * 清空整个队列
		 * @memberOf Queue
		 */
		public clear(): void
		{
			this._list.splice(0, this._list.length);
			getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
		}

		/**
		 * 转换成普通数组
		 * @memberOf Queue
		 */
		public toArray(): Array<any>
		{
			return this._list.slice(0);
		}

		/**
		 * 转换成文本信息
		 * @returns {string} 
		 * @memberOf Queue
		 */
		public toString(): string
		{
			return "Queue[" + this._list.toString() + "]";
		}

		/**
		 * 返回队列成员数量
		 * @readonly
		 * @type {number}
		 * @memberOf Queue
		 */
		public get length(): number
		{
			return this._list.length;
		}

		/**
		 * 返回队列头部的成员
		 * @readonly
		 * @type {T}
		 * @memberOf Queue
		 */
		public get current(): T
		{
			if (this._list.length == 0) return null;
			return this._list[0];
		}
	}

	/**
	 * 树形节点
	 * @export
	 * @class Node
	 * @template T 
	 */
	export class Node<T> {
		private _id: string;
		private _nodes: List<Node<T>>;
		private _parentNode: Node<T>;
		private _data: T;

		/**
		 * Creates an instance of Node.
		 * @memberOf Node
		 */
		constructor(id: string)
		{
			this._nodes = new List<Node<T>>();
			this._id = id;
		}

		/**
		 * 清空所有子节点
		 * @memberOf Node
		 */
		public clear(): void
		{
			for (var i = 0; i < this._nodes.length; i++)
			{
				var node: Node<T> = this._nodes[i];
				node._parentNode = null;
			}
			this._nodes.clear();
		}

		/**
		 * 添加一个子节点
		 * @param {Node<T>} node 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public add(node: Node<T>): Node<T>
		{
			node._parentNode = this;
			return this._nodes.add(node);
		}

		/**
		 * 插入一个子节点
		 * @param {Node<T>} node 
		 * @param {number} index 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public insert(node: Node<T>, index: number): Node<T>
		{
			var ret: Node<T> = node;
			node._parentNode = this;
			return ret;
		}

		/**
		 * 移除子节点
		 * @param {Node<T>} node 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public remove(node: Node<T>): Node<T>
		{
			node._parentNode = null;
			return this._nodes.remove(node);
		}

		/**
		 * 移除指定索引的子节点
		 * @param {number} index 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public removeAt(index: number): Node<T>
		{
			var ret = this._nodes.at(index);
			this._nodes.removeAt(index);
			ret._parentNode = null;
			return ret;
		}

		/**
		 * 从节点的父级移除
		 * @memberOf Node
		 */
		public removeFromParent(): void
		{
			if (this._parentNode)
			{
				this._parentNode.remove(this);
			}
		}

		/**
		 * 获取指定索引的子节点
		 * @param {number} index 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public at(index: number): Node<T>
		{
			var ret = this._nodes.at(index);
			return ret;
		}

		/**
		 * 搜索特定子节点的索引
		 * @param {Node<T>} node 
		 * @returns {number} 
		 * 
		 * @memberOf Node
		 */
		public indexOf(node: Node<T>): number
		{
			return this._nodes.indexOf(node);
		}

		/**
		 * 查找到定ID的节点
		 * @param {string} id 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public find(id: string): Node<T>
		{
			if (this._id === id) return this;
			for (var i: number = 0; i < this._nodes.length; i++)
			{
				let n: Node<T> = this._nodes.at(i);
				if (n.id === id) return n;
				let cn: Node<T> = n.find(id);
				if (cn) return cn;
			}
			return null;
		}

		/**
		 * 查找指定数据的节点
		 * @param {T} d 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public findData(d: T): Node<T>
		{
			if (this._data === d) return this;
			for (var i: number = 0; i < this._nodes.length; i++)
			{
				let n: Node<T> = this._nodes.at(i);
				if (n.data === d) return n;
				let cn: Node<T> = n.findData(d);
				if (cn) return cn;
			}
			return null;
		}

		/**
		 * 获取节点到根的逐级节点
		 * @returns {Array<Node<T>>} 
		 * @memberOf Node
		 */
		public getParentNodes(): Array<Node<T>>
		{
			var ret: Array<Node<T>> = new Array<Node<T>>();
			var temp: Node<T> = this;
			while (temp)
			{
				ret.splice(0, 0, temp);
				temp = temp.parentNode;
			}
			return ret;
		}

		/**
		 * 获取与另一个节点的共同父级节点
		 * @param {Node<T>} node 
		 * @returns {Node<T>} 
		 * @memberOf Node
		 */
		public getParentByOtherNode(node: Node<T>): Node<T>
		{
			var p1: Array<Node<T>> = this.getParentNodes();
			var p2: Array<Node<T>> = node.getParentNodes();

			var ret: Node<T> = null;

			for (var i: number = 0; i < p1.length; i++)
			{
				var n1: Node<T> = p1[i];
				var n2: Node<T> = null;

				if (i < p2.length)
				{
					n2 = p2[i];
				}

				if (n1 === n2) ret = n1;
				else break;
			}

			return ret;
		}

		//---------------------- refs

		/**
		 * 获取第一个子节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get firstChild(): Node<T>
		{
			if (this._nodes.length > 0)
			{
				return this._nodes[0]
			}
			return null;
		}

		/**
		 * 获取最后一个子节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get lastChild(): Node<T>
		{
			if (this._nodes.length > 0)
			{
				return this._nodes[this._nodes.length - 1];
			}
			return null;
		}

		/**
		 * 获取第一个同级节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get firstNode(): Node<T>
		{
			if (this._parentNode) return this._parentNode.firstChild;
			return null;
		}

		/**
		 * 获取上一个同级节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get prevNode(): Node<T>
		{
			if (this._parentNode)
			{
				var i: number = this._parentNode.indexOf(this);
				if (i > 0) return this._parentNode.at(i - 1);
			}
			return null;
		}

		/**
		 * 获取下一个同级节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get nextNode(): Node<T>
		{
			if (this._parentNode)
			{
				var i = this._parentNode.indexOf(this);
				if (i >= this._parentNode.length) return null;
				if (i < 0) return null;

				return this._parentNode.at[i + 1];
			}
			return null;
		}

		/**
		 * 获取最后一个同级节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get lastNode(): Node<T>
		{
			if (this._parentNode) return this._parentNode.lastChild;
			return null;
		}

		/**
		 * 获取数据
		 * @type {T}
		 * @memberOf Node
		 */
		public get data(): T
		{
			return this._data;
		}
		/**
		 * 设置数据
		 * @memberOf Node
		 */
		public set data(value: T)
		{
			this._data = value;
		}

		/**
		 * 获取字符串信息
		 * @returns {string} 
		 * @memberOf Node
		 */
		public toString(): string
		{
			var temp: any = this._data;
			if (temp || temp === 0 || temp === false)
			{
				return "Node " + JSON.stringify(this._data);
			}
			else return "Node {}";
		}

		//---------------------- properties

		/**
		 * 获取子节点的数量
		 * @readonly
		 * @type {number}
		 * @memberOf Node
		 */
		public get length(): number
		{
			return this._nodes.length;
		}

		/**
		 * 获取父级节点实例
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get parentNode(): Node<T>
		{
			return this._parentNode;
		}

		/**
		 * 获取当前节点的ID
		 * @readonly
		 * @type {string}
		 * @memberOf Node
		 */
		public get id(): string
		{
			return this._id;
		}

		/**
		 * 获取当前节点的深度级别
		 * @readonly
		 * @type {number}
		 * @memberOf Node
		 */
		public get level(): number
		{
			var ret: number = 0;
			var temp: Node<T> = this;
			while (temp.parentNode)
			{
				temp = temp.parentNode;
				ret++;
			}
			return ret;
		}

		/**
		 * 获取根节点
		 * @readonly
		 * @type {Node<T>}
		 * @memberOf Node
		 */
		public get rootNode(): Node<T>
		{
			var ret: Node<T> = this;
			while (ret.parentNode)
			{
				ret = ret.parentNode;
			}
			return ret;
		}

		/**
		 * 获取节点路径
		 * @readonly
		 * @type {string}
		 * @memberOf Node
		 */
		public get path(): string
		{
			var ary = new Array<string>();

			var n: Node<T> = this;
			while (n)
			{
				ary.splice(0, 0, n.id);
				n = n.parentNode;
			}

			return ary.join("/");
		}

	}
}