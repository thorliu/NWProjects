/*
 * 任务项
 * @Author: 刘强 
 * @Date: 2018-07-16 11:56:39 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:21:45
 */

import FWSCommon = require('../core/FWSCommon');



module FWSTask
{
	/** 表示一个基础的任务项 */
	export class Task
	{
		protected _alreadyBegin: boolean = false;
		protected _alreadyCompoleted: boolean = false;

		protected _beginTimer: number = 0;
		protected _endTimer: number = 0;

		constructor() { }

		public reset(): void
		{
			this._alreadyBegin = false;
			this._alreadyCompoleted = false;
		}

		public begin(): void
		{
			if (this._alreadyBegin) return;
			this._alreadyBegin = true;
			this._beginTimer = new Date().getTime();
			if (this.onBegin && this.onBegin.handler)
			{
				this.onBegin.handler.call(this.onBegin.target, this, this.onBegin.data);
			}
		}

		public cancel(): void
		{
			this._alreadyBegin = false;
			this._alreadyCompoleted = false;
		}

		public get completed(): boolean { return this._alreadyCompoleted; }

		public get progress(): number { return this._alreadyCompoleted ? 1 : 0; }
		public get beginTimer(): number { return this._beginTimer; }
		public get endTimer(): number { return this._endTimer; }
		public get useTime(): number 
		{
			if (this._endTimer <= 0 || this._beginTimer <= 0) return -1;
			return this._endTimer - this._beginTimer;
		}

		public onBegin: FWSCommon.CallbackHandler;
		public onProgress: FWSCommon.CallbackHandler;
		public onCompleted: FWSCommon.CallbackHandler;
		public onError: FWSCommon.CallbackHandler;
	}


	export class TaskList extends Task
	{
		protected _tasks: Task[] = [];
		public _taskIndex: number = 0;

		constructor()
		{
			super();
		}

		protected initTaskCallbacks(task: Task): void
		{
			task.onBegin = { handler: this.onTaskBegin, target: this, data: task };
			task.onCompleted = { handler: this.onTaskCompleted, target: this, data: task };
			task.onError = { handler: this.onTaskError, target: this, data: task };
			task.onProgress = { handler: this.onTaskProgress, target: this, data: task };
		}

		protected onTaskBegin(list: TaskList, task: Task): void
		{
		}

		protected onTaskCompleted(list: TaskList, task: Task): void
		{
			if (this.onProgress && this.onProgress.handler)
			{
				this.onProgress.handler.call(this.onProgress.target, this, task);
			}

			this._taskIndex++;

			// setTimeout(this.beginNextTask, 0, this);
			var self: TaskList = this;
			setTimeout(function ()
			{
				self.beginNextTask(self);
			}, 0);
		}

		protected onTaskProgress(list: TaskList, task: Task): void
		{
			if (this.onProgress && this.onProgress.handler)
			{
				this.onProgress.handler.call(this.onProgress.target, this, task);
			}
		}

		protected onTaskError(list: TaskList, task: Task): void
		{
			if (this.onError && this.onError.handler)
			{
				this.onError.handler.call(this.onError.target, this, task);
			}
		}

		protected beginNextTask(self: TaskList): void
		{
			console.log("this", this);
			console.log("self", self);

			if (self._taskIndex >= self._tasks.length)
			{
				self._alreadyCompoleted = true;
				self._endTimer = new Date().getTime();
				if (self.onCompleted && self.onCompleted.handler)
				{
					self.onCompleted.handler.call(self.onCompleted.target, self, self.onCompleted.data);
				}
				return;
			}

			var task: Task = self._tasks[self._taskIndex];
			self.initTaskCallbacks(task);
			task.begin();
		}

		public reset(): void
		{
			for (var i: number = 0; i < this._tasks.length; i++)
			{
				var task: Task = this._tasks[i];
				task.cancel();
				task.reset();
			}

			this._taskIndex = 0;
		}

		public begin(): void
		{
			this.beginNextTask(this);
			if (this.onBegin && this.onBegin.handler)
			{
				this.onBegin.handler.call(this.onBegin.target, this, this.onBegin.data);
			}
		}

		public cancel(): void
		{
			this.reset();
		}

		public add(task: Task): void
		{
			if (!task) return;
			this._tasks.push(task);
		}

		public get progress(): number
		{
			if (this._tasks.length > 0)
			{
				var ret: number = 0;
				var pre: number = 1.0 / this._tasks.length;

				for (var i: number = 0; i < this._tasks.length; i++)
				{
					ret += pre * this._tasks[i].progress;
				}
				return ret;
			}

			return 0;
		}
	}
}

export = FWSTask;