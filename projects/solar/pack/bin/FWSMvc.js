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
    class FMessage {
        constructor(cmdName, cmdCategory) {
            this.name = cmdName;
            this.category = cmdCategory;
            this.args = new Object();
            FMessage.nextIndex++;
            this._index = FMessage.nextIndex;
            this._completed = false;
            this._sended = false;
        }
        toString() {
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
        }
        send() {
            if (this._sended)
                return;
            this._sended = true;
            getFMessageRouter().send(this);
        }
        complete() {
            if (this._completed)
                return;
            this._completed = true;
            getFMessageRouter().complete(this);
        }
        get sended() {
            return this._sended;
        }
        get completed() {
            return this._completed;
        }
        get index() {
            return this._index;
        }
    }
    FMessage.nextIndex = 0;
    FWSMvc.FMessage = FMessage;
    class FMessageTrack {
        constructor(msg, action, info) {
            this.msg = msg;
            this.action = action;
            this.time = getShortTime();
            this.info = info;
        }
    }
    FWSMvc.FMessageTrack = FMessageTrack;
    class FMessageConnection {
        constructor() {
        }
        connect() {
            getFMessageRouter().connect(this);
        }
        disconnect() {
            getFMessageRouter().disconnect(this);
        }
        onFMessage(msg) {
            let ret = false;
            let handlerName = msg.name;
            let handler = this["onFMessage_" + handlerName];
            if (handler) {
                ret = handler.call(this, msg);
            }
            return ret;
        }
    }
    FWSMvc.FMessageConnection = FMessageConnection;
    class FMessageConnectionDelegate {
        constructor() {
        }
        connect() {
            getFMessageRouter().connect(this);
        }
        disconnect() {
            getFMessageRouter().disconnect(this);
        }
        onFMessage(msg) {
            let ret = false;
            let handlerName = msg.name;
            if (this._target && this._target["onFMessage_" + handlerName]) {
                ret = this._target[handlerName].call(this._target, msg);
            }
            return ret;
        }
        get target() {
            return this._target;
        }
        set target(v) {
            this._target = v;
        }
    }
    FWSMvc.FMessageConnectionDelegate = FMessageConnectionDelegate;
    class FMessageRouter {
        constructor() {
            if (FMessageRouter._instance) {
                throw "FMessageRouter设计为单例, 不能创建多个实例";
            }
            this.trackEnabled = true;
            this._trackList = new Array();
            this._queues = new FWSData.Dict();
            this._connections = new Array();
            setInterval(this.tick, 1);
        }
        tick() {
            var self = getFMessageRouter();
            var keys = self.getQueueKeys();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var q = self.getQueue(key);
                if (q.length == 0 || !q.current.completed)
                    continue;
                while (q.current && q.current.completed) {
                    q.remove();
                }
                if (q.current)
                    self.push(q.current);
            }
        }
        createQueue(category) {
            if (this._queues.containKey(category))
                return;
            var q = new FWSData.Queue();
            this._queues.setItem(category, q);
        }
        removeQueue(category) {
            if (this._queues.containKey(category)) {
                this._queues.deleteKey(category);
            }
        }
        removeAllQueues() {
            this._queues.clear();
        }
        getQueue(category) {
            if (this._queues.containKey(category)) {
                return this._queues.getItem(category);
            }
            else
                return null;
        }
        getQueueKeys() {
            return this._queues.keys;
        }
        clearQueueMessages(category) {
            if (this._queues.containKey(category)) {
                let q = this._queues.getItem(category);
                q.clear();
            }
        }
        clearAllQueuesMessages() {
            var keys = this._queues.keys;
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                let q = this._queues.getItem(key);
                q.clear();
            }
        }
        connect(connection) {
            var i = this._connections.indexOf(connection);
            if (i >= 0) {
                return;
            }
            this._connections.push(connection);
        }
        disconnect(connection) {
            var i = this._connections.indexOf(connection);
            if (i >= 0) {
                this._connections.splice(i, 1);
            }
        }
        disconnectAll() {
            this._connections.splice(0, this._connections.length);
        }
        send(msg) {
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
        }
        push(msg) {
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
        }
        complete(msg) {
            if (this.trackEnabled)
                this._trackList.push(new FMessageTrack(msg, "COMPLETE", ""));
        }
        get trackList() {
            return this._trackList;
        }
    }
    function getFMessageRouter() {
        if (!FMessageRouter._instance) {
            FMessageRouter._instance = new FMessageRouter();
        }
        return FMessageRouter._instance;
    }
    FWSMvc.getFMessageRouter = getFMessageRouter;
    class FContext {
        constructor(...connections) {
            this.connections = connections.slice(0);
        }
        onContextEnter() {
            for (var i = 0; i < this.connections.length; i++) {
                this.connections[i].connect();
            }
        }
        onContextLeave() {
            for (var i = 0; i < this.connections.length; i++) {
                this.connections[i].disconnect();
            }
        }
        get path() {
            var mgr = getFContextManager();
            var node = mgr.findContext(this);
            if (node) {
                return node.path;
            }
            return "";
        }
    }
    FWSMvc.FContext = FContext;
    class FContextManager {
        constructor() {
            this._history = new Array();
        }
        addContext(id, context, parentContext = null) {
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
        }
        removeContext(context) {
            if (this._rootNode) {
                var node = this._rootNode.findData(context);
                node.removeFromParent();
            }
        }
        getContext(id) {
            if (this._rootNode) {
                return this._rootNode.find(id);
            }
            return null;
        }
        findContext(context) {
            if (this._rootNode) {
                return this._rootNode.findData(context);
            }
            return null;
        }
        goto(context) {
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
        }
        gotoID(id) {
            var node = this.getContext(id);
            if (node) {
                this.goto(node.data);
            }
        }
        back() {
            if (!this.canBack)
                return;
            var c = this._history.pop();
            c = this._history[this._history.length - 1];
            this.goto(c.data);
        }
        get canBack() {
            return this._history.length > 1;
        }
    }
    function getFContextManager() {
        if (!FContextManager.instance) {
            FContextManager.instance = new FContextManager();
        }
        return FContextManager.instance;
    }
    FWSMvc.getFContextManager = getFContextManager;
})(FWSMvc || (FWSMvc = {}));
//# sourceMappingURL=FWSMvc.js.map