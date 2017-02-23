/*
 * 一个简单的MVC框架
 * @Author: thor.liu 
 * @Date: 2017-01-17 10:36:31 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2017-02-23 16:39:21
 */
module FWSMvc 
{
	//---------------------------------------------- utils

	/**
	 * 获取一个用简短的时间信息 (HH:MM:SS:????
	 * @export
	 * @returns {string} 
	 */
	export function getShortTime(): string
	{

		var date: Date = new Date();
		var hours: string = "00" + date.getHours().toString();
		var minutes: string = "00" + date.getMinutes().toString();
		var seconds: string = "00" + date.getSeconds().toString();
		var millseconds: string = "000" + date.getMilliseconds().toString();

		var ret: string = "";
		ret += hours.substr(hours.length - 2, 2);
		ret += ":";
		ret += minutes.substr(minutes.length - 2, 2);
		ret += ":";
		ret += seconds.substr(seconds.length - 2, 2);
		ret += ":";
		ret += millseconds.substr(millseconds.length - 3, 3);

		return ret;
	}

	//---------------------------------------------- message

	/**
	 * 指令/消息/通知/事件
	 * @export
	 * @class FMessage
	 */
	export class FMessage 
	{
		private _index: number;
		private _completed: boolean;
		private _sended: boolean;

		static nextIndex: number = 0;

		/**
		 * Creates an instance of FMessage.
		 * @param {string} cmdName 
		 * @param {string} cmdCategory 
		 * @memberOf FMessage
		 */
		constructor(cmdName: string, cmdCategory: string)
		{
			this.name = cmdName;
			this.category = cmdCategory;
			this.args = new Object();

			FMessage.nextIndex++;

			this._index = FMessage.nextIndex;
			this._completed = false;
			this._sended = false;
		}

		/**
		 * 获取字符串信息
		 * @returns {string} 
		 * @memberOf FMessage
		 */
		public toString(): string
		{
			var ret: string = "<FMessage " + this._index.toString() + ">(";
			if (this.category && this.category.length > 0)
			{
				ret += this.category + ":";
			}
			ret += this.name + "){";

			if (this.args)
			{
				var isFirst: boolean = true;
				for (var k in this.args)
				{
					if (!isFirst)
					{
						ret += ",";
					}
					isFirst = false;
					var v = this.args[k];
					ret += k + ":";
					if (v === 0 || v === false || v)
					{
						ret += v.toString();
					}
				}
			}
			ret += "}";

			return ret;
		}


		/**
		 * 发送当前消息至路由
		 * @returns {void} 
		 * @memberOf FMessage
		 */
		public send(): void
		{
			if (this._sended) return;
			this._sended = true;

			getFMessageRouter().send(this);
		}

		/**
		 * 将当前消息标为完成
		 * @returns {void} 
		 * @memberOf FMessage
		 */
		public complete(): void
		{
			if (this._completed) return;
			this._completed = true;

			getFMessageRouter().complete(this);
		}


		/**
		 * 判定当前消息是否已经发到路由
		 * @readonly
		 * @type {boolean}
		 * @memberOf FMessage
		 */
		public get sended(): boolean
		{
			return this._sended;
		}

		/**
		 * 判定当前消息是否已经标为完成
		 * @readonly
		 * @type {boolean}
		 * @memberOf FMessage
		 */
		public get completed(): boolean
		{
			return this._completed;
		}

		/**
		 * 获取当前消息的索引号
		 * @readonly
		 * @type {number}
		 * @memberOf FMessage
		 */
		public get index(): number
		{
			return this._index;
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
	 * 消息跟踪信息
	 */
	export class FMessageTrack
	{
		constructor(msg: FMessage, action: string, info: string)
		{
			this.msg = msg;
			this.action = action;
			this.time = getShortTime();
			this.info = info;
		}

		/**
		 * 消息实例
		 * @type {FMessage}
		 * @memberOf FMessageTrack
		 */
		public msg: FMessage;
		/**
		 * 消息发送时间
		 * @type {string}
		 * @memberOf FMessageTrack
		 */
		public action: string;
		/**
		 * 消息推送时间
		 * @type {string}
		 * @memberOf FMessageTrack
		 */
		public time: string;
		/**
		 * 信息
		 * @type {string}
		 * @memberOf FMessageTrack
		 */
		public info: string;
	}

	/**
	 * 消息连接接口
	 * @export
	 * @interface IFMessageConnection
	 */
	export interface IFMessageConnection
	{
		/**
		 * 处理消息路由推送来的消息
		 * @param {FMessage} msg 
		 * @returns {boolean} 是否接管此消息
		 * 
		 * @memberOf IFMessageConnection
		 */
		onFMessage(msg: FMessage): boolean;

		connect(): void;
		disconnect(): void;
	}

	/**
	 * 消息连接
	 * @export
	 * @class FMessageConnection
	 * @implements {IFMessageConnection}
	 */
	export class FMessageConnection implements IFMessageConnection
	{
		/**
		 * 构造
		 * @memberOf FMessageConnection
		 */
		constructor()
		{
		}

		/**
		 * 连入路由
		 * @memberOf FMessageConnection
		 */
		public connect(): void
		{
			getFMessageRouter().connect(this);
		}

		/**
		 * 从路由断开
		 * @memberOf FMessageConnection
		 */
		public disconnect(): void
		{
			getFMessageRouter().disconnect(this);
		}

		/**
		 * 处理收到的消息
		 * @param {FMessage} msg 
		 * @returns {boolean} 
		 * @memberOf FMessageConnection
		 */
		public onFMessage(msg: FMessage): boolean
		{
			let ret: boolean = false;

			let handlerName = msg.name;
			let handler: Function = this["onFMessage_" + handlerName];
			if (handler)
			{
				ret = handler.call(this, msg);
			}
			return ret;
		}
	}

	/**
	 * 消息连接代理
	 * @export
	 * @class FMessageConnectionDelegate
	 * @implements {IFMessageConnection}
	 */
	export class FMessageConnectionDelegate implements IFMessageConnection
	{
		private _target: any;

		/**
		 * 构造
		 * @memberOf FMessageConnectionDelegate
		 */
		constructor()
		{
		}

		/**
		 * 连入路由
		 * @memberOf FMessageConnection
		 */
		public connect(): void
		{
			getFMessageRouter().connect(this);
		}

		/**
		 * 从路由断开
		 * @memberOf FMessageConnection
		 */
		public disconnect(): void
		{
			getFMessageRouter().disconnect(this);
		}

		/**
		 * 处理收到的消息
		 * @param {FMessage} msg 
		 * @returns {boolean} 
		 * @memberOf FMessageConnection
		 */
		public onFMessage(msg: FMessage): boolean
		{
			let ret: boolean = false;
			let handlerName = msg.name;
			if (this._target && this._target["onFMessage_" + handlerName])
			{
				ret = this._target[handlerName].call(this._target, msg);
			}
			return ret;
		}

		/**
		 * 获取代理目标
		 * @type {*}
		 * @memberOf FMessageConnectionDelegate
		 */
		public get target(): any
		{
			return this._target;
		}
		/**
		 * 设置代理目标
		 * @memberOf FMessageConnectionDelegate
		 */
		public set target(v: any)
		{
			this._target = v;
		}

	}


	/**
	 * 消息路由
	 * 
	 * @class FMessageRouter
	 */
	class FMessageRouter
	{
		/**
		 * 唯一实例
		 * @static
		 * @type {FMessageRouter}
		 * @memberOf FMessageRouter
		 */
		static _instance: FMessageRouter;

		/**
		 * 所有已定义的消息队列
		 * @private
		 * @type {Dict<Queue<FMessage>>}
		 * @memberOf FMessageRouter
		 */
		private _queues: FWSData.Dict<FWSData.Queue<FMessage>>;

		/**
		 * 所有已经连至路由的模块连接
		 * @private
		 * @type {Array<IFMessageConnection>}
		 * @memberOf FMessageRouter
		 */
		private _connections: Array<IFMessageConnection>;

		/**
		 * 跟踪数据
		 * @private
		 * @type {Array<FMessageTrack>}
		 * @memberOf FMessageRouter
		 */
		private _trackList: Array<FMessageTrack>;

		/**
		 * 构造
		 * @memberOf FMessageRouter
		 */
		constructor()
		{
			if (FMessageRouter._instance)
			{
				throw "FMessageRouter设计为单例, 不能创建多个实例";
			}

			this.trackEnabled = true;
			this._trackList = new Array<FMessageTrack>();
			this._queues = new FWSData.Dict<FWSData.Queue<FMessage>>();
			this._connections = new Array<IFMessageConnection>();

			setInterval(this.tick, 1);
		}

		/**
		 * 循环检查队列消息
		 * @private
		 * @memberOf FMessageRouter
		 */
		private tick(): void
		{
			var self:FMessageRouter = getFMessageRouter();
			var keys: Array<string> = self.getQueueKeys();
			for (var i: number = 0; i < keys.length; i++)
			{
				var key: string = keys[i];
				var q: FWSData.Queue<FMessage> = self.getQueue(key);

				if(q.length == 0 || !q.current.completed) continue;

				while(q.current && q.current.completed)
				{
					q.remove();
				}

				if(q.current) self.push(q.current);
			}
		}

		/**
		 * 创建队列
		 * @param {string} category 
		 * @returns {void} 
		 * @memberOf FMessageRouter
		 */
		public createQueue(category: string): void
		{
			if (this._queues.containKey(category)) return;
			var q:FWSData.Queue<FMessage> = new FWSData.Queue<FMessage>();
			this._queues.setItem(category, q);
		}

		/**
		 * 删除队列
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public removeQueue(category: string): void
		{
			if (this._queues.containKey(category))
			{
				this._queues.deleteKey(category);
			}
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
		 * 获取指定的队列
		 * @param {string} category 
		 * @returns {Queue<FMessage>} 
		 * @memberOf FMessageRouter
		 */
		public getQueue(category: string): FWSData.Queue<FMessage>
		{
			if (this._queues.containKey(category))
			{
				return this._queues.getItem(category);
			}
			else return null;
		}

		/**
		 * 获取所有队列的名称
		 * @returns {Array<string>} 
		 * @memberOf FMessageRouter
		 */
		public getQueueKeys():Array<string>
		{
			return this._queues.keys;
		}

		/**
		 * 清除队列中的所有消息
		 * @param {string} category 
		 * @memberOf FMessageRouter
		 */
		public clearQueueMessages(category: string): void
		{
			if (this._queues.containKey(category))
			{
				let q: FWSData.Queue<FMessage> = this._queues.getItem(category);
				q.clear();
			}
		}

		/**
		 * 清除所有队列中的所有消息
		 * @memberOf FMessageRouter
		 */
		public clearAllQueuesMessages(): void
		{
			var keys: Array<string> = this._queues.keys;
			for (var i: number = 0; i < keys.length; i++)
			{
				let key: string = keys[i];
				let q: FWSData.Queue<FMessage> = this._queues.getItem(key);
				q.clear();
			}
		}

		/**
		 * 建立消息连接
		 * @param {IFMessageConnection} connection 
		 * @memberOf FMessageRouter
		 */
		public connect(connection: IFMessageConnection): void
		{
			var i: number = this._connections.indexOf(connection);
			if (i >= 0)
			{
				return;
			}
			this._connections.push(connection);
		}

		/**
		 * 断开消息连接
		 * @param {IFMessageConnection} connection 
		 * @memberOf FMessageRouter
		 */
		public disconnect(connection: IFMessageConnection): void
		{
			var i: number = this._connections.indexOf(connection);
			if (i >= 0)
			{
				this._connections.splice(i, 1);
			}
		}

		/**
		 * 断开所有消息连接
		 * @memberOf FMessageRouter
		 */
		public disconnectAll(): void
		{
			this._connections.splice(0, this._connections.length);
		}

		/**
		 * 发送消息至路由
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		public send(msg: FMessage): void
		{
			// if (this.trackEnabled) this._trackList.push(new FMessageTrack(msg, "SEND", ""));

			var queue: FWSData.Queue<FMessage> = this._queues.getItem(msg.category);
			if (queue)
			{
				queue.add(msg);
				if (queue.length == 1)
				{
					this.push(msg);
				}
			}
			else
			{
				this.push(msg);
			}
		}

		/**
		 * 将消息推送给所有已连接的模块
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		private push(msg: FMessage): void
		{
			if (this.trackEnabled) this._trackList.push(new FMessageTrack(msg, "PUSH", msg.toString()));
			var targetConnections: Array<IFMessageConnection> = this._connections.slice(0);

			var counter: number = 0;
			for (var i: number = 0; i < targetConnections.length; i++)
			{
				var targetConnection: IFMessageConnection = targetConnections[i];

				if (targetConnection.onFMessage(msg))
				{
					counter++;
				}
			}

			//抛弃没人处理的消息
			if (counter == 0) 
			{
				msg.complete();
			}
		}

		/**
		 * 将消息标为完成
		 * @param {FMessage} msg 
		 * @memberOf FMessageRouter
		 */
		public complete(msg: FMessage): void
		{
			if (this.trackEnabled) this._trackList.push(new FMessageTrack(msg, "COMPLETE", ""));
		}

		/**
		 * 是否开启跟踪功能
		 * @type {boolean}
		 * @memberOf FMessageRouter
		 */
		public trackEnabled: boolean;

		/**
		 * 获取跟踪结果
		 * @readonly
		 * @type {Array<FMessageTrack>}
		 * @memberOf FMessageRouter
		 */
		public get trackList(): Array<FMessageTrack>
		{
			return this._trackList;
		}
	}

	/**
	 * 获取消息路由实例
	 * @export
	 * @returns {FMessageRouter} 
	 */
	export function getFMessageRouter(): FMessageRouter
	{
		if (!FMessageRouter._instance)
		{
			FMessageRouter._instance = new FMessageRouter();
		}
		return FMessageRouter._instance;
	}


	//---------------------------------------------- context

	/**
	 * 状态节点接口
	 */
	export interface IContext
	{
		/**
		 * 进入当前状态节点时
		 * @memberOf IContext
		 */
		onContextEnter(): void;

		/**
		 * 离开当前状态节点时
		 * @memberOf IContext
		 */
		onContextLeave(): void;
	}

	/**
	 * 状态节点
	 * @export
	 * @class FContext
	 * @implements {IContext}
	 */
	export class FContext implements IContext
	{
		public connections: Array<IFMessageConnection>;

		constructor(...connections: IFMessageConnection[])
		{
			this.connections = connections.slice(0);
		}

		/**
		 * 进入当前状态节点时
		 * @memberOf IContext
		 */
		public onContextEnter(): void
		{
			// console.log("%conContextEnter","color:blue", this.path);
			for (var i: number = 0; i < this.connections.length; i++)
			{
				this.connections[i].connect();
			}
		}

		/**
		 * 进入当前状态节点时
		 * @memberOf IContext
		 */
		public onContextLeave(): void
		{
			// console.log("%conContextLeave","color:darkred", this.path);
			for (var i: number = 0; i < this.connections.length; i++)
			{
				this.connections[i].disconnect();
			}
		}

		/**
		 * 获取当前节点的路径
		 * @readonly
		 * @type {string}
		 * @memberOf FContext
		 */
		public get path(): string
		{
			var mgr: FContextManager = getFContextManager();
			var node: FWSData.Node<IContext> = mgr.findContext(this);
			if (node)
			{
				return node.path;
			}
			return "";
		}
	}

	/**
	 * 状态节点管理器
	 * @class FContextManager
	 */
	class FContextManager
	{
		static instance;

		private _rootNode: FWSData.Node<IContext>;
		private _current: FWSData.Node<IContext>;
		private _history: Array<FWSData.Node<IContext>>;

		/**
		 * 构造
		 * @memberOf FContextManager
		 */
		constructor()
		{
			this._history = new Array<FWSData.Node<IContext>>();
		}

		/**
		 * 添加一个新的context节点
		 * @param {string} id 新节点的id
		 * @param {IContext} context 新节点的实例 
		 * @param {IContext} [parentContext=null] 将新节点添加到哪个父节点下, 如果这空, 则设定为根节点
		 * @returns {IContext} 
		 * 
		 * @memberOf FContextManager
		 */
		public addContext(id: string, context: IContext, parentContext: IContext = null): IContext
		{
			if (parentContext)
			{
				if (this._rootNode)
				{
					var targetNode: FWSData.Node<IContext> = this._rootNode.findData(parentContext);
					if (targetNode)
					{
						var newNode: FWSData.Node<IContext> = new FWSData.Node<IContext>(id);
						newNode.data = context;

						targetNode.add(newNode);
					}
				}
			}
			else
			{
				this._rootNode = new FWSData.Node<IContext>(id);
				this._rootNode.data = context;
			}
			return context;
		}

		/**
		 * 移除一个context节点
		 * @param {IContext} context 
		 * @memberOf FContextManager
		 */
		public removeContext(context: IContext): void
		{
			if (this._rootNode)
			{
				var node: FWSData.Node<IContext> = this._rootNode.findData(context);
				node.removeFromParent();
			}
		}

		/**
		 * 获取指定ID的节点
		 * @param {string} id 
		 * @returns {FWSData.Node<IContext>} 
		 * @memberOf FContextManager
		 */
		public getContext(id: string): FWSData.Node<IContext>
		{
			if (this._rootNode)
			{
				return this._rootNode.find(id);
			}
			return null;
		}

		/**
		 * 获取指定数据的节点
		 * @param {IContext} context 
		 * @returns {FWSData.Node<IContext>} 
		 * @memberOf FContextManager
		 */
		public findContext(context: IContext): FWSData.Node<IContext>
		{
			if (this._rootNode)
			{
				return this._rootNode.findData(context);
			}
			return null;
		}

		/**
		 * 切换到指定的节点
		 * @param {IContext} context 
		 * @returns {void} 
		 * @memberOf FContextManager
		 */
		public goto(context: IContext): void
		{
			if (!this._rootNode) return;
			if (this._current && this._current.data === context) return;

			var theTargetNode: FWSData.Node<IContext> = this.findContext(context);
			var theParentNode: FWSData.Node<IContext> = null;

			//关闭不用的节点
			if (this._current)
			{
				theParentNode = this._current.getParentByOtherNode(theTargetNode);

				var closeList: Array<FWSData.Node<IContext>> = this._current.getParentNodes();
				var closeListCount: number = closeList.length;

				for (var i: number = closeListCount - 1; i >= 0; i--)
				{
					var closeNode: FWSData.Node<IContext> = closeList[i];
					if (closeNode === theParentNode) break;

					if (closeNode.data)
					{
						closeNode.data.onContextLeave();
					}
				}
			}
			//打开需要的节点
			var found: boolean = false;
			var openList: Array<FWSData.Node<IContext>> = theTargetNode.getParentNodes();
			var theParentNodeIsNull: boolean = true;
			if (theParentNode) theParentNodeIsNull = false;
			for (var i: number = 0; i < openList.length; i++)
			{
				var openNode: FWSData.Node<IContext> = openList[i];
				if (theParentNodeIsNull)
				{
					if (openNode.data) openNode.data.onContextEnter();
				}

				if (found)
				{
					if (openNode !== theParentNode || theParentNodeIsNull)
					{
						if (openNode.data) openNode.data.onContextEnter();
					}
				}
				else
				{
					if (openNode === theParentNode)
					{
						found = true;
					}
				}
			}

			//记录状态
			this._current = theTargetNode;
			this._history.push(theTargetNode);
		}

		/**
		 * 切换到指定ID的节点
		 * @param {string} id 
		 * @memberOf FContextManager
		 */
		public gotoID(id: string): void
		{
			var node: FWSData.Node<IContext> = this.getContext(id);
			if (node)
			{
				this.goto(node.data);
			}
		}

		/**
		 * 回退到之前的一个节点
		 * @returns {void} 
		 * @memberOf FContextManager
		 */
		public back(): void
		{
			if (!this.canBack) return;
			var c: FWSData.Node<IContext> = this._history.pop();
			c = this._history[this._history.length - 1];
			this.goto(c.data);
		}

		/**
		 * 判定是否还可以回退
		 * @readonly
		 * @type {boolean}
		 * @memberOf FContextManager
		 */
		public get canBack(): boolean
		{
			return this._history.length > 1;
		}
	}

	/**
	 * 获取状态节点管理器实例
	 * @export
	 * @returns {FContextManager} 
	 */
	export function getFContextManager(): FContextManager
	{
		if (!FContextManager.instance) 
		{
			FContextManager.instance = new FContextManager();
		}
		return FContextManager.instance;
	}


}


