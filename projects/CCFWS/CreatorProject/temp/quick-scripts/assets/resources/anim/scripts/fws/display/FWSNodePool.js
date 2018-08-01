(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/anim/scripts/fws/display/FWSNodePool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '02e1fI3BYNPcJdocOjS4JXv', 'FWSNodePool', __filename);
// resources/scripts/fws/display/FWSNodePool.ts

/*
 * 显示对象池
 * @Author: 刘强
 * @Date: 2018-07-31 17:35:59
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:59:54
 */
var FWSNodePool;
(function (FWSNodePool) {
    /** 显示对象池 */
    var NodePool = /** @class */ (function () {
        /**
         * 构造
         * @param creator 创建方法
         * @param initedCount 初始数量
         * @param limitCount 限制数量 (负数或者0表示不限制)
         */
        function NodePool(creator, initedCount, limitCount) {
            if (initedCount === void 0) { initedCount = 0; }
            if (limitCount === void 0) { limitCount = -1; }
            this.used = [];
            this._pool = new cc.NodePool();
            this.creator = creator;
            this._initedCount = initedCount;
            this._limitCount = limitCount;
            this.createHandler();
        }
        /** 清除方法 */
        NodePool.prototype.clearHandler = function () {
            this.putAllHandler();
            this._pool.clear();
        };
        /** 创建方法 */
        NodePool.prototype.createHandler = function () {
            if (!this.creator)
                return;
            for (var i = 0; i < this._initedCount; i++) {
                var node = this.creator();
                if (node) {
                    this._pool.put(node);
                }
            }
        };
        /** 获取方法 */
        NodePool.prototype.getHandler = function () {
            var ret = null;
            if (this._pool.size() > 0) {
                ret = this._pool.get();
                if (!ret.isValid)
                    ret = null;
            }
            if (!ret && this._limitCount <= 0 && this.creator) {
                ret = this.creator();
            }
            if (ret) {
                this.used.push(ret);
            }
            return ret;
        };
        /** 放入方法 */
        NodePool.prototype.putHandler = function (node) {
            if (!node)
                return;
            var i = this.used.indexOf(node);
            if (i >= 0)
                this.used.splice(i, 1);
            if (!node.isValid)
                return;
            this._pool.put(node);
        };
        /** 收回所有内容 */
        NodePool.prototype.putAllHandler = function () {
            for (var i = 0; i < this.used.length; i++) {
                var node = this.used[i];
                if (!node.isValid)
                    continue;
                this._pool.put(node);
            }
            this.used.splice(0, this.used.length);
        };
        Object.defineProperty(NodePool.prototype, "limitCount", {
            /** 获取限制数量 */
            get: function () {
                return this._limitCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodePool.prototype, "initedCount", {
            /** 获取初始数量 */
            get: function () {
                return this._initedCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodePool.prototype, "usedCount", {
            /** 获了已经使用的数量 */
            get: function () {
                return this.used.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodePool.prototype, "freedCount", {
            /** 获取未使用的数量 */
            get: function () {
                return this._pool.size();
            },
            enumerable: true,
            configurable: true
        });
        /** 拿出对象 */
        NodePool.prototype.getNode = function () {
            return this.getHandler();
        };
        /** 收回指定对象 */
        NodePool.prototype.putNode = function (node) {
            this.putHandler(node);
        };
        /** 收回所有对象 */
        NodePool.prototype.putAllNodes = function () {
            this.putAllHandler();
        };
        /** 重置对象池 */
        NodePool.prototype.reset = function () {
            this.clearHandler();
            this.createHandler();
        };
        return NodePool;
    }());
    FWSNodePool.NodePool = NodePool;
})(FWSNodePool || (FWSNodePool = {}));
module.exports = FWSNodePool;

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
        //# sourceMappingURL=FWSNodePool.js.map
        