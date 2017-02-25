var FWSData;
(function (FWSData) {
    class EventArgs {
        constructor(sender) {
            this._sender = sender;
        }
        get sender() {
            return this._sender;
        }
    }
    FWSData.EventArgs = EventArgs;
    class DataPropertyChangeEventArgs extends EventArgs {
        constructor(sender, source, propertyName, newValue, oldValue) {
            super(sender);
            this._source = source;
            this._propertyName = propertyName;
            this._newValue = newValue;
            this._oldValue = oldValue;
        }
        get source() { return this._source; }
        get propertyName() { return this._propertyName; }
        get newValue() { return this._newValue; }
        get oldValue() { return this._oldValue; }
    }
    FWSData.DataPropertyChangeEventArgs = DataPropertyChangeEventArgs;
    var DataCollectionChangeType;
    (function (DataCollectionChangeType) {
        DataCollectionChangeType[DataCollectionChangeType["Clear"] = 0] = "Clear";
        DataCollectionChangeType[DataCollectionChangeType["Add"] = 1] = "Add";
        DataCollectionChangeType[DataCollectionChangeType["Remove"] = 2] = "Remove";
        DataCollectionChangeType[DataCollectionChangeType["Modify"] = 3] = "Modify";
    })(DataCollectionChangeType = FWSData.DataCollectionChangeType || (FWSData.DataCollectionChangeType = {}));
    class DataDictChangeEventArgs extends EventArgs {
        constructor(sender, type, source, key, oldValue, newValue) {
            super(sender);
            this._source = source;
            this._key = key;
            this._oldValue = oldValue;
            this._newValue = newValue;
            this._type = type;
        }
        get type() { return this._type; }
        get source() { return this._source; }
        get oldValue() { return this._oldValue; }
        get newValue() { return this._newValue; }
        get key() { return this._key; }
    }
    FWSData.DataDictChangeEventArgs = DataDictChangeEventArgs;
    class DataListChangeEventArgs extends EventArgs {
        constructor(sender, type, source, index, newValue, oldValue) {
            super(sender);
            this._type = type;
            this._source = source;
            this._index = index;
            this._newValue = newValue;
            this._oldValue = oldValue;
        }
        get type() { return this._type; }
        get source() { return this._source; }
        get index() { return this._index; }
        get newValue() { return this._newValue; }
        get oldValue() { return this._oldValue; }
    }
    FWSData.DataListChangeEventArgs = DataListChangeEventArgs;
    var DataBindMode;
    (function (DataBindMode) {
        DataBindMode[DataBindMode["Once"] = 0] = "Once";
        DataBindMode[DataBindMode["OneWay"] = 1] = "OneWay";
        DataBindMode[DataBindMode["TwoWay"] = 2] = "TwoWay";
    })(DataBindMode = FWSData.DataBindMode || (FWSData.DataBindMode = {}));
    class DataBindLink {
        constructor(type, source, target, mode, options) {
            this._type = type;
            this._source = source;
            this._target = target;
            this._mode = mode;
            this._options = options;
        }
        get type() { return this._type; }
        get source() { return this._source; }
        get target() { return this._target; }
        get mode() { return this._mode; }
        get options() { return this._options; }
    }
    FWSData.DataBindLink = DataBindLink;
    class DataBindManager {
        constructor() {
            this._links = new Array();
        }
        distEvent(e) {
            var cloneList = this._links.slice(0);
            for (var i = 0; i < cloneList.length; i++) {
                var lk = cloneList[i];
                var handler = this["on" + lk.type + "Change"];
                if (!handler)
                    continue;
                if (e.sender === lk.source) {
                    if (lk.mode === DataBindMode.TwoWay
                        || lk.mode === DataBindMode.OneWay) {
                        handler.call(this, e, lk, false);
                    }
                }
                else if (e.sender === lk.target && lk.mode === DataBindMode.TwoWay) {
                    handler.call(this, e, lk, true);
                }
            }
        }
        add(type, source, target, mode, options) {
            var link = this.find(source, target);
            if (link)
                return;
            link = new DataBindLink(type, source, target, mode, options);
            this._links.push(link);
        }
        find(source, target) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source && link.target === target)
                    return link;
            }
            return null;
        }
        findSource(source) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source)
                    return link;
            }
            return null;
        }
        findTarget(target) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.target === target)
                    return link;
            }
            return null;
        }
        getBindSources(target) {
            var ret = new Array();
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.target === target) {
                    ret.push(link);
                }
            }
            return ret;
        }
        getBindTargets(source) {
            var ret = new Array();
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source) {
                    ret.push(link);
                }
            }
            return ret;
        }
        removeLinksBy(source, target) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.source !== source || link.target !== target)
                    continue;
                this._links.splice(i, 1);
            }
        }
        removeLinksBySource(source) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.source !== source)
                    continue;
                this._links.splice(i, 1);
            }
        }
        removeLinksByTarget(target) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.target !== target)
                    continue;
                this._links.splice(i, 1);
            }
        }
        removeAll() {
            this._links.splice(0, this._links.length);
        }
        onPropertiesChange(e, lk, twoway) {
            var src = null;
            var tag = null;
            var srcName = "";
            var tagName = "";
            if (twoway) {
                src = lk.target;
                tag = lk.source;
                srcName = e.propertyName;
                tagName = lk.options[srcName];
            }
            else {
                src = lk.source;
                tag = lk.target;
                srcName = e.propertyName;
                for (var k in lk.options) {
                    var v = lk.options[k];
                    if (v === srcName) {
                        tagName = k;
                        break;
                    }
                }
            }
            if (!srcName || !tagName)
                return;
            tag[tagName] = src[srcName];
        }
        onListChange(e, lk, twoway) {
            if (!lk.source || !lk.target)
                return;
            switch (e.type) {
                case FWSData.DataCollectionChangeType.Clear:
                    {
                        if (twoway) {
                            lk.source.clear();
                        }
                        else {
                        }
                    }
                    break;
                case FWSData.DataCollectionChangeType.Add:
                    {
                    }
                    break;
                case FWSData.DataCollectionChangeType.Remove:
                    {
                    }
                    break;
                case FWSData.DataCollectionChangeType.Modify:
                    {
                    }
                    break;
            }
        }
        onDictChange(e, lk, twoway) {
            switch (e.type) {
                case FWSData.DataCollectionChangeType.Clear:
                    break;
                case FWSData.DataCollectionChangeType.Add:
                    break;
                case FWSData.DataCollectionChangeType.Remove:
                    break;
                case FWSData.DataCollectionChangeType.Modify:
                    break;
            }
        }
    }
    function getDataBindManager() {
        if (!DataBindManager._isntance) {
            DataBindManager._isntance = new DataBindManager();
        }
        return DataBindManager._isntance;
    }
    function copyProperties(source, target, options) {
        if (!options)
            return;
        for (var k in options) {
            var v = options[k];
            target[v] = source[k];
        }
    }
    FWSData.copyProperties = copyProperties;
    function copyList(source, target, options) {
        if (source && target && source !== target) { }
        else
            return;
        if (source instanceof List) { }
        else
            return;
        if (target instanceof List) { }
        else
            return;
        target.clear();
        for (var i = 0; i < source.length; i++) {
            target.add(source.at(i));
        }
    }
    FWSData.copyList = copyList;
    function copyDict(source, target, options) {
        if (source && target && source !== target) { }
        else
            return;
        if (source instanceof Dict) { }
        else
            return;
        if (target instanceof Dict) { }
        else
            return;
        var ks = source.keys;
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            var v = source.getItem(k);
            target.setItem(k, v);
        }
    }
    FWSData.copyDict = copyDict;
    function bindProperties(source, target, mode, options) {
        if (source && target && source !== target) { }
        else
            return;
        if (mode !== DataBindMode.Once) {
            getDataBindManager().add("Properties", source, target, mode, options);
        }
        copyProperties(source, target, options);
    }
    FWSData.bindProperties = bindProperties;
    function unbind(source, target) {
        getDataBindManager().removeLinksBy(source, target);
    }
    FWSData.unbind = unbind;
    function unbindBySource(source) {
        getDataBindManager().removeLinksBySource(source);
    }
    FWSData.unbindBySource = unbindBySource;
    function unbindByTarget(target) {
        getDataBindManager().removeLinksByTarget(target);
    }
    FWSData.unbindByTarget = unbindByTarget;
    class DependentProperties {
        constructor(owner) {
            this._owner = owner;
            this._properties = new Object();
        }
        get(name, defValue) {
            if (this._properties.hasOwnProperty(name)) {
                return this._properties[name];
            }
            return defValue;
        }
        set(name, newValue) {
            if (this._properties[name] === newValue)
                return;
            var oldValue = this._properties[name];
            this._properties[name] = newValue;
            getDataBindManager().distEvent(new DataPropertyChangeEventArgs(this._owner, this._owner, name, newValue, oldValue));
        }
        clear() {
            for (var k in this._properties) {
                delete this._properties[k];
            }
        }
    }
    FWSData.DependentProperties = DependentProperties;
    class DependentObject {
        constructor() {
            this.__DP = new DependentProperties(this);
        }
        get(name, defValue) {
            return this.__DP.get(name, defValue);
        }
        set(name, newValue) {
            this.__DP.set(name, newValue);
        }
        clear() {
            this.__DP.clear();
        }
    }
    FWSData.DependentObject = DependentObject;
    class Dict {
        constructor(data = null) {
            this._dict = new Object();
            if (data) {
                for (var k in data) {
                    var v = data[k];
                    this._dict[k] = v;
                }
            }
        }
        getEnumerator() {
            return new DictEnumerator(this);
        }
        clone(deep) {
            var ret = new Dict();
            var ks = this.keys;
            for (var k in ks) {
                let v = this.getItem[k];
                ret.setItem(k, v);
            }
            return ret;
        }
        getItem(key) {
            return this._dict[key];
        }
        setItem(key, value) {
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
        }
        deleteKey(key) {
            if (!this.containKey(key))
                return;
            var ret = this._dict[key];
            delete this._dict[key];
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Remove, this, key, ret, null));
        }
        containKey(key) {
            return this.keys.indexOf(key) >= 0;
        }
        containValue(value) {
            return this.values.indexOf(value) >= 0;
        }
        clear() {
            if (this.count == 0)
                return;
            for (var key in this._dict) {
                delete this._dict[key];
            }
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Clear, this, null, null, null));
        }
        toObject() {
            var ret = new Object();
            for (var k in this._dict) {
                var v = this._dict[k];
                ret[k] = v;
            }
            return ret;
        }
        toString() {
            return "Dict " + JSON.stringify(this._dict);
        }
        get keys() {
            var ret = new Array();
            for (var key in this._dict) {
                ret.push(key);
            }
            return ret;
        }
        get values() {
            var ret = new Array();
            for (var key in this._dict) {
                ret.push(this._dict[key]);
            }
            return ret;
        }
        get count() {
            return this.keys.length;
        }
    }
    FWSData.Dict = Dict;
    class DictEnumerator {
        constructor(dict) {
            this._dict = dict;
            this.reset();
        }
        reset() {
            this._keys = this._dict.keys;
            this._values = this._dict.values;
            this._index = 0;
        }
        moveNext() {
            this._index++;
        }
        getCurrent() {
            return this._values[this._index];
        }
        end() {
            if (this._dict && this._values && this._index >= 0 && this._index < this._values.length) {
                return false;
            }
            return true;
        }
    }
    FWSData.DictEnumerator = DictEnumerator;
    class List {
        constructor() {
            this._list = new Array();
        }
        clone(deep) {
            var ret = new List();
            for (var i = 0; i < this._list.length; i++) {
                ret.add(this._list[i]);
            }
            return ret;
        }
        getEnumerator() {
            return new ListEnumerator(this);
        }
        at(index) {
            return this._list[index];
        }
        modify(item, index) {
            if (index < 0 || index >= this._list.length)
                return;
            if (this._list[index] === item)
                return;
            var oldValue = this._list[index];
            this._list[index] = item;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Modify, this, index, item, oldValue));
        }
        add(item) {
            this._list.push(item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this._list.length - 1, item, null));
            return item;
        }
        remove(item) {
            var i = this._list.indexOf(item);
            if (i < 0)
                return;
            this._list.splice(i, 1);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, i, null, item));
            return item;
        }
        insert(item, index) {
            if (index < 0 || index > this._list.length - 1)
                return;
            this._list.splice(index, 0, item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, index, item, null));
            return item;
        }
        removeAt(index) {
            var ret = this._list[index];
            this._list.splice(index, 1);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, index, null, ret));
            return ret;
        }
        clear() {
            if (this._list.length == 0)
                return;
            this._list.splice(0, this._list.length);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        }
        indexOf(item) {
            return this._list.indexOf(item);
        }
        toArray() {
            return this._list.slice(0);
        }
        toString() {
            return "List [" + this._list.toString() + "]";
        }
        join(separator) {
            return this._list.join(separator);
        }
        get length() {
            return this._list.length;
        }
    }
    FWSData.List = List;
    class ListEnumerator {
        constructor(list) {
            this._list = list;
            this.reset();
        }
        reset() {
            this._index = 0;
        }
        moveNext() {
            this._index++;
        }
        getCurrent() {
            return this._list.at(this._index);
        }
        end() {
            if (this._list && this._index >= 0 && this._index < this._list.length) {
                return false;
            }
            return true;
        }
    }
    FWSData.ListEnumerator = ListEnumerator;
    class Queue {
        constructor() {
            this._list = new Array();
        }
        clone(deep) {
            var ret = new Queue();
            for (var i = 0; i < this._list.length; i++) {
                ret.add(this._list[i]);
            }
            return ret;
        }
        getEnumerator() {
            return new QueueEnumrator(this);
        }
        add(item) {
            this._list.push(item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this.length - 1, item, null));
        }
        remove() {
            var ret = null;
            if (this._list.length > 0)
                ret = this._list.shift();
            else
                return null;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, 0, ret, null));
            return ret;
        }
        clear() {
            this._list.splice(0, this._list.length);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        }
        toArray() {
            return this._list.slice(0);
        }
        toString() {
            return "Queue[" + this._list.toString() + "]";
        }
        get length() {
            return this._list.length;
        }
        get current() {
            if (this._list.length == 0)
                return null;
            return this._list[0];
        }
    }
    FWSData.Queue = Queue;
    class QueueEnumrator {
        constructor(queue) {
            this._queue = queue;
            this.reset();
        }
        reset() {
            this._temp = this._queue.clone();
        }
        moveNext() {
            this._temp.remove();
        }
        getCurrent() {
            return this._temp.current;
        }
        end() {
            return !(this._temp && this._temp.length >= 1);
        }
    }
    FWSData.QueueEnumrator = QueueEnumrator;
    class Node {
        constructor(id) {
            this._nodes = new List();
            this._id = id;
        }
        getEnumerator() {
            return new NodeEnumrator(this);
        }
        clone(deep) {
            var ret = new Node(this._id);
            for (var i = 0; i < this._nodes.length; i++) {
                var c = this._nodes.at(i);
                if (deep)
                    c = c.clone(deep);
                ret.add(c);
            }
            return ret;
        }
        clear() {
            for (var i = 0; i < this._nodes.length; i++) {
                var node = this._nodes[i];
                node._parentNode = null;
            }
            this._nodes.clear();
        }
        add(node) {
            node._parentNode = this;
            return this._nodes.add(node);
        }
        insert(node, index) {
            var ret = node;
            node._parentNode = this;
            return ret;
        }
        remove(node) {
            node._parentNode = null;
            return this._nodes.remove(node);
        }
        removeAt(index) {
            var ret = this._nodes.at(index);
            this._nodes.removeAt(index);
            ret._parentNode = null;
            return ret;
        }
        removeFromParent() {
            if (this._parentNode) {
                this._parentNode.remove(this);
            }
        }
        at(index) {
            var ret = this._nodes.at(index);
            return ret;
        }
        indexOf(node) {
            return this._nodes.indexOf(node);
        }
        find(id) {
            if (this._id === id)
                return this;
            for (var i = 0; i < this._nodes.length; i++) {
                let n = this._nodes.at(i);
                if (n.id === id)
                    return n;
                let cn = n.find(id);
                if (cn)
                    return cn;
            }
            return null;
        }
        findData(d) {
            if (this._data === d)
                return this;
            for (var i = 0; i < this._nodes.length; i++) {
                let n = this._nodes.at(i);
                if (n.data === d)
                    return n;
                let cn = n.findData(d);
                if (cn)
                    return cn;
            }
            return null;
        }
        getParentNodes() {
            var ret = new Array();
            var temp = this;
            while (temp) {
                ret.splice(0, 0, temp);
                temp = temp.parentNode;
            }
            return ret;
        }
        getParentByOtherNode(node) {
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
        }
        get firstChild() {
            if (this._nodes.length > 0) {
                return this._nodes.at(0);
            }
            return null;
        }
        get lastChild() {
            if (this._nodes.length > 0) {
                return this._nodes.at(this._nodes.length - 1);
            }
            return null;
        }
        get firstNode() {
            if (this._parentNode)
                return this._parentNode.firstChild;
            return null;
        }
        get prevNode() {
            if (this._parentNode) {
                var i = this._parentNode.indexOf(this);
                if (i > 0)
                    return this._parentNode.at(i - 1);
            }
            return null;
        }
        get nextNode() {
            if (this._parentNode) {
                var i = this._parentNode.indexOf(this);
                if (i >= this._parentNode.length)
                    return null;
                if (i < 0)
                    return null;
                return this._parentNode.at(i + 1);
            }
            return null;
        }
        get lastNode() {
            if (this._parentNode)
                return this._parentNode.lastChild;
            return null;
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        toString() {
            var temp = this._data;
            if (temp || temp === 0 || temp === false) {
                return "Node " + JSON.stringify(this._data);
            }
            else
                return "Node {}";
        }
        get length() {
            return this._nodes.length;
        }
        get parentNode() {
            return this._parentNode;
        }
        get id() {
            return this._id;
        }
        get level() {
            var ret = 0;
            var temp = this;
            while (temp.parentNode) {
                temp = temp.parentNode;
                ret++;
            }
            return ret;
        }
        get rootNode() {
            var ret = this;
            while (ret.parentNode) {
                ret = ret.parentNode;
            }
            return ret;
        }
        get path() {
            var ary = new Array();
            var n = this;
            while (n) {
                ary.splice(0, 0, n.id);
                n = n.parentNode;
            }
            return ary.join("/");
        }
    }
    FWSData.Node = Node;
    class NodeEnumrator {
        constructor(node) {
            this._node = node;
            this.reset();
        }
        reset() {
            this._temp = this._node;
        }
        moveNext() {
            if (this._temp.firstChild && this._temp.firstChild !== this._temp) {
                this._temp = this._temp.firstChild;
            }
            else if (this._temp.nextNode && this._temp.nextNode !== this._temp) {
                this._temp = this._temp.nextNode;
            }
            else {
                while (this._temp.parentNode) {
                    this._temp = this._temp.parentNode;
                    if (this._temp === this._node) {
                        this._temp = null;
                    }
                    if (this._temp.nextNode !== this._temp) {
                        this._temp = this._temp.nextNode;
                        return;
                    }
                }
                this._temp = null;
            }
        }
        getCurrent() {
            return this._temp;
        }
        end() {
            return !this._temp;
        }
    }
    FWSData.NodeEnumrator = NodeEnumrator;
})(FWSData || (FWSData = {}));
//# sourceMappingURL=FWSData.js.map