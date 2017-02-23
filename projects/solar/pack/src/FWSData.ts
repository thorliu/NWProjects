/*
 * 数据相关的基础功能
 * @Author: thor.liu 
 * @Date: 2017-02-23 12:46:35 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-02-23 14:57:54
 */

module FWSData
{

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
		}

		/**
		 * 从队列头部移除一个成员
		 * @returns {T} 
		 * @memberOf Queue
		 */
		public remove(): T
		{
			if (this._list.length > 0) return this._list.shift();
			return null;
		}

		/**
		 * 清空整个队列
		 * @memberOf Queue
		 */
		public clear(): void
		{
			this._list.splice(0, this._list.length);
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