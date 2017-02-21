var SolarMVC;
(function (SolarMVC) {
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
            this._dict[key] = value;
        };
        Dict.prototype.deleteKey = function (key) {
            var ret = this._dict[key];
            delete this._dict[key];
            return ret;
        };
        Dict.prototype.containKey = function (key) {
            return this.keys.indexOf(key) >= 0;
        };
        Dict.prototype.containValue = function (value) {
            return this.values.indexOf(value) >= 0;
        };
        Dict.prototype.clear = function () {
            for (var key in this._dict) {
                delete this._dict[key];
            }
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
    SolarMVC.Dict = Dict;
    var List = (function () {
        function List() {
            this._list = new Array();
        }
        List.prototype.at = function (index) {
            return this._list[index];
        };
        List.prototype.add = function (item) {
            this._list.push(item);
            return item;
        };
        List.prototype.remove = function (item) {
            var i = this._list.indexOf(item);
            this._list.splice(i, 1);
            return item;
        };
        List.prototype.insert = function (item, index) {
            this._list.splice(index, 0, item);
            return item;
        };
        List.prototype.removeAt = function (index) {
            var ret = this._list[index];
            this._list.splice(index, 1);
            return ret;
        };
        List.prototype.clear = function () {
            this._list.splice(0, this._list.length);
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
    SolarMVC.List = List;
    var Queue = (function () {
        function Queue() {
            this._list = new Array();
        }
        Queue.prototype.add = function (item) {
            this._list.push(item);
        };
        Queue.prototype.remove = function () {
            if (this._list.length > 0)
                return this._list.shift();
            return null;
        };
        Queue.prototype.clear = function () {
            this._list.splice(0, this._list.length);
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
    SolarMVC.Queue = Queue;
    var Node = (function () {
        function Node(id) {
            this._nodes = new SolarMVC.List();
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
    SolarMVC.Node = Node;
    var Command = (function () {
        function Command(cmdName, cmdCategory) {
            this.name = cmdName;
            this.category = cmdCategory;
            this.args = new Object();
        }
        return Command;
    }());
    SolarMVC.Command = Command;
})(SolarMVC || (SolarMVC = {}));
//# sourceMappingURL=SolarMVC.js.map