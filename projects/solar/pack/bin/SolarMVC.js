var SolarMVC;
(function (SolarMVC) {
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
        getItem(key) {
            return this._dict[key];
        }
        setItem(key, value) {
            this._dict[key] = value;
        }
        deleteKey(key) {
            var ret = this._dict[key];
            delete this._dict[key];
            return ret;
        }
        containKey(key) {
            return this.keys.indexOf(key) >= 0;
        }
        containValue(value) {
            return this.values.indexOf(value) >= 0;
        }
        clear() {
            for (var key in this._dict) {
                delete this._dict[key];
            }
        }
        toObject() {
            var ret = new Object();
            for (var k in this._dict) {
                var v = this._dict;
                ret[k] = v;
            }
            return ret;
        }
        toString() {
            return JSON.stringify(this._dict);
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
    SolarMVC.Dict = Dict;
    class List {
        constructor() {
            this._list = new Array();
        }
        at(index) {
            return this._list[index];
        }
        add(item) {
            this._list.push(item);
            return item;
        }
        remove(item) {
            var i = this._list.indexOf(item);
            this._list.splice(i, 1);
            return item;
        }
        insert(item, index) {
            this._list.splice(index, 0, item);
            return item;
        }
        removeAt(index) {
            this._list.splice(index, 1);
        }
        clear() {
            this._list.splice(0, this._list.length);
        }
        indexOf(item) {
            return this._list.indexOf(item);
        }
        toArray() {
            return this._list.slice(0, 0);
        }
        toString() {
            return JSON.stringify(this._list);
        }
        get length() {
            return this._list.length;
        }
    }
    SolarMVC.List = List;
    class Command {
        constructor(cmdName, cmdCategory) {
            this.name = cmdName;
            this.category = cmdCategory;
            this.args = new Object();
        }
    }
    SolarMVC.Command = Command;
    class CommandRouter {
        constructor() {
        }
        static get instance() {
            if (!CommandRouter._instance) {
                CommandRouter._instance = new SolarMVC.CommandRouter();
            }
            return CommandRouter._instance;
        }
        addQueue(category) {
        }
        removeQueue(category) {
        }
        clearQueueMessages(category) {
        }
        clearAllQueueMessages() {
        }
        clearQueues() {
        }
        send(cmd) {
        }
        push(cmd) {
        }
    }
    SolarMVC.CommandRouter = CommandRouter;
})(SolarMVC || (SolarMVC = {}));
//# sourceMappingURL=SolarMVC.js.map