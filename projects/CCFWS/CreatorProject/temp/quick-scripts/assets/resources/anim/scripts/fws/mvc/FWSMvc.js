(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/anim/scripts/fws/mvc/FWSMvc.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7de0axu3EdDGZ9RuPPl6lNK', 'FWSMvc', __filename);
// resources/scripts/fws/mvc/FWSMvc.ts

/*
 * 公共代码的MVC框架, 接替原JS版的FWS_MVC
 * @Author: 刘强
 * @Date: 2017-03-01 14:19:48
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:50:52
 */
var FWSData = require("../data/FWSData");
var X = require("../utils/X");
var FWSEnv = require("../FWSEnv");
var FWSMvc;
(function (FWSMvc) {
    FWSMvc.MVC_CONTEXT_TRY_CATCH = true;
    /**
     * 上下文状态节点
     * @export
     * @class FContext
     * @implements {IContext}
     */
    var FContext = /** @class */ (function () {
        /**
         * 构造
         * @memberOf FContext
         */
        function FContext(id) {
            var mods = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                mods[_i - 1] = arguments[_i];
            }
            this._id = id;
            this._mods = new Array();
        }
        FContext.prototype.initMessageConnections = function (mods) {
            this._mods.splice(0, this._mods.length);
            for (var i = 0; i < mods.length; i++) {
                this._mods.push(mods[i]);
            }
        };
        /**
         * 进入当前状态节点时
         * @memberOf FContext
         */
        FContext.prototype.onEnterContext = function () {
            for (var i = 0; i < this._mods.length; i++) {
                var mod = this._mods[i];
                if (mod.messageConnectionActived) {
                    X.warn("(onEnterContext) IFMessageConnection::messageConnectionActived !");
                    continue;
                }
                if (FWSMvc.MVC_CONTEXT_TRY_CATCH) {
                    try {
                        mod.onEnterContextMember();
                    }
                    catch (err) {
                        X.error(err);
                    }
                }
                else {
                    mod.onEnterContextMember();
                }
            }
        };
        /**
         * 离开当前状态节点时
         * @memberOf FContext
         */
        FContext.prototype.onLeaveContext = function () {
            for (var i = 0; i < this._mods.length; i++) {
                var mod = this._mods[i];
                if (FWSMvc.MVC_CONTEXT_TRY_CATCH) {
                    try {
                        mod.onLeaveContextMember();
                    }
                    catch (err) {
                        X.error(err);
                    }
                }
                else {
                    mod.onLeaveContextMember();
                }
            }
        };
        /**
         * 设置模块内容
         * @param {...Array<IFMessageConnection>} mods
         * @memberOf FContext
         */
        FContext.prototype.setModules = function () {
            var mods = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                mods[_i] = arguments[_i];
            }
            for (var i = 0; i < mods.length; i++) {
                this._mods.push(mods[i]);
            }
        };
        Object.defineProperty(FContext.prototype, "id", {
            /**
             * 获取上下文标识
             * @readonly
             * @type {string}
             * @memberOf FContext
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        return FContext;
    }());
    FWSMvc.FContext = FContext;
    /**
     * 上下文管理器实例
     * @class FContextManager
     */
    var FContextManager = /** @class */ (function () {
        /**
         * 构造
         */
        function FContextManager() {
            if (FContextManager._contextManager)
                throw "FContextManager被设计为单例, 不能创建多个实例";
            this._history = new FWSData.Stack();
        }
        /**
         * 初始化
         * @param {FWSData.Node<IContext>} root
         * @memberOf FContextManager
         */
        FContextManager.prototype.init = function (root) {
            this._root = root;
        };
        /**
         * 切换到指定的上下文节点
         * @param {FWSData.Node<IContext>} node
         * @memberOf FContextManager
         */
        FContextManager.prototype.goto = function (node, sh) {
            if (sh === void 0) { sh = true; }
            if (node && node.rootNode === this._root &&
                node !== this._current) {
                var theParentNode = null;
                //关闭之前的无关节点
                if (this._current) {
                    theParentNode = this._current.getParentByOtherNode(node);
                    var closeList = this._current.getParentNodes();
                    var closeListCount = closeList.length;
                    for (var i = closeListCount - 1; i >= 0; i--) {
                        var closeContext = closeList[i];
                        if (closeContext === theParentNode)
                            break;
                        if (FWSEnv.DEBUG_CONTEXT_TRACE)
                            X.log("(Context) onLeaveContext", closeContext.path);
                        if (FWSMvc.MVC_CONTEXT_TRY_CATCH) {
                            try {
                                closeContext.data.onLeaveContext();
                            }
                            catch (err) {
                                X.error(err);
                            }
                        }
                        else {
                            closeContext.data.onLeaveContext();
                        }
                    }
                }
                //打开需要的新节点
                var found = false;
                var openList = node.getParentNodes();
                var theParentNodeIsNull = true;
                if (theParentNode)
                    theParentNodeIsNull = false;
                for (var i = 0; i < openList.length; i++) {
                    var openContext = openList[i];
                    if (theParentNodeIsNull) {
                        if (FWSEnv.DEBUG_CONTEXT_TRACE)
                            X.log("(Context) onEnterContext", openContext.path);
                        if (FWSMvc.MVC_CONTEXT_TRY_CATCH) {
                            try {
                                openContext.data.onEnterContext();
                            }
                            catch (err) {
                                X.error(err);
                            }
                        }
                        else {
                            openContext.data.onEnterContext();
                        }
                        continue;
                    }
                    if (found) {
                        if (openContext != theParentNode || theParentNodeIsNull) {
                            if (FWSEnv.DEBUG_CONTEXT_TRACE)
                                X.log("(Context) onEnterContext", openContext.path);
                            if (FWSMvc.MVC_CONTEXT_TRY_CATCH) {
                                try {
                                    openContext.data.onEnterContext();
                                }
                                catch (err) {
                                    X.error(err);
                                }
                            }
                            else {
                                openContext.data.onEnterContext();
                            }
                        }
                    }
                    else {
                        if (openContext === theParentNode) {
                            found = true;
                        }
                    }
                }
                //----
                this._current = node;
                if (sh) {
                    this._history.add(node);
                    X.log("blue", "Context goto", node.path);
                }
                else {
                    X.log("blue", "Context goto(no history)", node.path);
                }
                if (this.onContextChanged) {
                    this.onContextChanged(node.id);
                }
            }
        };
        /**
         * 切换到指定ID的上下文节点
         *
         * @param {string} id
         *
         * @memberOf FContextManager
         */
        FContextManager.prototype.gotoID = function (id) {
            if (this._root) {
                var node = this._root.find(id);
                this.goto(node);
            }
        };
        /** 检查指定的节点是否属激活状态 */
        FContextManager.prototype.checkActived = function (node) {
            if (node && this._current) {
                var n = this._current;
                while (n) {
                    if (n === node)
                        return true;
                    n = n.parentNode;
                }
            }
            return false;
        };
        /** 检查指定ID的节点是否属激活状态 */
        FContextManager.prototype.checkActivedById = function (id) {
            if (this._root) {
                var node = this._root.find(id);
                return this.checkActived(node);
            }
            return false;
        };
        /**
         * 回退
         * @memberOf FContextManager
         */
        FContextManager.prototype.back = function () {
            if (this._history.length > 1) {
                var backNode = this._history.remove();
                this.goto(this._history.current, false);
            }
        };
        FContextManager.prototype.clearHistory = function () {
            this._history.clear();
        };
        Object.defineProperty(FContextManager.prototype, "current", {
            /**
             * 获取当前节点
             *
             * @readonly
             * @type {FWSData.Node<IContext>}
             * @memberOf FContextManager
             */
            get: function () {
                return this._current;
            },
            enumerable: true,
            configurable: true
        });
        return FContextManager;
    }());
    /**
     * 获取上下文管理器实例
     * @export
     * @returns {FContextManager}
     */
    function ContextManager() {
        if (!FContextManager._contextManager)
            FContextManager._contextManager = new FContextManager();
        return FContextManager._contextManager;
    }
    FWSMvc.ContextManager = ContextManager;
    //-------------------------------------- 消息系统
    /**
     * MVC消息通知对象
     * @export
     * @class FMessage
     */
    var FMessage = /** @class */ (function () {
        /**
         * 构造
         * @param {string} key 消息标识
         * @param {string} [category=""] 消息队列类型
         * @memberOf FMessage
         */
        function FMessage(key, data, queue) {
            if (queue === void 0) { queue = ""; }
            this._key = key;
            this._queue = queue;
            this._data = data;
        }
        Object.defineProperty(FMessage.prototype, "data", {
            /**
             * 获取或设置附加数据
             */
            get: function () {
                return this._data;
            },
            set: function (v) {
                this._data = v;
            },
            enumerable: true,
            configurable: true
        });
        /** 重置 */
        FMessage.prototype.reset = function () {
            this._sended = false;
            this._completed = false;
        };
        /**
         * 将消息发至消息路由
         * @memberOf FMessage
         */
        FMessage.prototype.send = function () {
            if (this._sended)
                return;
            Router().send(this);
            this._sended = true;
        };
        /**
         * 将消息标为完成
         * @memberOf FMessage
         */
        FMessage.prototype.complete = function () {
            if (this._completed)
                return;
            this._completed = true;
            Router().complete(this);
        };
        Object.defineProperty(FMessage.prototype, "key", {
            /**
             * 获取消息类型
             * @type {string}
             * @memberOf FMessage
             */
            get: function () {
                return this._key;
            },
            /**
             * 设置消息类型
             * @memberOf FMessage
             */
            set: function (value) {
                this._key = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FMessage.prototype, "queue", {
            /**
             * 获取消息队列类型
             * @type {string}
             * @memberOf FMessage
             */
            get: function () {
                return this._queue;
            },
            /**
             * 设置消息队列类型
             * @memberOf FMessage
             */
            set: function (value) {
                this._queue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FMessage.prototype, "completed", {
            /**
             * 获取消息是否已经被标为完成
             * @readonly
             * @type {boolean}
             * @memberOf FMessage
             */
            get: function () {
                return this._completed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FMessage.prototype, "sended", {
            /**
             * 获取消息是否已经发至路由
             * @readonly
             * @type {boolean}
             * @memberOf FMessage
             */
            get: function () {
                return this._sended;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 返回文本信息
         * @returns {string}
         * @memberof FMessage
         */
        FMessage.prototype.toString = function () {
            var ret = this._key + ", ";
            for (var key in this._data) {
                var value = this._data[key];
                if (value === null)
                    value = "null";
                else if (value === undefined)
                    value = "undefined";
                else {
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
                if (ret.length > 0) {
                    ret += ",";
                }
                ret += key + "=" + value;
            }
            return ret;
        };
        return FMessage;
    }());
    FWSMvc.FMessage = FMessage;
    /**
     * MVC消息连接的抽象类
     * @export
     * @class FMessageConnectionAbstract
     * @implements {IFMessageConnection}
     */
    var FMessageConnectionAbstract = /** @class */ (function () {
        /**
         * 构造
         * @memberOf FMessageConnectionAbstract
         */
        function FMessageConnectionAbstract() {
            this._messageConnectionActived = false;
        }
        /**
         * 连接至消息路由
         * @memberOf FMessageConnectionAbstract
         */
        FMessageConnectionAbstract.prototype.connect = function () {
            Router().connect(this);
            this.onConnect();
        };
        /**
         * 从消息路由断开
         * @memberOf FMessageConnectionAbstract
         */
        FMessageConnectionAbstract.prototype.disconnect = function () {
            Router().disconnect(this);
            this.onDisconnect();
        };
        /**
         * 接入路由之后
         * @memberOf IFMessageConnection
         */
        FMessageConnectionAbstract.prototype.onConnect = function () {
        };
        /**
         * 断开路由之后
         * @memberOf IFMessageConnection
         */
        FMessageConnectionAbstract.prototype.onDisconnect = function () {
        };
        /**
         * 处理消息通知
         * @param {FMessage} msg 传入的消息通知
         * @returns {boolean} 返回是否忽略该消息的处理
         *
         * @memberOf FMessageConnectionAbstract
         */
        FMessageConnectionAbstract.prototype.onFMessage = function (msg) {
            var handlerName = "onFMessage_" + msg.key;
            var handler = this[handlerName];
            if (handler) {
                return !handler.call(this, msg);
            }
            return false;
        };
        FMessageConnectionAbstract.prototype.onEnterContextMember = function () {
            this._messageConnectionActived = true;
            this.connect();
        };
        FMessageConnectionAbstract.prototype.onLeaveContextMember = function () {
            this._messageConnectionActived = false;
            this.disconnect();
        };
        Object.defineProperty(FMessageConnectionAbstract.prototype, "messageConnectionActived", {
            get: function () {
                return this._messageConnectionActived;
            },
            enumerable: true,
            configurable: true
        });
        return FMessageConnectionAbstract;
    }());
    FWSMvc.FMessageConnectionAbstract = FMessageConnectionAbstract;
    /**
     * MVC消息连接的代理类
     * @export
     * @class FMessageConnectionDelegate
     * @implements {IFMessageConnection}
     */
    var FMessageConnectionDelegate = /** @class */ (function () {
        /**
         * 构造
         * @param {*} owner
         * @memberOf FMessageConnectionDelegate
         */
        function FMessageConnectionDelegate(owner) {
            this._owner = owner;
        }
        /**
         * 连接至消息路由
         * @memberOf FMessageConnectionDelegate
         */
        FMessageConnectionDelegate.prototype.connect = function () {
            Router().connect(this);
            this.onConnect();
        };
        /**
         * 从消息路由断开
         * @memberOf FMessageConnectionDelegate
         */
        FMessageConnectionDelegate.prototype.disconnect = function () {
            Router().disconnect(this);
            this.onDisconnect();
        };
        /**
         * 接入路由之后
         * @memberOf FMessageConnectionDelegate
         */
        FMessageConnectionDelegate.prototype.onConnect = function () {
        };
        /**
         * 断开路由之后
         * @memberOf FMessageConnectionDelegate
         */
        FMessageConnectionDelegate.prototype.onDisconnect = function () {
        };
        /**
         * 处理消息通知
         * @param {FMessage} msg 传入的消息通知
         * @returns {boolean} 返回是否忽略该消息的处理
         * @memberOf FMessageConnectionDelegate
         */
        FMessageConnectionDelegate.prototype.onFMessage = function (msg) {
            var handlerName = "onFMessage_" + msg.key;
            var handler = this._owner[handlerName];
            if (handler) {
                return !handler.call(this._owner, msg);
            }
            return false;
        };
        FMessageConnectionDelegate.prototype.onEnterContextMember = function () {
            this._messageConnectionActived = true;
            this.connect();
        };
        FMessageConnectionDelegate.prototype.onLeaveContextMember = function () {
            this._messageConnectionActived = false;
            this.disconnect();
        };
        Object.defineProperty(FMessageConnectionDelegate.prototype, "messageConnectionActived", {
            get: function () {
                return this._messageConnectionActived;
            },
            enumerable: true,
            configurable: true
        });
        return FMessageConnectionDelegate;
    }());
    FWSMvc.FMessageConnectionDelegate = FMessageConnectionDelegate;
    /**
     * MVC消息路由
     * @class FMessageRouter
     */
    var FMessageRouter = /** @class */ (function () {
        /**
         * 构造
         * @memberOf FMessageRouter
         */
        function FMessageRouter() {
            if (FMessageRouter._router)
                throw "FMessageRouter被设计为单例, 不能创建多个实例";
            this._queues = new FWSData.Dict();
            this._connections = new FWSData.List();
        }
        /**
         * 创建队列
         * @param {string} category
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.createQueue = function (category) {
            if (this._queues.containKey(category))
                return;
            this._queues.setItem(category, new FWSData.Queue());
        };
        /**
         * 删除队列
         * @param {string} category
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.removeQueue = function (category) {
            if (!this._queues.containKey(category))
                return;
            this._queues.deleteKey(category);
        };
        /**
         * 删除所有队列
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.removeAllQueues = function () {
            this._queues.clear();
        };
        /**
         * 获取队列
         * @param {string} category
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.getQueue = function (category) {
            if (this._queues.containKey(category)) {
                return this._queues.getItem(category);
            }
            return null;
        };
        /**
         * 清空特定队列的消息
         * @param {string} category
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.clearQueueMessages = function (category) {
            X.log("FMessage", "clearQueueMessages", category);
            if (this._queues.containKey(category)) {
                this._queues.getItem(category).clear();
            }
        };
        /**
         * 清空所有队列的消息
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.clearAllQueueMessages = function () {
            var keys = this._queues.keys;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._queues.getItem(key).clear();
            }
        };
        /**
         * 连接至消息路由
         * @param {IFMessageConnection} connection
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.connect = function (connection) {
            if (this._connections.indexOf(connection) >= 0) {
                //警告:重复的连接
            }
            else {
                this._connections.add(connection);
            }
        };
        /**
         * 从消息路由断开
         * @param {IFMessageConnection} connection
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.disconnect = function (connection) {
            if (this._connections.indexOf(connection) >= 0) {
                this._connections.remove(connection);
            }
        };
        /**
         * 从消息路由断开所有连接
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.disconnectAll = function () {
            this._connections.clear();
        };
        /**
         * 发送消息到路由的队列
         * @param {FMessage} msg
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.send = function (msg) {
            if (msg.sended)
                return;
            if (FWSEnv.DEBUG_MVC_TRACE)
                X.log("(FMessage)发送", msg.queue, msg);
            if (this._queues.containKey(msg.queue)) {
                var queue = this._queues.getItem(msg.queue);
                queue.add(msg);
                if (queue.length === 1) {
                    this.push(msg);
                }
                else {
                    FWSMvc.Router().update();
                }
            }
            else {
                this.push(msg);
            }
        };
        /**
         * 从路由的队列中, 将消息推出给每个正在连接的模块
         * @private
         * @param {FMessage} msg
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.push = function (msg) {
            if (FWSEnv.DEBUG_MVC_TRACE)
                X.log("(FMessage)推送", msg.queue, msg);
            var mods = this._connections.toArray();
            var counter = 0;
            for (var i = 0; i < mods.length; i++) {
                var mod = mods[i];
                try {
                    var isHandled = mod.onFMessage(msg);
                    if (isHandled) {
                        counter++;
                        if (msg.queue && msg.queue.length > 0) {
                            if (FWSEnv.DEBUG_MVC_TRACE)
                                X.log("(FMessage)处理", mod);
                        }
                    }
                }
                catch (err) { }
            }
            if (counter === 0) {
                if (FWSEnv.DEBUG_MVC_TRACE)
                    X.log("(FMessage)自动完成", msg.queue, msg);
                msg.complete();
            }
        };
        /**
         * 将消息通知标为已经处理完成
         * @param {FMessage} msg
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.complete = function (msg) {
            if (this._queues.keys.indexOf(msg.queue) >= 0) {
                if (FWSEnv.DEBUG_MVC_TRACE)
                    X.log("(FMessage)完成", msg.queue, msg);
            }
            FWSMvc.Router().update();
        };
        /**
         * 循环更新
         * @memberOf FMessageRouter
         */
        FMessageRouter.prototype.update = function () {
            var keys = this._queues.keys;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var queue = this._queues.getItem(key);
                if (queue.current && queue.current.completed) {
                    queue.remove();
                    if (queue.current)
                        Router().push(queue.current);
                }
            }
        };
        return FMessageRouter;
    }());
    /**
     * 获取消息路由实例
     * @export
     * @returns {FMessageRouter}
     */
    function Router() {
        if (!FMessageRouter._router) {
            FMessageRouter._router = new FMessageRouter();
        }
        return FMessageRouter._router;
    }
    FWSMvc.Router = Router;
    //-------
    function createContext(key, parentContext) {
        if (parentContext === void 0) { parentContext = null; }
        var mods = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            mods[_i - 2] = arguments[_i];
        }
        var ret = new FWSData.Node(key);
        ret.data = new FContext(key);
        for (var i = 0; i < mods.length; i++) {
            ret.data.setModules(mods[i]);
        }
        if (parentContext) {
            parentContext.add(ret);
        }
        return ret;
    }
    FWSMvc.createContext = createContext;
})(FWSMvc || (FWSMvc = {}));
module.exports = FWSMvc;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=FWSMvc.js.map
        