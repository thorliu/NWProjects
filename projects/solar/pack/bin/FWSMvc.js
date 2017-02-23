var FWSMvc;
(function (FWSMvc) {
    function getShortTime() {
        var date = new Date();
        var hours = "00" + date.getHours().toString();
        var minutes = "00" + date.getMinutes().toString();
        var seconds = "00" + date.getSeconds().toString();
        var millseconds = "000" + date.getMilliseconds().toString();
        var ret = "";
        ret += hours.substr(hours.length - 2, 2);
        ret += ":";
        ret += minutes.substr(minutes.length - 2, 2);
        ret += ":";
        ret += seconds.substr(seconds.length - 2, 2);
        ret += ":";
        ret += millseconds.substr(millseconds.length - 3, 3);
        return ret;
    }
    FWSMvc.getShortTime = getShortTime;
    var FMessage = (function () {
        function FMessage(cmdName, cmdCategory) {
            this.name = cmdName;
            this.category = cmdCategory;
            this.args = new Object();
            FMessage.nextIndex++;
            this._index = FMessage.nextIndex;
            this._completed = false;
            this._sended = false;
        }
        FMessage.prototype.toString = function () {
            var ret = "<FMessage " + this._index.toString() + ">(";
            if (this.category && this.category.length > 0) {
                ret += this.category + ":";
            }
            ret += this.name + "){";
            if (this.args) {
                var isFirst = true;
                for (var k in this.args) {
                    if (!isFirst) {
                        ret += ",";
                    }
                    isFirst = false;
                    var v = this.args[k];
                    ret += k + ":";
                    if (v === 0 || v === false || v) {
                        ret += v.toString();
                    }
                }
            }
            ret += "}";
            return ret;
        };
        FMessage.prototype.send = function () {
            if (this._sended)
                return;
            this._sended = true;
            getFMessageRouter().send(this);
        };
        FMessage.prototype.complete = function () {
            if (this._completed)
                return;
            this._completed = true;
            getFMessageRouter().complete(this);
        };
        Object.defineProperty(FMessage.prototype, "sended", {
            get: function () {
                return this._sended;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FMessage.prototype, "completed", {
            get: function () {
                return this._completed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FMessage.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        return FMessage;
    }());
    FMessage.nextIndex = 0;
    FWSMvc.FMessage = FMessage;
    var FMessageTrack = (function () {
        function FMessageTrack(msg, action, info) {
            this.msg = msg;
            this.action = action;
            this.time = getShortTime();
            this.info = info;
        }
        return FMessageTrack;
    }());
    FWSMvc.FMessageTrack = FMessageTrack;
    var FMessageConnection = (function () {
        function FMessageConnection() {
        }
        FMessageConnection.prototype.onFMessage = function (msg) {
            var ret = false;
            var handlerName = msg.name;
            var handler = this["onFMessage_" + handlerName];
            if (handler) {
                ret = handler.call(this, msg);
            }
            return ret;
        };
        return FMessageConnection;
    }());
    FWSMvc.FMessageConnection = FMessageConnection;
    var FMessageConnectionDelegate = (function () {
        function FMessageConnectionDelegate() {
        }
        FMessageConnectionDelegate.prototype.onFMessage = function (msg) {
            var ret = false;
            var handlerName = msg.name;
            if (this._target && this._target["onFMessage_" + handlerName]) {
                ret = this._target[handlerName].call(this._target, msg);
            }
            return ret;
        };
        Object.defineProperty(FMessageConnectionDelegate.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (v) {
                this._target = v;
            },
            enumerable: true,
            configurable: true
        });
        return FMessageConnectionDelegate;
    }());
    FWSMvc.FMessageConnectionDelegate = FMessageConnectionDelegate;
    var FMessageRouter = (function () {
        function FMessageRouter() {
            if (FMessageRouter._instance) {
                throw "FMessageRouter设计为单例, 不能创建多个实例";
            }
            this.trackEnabled = true;
            this._trackList = new Array();
            this._queues = new FWSData.Dict();
            this._connections = new Array();
        }
        FMessageRouter.prototype.createQueue = function (category) {
            if (this._queues.containKey(category))
                return;
        };
        FMessageRouter.prototype.removeQueue = function (category) {
            if (this._queues.containKey(category)) {
                this._queues.deleteKey(category);
            }
        };
        FMessageRouter.prototype.removeAllQueues = function () {
            this._queues.clear();
        };
        FMessageRouter.prototype.getQueue = function (category) {
            if (this._queues.containKey(category)) {
                return this._queues.getItem(category);
            }
            else
                return null;
        };
        FMessageRouter.prototype.clearQueueMessages = function (category) {
            if (this._queues.containKey(category)) {
                var q = this._queues.getItem(category);
                q.clear();
            }
        };
        FMessageRouter.prototype.clearAllQueuesMessages = function () {
            var keys = this._queues.keys;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var q = this._queues.getItem(key);
                q.clear();
            }
        };
        FMessageRouter.prototype.connect = function (connection) {
            var i = this._connections.indexOf(connection);
            if (i >= 0) {
                return;
            }
            this._connections.push(connection);
        };
        FMessageRouter.prototype.disconnect = function (connection) {
            var i = this._connections.indexOf(connection);
            if (i >= 0) {
                this._connections.splice(i, 1);
            }
        };
        FMessageRouter.prototype.disconnectAll = function () {
            this._connections.splice(0, this._connections.length);
        };
        FMessageRouter.prototype.send = function (msg) {
            var queue = this._queues.getItem(msg.category);
            if (queue) {
                queue.add(msg);
                if (queue.length == 1) {
                    this.push(msg);
                }
            }
            else {
                this.push(msg);
            }
        };
        FMessageRouter.prototype.push = function (msg) {
            if (this.trackEnabled)
                this._trackList.push(new FMessageTrack(msg, "PUSH", msg.toString()));
            var targetConnections = this._connections.slice(0);
            var counter = 0;
            for (var i = 0; i < targetConnections.length; i++) {
                var targetConnection = targetConnections[i];
                if (targetConnection.onFMessage(msg)) {
                    counter++;
                }
            }
            if (counter == 0) {
                msg.complete();
            }
        };
        FMessageRouter.prototype.complete = function (msg) {
            if (this.trackEnabled)
                this._trackList.push(new FMessageTrack(msg, "COMPLETE", ""));
        };
        Object.defineProperty(FMessageRouter.prototype, "trackList", {
            get: function () {
                return this._trackList;
            },
            enumerable: true,
            configurable: true
        });
        return FMessageRouter;
    }());
    function getFMessageRouter() {
        if (!FMessageRouter._instance) {
            FMessageRouter._instance = new FMessageRouter();
        }
        return FMessageRouter._instance;
    }
    FWSMvc.getFMessageRouter = getFMessageRouter;
    var FContext = (function () {
        function FContext() {
        }
        FContext.prototype.onContextEnter = function () {
        };
        FContext.prototype.onContextLeave = function () {
        };
        return FContext;
    }());
    FWSMvc.FContext = FContext;
    var FContextManager = (function () {
        function FContextManager() {
            this._history = new Array();
        }
        FContextManager.prototype.addContext = function (id, context, parentContext) {
            if (parentContext === void 0) { parentContext = null; }
            if (parentContext) {
                if (this._rootNode) {
                    var targetNode = this._rootNode.findData(parentContext);
                    if (targetNode) {
                        var newNode = new FWSData.Node(id);
                        newNode.data = context;
                        targetNode.add(newNode);
                    }
                }
            }
            else {
                this._rootNode = new FWSData.Node(id);
                this._rootNode.data = context;
            }
            return context;
        };
        FContextManager.prototype.removeContext = function (context) {
            if (this._rootNode) {
                var node = this._rootNode.findData(context);
                node.removeFromParent();
            }
        };
        FContextManager.prototype.getContext = function (id) {
            if (this._rootNode) {
                return this._rootNode.find(id);
            }
            return null;
        };
        FContextManager.prototype.findContext = function (context) {
            if (this._rootNode) {
                return this._rootNode.findData(context);
            }
            return null;
        };
        FContextManager.prototype.goto = function (context) {
            if (!this._rootNode)
                return;
            if (this._current && this._current.data === context)
                return;
            var theTargetNode = this.findContext(context);
            var theParentNode = null;
            if (this._current) {
                theParentNode = this._current.getParentByOtherNode(theTargetNode);
                var closeList = this._current.getParentNodes();
                var closeListCount = closeList.length;
                for (var i = closeListCount - 1; i >= 0; i--) {
                    var closeNode = closeList[i];
                    if (closeNode === theParentNode)
                        break;
                    if (closeNode.data) {
                        closeNode.data.onContextLeave();
                    }
                }
            }
            var found = false;
            var openList = theTargetNode.getParentNodes();
            var theParentNodeIsNull = true;
            if (theParentNode)
                theParentNodeIsNull = false;
            for (var i = 0; i < openList.length; i++) {
                var openNode = openList[i];
                if (theParentNodeIsNull) {
                    if (openNode.data)
                        openNode.data.onContextEnter();
                }
                if (found) {
                    if (openNode !== theParentNode || theParentNodeIsNull) {
                        if (openNode.data)
                            openNode.data.onContextEnter();
                    }
                }
                else {
                    if (openNode === theParentNode) {
                        found = true;
                    }
                }
            }
            this._current = theTargetNode;
            this._history.push(theTargetNode);
        };
        FContextManager.prototype.gotoID = function (id) {
            var node = this.getContext(id);
            if (node) {
                this.goto(node.data);
            }
        };
        FContextManager.prototype.back = function () {
            if (!this.canBack)
                return;
            var c = this._history.pop();
            c = this._history[this._history.length - 1];
            this.goto(c.data);
        };
        Object.defineProperty(FContextManager.prototype, "canBack", {
            get: function () {
                return this._history.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        return FContextManager;
    }());
    function getFContextManager() {
        if (!FContextManager.instance) {
            FContextManager.instance = new FContextManager();
        }
        return FContextManager.instance;
    }
    FWSMvc.getFContextManager = getFContextManager;
})(FWSMvc || (FWSMvc = {}));
//# sourceMappingURL=FWSMvc.js.map