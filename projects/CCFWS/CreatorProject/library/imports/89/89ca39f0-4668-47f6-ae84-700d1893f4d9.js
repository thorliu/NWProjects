"use strict";
cc._RF.push(module, '89ca3nwRmhH9q6EcA0Yk/TZ', 'FWSData');
// resources/scripts/fws/data/FWSData.ts

/*
 * 数据相关的基础功能, 包括支持克隆, 迭代的基本数据结构, 支持数据绑定通知的基本数据模型
 * @Author: 刘强
 * @Date: 2017-03-01 14:19:44
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 15:39:59
 */
var FWSData;
(function (FWSData) {
    //----------------------------------------------- 辅助功能
    /**
     * 以路径的方式获取指定成员的值
     * @export
     * @param {*} source 对象
     * @param {string} path 用点语法分隔key或者索引的字符串表示一个路径, 例如: "myUser.cards.0", 相当于source.myUser.cards[0]
     * @param {*} [defaultValue] 当路径访问数据内容失败时, 返回的一个默认值
     * @returns {*}
     */
    function getValueFromPath(source, path, defaultValue) {
        try {
            return eval("source" + path);
        }
        catch (err) { }
        return defaultValue;
    }
    FWSData.getValueFromPath = getValueFromPath;
    /**
     * 用成员名称的方式获取指定成员的值
     * @export
     * @param {*} source 对象
     * @param {string} member 成员名称, 例如: "myUser", 相当于source.myUser
     * @param {*} [defaultValue] 当访问数据内容失败时, 返回的一个默认值
     * @returns {*}
     */
    function getValueFromMember(source, member, defaultValue) {
        if (!source)
            return defaultValue;
        var ret = source[member];
        if (ret === undefined)
            ret = defaultValue;
        return ret;
    }
    FWSData.getValueFromMember = getValueFromMember;
    /**
     * 设置目标对象指定路径的成员的值为源对象指定路径的值
     * @export
     * @param {*} source 数据源对象
     * @param {string} sourcePath 数据源成员路径
     * @param {*} target 目标对象
     * @param {string} targetPath 目标对象成员路径
     */
    function setValueFromPath(source, sourcePath, target, targetPath) {
        if (!source || !target)
            return;
        var targetPathItems = targetPath.split(".");
        var temp = target;
        for (var i = 0; i < targetPathItems.length - 1; i++) {
            var targetPathItem = targetPathItems[i];
            var item = temp[targetPathItem];
            if (item === null || item === undefined)
                return;
            temp = item;
        }
        var lastName = targetPathItems[targetPathItems.length - 1];
        var sourceValue = getValueFromPath(source, sourcePath, null);
        if (sourceValue !== null && sourceValue !== undefined) {
            temp[lastName] = sourceValue;
        }
    }
    FWSData.setValueFromPath = setValueFromPath;
    //----------------------------------------------- 事件通知
    /**
     * 事件参数
     * @export
     * @class EventArgs
     */
    var EventArgs = /** @class */ (function () {
        /**
         * 构造
         * @param {*} sender 事件发送者
         * @memberOf EventArgs
         */
        function EventArgs(sender) {
            this._sender = sender;
        }
        Object.defineProperty(EventArgs.prototype, "sender", {
            /**
             * 获取事件发送者
             * @readonly
             * @type {*}
             * @memberOf EventArgs
             */
            get: function () {
                return this._sender;
            },
            enumerable: true,
            configurable: true
        });
        return EventArgs;
    }());
    FWSData.EventArgs = EventArgs;
    /**
     * 数据属性改变事件参数
     * @export
     * @class DataPropertyChangeEventArgs
     * @extends {EventArgs}
     */
    var DataPropertyChangeEventArgs = /** @class */ (function (_super) {
        __extends(DataPropertyChangeEventArgs, _super);
        /**
         * Creates an instance of DataPropertyChangeEventArgs.
         * @param {*} sender
         * @param {*} source
         * @param {string} propertyName
         * @param {*} newValue
         * @param {*} oldValue
         *
         * @memberOf DataPropertyChangeEventArgs
         */
        function DataPropertyChangeEventArgs(sender, source, propertyName, newValue, oldValue) {
            var _this = _super.call(this, sender) || this;
            _this._source = source;
            _this._propertyName = propertyName;
            _this._newValue = newValue;
            _this._oldValue = oldValue;
            return _this;
        }
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "source", {
            /**
             * 获取数据源对象
             * @readonly
             * @type {*}
             * @memberOf DataPropertyChangeEventArgs
             */
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "propertyName", {
            /**
             * 获取属性名称
             * @readonly
             * @type {string}
             * @memberOf DataPropertyChangeEventArgs
             */
            get: function () { return this._propertyName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "newValue", {
            /**
             * 获取属性的新值
             * @readonly
             * @type {*}
             * @memberOf DataPropertyChangeEventArgs
             */
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataPropertyChangeEventArgs.prototype, "oldValue", {
            /**
             * 获取属性的老值
             *
             * @readonly
             * @type {*}
             * @memberOf DataPropertyChangeEventArgs
             */
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        return DataPropertyChangeEventArgs;
    }(EventArgs));
    FWSData.DataPropertyChangeEventArgs = DataPropertyChangeEventArgs;
    /**
     * 数据字典改变事件类型
     * @export
     * @enum {number}
     */
    var DataCollectionChangeType;
    (function (DataCollectionChangeType) {
        /**
         * 清空成员时
         */
        DataCollectionChangeType[DataCollectionChangeType["Clear"] = 0] = "Clear";
        /**
         * 添加成员时
         */
        DataCollectionChangeType[DataCollectionChangeType["Add"] = 1] = "Add";
        /**
         * 移除成员时
         */
        DataCollectionChangeType[DataCollectionChangeType["Remove"] = 2] = "Remove";
        /**
         * 修改成员时
         */
        DataCollectionChangeType[DataCollectionChangeType["Modify"] = 3] = "Modify";
    })(DataCollectionChangeType = FWSData.DataCollectionChangeType || (FWSData.DataCollectionChangeType = {}));
    /**
     * 数据字典改变事件参数
     * @export
     * @class DataDictChangeEventArgs
     * @extends {EventArgs}
     */
    var DataDictChangeEventArgs = /** @class */ (function (_super) {
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
            /**
             * 改变方式
             * @readonly
             * @type {DataCollectionChangeType}
             * @memberOf DataDictChangeEventArgs
             */
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "source", {
            /**
             * 数据源对象
             * @readonly
             * @type {*}
             * @memberOf DataDictChangeEventArgs
             */
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "oldValue", {
            /**
             * 老值
             * @readonly
             * @type {*}
             * @memberOf DataDictChangeEventArgs
             */
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "newValue", {
            /**
             * 新值
             * @readonly
             * @type {*}
             * @memberOf DataDictChangeEventArgs
             */
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataDictChangeEventArgs.prototype, "key", {
            /**
             * 键名
             * @readonly
             * @type {string}
             * @memberOf DataDictChangeEventArgs
             */
            get: function () { return this._key; },
            enumerable: true,
            configurable: true
        });
        return DataDictChangeEventArgs;
    }(EventArgs));
    FWSData.DataDictChangeEventArgs = DataDictChangeEventArgs;
    /**
     * 数据列表改变事件参数
     * @export
     * @class DataListChangeEventArgs
     * @extends {EventArgs}
     */
    var DataListChangeEventArgs = /** @class */ (function (_super) {
        __extends(DataListChangeEventArgs, _super);
        /**
         * Creates an instance of DataListChangeEventArgs.
         * @param {*} sender
         * @param {DataCollectionChangeType} type
         * @param {*} source
         * @param {number} index
         * @param {*} newValue
         * @param {*} oldValue
         *
         * @memberOf DataListChangeEventArgs
         */
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
            /**
             * 数据改变方式
             * @readonly
             * @type {DataCollectionChangeType}
             * @memberOf DataListChangeEventArgs
             */
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "source", {
            /**
             * 数据源对象
             * @readonly
             * @type {*}
             * @memberOf DataListChangeEventArgs
             */
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "index", {
            /**
             * 索引
             * @readonly
             * @type {number}
             * @memberOf DataListChangeEventArgs
             */
            get: function () { return this._index; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "newValue", {
            /**
             * 新值
             * @readonly
             * @type {*}
             * @memberOf DataListChangeEventArgs
             */
            get: function () { return this._newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataListChangeEventArgs.prototype, "oldValue", {
            /**
             * 老值
             * @readonly
             * @type {*}
             * @memberOf DataListChangeEventArgs
             */
            get: function () { return this._oldValue; },
            enumerable: true,
            configurable: true
        });
        return DataListChangeEventArgs;
    }(EventArgs));
    FWSData.DataListChangeEventArgs = DataListChangeEventArgs;
    //----------------------------------------------- 数据绑定信息
    /**
     * 数据绑定模式
     * @export
     * @enum {number}
     */
    var DataBindMode;
    (function (DataBindMode) {
        /**
         * 一次性同步
         */
        DataBindMode[DataBindMode["Once"] = 0] = "Once";
        /**
         * 单向更新绑定
         */
        DataBindMode[DataBindMode["OneWay"] = 1] = "OneWay";
        /**
         * 双向更新绑定
         */
        DataBindMode[DataBindMode["TwoWay"] = 2] = "TwoWay";
    })(DataBindMode = FWSData.DataBindMode || (FWSData.DataBindMode = {}));
    /**
     * 数据绑定关系
     *
     * @export
     * @class DataBindLink
     */
    var DataBindLink = /** @class */ (function () {
        function DataBindLink(type, source, target, mode, options) {
            this._type = type;
            this._source = source;
            this._target = target;
            this._mode = mode;
            this._options = options;
        }
        Object.defineProperty(DataBindLink.prototype, "type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBindLink.prototype, "source", {
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBindLink.prototype, "target", {
            get: function () { return this._target; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBindLink.prototype, "mode", {
            get: function () { return this._mode; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBindLink.prototype, "options", {
            get: function () { return this._options; },
            enumerable: true,
            configurable: true
        });
        return DataBindLink;
    }());
    FWSData.DataBindLink = DataBindLink;
    //----------------------------------------------- 数据绑定管理器
    /**
     * 数据绑定管理器
     * @class DataBindManager
     */
    var DataBindManager = /** @class */ (function () {
        /**
         * Creates an instance of DataBindManager.
         *
         * @memberOf DataBindManager
         */
        function DataBindManager() {
            this._links = new Array();
        }
        /**
         * 通知数据改变事件
         * @param {EventArgs} e
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.distEvent = function (e) {
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
        };
        /**
         * 添加绑定关系
         * @param {string} type
         * @param {*} source
         * @param {*} target
         * @param {DataBindMode} mode
         * @param {*} options
         * @returns {void}
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.add = function (type, source, target, mode, options) {
            var link = this.find(source, target);
            if (link)
                return;
            link = new DataBindLink(type, source, target, mode, options);
            this._links.push(link);
        };
        /**
         * 查找绑定关系
         * @param {*} source
         * @param {*} target
         * @returns {DataBindLink}
         *
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.find = function (source, target) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source && link.target === target)
                    return link;
            }
            return null;
        };
        /**
         * 查找数据源
         * @param {*} source
         * @returns {DataBindLink}
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.findSource = function (source) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source)
                    return link;
            }
            return null;
        };
        /**
         * 查找目标
         * @param {*} target
         * @returns {DataBindLink}
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.findTarget = function (target) {
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.target === target)
                    return link;
            }
            return null;
        };
        /**
         * 获取绑定特定目标的数据源
         * @param {*} target
         * @returns {Array<DataBindLink>}
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.getBindSources = function (target) {
            var ret = new Array();
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.target === target) {
                    ret.push(link);
                }
            }
            return ret;
        };
        /**
         * 获取绑定特定数据源的目标
         * @param {*} source
         * @returns {Array<DataBindLink>}
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.getBindTargets = function (source) {
            var ret = new Array();
            for (var i = 0; i < this._links.length; i++) {
                var link = this._links[i];
                if (link.source === source) {
                    ret.push(link);
                }
            }
            return ret;
        };
        /**
         * 移除特定数据源和目标关系的绑定
         * @param {*} source
         * @param {*} target
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.removeLinksBy = function (source, target) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.source !== source || link.target !== target)
                    continue;
                this._links.splice(i, 1);
            }
        };
        /**
         * 移除所有特定数据源的绑定
         * @param {*} source
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.removeLinksBySource = function (source) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.source !== source)
                    continue;
                this._links.splice(i, 1);
            }
        };
        /**
         * 移除所有特定目标的绑定
         * @param {*} target
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.removeLinksByTarget = function (target) {
            for (var i = this._links.length - 1; i >= 0; i--) {
                var link = this._links[i];
                if (link.target !== target)
                    continue;
                this._links.splice(i, 1);
            }
        };
        /**
         * 移除所有绑定
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.removeAll = function () {
            this._links.splice(0, this._links.length);
        };
        /**
         * 对象属性改变
         * @private
         * @param {DataPropertyChangeEventArgs} e
         * @param {DataBindLink} lk
         * @param {boolean} twoway
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.onPropertiesChange = function (e, lk, twoway) {
            var src = null;
            var tag = null;
            var srcName = "";
            var tagName = "";
            //options { target: source }
            if (twoway) {
                //反向
                src = lk.target;
                tag = lk.source;
                srcName = e.propertyName;
                tagName = lk.options[srcName];
            }
            else {
                //正向
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
        };
        /**
         * 集合数据回调事件
         * @private
         * @param {DataListChangeEventArgs} e
         * @param {DataBindLink} lk
         * @param {boolean} twoway
         * @memberof DataBindManager
         */
        DataBindManager.prototype.onCollectionCallbackChange = function (e, lk, twoway) {
            if (typeof (lk.options) === "function") {
                if (lk.target) {
                    var fun = lk.options;
                    fun.call(lk.target, e);
                }
            }
        };
        /**
         * 列表成员改变
         * @private
         * @param {DataListChangeEventArgs} e
         * @param {DataBindLink} lk
         * @param {boolean} twoway
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.onListChange = function (e, lk, twoway) {
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
        };
        /**
         * 字典成员改变
         * @private
         * @param {DataDictChangeEventArgs} e
         * @param {DataBindLink} lk
         * @param {boolean} twoway
         * @memberOf DataBindManager
         */
        DataBindManager.prototype.onDictChange = function (e, lk, twoway) {
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
        };
        return DataBindManager;
    }());
    /**
     * 获取数据绑定管理器实例
     * @returns {DataBindManager}
     */
    function getDataBindManager() {
        if (!DataBindManager._isntance) {
            DataBindManager._isntance = new DataBindManager();
        }
        return DataBindManager._isntance;
    }
    //----------------------------------------------- 数据拷贝方法
    /**
     * 拷贝属性值
     * @export
     * @param {*} source
     * @param {*} target
     * @param {*} [options]
     */
    function copyProperties(source, target, options) {
        if (!options)
            return;
        if (source === null)
            return;
        if (source === undefined)
            return;
        if (target === null)
            return;
        if (target === undefined)
            return;
        for (var k in options) {
            var v = options[k];
            // var v1: any = target[k];
            // var v2: any = source[v];
            // console.log("(DataBind) copyProperties " + k + " = " + v);
            // v1 = (v1 === null || v1 === undefined) ? "NULL" : v1;
            // v2 = (v2 === null || v2 === undefined) ? "NULL" : v2;
            // console.log("(DataBind) 1 # copyProperties(value) target = " + v1 + ", source = " + v2);
            target[k] = source[v];
            // v1 = target[k];
            // v2 = source[v];
            // v1 = (v1 === null || v1 === undefined) ? "NULL" : v1;
            // v2 = (v2 === null || v2 === undefined) ? "NULL" : v2;
            // console.log("(DataBind) 2 # copyProperties(value) target = " + v1 + ", source = " + v2);
        }
    }
    FWSData.copyProperties = copyProperties;
    /**
     * 拷贝列表成员
     * @export
     * @param {*} source
     * @param {*} target
     * @param {*} [options]
     */
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
    /**
     * 拷贝字典成员
     * @export
     * @param {*} source
     * @param {*} target
     * @param {*} [options]
     */
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
    //----------------------------------------------- 数据绑定方法
    /**
     * 建立数据属性绑定
     * @export
     * @param {*} source
     * @param {*} target
     * @param {DataBindMode} mode
     * @param {*} options
     */
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
    /**
     * 绑定集合
     * @export
     * @param {*} source
     * @param {*} target
     * @param {*} Function
     */
    function bindCollectionCallback(source, target, options) {
        if (source && target && source !== target) { }
        else
            return;
        if (typeof (options) !== "function")
            return;
        getDataBindManager().add("CollectionCallback", source, target, DataBindMode.OneWay, options);
    }
    FWSData.bindCollectionCallback = bindCollectionCallback;
    /**
     * 解除特定数据源和目标的数据绑定
     * @export
     * @param {*} source
     * @param {*} target
     */
    function unbind(source, target) {
        getDataBindManager().removeLinksBy(source, target);
    }
    FWSData.unbind = unbind;
    /**
     * 解除数据源的数据绑定
     * @export
     * @param {*} source
     */
    function unbindBySource(source) {
        getDataBindManager().removeLinksBySource(source);
    }
    FWSData.unbindBySource = unbindBySource;
    /**
     * 解除目标对象的数据绑定
     * @export
     * @param {*} target
     */
    function unbindByTarget(target) {
        getDataBindManager().removeLinksByTarget(target);
    }
    FWSData.unbindByTarget = unbindByTarget;
    //----------------------------------------------- 依赖关系
    /**
     * 依赖属性 (提供属性值绑定的数据源的主要实现方法)
     * @export
     * @class DependentProperties
     */
    var DependentProperties = /** @class */ (function () {
        /**
         * 构造
         * @param {*} owner
         * @memberOf DependentProperties
         */
        function DependentProperties(owner) {
            this._owner = owner;
            this._properties = new Object();
        }
        /**
         * 获取属性值
         * @param {string} name
         * @param {*} [defValue]
         * @returns {*}
         * @memberOf DependentProperties
         */
        DependentProperties.prototype.get = function (name, defValue) {
            if (this._properties.hasOwnProperty(name)) {
                return this._properties[name];
            }
            return defValue;
        };
        /**
         * 设置属性值
         * @param {string} name
         * @param {*} newValue
         * @memberOf DependentProperties
         */
        DependentProperties.prototype.set = function (name, newValue) {
            if (this._properties[name] === newValue)
                return false;
            var oldValue = this._properties[name];
            this._properties[name] = newValue;
            getDataBindManager().distEvent(new DataPropertyChangeEventArgs(this._owner, this._owner, name, newValue, oldValue));
            return true;
        };
        /**
         * 清空内容
         * @memberOf DependentProperties
         */
        DependentProperties.prototype.clear = function () {
            for (var k in this._properties) {
                delete this._properties[k];
            }
        };
        /**
         * 生成json字串
         */
        DependentProperties.prototype.toJSON = function () {
            return JSON.stringify(this._properties);
        };
        /**
         * 从json字串读取内容
         * @param {string} json
         * @memberOf DependentProperties
         */
        DependentProperties.prototype.fromJSON = function (json) {
            try {
                this._properties = JSON.parse(json);
            }
            catch (err) {
            }
        };
        return DependentProperties;
    }());
    FWSData.DependentProperties = DependentProperties;
    /**
     * 依赖对象 (用于数据绑定的数据对象的抽象类)
     * @export
     * @class DependentObject
     */
    var DependentObject = /** @class */ (function () {
        /**
         * 构造
         * @memberOf DependentObject
         */
        function DependentObject() {
            this.__DP = new DependentProperties(this);
        }
        /**
         * 获取属性值
         * @private
         * @param {string} name
         * @param {*} [defValue]
         * @returns {*}
         * @memberOf DependentObject
         */
        DependentObject.prototype.get = function (name, defValue) {
            return this.__DP.get(name, defValue);
        };
        /**
         * 设置属性值
         * @param {string} name
         * @param {*} newValue
         *
         * @memberOf DependentObject
         */
        DependentObject.prototype.set = function (name, newValue) {
            return this.__DP.set(name, newValue);
        };
        /**
         * 清空属性值
         * @memberOf DependentObject
         */
        DependentObject.prototype.clear = function () {
            this.__DP.clear();
        };
        /**
         * 生成json字串
         * @returns {string}
         * @memberOf DependentObject
         */
        DependentObject.prototype.toJSON = function () {
            return this.__DP.toJSON();
        };
        /**
         * 从json字串读取内容
         * @param {string} json
         * @memberOf DependentObject
         */
        DependentObject.prototype.fromJSON = function (json) {
            this.__DP.fromJSON(json);
        };
        return DependentObject;
    }());
    FWSData.DependentObject = DependentObject;
    //----------------------------------------------- 数据结构和迭代器
    /**
     * 字典, 也就是通常的KV结构
     * @export
     * @class Dict
     * @template T
     */
    var Dict = /** @class */ (function () {
        /**
         * 构造
         */
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
        /**
         * 获取迭代器
         * @returns {IEnumerator}
         * @memberOf Dict
         */
        Dict.prototype.getEnumerator = function () {
            return new DictEnumerator(this);
        };
        /**
         * 克隆
         * @param {boolean} [deep]
         * @returns {*}
         *
         * @memberOf Dict
         */
        Dict.prototype.clone = function (deep) {
            var ret = new Dict();
            var ks = this.keys;
            for (var k in ks) {
                var v = this.getItem[k];
                ret.setItem(k, v);
            }
            return ret;
        };
        /**
         * 获取指定键的值
         * @param key 键
         */
        Dict.prototype.getItem = function (key) {
            return this._dict[key];
        };
        /**
         * 设置指定键的值
         * @param key 键
         * @param value 值
         */
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
        /**
         * 删除指定键以及值
         * @param key 键
         */
        Dict.prototype.deleteKey = function (key) {
            if (!this.containKey(key))
                return;
            var ret = this._dict[key];
            delete this._dict[key];
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Remove, this, key, ret, null));
        };
        /**
         * 判定是否包含指定的键
         * @param key 键
         */
        Dict.prototype.containKey = function (key) {
            // console.log("[TS]FWSData.Dict.containKey() ", key);
            // var keys: string[] = this.keys;
            // for (var i: number = 0; i < keys.length; i++)
            // {
            // 	console.log("[TS]FWSData.Dict.containKey.keys() ", i, keys[i]);
            // }
            return this.keys.indexOf(key) >= 0;
        };
        /**
         * 判定是否包含指定的值
         * @param value 值
         */
        Dict.prototype.containValue = function (value) {
            return this.values.indexOf(value) >= 0;
        };
        /**
         * 清空所有内容
         */
        Dict.prototype.clear = function () {
            if (this.count == 0)
                return;
            for (var key in this._dict) {
                delete this._dict[key];
            }
            getDataBindManager().distEvent(new DataDictChangeEventArgs(this, DataCollectionChangeType.Clear, this, null, null, null));
        };
        /**
         * 转换成普通对象
         */
        Dict.prototype.toObject = function () {
            var ret = new Object();
            for (var k in this._dict) {
                var v = this._dict[k];
                ret[k] = v;
            }
            return ret;
        };
        /**
         * 转换成字符串信息
         */
        Dict.prototype.toString = function () {
            return "Dict " + JSON.stringify(this._dict);
        };
        Object.defineProperty(Dict.prototype, "keys", {
            /**
             * 获取所有的键名称
             */
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
            /**
             * 获取所有的值
             */
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
            /**
             * 获取包含的数据数量
             */
            get: function () {
                return this.keys.length;
            },
            enumerable: true,
            configurable: true
        });
        return Dict;
    }());
    FWSData.Dict = Dict;
    /**
     * 字典迭代器
     * @export
     * @class DictEnumerator
     * @implements {IEnumerator}
     */
    var DictEnumerator = /** @class */ (function () {
        /**
         * 构造
         * @param {Dict<any>} dict
         * @memberOf DictEnumerator
         */
        function DictEnumerator(dict) {
            this._dict = dict;
            this.reset();
        }
        /**
         * 重置迭代器
         * @memberOf DictEnumerator
         */
        DictEnumerator.prototype.reset = function () {
            this._keys = this._dict.keys;
            this._values = this._dict.values;
            this._index = 0;
        };
        /**
         * 移至下一个
         * @memberOf DictEnumerator
         */
        DictEnumerator.prototype.moveNext = function () {
            this._index++;
        };
        /**
         * 获取当前项
         * @returns {*}
         * @memberOf DictEnumerator
         */
        DictEnumerator.prototype.getCurrent = function () {
            return this._values[this._index];
        };
        /**
         * 获取当前迭代是否已经结束
         * @returns {boolean}
         * @memberOf DictEnumerator
         */
        DictEnumerator.prototype.end = function () {
            if (this._dict && this._values && this._index >= 0 && this._index < this._values.length) {
                return false;
            }
            return true;
        };
        return DictEnumerator;
    }());
    FWSData.DictEnumerator = DictEnumerator;
    /**
     * 支持数据变动通知的列表数据结构, 建议用它替代Array来处理客户端的常见数组需求, 需要涉及增删改的数据逻辑, 以及界面逻辑或者以后的界面组件
     * @export
     * @class List
     * @template T 成员的类型
     */
    var List = /** @class */ (function () {
        /**
         * 构造
         */
        function List(ary, cloneAry) {
            if (ary === void 0) { ary = null; }
            if (cloneAry === void 0) { cloneAry = false; }
            /**
             * 是否开启事件通知
             * @type {boolean}
             * @memberOf List
             */
            this.eventEnabled = false;
            if (ary !== null && ary !== undefined) {
                if (cloneAry) {
                    this._list = ary.slice(0);
                }
                else {
                    this._list = ary;
                }
            }
            else {
                this._list = new Array();
            }
        }
        List.prototype.dump = function (handle, desc) {
            if (desc === void 0) { desc = ""; }
            if (!handle)
                return;
            if (desc) {
                console.log("-- " + desc + " --");
            }
            for (var i = 0; i < this._list.length; i++) {
                var item = this._list[i];
                var itemStr = handle(item);
                if (itemStr === null || itemStr === undefined)
                    itemStr = "";
                console.log("list::dump", i, itemStr);
            }
        };
        /** 排序 */
        List.prototype.sort = function (sortHandler) {
            try {
                this._list.sort(sortHandler);
            }
            catch (err) { }
        };
        /**
         * 克隆一个新的列表对象, 并且包含相同的成员
         * @param {boolean} [deep] 是否使用深度克隆 (暂时没有实现深度克隆)
         * @returns {*}
         * @memberOf List
         */
        List.prototype.clone = function (deep) {
            var ret = new List();
            for (var i = 0; i < this._list.length; i++) {
                ret.add(this._list[i]);
            }
            return ret;
        };
        /**
         * 同步至数组的内容
         * @param {Array<T>} ary
         * @memberOf List
         */
        List.prototype.sync = function (ary) {
            if (ary === null)
                return;
            if (ary === undefined)
                return;
            for (var i = this._list.length - 1; i >= 0; i--) {
                var item = this._list[i];
                if (ary.indexOf(item) < 0)
                    this.removeAt(i);
            }
            for (var i = 0; i < ary.length; i++) {
                var item = ary[i];
                if (this._list.indexOf(item) < 0)
                    this.add(item);
            }
        };
        /**
         * 获取迭代器
         * @returns {IEnumerator}
         * @memberOf List
         */
        List.prototype.getEnumerator = function () {
            return new ListEnumerator(this);
        };
        /**
         * 获取指定索引的项目
         * @param index 索引
         */
        List.prototype.at = function (index) {
            if (index >= 0 && index < this._list.length) {
                return this._list[index];
            }
            else {
                return null;
            }
        };
        /**
         * 设置指定索引的项目
         * @param {T} item 项目
         * @param {number} index 索引
         * @memberOf List
         */
        List.prototype.modify = function (item, index) {
            if (index < 0 || index >= this._list.length)
                return;
            if (this._list[index] === item)
                return;
            var oldValue = this._list[index];
            this._list[index] = item;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Modify, this, index, item, oldValue));
        };
        /**
         * 添加项目
         * @param item 项目
         */
        List.prototype.add = function (item) {
            this._list.push(item);
            if (this.eventEnabled)
                getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this._list.length - 1, item, null));
            return item;
        };
        /** 添加一个数组的所有成员 */
        List.prototype.addArray = function (itemArray) {
            for (var i = 0; i < itemArray.length; i++) {
                this.add(itemArray[i]);
            }
            return itemArray.length;
        };
        /**
         * 移除项目
         * @param item 项目
         */
        List.prototype.remove = function (item) {
            var i = this._list.indexOf(item);
            if (i < 0)
                return;
            this._list.splice(i, 1);
            if (this.eventEnabled)
                getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, i, null, item));
            return item;
        };
        /**
         * 插入项目
         * @param item 项目
         * @param index 索引
         */
        List.prototype.insert = function (item, index) {
            if (this._list.length > 0) {
                if (index < 0 || index > this._list.length - 1)
                    return;
                this._list.splice(index, 0, item);
            }
            else {
                index = this._list.length;
                this._list.push(item);
            }
            if (this.eventEnabled)
                getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, index, item, null));
            return item;
        };
        /**
         * 移除指定索引的项目
         * @param index 索引
         */
        List.prototype.removeAt = function (index) {
            var ret = this._list[index];
            this._list.splice(index, 1);
            if (this.eventEnabled)
                getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, index, null, ret));
            return ret;
        };
        /**
         * 清空所有项目
         */
        List.prototype.clear = function () {
            if (this._list.length == 0)
                return;
            this._list.splice(0, this._list.length);
            if (this.eventEnabled)
                getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        };
        /**
         * 查找项目
         * @param item 目标项目
         */
        List.prototype.indexOf = function (item) {
            return this._list.indexOf(item);
        };
        /**
         * 转换成普通数组
         */
        List.prototype.toArray = function () {
            return this._list.slice(0);
        };
        /**
         * 转换成字符串信息
         */
        List.prototype.toString = function () {
            return "List [" + this._list.toString() + "]";
        };
        /**
         * 使用分隔符将所有成员拼成一个字符串
         */
        List.prototype.join = function (separator) {
            return this._list.join(separator);
        };
        Object.defineProperty(List.prototype, "length", {
            /**
             * 获取长度
             */
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    }());
    FWSData.List = List;
    /**
     * 列表迭代器
     * @export
     * @class ListEnumerator
     * @implements {IEnumerator}
     */
    var ListEnumerator = /** @class */ (function () {
        /**
         * 构造
         * @param {List<any>} list
         * @memberOf ListEnumerator
         */
        function ListEnumerator(list) {
            this._list = list;
            this.reset();
        }
        /**
         * 重置迭代器
         * @memberOf ListEnumerator
         */
        ListEnumerator.prototype.reset = function () {
            this._index = 0;
        };
        /**
         * 移至下一个
         * @memberOf ListEnumerator
         */
        ListEnumerator.prototype.moveNext = function () {
            this._index++;
        };
        /**
         * 获取当前项
         * @returns {*}
         * @memberOf ListEnumerator
         */
        ListEnumerator.prototype.getCurrent = function () {
            return this._list.at(this._index);
        };
        /**
         * 获取当前迭代是否已经结束
         * @returns {boolean}
         * @memberOf ListEnumerator
         */
        ListEnumerator.prototype.end = function () {
            if (this._list && this._index >= 0 && this._index < this._list.length) {
                return false;
            }
            return true;
        };
        return ListEnumerator;
    }());
    FWSData.ListEnumerator = ListEnumerator;
    /**
     * 队列
     * @export
     * @class Queue
     * @template T
     */
    var Queue = /** @class */ (function () {
        /**
         * 构造
         * @memberOf Queue
         */
        function Queue() {
            this._list = new Array();
        }
        /**
         * 克隆
         * @param {boolean} [deep]
         * @returns {*}
         * @memberOf Queue
         */
        Queue.prototype.clone = function (deep) {
            var ret = new Queue();
            for (var i = 0; i < this._list.length; i++) {
                ret.add(this._list[i]);
            }
            return ret;
        };
        /**
         * 获取迭代器
         * @returns {IEnumerator}
         *
         * @memberOf Queue
         */
        Queue.prototype.getEnumerator = function () {
            return new QueueEnumrator(this);
        };
        /**
         * 添加一个成员到队列尾部
         * @param {T} item
         * @memberOf Queue
         */
        Queue.prototype.add = function (item) {
            this._list.push(item);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this.length - 1, item, null));
        };
        /**
         * 从队列头部移除一个成员
         * @returns {T}
         * @memberOf Queue
         */
        Queue.prototype.remove = function () {
            var ret = null;
            if (this._list.length > 0)
                ret = this._list.shift();
            else
                return null;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, 0, ret, null));
            return ret;
        };
        /**
         * 清空整个队列
         * @memberOf Queue
         */
        Queue.prototype.clear = function () {
            this._list.splice(0, this._list.length);
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        };
        /**
         * 转换成普通数组
         * @memberOf Queue
         */
        Queue.prototype.toArray = function () {
            return this._list.slice(0);
        };
        /**
         * 转换成文本信息
         * @returns {string}
         * @memberOf Queue
         */
        Queue.prototype.toString = function () {
            return "Queue[" + this._list.toString() + "]";
        };
        Object.defineProperty(Queue.prototype, "length", {
            /**
             * 返回队列成员数量
             * @readonly
             * @type {number}
             * @memberOf Queue
             */
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queue.prototype, "current", {
            /**
             * 返回队列头部的成员
             * @readonly
             * @type {T}
             * @memberOf Queue
             */
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
    /**
     * 队列迭代器
     * @export
     * @class QueueEnumrator
     * @implements {IEnumerator}
     */
    var QueueEnumrator = /** @class */ (function () {
        /**
         * 构造
         * @param {Queue<any>} queue
         * @memberOf QueueEnumrator
         */
        function QueueEnumrator(queue) {
            this._queue = queue;
            this.reset();
        }
        /**
         * 重置
         * @memberOf QueueEnumrator
         */
        QueueEnumrator.prototype.reset = function () {
            this._temp = this._queue.clone();
        };
        /**
         * 移至下一个
         * @memberOf QueueEnumrator
         */
        QueueEnumrator.prototype.moveNext = function () {
            this._temp.remove();
        };
        /**
         * 获取当前项
         * @returns {*}
         * @memberOf QueueEnumrator
         */
        QueueEnumrator.prototype.getCurrent = function () {
            return this._temp.current;
        };
        /**
         * 获取当前迭代是否已经结束
         * @returns {boolean}
         *
         * @memberOf QueueEnumrator
         */
        QueueEnumrator.prototype.end = function () {
            return !(this._temp && this._temp.length >= 1);
        };
        return QueueEnumrator;
    }());
    FWSData.QueueEnumrator = QueueEnumrator;
    /**
     * 树形节点
     * @export
     * @class Node
     * @template T
     */
    var Node = /** @class */ (function () {
        /**
         * Creates an instance of Node.
         * @memberOf Node
         */
        function Node(id) {
            this._nodes = new List();
            this._id = id;
        }
        /**
         * 获取迭代器
         * @returns {IEnumerator}
         * @memberOf Node
         */
        Node.prototype.getEnumerator = function () {
            return new NodeEnumrator(this);
        };
        /**
         * 克隆节点
         * @param {boolean} [deep]
         * @returns {*}
         * @memberOf Node
         */
        Node.prototype.clone = function (deep) {
            var ret = new Node(this._id);
            for (var i = 0; i < this._nodes.length; i++) {
                var c = this._nodes.at(i);
                if (deep)
                    c = c.clone(deep);
                ret.add(c);
            }
            return ret;
        };
        /**
         * 清空所有子节点
         * @memberOf Node
         */
        Node.prototype.clear = function () {
            for (var i = 0; i < this._nodes.length; i++) {
                var node = this._nodes[i];
                node._parentNode = null;
            }
            this._nodes.clear();
        };
        /**
         * 添加一个子节点
         * @param {Node<T>} node
         * @returns {Node<T>}
         * @memberOf Node
         */
        Node.prototype.add = function (node) {
            node._parentNode = this;
            return this._nodes.add(node);
        };
        /**
         * 插入一个子节点
         * @param {Node<T>} node
         * @param {number} index
         * @returns {Node<T>}
         * @memberOf Node
         */
        Node.prototype.insert = function (node, index) {
            var ret = node;
            node._parentNode = this;
            return ret;
        };
        /**
         * 移除子节点
         * @param {Node<T>} node
         * @returns {Node<T>}
         * @memberOf Node
         */
        Node.prototype.remove = function (node) {
            node._parentNode = null;
            return this._nodes.remove(node);
        };
        /**
         * 移除指定索引的子节点
         * @param {number} index
         * @returns {Node<T>}
         * @memberOf Node
         */
        Node.prototype.removeAt = function (index) {
            var ret = this._nodes.at(index);
            this._nodes.removeAt(index);
            ret._parentNode = null;
            return ret;
        };
        /**
         * 从节点的父级移除
         * @memberOf Node
         */
        Node.prototype.removeFromParent = function () {
            if (this._parentNode) {
                this._parentNode.remove(this);
            }
        };
        /**
         * 获取指定索引的子节点
         * @param {number} index
         * @returns {Node<T>}
         * @memberOf Node
         */
        Node.prototype.at = function (index) {
            var ret = this._nodes.at(index);
            return ret;
        };
        /**
         * 搜索特定子节点的索引
         * @param {Node<T>} node
         * @returns {number}
         *
         * @memberOf Node
         */
        Node.prototype.indexOf = function (node) {
            return this._nodes.indexOf(node);
        };
        /**
         * 查找到定ID的节点
         * @param {string} id
         * @returns {Node<T>}
         * @memberOf Node
         */
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
        /**
         * 查找指定数据的节点
         * @param {T} d
         * @returns {Node<T>}
         * @memberOf Node
         */
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
        /**
         * 获取节点到根的逐级节点
         * @returns {Array<Node<T>>}
         * @memberOf Node
         */
        Node.prototype.getParentNodes = function () {
            var ret = new Array();
            var temp = this;
            while (temp) {
                ret.splice(0, 0, temp);
                temp = temp.parentNode;
            }
            return ret;
        };
        /**
         * 获取与另一个节点的共同父级节点
         * @param {Node<T>} node
         * @returns {Node<T>}
         * @memberOf Node
         */
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
            //---------------------- refs
            /**
             * 获取第一个子节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                if (this._nodes.length > 0) {
                    return this._nodes.at(0);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "lastChild", {
            /**
             * 获取最后一个子节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                if (this._nodes.length > 0) {
                    return this._nodes.at(this._nodes.length - 1);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "firstNode", {
            /**
             * 获取第一个同级节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                if (this._parentNode)
                    return this._parentNode.firstChild;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "prevNode", {
            /**
             * 获取上一个同级节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
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
            /**
             * 获取下一个同级节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                if (this._parentNode) {
                    var i = this._parentNode.indexOf(this);
                    if (i >= this._parentNode.length)
                        return null;
                    if (i < 0)
                        return null;
                    return this._parentNode.at(i + 1);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "lastNode", {
            /**
             * 获取最后一个同级节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                if (this._parentNode)
                    return this._parentNode.lastChild;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "data", {
            /**
             * 获取数据
             * @type {T}
             * @memberOf Node
             */
            get: function () {
                return this._data;
            },
            /**
             * 设置数据
             * @memberOf Node
             */
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取字符串信息
         * @returns {string}
         * @memberOf Node
         */
        Node.prototype.toString = function () {
            var temp = this._data;
            if (temp || temp === 0 || temp === false) {
                return "Node " + JSON.stringify(this._data);
            }
            else
                return "Node {}";
        };
        Object.defineProperty(Node.prototype, "length", {
            //---------------------- properties
            /**
             * 获取子节点的数量
             * @readonly
             * @type {number}
             * @memberOf Node
             */
            get: function () {
                return this._nodes.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "parentNode", {
            /**
             * 获取父级节点实例
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
            get: function () {
                return this._parentNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "id", {
            /**
             * 获取当前节点的ID
             * @readonly
             * @type {string}
             * @memberOf Node
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "level", {
            /**
             * 获取当前节点的深度级别
             * @readonly
             * @type {number}
             * @memberOf Node
             */
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
            /**
             * 获取根节点
             * @readonly
             * @type {Node<T>}
             * @memberOf Node
             */
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
            /**
             * 获取节点路径
             * @readonly
             * @type {string}
             * @memberOf Node
             */
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
    /**
     * 树形节点迭代器
     * @export
     * @class NodeEnumrator
     * @implements {IEnumerator}
     */
    var NodeEnumrator = /** @class */ (function () {
        /**
         * 构造
         * @param {Node<any>} node
         * @memberOf NodeEnumrator
         */
        function NodeEnumrator(node) {
            this._node = node;
            this.reset();
        }
        /**
         * 重置迭代器
         */
        NodeEnumrator.prototype.reset = function () {
            this._temp = this._node; //.clone();
        };
        /**
         * 下一个
         * @returns {void}
         * @memberOf NodeEnumrator
         */
        NodeEnumrator.prototype.moveNext = function () {
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
        };
        /**
         * 获取当前项目
         * @returns {*}
         * @memberOf NodeEnumrator
         */
        NodeEnumrator.prototype.getCurrent = function () {
            return this._temp;
        };
        /**
         * 获取迭代器是否已经结束
         * @returns {boolean}
         * @memberOf NodeEnumrator
         */
        NodeEnumrator.prototype.end = function () {
            return !this._temp;
        };
        return NodeEnumrator;
    }());
    FWSData.NodeEnumrator = NodeEnumrator;
    /**
     * 栈
     */
    var Stack = /** @class */ (function () {
        /**
         * 构造
         * @memberOf Stack
         */
        function Stack() {
            this._list = new Array();
        }
        /**
         * 获取一个迭代器
         * @returns {IEnumerator}
         * @memberOf Stack
         */
        Stack.prototype.getEnumerator = function () {
            return new StackEnumrator(this);
        };
        /**
         * 克隆
         * @param {boolean} [deep]
         * @returns {*}
         * @memberOf Stack
         */
        Stack.prototype.clone = function (deep) {
            var ret = new Stack();
            for (var i = 0; i < this._list.length; i++) {
                ret.add(this._list[i]);
            }
            return ret;
        };
        /**
         * 清空内容
         * @memberOf Stack
         */
        Stack.prototype.clear = function () {
            this._list.splice(0, this._list.length);
        };
        /**
         * 添加一个成员
         * @param {T} item
         * @returns {T}
         * @memberOf Stack
         */
        Stack.prototype.add = function (item) {
            this._list.push(item);
            return item;
        };
        /**
         * 移除一个成员
         * @returns {T}
         * @memberOf Stack
         */
        Stack.prototype.remove = function () {
            if (this._list.length > 0) {
                return this._list.pop(); //[this._list.length - 1];
            }
            return null;
        };
        /**
         * 转换成普通数组
         * @returns {Array<any>}
         * @memberOf Stack
         */
        Stack.prototype.toArray = function (clone) {
            if (clone === void 0) { clone = true; }
            if (clone) {
                return this._list.slice(0);
            }
            else {
                return this._list;
            }
        };
        Stack.prototype.indexOf = function (item) {
            return this._list.indexOf(item);
        };
        /**
         * 获取字符串信息
         * @returns {string}
         * @memberOf Stack
         */
        Stack.prototype.toString = function () {
            return "Stack[" + this._list.toString() + "]";
        };
        Object.defineProperty(Stack.prototype, "current", {
            /**
             * 获取当前项
             * @readonly
             * @type {T}
             * @memberOf Stack
             */
            get: function () {
                if (this._list.length > 0) {
                    return this._list[this._list.length - 1];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stack.prototype, "length", {
            /**
             * 获取长度
             * @readonly
             * @type {number}
             * @memberOf Stack
             */
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        return Stack;
    }());
    FWSData.Stack = Stack;
    /**
     * 栈迭代器
     * @export
     * @class StackEnumrator
     * @implements {IEnumerator}
     */
    var StackEnumrator = /** @class */ (function () {
        /**
         * 构造
         * @param {Stack<any>} stack
         *
         * @memberOf StackEnumrator
         */
        function StackEnumrator(stack) {
            this._index = 0;
            this._stack = stack;
            this.reset();
        }
        /**
         * 重置迭代器
         * @memberOf StackEnumrator
         */
        StackEnumrator.prototype.reset = function () {
            this._temp = this._stack.toArray();
            this._index = this._temp.length - 1;
        };
        /**
         * 移至下一个
         * @memberOf StackEnumrator
         */
        StackEnumrator.prototype.moveNext = function () {
            this._index--;
        };
        /**
         * 获取当前项
         * @returns {*}
         * @memberOf StackEnumrator
         */
        StackEnumrator.prototype.getCurrent = function () {
            if (this._index >= 0 && this._index < this._temp.length) {
                return this._temp[this._index];
            }
            return null;
        };
        /**
         * 获取当前迭代是否已经结束
         * @returns {boolean}
         * @memberOf StackEnumrator
         */
        StackEnumrator.prototype.end = function () {
            if (this._index >= this._temp.length)
                return true;
            if (this._index < 0)
                return true;
            return false;
        };
        return StackEnumrator;
    }());
    FWSData.StackEnumrator = StackEnumrator;
    /**
     * 环形结构
     * @export
     * @class Ring
     * @implements {IEnumerable}
     * @implements {ICloneable}
     * @template T
     */
    var Ring = /** @class */ (function () {
        function Ring() {
            this._list = new Array();
        }
        /**
         * 克隆
         * @param {boolean} [deep]
         * @returns {*}
         * @memberOf Ring
         */
        Ring.prototype.clone = function (deep) {
            var ret = new Ring();
            ret.count = this.count;
            for (var i = 0; i < this._list.length; i++) {
                ret.set(this._list[i], i);
            }
            return ret;
        };
        /**
         * 获取迭代器
         * @returns {IEnumerator}
         * @memberOf Ring
         */
        Ring.prototype.getEnumerator = function () {
            return new RingEnumrator(this);
        };
        /**
         * 获取指定索引
         * @protected
         * @param {number} index
         * @param {number} offset
         * @returns {number}
         * @memberOf Ring
         */
        Ring.prototype.getIndex = function (index, offset) {
            var ret = index + offset;
            while (ret < 0) {
                ret += this._list.length;
            }
            ret = ret % this._list.length;
            return ret;
        };
        /**
         * 清空内容
         * @memberOf Ring
         */
        Ring.prototype.clear = function () {
            if (this._list.length === 0)
                return;
            for (var i = 0; i < this._list.length; i++) {
                this._list[i] = null;
            }
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Clear, this, 0, null, null));
        };
        /**
         * 获取指定索引的内容
         * @param {number} index
         * @param {number} [offset=0]
         * @returns {T}
         * @memberOf Ring
         */
        Ring.prototype.get = function (index, offset) {
            if (offset === void 0) { offset = 0; }
            var i = this.getIndex(index, offset);
            return this._list[i];
        };
        /**
         * 设置指定索引的内容
         * @param {T} item
         * @param {number} index
         * @param {number} [offset=0]
         * @memberOf Ring
         */
        Ring.prototype.set = function (item, index, offset) {
            if (offset === void 0) { offset = 0; }
            var i = this.getIndex(index, offset);
            var oldValue = this._list[i];
            if (oldValue === item)
                return;
            this._list[i] = item;
            getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Modify, this, index, item, oldValue));
        };
        Object.defineProperty(Ring.prototype, "count", {
            /**
             * 获取数量
             * @type {number}
             * @memberOf Ring
             */
            get: function () {
                return this._list.length;
            },
            /**
             * 设置数量
             * @memberOf Ring
             */
            set: function (v) {
                var offset = v - this._list.length;
                if (offset === 0)
                    return;
                if (offset > 0) {
                    for (var i = 0; i < offset; i++) {
                        this._list.push(null);
                        getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Add, this, this._list.length - 1, null, null));
                    }
                }
                else {
                    offset = Math.abs(offset);
                    for (var i = 0; i < offset; i++) {
                        var index = this._list.length - 1;
                        var oldValue = this._list.pop();
                        getDataBindManager().distEvent(new DataListChangeEventArgs(this, DataCollectionChangeType.Remove, this, index, null, oldValue));
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return Ring;
    }());
    FWSData.Ring = Ring;
    /**
     * 环形结构迭代器
     * @export
     * @class RingEnumrator
     * @implements {IEnumerator}
     */
    var RingEnumrator = /** @class */ (function () {
        /**
         * 构造
         * Creates an instance of RingEnumrator.
         * @param {Ring<any>} ring
         * @memberOf RingEnumrator
         */
        function RingEnumrator(ring) {
            this._ring = ring;
            this.reset();
        }
        /**
         * 重置迭代器
         * @memberOf RingEnumrator
         */
        RingEnumrator.prototype.reset = function () {
            this._index = 0;
        };
        /**
         * 移至下一个
         * @memberOf RingEnumrator
         */
        RingEnumrator.prototype.moveNext = function () {
            this._index++;
        };
        /**
         * 获取当前项
         * @returns {*}
         * @memberOf RingEnumrator
         */
        RingEnumrator.prototype.getCurrent = function () {
            return this._ring.get(this._index, this._offset);
        };
        /**
         * 获取当前迭代是否已经结束
         * @returns {boolean}
         * @memberOf RingEnumrator
         */
        RingEnumrator.prototype.end = function () {
            return this._ring.count <= 0 || this._index >= this._ring.count;
        };
        Object.defineProperty(RingEnumrator.prototype, "offset", {
            /**
             * 获取当前偏移索引
             * @type {number}
             * @memberOf RingEnumrator
             */
            get: function () {
                return this._offset;
            },
            /**
             * 设置当前偏移索引
             * @memberOf RingEnumrator
             */
            set: function (v) {
                this._offset = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RingEnumrator.prototype, "index", {
            /**
             * 获取当前索引
             * @readonly
             * @type {number}
             * @memberOf RingEnumrator
             */
            get: function () {
                if (this._ring.count <= 0)
                    return 0;
                var ret = this._index + this._offset;
                ret = ret % this._ring.count;
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        return RingEnumrator;
    }());
    FWSData.RingEnumrator = RingEnumrator;
    /**
     * 比较结果
     * @export
     * @enum {number}
     */
    var CompareResult;
    (function (CompareResult) {
        /**
         * 较小
         */
        CompareResult[CompareResult["LESS"] = -1] = "LESS";
        /**
         * 相等
         */
        CompareResult[CompareResult["EQUAL"] = 0] = "EQUAL";
        /**
         * 较大
         */
        CompareResult[CompareResult["GREATER"] = 1] = "GREATER";
    })(CompareResult = FWSData.CompareResult || (FWSData.CompareResult = {}));
    /**
     * 迭代遍历
     * @export
     * @param {IEnumerable} data
     * @param {Function} handler
     * @param {*} [target]
     * @returns {void}
     */
    function foreach(data, handler, target) {
        if (!data)
            return;
        if (!handler)
            return;
        var iter = data.getEnumerator();
        if (!iter)
            return;
        while (!iter.end()) {
            var item = iter.getCurrent();
            if (handler.call(target, item))
                break;
            iter.moveNext();
        }
    }
    FWSData.foreach = foreach;
})(FWSData || (FWSData = {}));
;
module.exports = FWSData;

cc._RF.pop();