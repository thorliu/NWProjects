/*
 * 公共代码的MVC框架, 接替原JS版的FWS_MVC
 * @Author: 刘强
 * @Date: 2017-03-01 14:19:48 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 15:43:43
 */


import FWSData = require('../data/FWSData');
import X = require('../utils/X');

module FWSMvc
{

	export const MVC_CONTEXT_TRY_CATCH: boolean = true;

	//-------------------------------------- 状态系统

	/**
	 * 上下文状态节点接口
	 * @export
	 * @interface IContext
	 */
	export interface IContext
	{
		onEnterContext(): void;
		onLeaveContext(): void;
		setModules(...mods: Array<IFMessageConnection>): void;
	}

	/**
	 * 上下文状态点节的成员接口
	 */
	export interface IContextMember
	{
		onEnterContextMember(): void;
		onLeaveContextMember(): void;
	}

	/**
	 * 上下文状态节点
	 * @export
	 * @class FContext
	 * @implements {IContext}
	 */
	export class FContext implements IContext
	{
		protected _id: string;
		protected _mods: Array<IFMessageConnection>;

		/**
		 * 构造
		 * @memberOf FContext
		 */
		constructor(id: string, ...mods: Array<IFMessageConnection>)
		{
			this._id = id;
			this._mods = new Array<IFMessageConnection>();

		}

		public initMessageConnections(mods: Array<IFMessageConnection>)
		{
			this._mods.splice(0, this._mods.length);
			for (var i: number = 0; i < mods.length; i++)
			{
				this._mods.push(mods[i]);
			}
		}

		/**
		 * 进入当前状态节点时
		 * @memberOf FContext
		 */
		public onEnterContext(): void
		{
			for (var i: number = 0; i < this._mods.length; i++)
			{
				var mod: IFMessageConnection = this._mods[i];

				if (mod.messageConnectionActived) 
				{
					X.warn("(onEnterContext) IFMessageConnection::messageConnectionActived !");
					continue;
				}

				if (MVC_CONTEXT_TRY_CATCH)
				{
					try
					{
						mod.onEnterContextMember();
					}
					catch (err)
					{
						// console.error("FContext", "onEnterContext", mod, err);
						// console.error("MVC", "ERROR", err.stack);
						// ErrorReport.send(err);
					}
				}
				else
				{
					mod.onEnterContextMember();
				}

			}
		}

		/**
		 * 离开当前状态节点时
		 * @memberOf FContext
		 */
		public onLeaveContext(): void
		{
			for (var i: number = 0; i < this._mods.length; i++)
			{
				var mod: IFMessageConnection = this._mods[i];
				if (MVC_CONTEXT_TRY_CATCH)
				{
					try
					{
						mod.onLeaveContextMember();
					}
					catch (err)
					{
						// console.error("FContext", "onLeaveContext", mod, err);
						// console.error("MVC", "ERROR", err.stack);
						// ErrorReport.send(err);
					}
				}
				else
				{
					mod.onLeaveContextMember();
				}
			}
		}

		/**
		 * 设置模块内容
		 * @param {...Array<IFMessageConnection>} mods 
		 * @memberOf FContext
		 */
		public setModules(...mods: Array<IFMessageConnection>): void
		{
			for (var i: number = 0; i < mods.length; i++)
			{
				this._mods.push(mods[i]);
			}
		}

		/**
		 * 获取上下文标识
		 * @readonly
		 * @type {string}
		 * @memberOf FContext
		 */
		public get id(): string
		{
			return this._id;
		}
	}

	/**
	 * 上下文管理器实例
	 * @class FContextManager
	 */
	class FContextManager
	{
		static _contextManager;

		protected _root: FWSData.Node<IContext>;
		protected _current: FWSData.Node<IContext>;
		protected _history: FWSData.Stack<FWSData.Node<IContext>>;

		public onContextChanged: Function;

		/**
		 * 构造
		 */
		constructor()
		{
			if (FContextManager._contextManager) throw "FContextManager被设计为单例, 不能创建多个实例";

			this._history = new FWSData.Stack<FWSData.Node<IContext>>();
		}

		/**
		 * 初始化
		 * @param {FWSData.Node<IContext>} root 
		 * @memberOf FContextManager
		 */
		public init(root: FWSData.Node<IContext>): void
		{
			this._root = root;
		}


		/**
		 * 切换到指定的上下文节点
		 * @param {FWSData.Node<IContext>} node 
		 * @memberOf FContextManager
		 */
		public goto(node: FWSData.Node<IContext>, sh: boolean = true): void
		{
			if (node && node.rootNode === this._root &&
				node !== this._current)
			{
				var theParentNode: FWSData.Node<IContext> = null;

				//关闭之前的无关节点
				if (this._current)
				{
					theParentNode = this._current.getParentByOtherNode(node);
					var closeList: Array<FWSData.Node<IContext>> = this._current.getParentNodes();
					var closeListCount: number = closeList.length;

					for (var i: number = closeListCount - 1; i >= 0; i--)
					{
						var closeContext: FWSData.Node<IContext> = closeList[i];

						if (closeContext === theParentNode) break;

						// if (FWSConfig.Options.MVC_CONTEXT_TRACE) FLog.data("Context", "onLeaveContext", closeContext.path);
						if (MVC_CONTEXT_TRY_CATCH)
						{
							try
							{
								closeContext.data.onLeaveContext();
							}
							catch (err)
							{
								// console.log("(ERROR)", err);
								// ErrorReport.send(err);
							}
						}
						else
						{
							closeContext.data.onLeaveContext();
						}
					}
				}

				//打开需要的新节点
				var found: boolean = false;
				var openList: Array<FWSData.Node<IContext>> = node.getParentNodes();
				var theParentNodeIsNull: boolean = true;

				if (theParentNode) theParentNodeIsNull = false;

				for (var i: number = 0; i < openList.length; i++)
				{
					var openContext: FWSData.Node<IContext> = openList[i];
					if (theParentNodeIsNull)
					{
						// if (FWSConfig.Options.MVC_CONTEXT_TRACE) FLog.data("Context", "onEnterContext", openContext.path);
						if (MVC_CONTEXT_TRY_CATCH)
						{
							try
							{
								openContext.data.onEnterContext();
							}
							catch (err)
							{
								// console.log("(ERROR)", err);
								// ErrorReport.send(err);
							}
						}
						else
						{
							openContext.data.onEnterContext();
						}

						continue;
					}

					if (found)
					{
						if (openContext != theParentNode || theParentNodeIsNull)
						{
							// if (FWSConfig.Options.MVC_CONTEXT_TRACE) FLog.data("Context", "onEnterContext", openContext.path);
							if (MVC_CONTEXT_TRY_CATCH)
							{
								try
								{
									openContext.data.onEnterContext();
								}
								catch (err)
								{
									// console.log("(ERROR)", err);
									// ErrorReport.send(err);
								}
							}
							else
							{
								openContext.data.onEnterContext();
							}

						}
					}
					else
					{
						if (openContext === theParentNode)
						{
							found = true;
						}
					}
				}

				//----
				this._current = node;
				if (sh) 
				{
					this._history.add(node);
					X.log("blue", "Context goto %s", node.path);
				}
				else
				{
					X.log("blue", "Context goto(no history) %s", node.path);
				}

				// FWSMvc.FLog.data("Context", "goto", node.path);

				if (this.onContextChanged)
				{
					this.onContextChanged(node.id);
				}
			}
		}

		/**
		 * 切换到指定ID的上下文节点
		 * 
		 * @param {string} id 
		 * 
		 * @memberOf FContextManager
		 */
		public gotoID(id: string): void
		{
			if (this._root)
			{
				var node: FWSData.Node<IContext> = this._root.find(id);
				this.goto(node);
			}
		}

		/** 检查指定的节点是否属激活状态 */
		public checkActived(node: FWSData.Node<IContext>): boolean
		{
			if (node && this._current)
			{
				var n: FWSData.Node<IContext> = this._current;
				while (n)
				{
					if (n === node) return true;
					n = n.parentNode;
				}
			}

			return false;
		}

		/** 检查指定ID的节点是否属激活状态 */
		public checkActivedById(id: string): boolean
		{
			if (this._root)
			{
				var node: FWSData.Node<IContext> = this._root.find(id);
				return this.checkActived(node);
			}
			return false;
		}

		/**
		 * 回退
		 * @memberOf FContextManager
		 */
		public back(): void
		{
			if (this._history.length > 1)
			{
				var backNode: FWSData.Node<IContext> = this._history.remove();
				this.goto(this._history.current, false);
			}
		}

		public clearHistory(): void
		{
			this._history.clear();
		}

		/**
		 * 获取当前节点
		 * 
		 * @readonly
		 * @type {FWSData.Node<IContext>}
		 * @memberOf FContextManager
		 */
		public get current(): FWSData.Node<IContext>
		{
			return this._current;
		}
	}

	/**
	 * 获取上下文管理器实例
	 * @export
	 * @returns {FContextManager} 
	 */
	export function ContextManager(): FContextManager
	{
		if (!FContextManager._contextManager) FContextManager._contextManager = new FContextManager();
		return FContextManager._contextManager;
	}

	//-------------------------------------- 消息系统

	/**
	 * MVC消息通知对象
	 * @export
	 * @class FMessage
	 */
	export class FMessage<T>
	{
		protected _key: string;
		protected _queue: string;
		protected _sended: boolean;
		protected _completed: boolean;
		protected _data: T;


		/**
		 * 构造
		 * @param {string} key 消息标识
		 * @param {string} [category=""] 消息队列类型
		 * @memberOf FMessage
		 */
		constructor(key: string, data:T, queue: string = "")
		{
			this._key = key;
			this._queue = queue;
			this._data = data;
		}

		/**
		 * 获取或设置附加数据
		 */
		public get data():T
		{
			return this._data;
		}
		public set data(v:T)
		{
			this._data = v;
		}
		

		/** 重置 */
		public reset(): void
		{
			this._sended = false;
			this._completed = false;
		}

		/**
		 * 将消息发至消息路由
		 * @memberOf FMessage
		 */
		public send(): void
		{
			if (this._sended) return;

			Router().send(this);

			this._sended = true;
		}

		/**
		 * 将消息标为完成
		 * @memberOf FMessage
		 */
		public complete(): void
		{
			if (this._completed) return;
			this._completed = true;

			Router().complete(this);
		}

		/**
		 * 获取消息类型
		 * @type {string}
		 * @memberOf FMessage
		 */
		public get key(): string
		{
			return this._key;
		}
		/**
		 * 设置消息类型
		 * @memberOf FMessage
		 */
		public set key(value: string)
		{
			this._key = value;
		}


		/**
		 * 获取消息队列类型
		 * @type {string}
		 * @memberOf FMessage
		 */
		public get queue(): string
		{
			return this._queue;
		}
		/**
		 * 设置消息队列类型
		 * @memberOf FMessage
		 */
		public set queue(value: string)
		{
			this._queue = value;
		}

		/**
		 * 获取消息是否已经被标为完成
		 * @readonly
		 * @type {boolean}
		 * @memberOf FMessage
		 */
		public get completed(): boolean
		{
			return this._completed;
		}

		/**
		 * 获取消息是否已经发至路由
		 * @readonly
		 * @type {boolean}
		 * @memberOf FMessage
		 */
		public get sended(): boolean
		{
			return this._sended;
		}

		

		/**
		 * 返回文本信息
		 * @returns {string} 
		 * @memberof FMessage
		 */
		public toString(): string
		{

			var ret: string = this._key + ", ";
			for (var key in this._data)
			{
				var value: any = this._data[key];

				if (value === null) value = "null";
				else if (value === undefined) value = "undefined";
				else 
				{
					//简单版本
					// if (!useJsonOutputFMessageArgs)
					{
						value = value.toString();
					}
					//JSON版本
					// else
					// {
					// 	value = JSON.stringify(value);
					// }
				}

				if (ret.length > 0)
				{
					ret += ",";
				}

				ret += key + "=" + value;
			}
			return ret;
		}

	}

	/**
	 * MVC消息连接接口
	 * @export
	 * @interface IFMessageConnection
	 */
	export interface IFMessageConnection extends IContextMember
	{
		/**
		 * 处理消息通知
		 * @param {FMessage} msg 传入的消息通知
		 * @returns {boolean} 返回是否忽略该消息的处理
		 * @memberOf IFMessageConnection
		 */
		onFMessage(msg: FMessage<any>): boolean;

		/**
		 * 连接至消息路由
		 * @memberOf IFMessageConnection
		 */
		connect(): void;

		/**
		 * 从消息路由断开
		 * @memberOf IFMessageConnection
		 */
		disconnect(): void;

		/**
		 * 接入路由之后
		 * @memberOf IFMessageConnection
		 */
		onConnect(): void;

		/**
		 * 断开路由之后
		 * @memberOf IFMessageConnection
		 */
		onDisconnect(): void;

		/** 是否处于激活状态 */
		messageConnectionActived: boolean;
	}

	/**
	 * MVC消息连接的抽象类
	 * @export
	 * @class FMessageConnectionAbstract
	 * @implements {IFMessageConnection}
	 */
	export abstract class FMessageConnectionAbstract implements IFMessageConnection
	{
		protected _messageConnectionActived: boolean;

		/**
		 * 构造
		 * @memberOf FMessageConnectionAbstract
		 */
		constructor()
		{
			this._messageConnectionActived = false;
		}

		/**
		 * 连接至消息路由
		 * @memberOf FMessageConnectionAbstract
		 */
		public connect(): void
		{
			Router().connect(this);
			this.onConnect();
		}

		/**
		 * 从消息路由断开
		 * @memberOf FMessageConnectionAbstract
		 */
		public disconnect(): void
		{
			Router().disconnect(this);
			this.onDisconnect();
		}

		/**
		 * 接入路由之后
		 * @memberOf IFMessageConnection
		 */
		public onConnect(): void
		{
		}

		/**
		 * 断开路由之后
		 * @memberOf IFMessageConnection
		 */
		public onDisconnect(): void
		{
		}

		/**
		 * 处理消息通知
		 * @param {FMessage} msg 传入的消息通知
		 * @returns {boolean} 返回是否忽略该消息的处理
		 * 
		 * @memberOf FMessageConnectionAbstract
		 */
		public onFMessage(msg: FMessage<any>): boolean
		{
			var handlerName: string = "onFMessage_" + msg.key;
			var handler: Function = this[handlerName];
			if (handler) 
			{
				return !handler.call(this, msg);
			}

			return false;
		}

		public onEnterContextMember(): void
		{
			this._messageConnectionActived = true;
			this.connect();
		}

		public onLeaveContextMember(): void
		{
			this._messageConnectionActived = false;
			this.disconnect();
		}

		public get messageConnectionActived(): boolean
		{
			return this._messageConnectionActived;
		}
	}

	/**
	 * MVC消息连接的代理类
	 * @export
	 * @class FMessageConnectionDelegate
	 * @implements {IFMessageConnection}
	 */
	export class FMessageConnectionDelegate implements IFMessageConnection
	{
		protected _owner: any;
		protected _messageConnectionActived: boolean;

		/**
		 * 构造
		 * @param {*} owner 
		 * @memberOf FMessageConnectionDelegate
		 */
		constructor(owner: any)
		{
			this._owner = owner;
		}

		/**
		 * 连接至消息路由
		 * @memberOf FMessageConnectionDelegate
		 */
		public connect(): void
		{
			Router().connect(this);
			this.onConnect();
		}

		/**
		 * 从消息路由断开
		 * @memberOf FMessageConnectionDelegate
		 */
		public disconnect(): void
		{
			Router().disconnect(this);
			this.onDisconnect();
		}

		/**
		 * 接入路由之后
		 * @memberOf FMessageConnectionDelegate
		 */
		public onConnect(): void
		{
		}

		/**
		 * 断开路由之后
		 * @memberOf FMessageConnectionDelegate
		 */
		public onDisconnect(): void
		{
		}

		/**
		 * 处理消息通知
		 * @param {FMessage} msg 传入的消息通知
		 * @returns {boolean} 返回是否忽略该消息的处理
		 * @memberOf FMessageConnectionDelegate
		 */
		public onFMessage(msg: FMessage<any>): boolean
		{
			var handlerName: string = "onFMessage_" + msg.key;
			var handler: Function = this._owner[handlerName];
			if (handler) 
			{
				return !handler.call(this._owner, msg);
			}
			return false;
		}

		public onEnterContextMember(): void
		{
			this._messageConnectionActived = true;
			this.connect();
		}

		public onLeaveContextMember(): void
		{
			this._messageConnectionActived = false;
			this.disconnect();
		}

		public get messageConnectionActived(): boolean
		{
			return this._messageConnectionActived;
		}
	}

	/**
	 * MVC消息路由
	 * @class FMessageRouter
	 */
	class FMessageRouter
	{
		static _router: FMessageRouter;

		protected _queues: FWSData.Dict<FWSData.Queue<FMessage<any>>>;
		protected _connections: FWSData.List<IFMessageConnection>;

		/**
		 * 构造
		 * @memberOf FMessageRouter
		 */
		constructor()
		{
			if (FMessageRouter._router) throw "FMessageRouter被设计为单例, 不能创建多个实例";
			this._queues = new FWSData.Dict<FWSData.Queue<FMessage<any>>>();
			this._connections = new FWSData.List<IFMessageConnection>();
		}

		/**
		 * 创建队列
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public createQueue(category: string): void
		{
			if (this._queues.containKey(category)) return;
			this._queues.setItem(category, new FWSData.Queue<FMessage<any>>());
		}

		/**
		 * 删除队列
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public removeQueue(category: string): void
		{
			if (!this._queues.containKey(category)) return;
			this._queues.deleteKey(category);
		}

		/**
		 * 删除所有队列
		 * @memberOf FMessageRouter
		 */
		public removeAllQueues(): void
		{
			this._queues.clear();
		}

		/**
		 * 获取队列
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public getQueue(category: string): FWSData.Queue<FMessage<any>>
		{
			if (this._queues.containKey(category))
			{
				return this._queues.getItem(category);
			}
			return null;
		}

		/**
		 * 清空特定队列的消息
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public clearQueueMessages(category: string): void
		{
			X.log("FMessage", "clearQueueMessages",  category);
			if (this._queues.containKey(category))
			{
				this._queues.getItem(category).clear();
			}
		}

		/**
		 * 清空所有队列的消息
		 * @memberOf FMessageRouter
		 */
		public clearAllQueueMessages(): void
		{
			var keys: Array<string> = this._queues.keys;
			for (var i: number = 0; i < keys.length; i++)
			{
				var key: string = keys[i];
				this._queues.getItem(key).clear();
			}
		}

		/**
		 * 连接至消息路由
		 * @param {IFMessageConnection} connection 
		 * @memberOf FMessageRouter
		 */
		public connect(connection: IFMessageConnection): void
		{
			if (this._connections.indexOf(connection) >= 0)
			{
				//警告:重复的连接
			}
			else
			{
				this._connections.add(connection);
			}
		}

		/**
		 * 从消息路由断开
		 * @param {IFMessageConnection} connection 
		 * @memberOf FMessageRouter
		 */
		public disconnect(connection: IFMessageConnection): void
		{
			if (this._connections.indexOf(connection) >= 0)
			{
				this._connections.remove(connection);
			}
		}

		/**
		 * 从消息路由断开所有连接
		 * @memberOf FMessageRouter
		 */
		public disconnectAll(): void
		{
			this._connections.clear();
		}

		/**
		 * 发送消息到路由的队列
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		public send(msg: FMessage<any>): void
		{
			if (msg.sended) return;


			// console.log("FMessage", "发送", msg.queue, msg);



			if (this._queues.containKey(msg.queue))
			{
				let queue: FWSData.Queue<FMessage<any>> = this._queues.getItem(msg.queue);
				queue.add(msg);
				if (queue.length === 1)
				{
					this.push(msg);
				}
				else
				{
					FWSMvc.Router().update();
				}
			}
			else
			{
				this.push(msg);
			}
		}

		/**
		 * 从路由的队列中, 将消息推出给每个正在连接的模块
		 * @private
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		private push(msg: FMessage<any>): void
		{
			X.log("FMessage", "推送", msg.queue, msg);

			let mods: Array<IFMessageConnection> = this._connections.toArray();
			let counter: number = 0;
			for (var i: number = 0; i < mods.length; i++)
			{
				let mod: IFMessageConnection = mods[i];
				try
				{
					var tmpBeginTimer: number = new Date().getTime();
					let isHandled: boolean = mod.onFMessage(msg);
					var tmpEndTimer: number = new Date().getTime();
					var tmpUsedTimer: number = (tmpBeginTimer - tmpEndTimer) / 1000;

					if (tmpUsedTimer >= 1)
					{
						X.log("FMessage::Timer", tmpUsedTimer);
					}

					if (isHandled)
					{
						counter++;
						if (msg.queue && msg.queue.length > 0)
						{
							X.log("FMessage", "处理", mod);
						}
					}
				}
				catch (err)
				{}
			}
			if (counter === 0)
			{
				// 	console.log("FMessage", "自动完成", msg.queue, msg);
				msg.complete();
			}
		}

		/**
		 * 将消息通知标为已经处理完成
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		public complete(msg: FMessage<any>): void
		{
			if(this._queues.keys.indexOf(msg.queue)>=0) 
			{
				X.log("FMessage", "完成", msg.queue, msg);
			}

			FWSMvc.Router().update();
		}

		/**
		 * 循环更新
		 * @memberOf FMessageRouter
		 */
		public update(): void
		{
			var keys: Array<string> = this._queues.keys;
			for (var i: number = 0; i < keys.length; i++)
			{
				var key: string = keys[i];
				var queue: FWSData.Queue<FMessage<any>> = this._queues.getItem(key);
				if (queue.current && queue.current.completed)
				{
					queue.remove();
					if (queue.current) Router().push(queue.current);
				}
			}
		}
	}

	/**
	 * 获取消息路由实例
	 * @export
	 * @returns {FMessageRouter} 
	 */
	export function Router(): FMessageRouter
	{
		if (!FMessageRouter._router) 
		{
			FMessageRouter._router = new FMessageRouter();
		}
		return FMessageRouter._router;
	}

	//-------

	export function createContext(key:string, parentContext:FWSData.Node<IContext> = null, ...mods:IFMessageConnection[]):FWSData.Node<IContext>
	{
		var ret:FWSData.Node<IContext> = new FWSData.Node<IContext>(key);
		ret.data = new FContext(key);
		
		for(var i:number = 0; i < mods.length; i++)
		{
			ret.data.setModules(mods[i]);
		}

		if(parentContext)
		{
			parentContext.add(ret);
		}
		
		return ret;
	}
}


export = FWSMvc;