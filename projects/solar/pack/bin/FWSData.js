var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FWSData;
(function (FWSData) {
    var EventArgs = (function () {
        function EventArgs(sender) {
            this._sender = sender;
        }
        Object.defineProperty(EventArgs.prototype, "sender", {
            get: function () {
                return this._sender;
            },
            enumerable: true,
            configurable: true
        });
        return EventArgs;
    }());
    FWSData.EventArgs = EventArgs;
    var DataPropertyChangeEventArgs = (function (_super) {
        __extends(DataPropertyChangeEventArgs, _super);
        function DataPropertyChangeEventArgs(sender, source, propertyName, newValue, oldValue) {
            var _this = _super.call(this, sender) || this;
            _this._source = source;
            _this._propertyName = propertyName;
            _this._newValue = newValue;
            _this._oldValue = oldValue;
            return _this;
        }
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "source", {
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "propertyName", {
            get: function () { return this._propertyName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "newValue", {
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "oldValue", {
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        return DataPropertyChangeEventArgs;
    }(EventArgs));
    FWSData.DataPropertyChangeEventArgs = DataPropertyChangeEventArgs;
    var DataCollectionChangeType;
    (function (DataCollectionChangeType) {
        DataCollectionChangeType[DataCollectionChangeType["Clear"] = 0] = "Clear";
        DataCollectionChangeType[DataCollectionChangeType["Add"] = 1] = "Add";
        DataCollectionChangeType[DataCollectionChangeType["Remove"] = 2] = "Remove";
        DataCollectionChangeType[DataCollectionChangeType["Modify"] = 3] = "Modify";
    })(DataCollectionChangeType = FWSData.DataCollectionChangeType || (FWSData.DataCollectionChangeType = {}));
    var DataDictChangeEventArgs = (function (_super) {
        __extends(DataDictChangeEventArgs, _super);
        function DataDictChangeEventArgs(sender, type, source, key, oldValue, newValue) {
            var _this = _super.call(this, sender) || this;
            _this._source = source;
            _this._key = key;
            _this._oldValue = oldValue;
            _this._newValue = newValue;
            _this._type = type;
            return _this;
        }
        Object.defineProperty(DataDictChangeEventArgs.prototype, "type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "source", {
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "oldValue", {
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "newValue", {
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "key", {
            get: function () { return this._key; },
            enumerable: true,
            configurable: true
        });
        return DataDictChangeEventArgs;
    }(EventArgs));
    FWSData.DataDictChangeEventArgs = DataDictChangeEventArgs;
    var DataListChangeEventArgs = (function (_super) {
        __extends(DataListChangeEventArgs, _super);
        function DataListChangeEventArgs(sender, type, source, index, newValue, oldValue) {
            var _this = _super.call(this, sender) || this;
            _this._type = type;
            _this._source = source;
            _this._index = index;
            _this._newValue = newValue;
            _this._oldValue = oldValue;
            return _this;
        }
        Object.defineProperty(DataListChangeEventArgs.prototype, "type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "source", {
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "index", {
            get: function () { return this._index; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "newValue", {
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "oldValue", {
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        return DataListChangeEventArgs;
    }(EventArgs));
    FWSData.DataListChangeEventArgs = DataListChangeEventArgs;
    var DataBindMode;
    (function (DataBindMode) {
        DataBindMode[DataBindMode["Once"] = 0] = "Once";
        DataBindMode[DataBindMode["OneWay"] = 1] = "OneWay";
        DataBindMode[DataBindMode["TwoWay"] = 2] = "TwoWay";
    })(DataBindMode = FWSData.DataBindMode || (FWSData.DataBindMode = {}));
    var DataBindLink = (function () {
        function DataBindLink(source, target, mode, options) {
            this._source = source;
            this._target = target;
            this._mode = mode;
            this._options = options;
        }
        return DataBindLink;
    }());
    FWSData.DataBindLink = DataBindLink;
    var DataBindManager = (function () {
        function DataBindManager() {
        }
        DataBindManager.prototype.distEvent = function (e) {
            console.log("DataBindManager::distEvent", e);
        };
        return DataBindManager;
    }());
    function getDataBindManager() {
        if (!DataBindManager._isntance) {
            DataBindManager._isntance = new DataBindManager();
        }
        return DataBindManager._isntance;
    }
    function bindProperties(source, target, mode, options) {
        if (source && target && source !== target) { }
        else
            return;
        if (mode === DataBindMode.Once) {
        }
        else {
        }
    }
    FWSData.bindProperties = bindProperties;
    function bindList(source, target, mode, options) {
    }
    FWSData.bindList = bindList;
    function bindDict(source, target, mode, options) {
    }
    FWSData.bindDict = bindDict;
    function unbindBySource(source) {
    }
    FWSData.unbindBySource = unbindBySource;
    function unbindByTarget(target) {
    }
    FWSData.unbindByTarget = unbindByTarget;
    var Dict = (function () {
        function Dict(data) {
            if (data === void 0) { data = null; }
            this._dict = new Object();
            if (data) {
                for (var k in data) {
                    var v = data[k];
                    this._dict[k] = v;
                }
            }
        }
        Dict.prototype.getItem = function (key) {
            return this._dict[key];
        };
        Dict.prototype.setItem = function (key, value) {
            if (this._dict[key] === value)
                return;
            if (this.containKey(key)) {
                var oldValue = this._dict[key];
                this._dict[key] = value;
                getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Modify, this, key, oldValue, value));
            }
            else {
                this._dict[key] = value;
                getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Add, this, key, oldValue, value));
            }
        };
        Dict.prototype.deleteKey = function (key) {
            if (!this.containKey(key))
                return;
            var ret = this._dict[key];
            delete this._dict[key];
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Remove, this, key, ret, null));
        };
        Dict.prototype.containKey = function (key) {
            return this.keys.indexOf(key) >= 0;
        };
        Dict.prototype.containValue = function (value) {
            return this.values.indexOf(value) >= 0;
        };
        Dict.prototype.clear = function () {
            if (this.count == 0)
                return;
            for (var key in this._dict) {
                delete this._dict[key];
            }
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Clear, this, null, null, null));
        };
        Dict.prototype.toObject = function () {
            var ret = new Object();
            for (var k in this._dict) {
                var v = this._dict[k];
                ret[k] = v;
            }
            return ret;
        };
        Dict.prototype.toString = function () {
            return "Dict " + JSON.stringify(this._dict);
        };
        Object.defineProperty(Dict.prototype, "keys", {
            get: function () {
                var ret = new Array();
                for (var key in this._dict) {
                    ret.push(key);
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dict.prototype, "values", {
            get: function () {
                var ret = new Array();
                for (var key in this._dict) {
                    ret.push(this._dict[key]);
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dict.prototype, "count", {
            get: function () {
                return this.keys.length;
            },
            enumerable: true,
            configurable: true
        });
        return Dict;
    }());
    FWSData.Dict = Dict;
    var List = (function () {
        function List() {
            this._list = new Array();
        }
        List.prototype.at = function (index) {
            return this._list[index];
        };
        List.prototype.modify = function (item, index) {
            if (index < 0 || index >= this._list.length)
                return;
            if (this._list[index] === item)
                return;
            var oldValue = this._list[index];
            this._list[index] = item;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Modify, this, index, item, oldValue));
        };
        List.prototype.add = function (item) {
            this._list.push(item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this._list.length - 1, item, null));
            return item;
        };
        List.prototype.remove = function (item) {
            var i = this._list.indexOf(item);
            if (i < 0)
                return;
            this._list.splice(i, 1);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, i, null, item));
            return item;
        };
        List.prototype.insert = function (item, index) {
            if (index < 0 || index > this._list.length - 1)
                return;
            this._list.splice(index, 0, item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, index, item, null));
            return item;
        };
        List.prototype.removeAt = function (index) {
            var ret = this._list[index];
            this._list.splice(index, 1);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, index, null, ret));
            return ret;
        };
        List.prototype.clear = function () {
            if (this._list.length == 0)
                return;
            this._list.splice(0, this._list.length);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        };
        List.prototype.indexOf = function (item) {
            return this._list.indexOf(item);
        };
        List.prototype.toArray = function () {
            return this._list.slice(0);
        };
        List.prototype.toString = function () {
            return "List [" + this._list.toString() + "]";
        };
        List.prototype.join = function (separator) {
            return this._list.join(separator);
        };
        Object.defineProperty(List.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    }());
    FWSData.List = List;
    var Queue = (function () {
        function Queue() {
            this._list = new Array();
        }
        Queue.prototype.add = function (item) {
            this._list.push(item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this.length - 1, item, null));
        };
        Queue.prototype.remove = function () {
            var ret = null;
            if (this._list.length > 0)
                ret = this._list.shift();
            else
                return null;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, 0, ret, null));
            return ret;
        };
        Queue.prototype.clear = function () {
            this._list.splice(0, this._list.length);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        };
        Queue.prototype.toArray = function () {
            return this._list.slice(0);
        };
        Queue.prototype.toString = function () {
            return "Queue[" + this._list.toString() + "]";
        };
        Object.defineProperty(Queue.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queue.prototype, "current", {
            get: function () {
                if (this._list.length == 0)
                    return null;
                return this._list[0];
            },
            enumerable: true,
            configurable: true
        });
        return Queue;
    }());
    FWSData.Queue = Queue;
    var Node = (function () {
        function Node(id) {
            this._nodes = new List();
            this._id = id;
        }
        Node.prototype.clear = function () {
            for (var i = 0; i < this._nodes.length; i++) {
                var node = this._nodes[i];
                node._parentNode = null;
            }
            this._nodes.clear();
        };
        Node.prototype.add = function (node) {
            node._parentNode = this;
            return this._nodes.add(node);
        };
        Node.prototype.insert = function (node, index) {
            var ret = node;
            node._parentNode = this;
            return ret;
        };
        Node.prototype.remove = function (node) {
            node._parentNode = null;
            return this._nodes.remove(node);
        };
        Node.prototype.removeAt = function (index) {
            var ret = this._nodes.at(index);
            this._nodes.removeAt(index);
            ret._parentNode = null;
            return ret;
        };
        Node.prototype.removeFromParent = function () {
            if (this._parentNode) {
                this._parentNode.remove(this);
            }
        };
        Node.prototype.at = function (index) {
            var ret = this._nodes.at(index);
            return ret;
        };
        Node.prototype.indexOf = function (node) {
            return this._nodes.indexOf(node);
        };
        Node.prototype.find = function (id) {
            if (this._id === id)
                return this;
            for (var i = 0; i < this._nodes.length; i++) {
                var n = this._nodes.at(i);
                if (n.id === id)
                    return n;
                var cn = n.find(id);
                if (cn)
                    return cn;
            }
            return null;
        };
        Node.prototype.findData = function (d) {
            if (this._data === d)
                return this;
            for (var i = 0; i < this._nodes.length; i++) {
                var n = this._nodes.at(i);
                if (n.data === d)
                    return n;
                var cn = n.findData(d);
                if (cn)
                    return cn;
            }
            return null;
        };
        Node.prototype.getParentNodes = function () {
            var ret = new Array();
            var temp = this;
            while (temp) {
                ret.splice(0, 0, temp);
                temp = temp.parentNode;
            }
            return ret;
        };
        Node.prototype.getParentByOtherNode = function (node) {
            var p1 = this.getParentNodes();
            var p2 = node.getParentNodes();
            var ret = null;
            for (var i = 0; i < p1.length; i++) {
                var n1 = p1[i];
                var n2 = null;
                if (i < p2.length) {
                    n2 = p2[i];
                }
                if (n1 === n2)
                    ret = n1;
                else
                    break;
            }
            return ret;
        };
        Object.defineProperty(Node.prototype, "firstChild", {
            get: function () {
                if (this._nodes.length > 0) {
                    return this._nodes[0];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "lastChild", {
            get: function () {
                if (this._nodes.length > 0) {
                    return this._nodes[this._nodes.length - 1];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "firstNode", {
            get: function () {
                if (this._parentNode)
                    return this._parentNode.firstChild;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "prevNode", {
            get: function () {
                if (this._parentNode) {
                    var i = this._parentNode.indexOf(this);
                    if (i > 0)
                        return this._parentNode.at(i - 1);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "nextNode", {
            get: function () {
                if (this._parentNode) {
                    var i = this._parentNode.indexOf(this);
                    if (i >= this._parentNode.length)
                        return null;
                    if (i < 0)
                        return null;
                    return this._parentNode.at[i + 1];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "lastNode", {
            get: function () {
                if (this._parentNode)
                    return this._parentNode.lastChild;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Node.prototype.toString = function () {
            var temp = this._data;
            if (temp || temp === 0 || temp === false) {
                return "Node " + JSON.stringify(this._data);
            }
            else
                return "Node {}";
        };
        Object.defineProperty(Node.prototype, "length", {
            get: function () {
                return this._nodes.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "parentNode", {
            get: function () {
                return this._parentNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "level", {
            get: function () {
                var ret = 0;
                var temp = this;
                while (temp.parentNode) {
                    temp = temp.parentNode;
                    ret++;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "rootNode", {
            get: function () {
                var ret = this;
                while (ret.parentNode) {
                    ret = ret.parentNode;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "path", {
            get: function () {
                var ary = new Array();
                var n = this;
                while (n) {
                    ary.splice(0, 0, n.id);
                    n = n.parentNode;
                }
                return ary.join("/");
            },
            enumerable: true,
            configurable: true
        });
        return Node;
    }());
    FWSData.Node = Node;
})(FWSData || (FWSData = {}));
//# sourceMappingURL=FWSData.js.map