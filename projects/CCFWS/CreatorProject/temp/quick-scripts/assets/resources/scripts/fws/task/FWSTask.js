(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/fws/task/FWSTask.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8ebd7QI9bFC6oIxTjl1ccjs', 'FWSTask', __filename);
// resources/scripts/fws/task/FWSTask.ts

/*
 * 任务项
 * @Author: 刘强
 * @Date: 2018-07-16 11:56:39
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:21:45
 */
var FWSTask;
(function (FWSTask) {
    /** 表示一个基础的任务项 */
    var Task = /** @class */ (function () {
        function Task() {
            this._alreadyBegin = false;
            this._alreadyCompoleted = false;
            this._beginTimer = 0;
            this._endTimer = 0;
        }
        Task.prototype.reset = function () {
            this._alreadyBegin = false;
            this._alreadyCompoleted = false;
        };
        Task.prototype.begin = function () {
            if (this._alreadyBegin)
                return;
            this._alreadyBegin = true;
            this._beginTimer = new Date().getTime();
            if (this.onBegin && this.onBegin.handler) {
                this.onBegin.handler.call(this.onBegin.target, this, this.onBegin.data);
            }
        };
        Task.prototype.cancel = function () {
            this._alreadyBegin = false;
            this._alreadyCompoleted = false;
        };
        Object.defineProperty(Task.prototype, "completed", {
            get: function () { return this._alreadyCompoleted; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "progress", {
            get: function () { return this._alreadyCompoleted ? 1 : 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "beginTimer", {
            get: function () { return this._beginTimer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "endTimer", {
            get: function () { return this._endTimer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "useTime", {
            get: function () {
                if (this._endTimer <= 0 || this._beginTimer <= 0)
                    return -1;
                return this._endTimer - this._beginTimer;
            },
            enumerable: true,
            configurable: true
        });
        return Task;
    }());
    FWSTask.Task = Task;
    var TaskList = /** @class */ (function (_super) {
        __extends(TaskList, _super);
        function TaskList() {
            var _this = _super.call(this) || this;
            _this._tasks = [];
            _this._taskIndex = 0;
            return _this;
        }
        TaskList.prototype.initTaskCallbacks = function (task) {
            task.onBegin = { handler: this.onTaskBegin, target: this, data: task };
            task.onCompleted = { handler: this.onTaskCompleted, target: this, data: task };
            task.onError = { handler: this.onTaskError, target: this, data: task };
            task.onProgress = { handler: this.onTaskProgress, target: this, data: task };
        };
        TaskList.prototype.onTaskBegin = function (list, task) {
        };
        TaskList.prototype.onTaskCompleted = function (list, task) {
            if (this.onProgress && this.onProgress.handler) {
                this.onProgress.handler.call(this.onProgress.target, this, task);
            }
            this._taskIndex++;
            // setTimeout(this.beginNextTask, 0, this);
            var self = this;
            setTimeout(function () {
                self.beginNextTask(self);
            }, 0);
        };
        TaskList.prototype.onTaskProgress = function (list, task) {
            if (this.onProgress && this.onProgress.handler) {
                this.onProgress.handler.call(this.onProgress.target, this, task);
            }
        };
        TaskList.prototype.onTaskError = function (list, task) {
            if (this.onError && this.onError.handler) {
                this.onError.handler.call(this.onError.target, this, task);
            }
        };
        TaskList.prototype.beginNextTask = function (self) {
            console.log("this", this);
            console.log("self", self);
            if (self._taskIndex >= self._tasks.length) {
                self._alreadyCompoleted = true;
                self._endTimer = new Date().getTime();
                if (self.onCompleted && self.onCompleted.handler) {
                    self.onCompleted.handler.call(self.onCompleted.target, self, self.onCompleted.data);
                }
                return;
            }
            var task = self._tasks[self._taskIndex];
            self.initTaskCallbacks(task);
            task.begin();
        };
        TaskList.prototype.reset = function () {
            for (var i = 0; i < this._tasks.length; i++) {
                var task = this._tasks[i];
                task.cancel();
                task.reset();
            }
            this._taskIndex = 0;
        };
        TaskList.prototype.begin = function () {
            this.beginNextTask(this);
            if (this.onBegin && this.onBegin.handler) {
                this.onBegin.handler.call(this.onBegin.target, this, this.onBegin.data);
            }
        };
        TaskList.prototype.cancel = function () {
            this.reset();
        };
        TaskList.prototype.add = function (task) {
            if (!task)
                return;
            this._tasks.push(task);
        };
        Object.defineProperty(TaskList.prototype, "progress", {
            get: function () {
                if (this._tasks.length > 0) {
                    var ret = 0;
                    var pre = 1.0 / this._tasks.length;
                    for (var i = 0; i < this._tasks.length; i++) {
                        ret += pre * this._tasks[i].progress;
                    }
                    return ret;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return TaskList;
    }(Task));
    FWSTask.TaskList = TaskList;
})(FWSTask || (FWSTask = {}));
module.exports = FWSTask;

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
        //# sourceMappingURL=FWSTask.js.map
        