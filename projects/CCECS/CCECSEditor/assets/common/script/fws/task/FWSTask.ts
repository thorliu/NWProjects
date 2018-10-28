/*
 * 任务项
 * @Author: 刘强 
 * @Date: 2018-07-16 11:56:39 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-29 10:25:06
 */

import FWSCommon = require('../core/FWSCommon');
import FWSEnv = require('../FWSEnv');
import FWSTool = require('../utils/FWSTool');



module FWSTask
{
	/** 表示一个基础的任务项 */
	export class Task
	{
		protected _alreadyBegin: boolean = false;
		protected _alreadyCompoleted: boolean = false;

		protected _beginTimer: number = 0;
		protected _endTimer: number = 0;

		protected text: string;
		public logEnabled: boolean = true;

		constructor(text: string = "Task") 
		{
			this.text = text;
		}


		protected overTimeDelay: number = 10;
		protected overTimeHandler: number;
		/** 开始处理超时设定定 */
		protected overTimeBegin(delay: number = 10): void
		{
			if (!FWSEnv.DEBUG_REMOTE_LOADER_OVER_TIME_MODE) return;
			this.overTimeDelay = delay;
			this.overTimeEnd();
			var self = this;
			this.overTimeHandler = setTimeout(() =>
			{
				self.callListener(self.onError);
			}, this.overTimeDelay * 1000);
		}

		/** 结束处理超时设定 */
		protected overTimeEnd(): void
		{
			if (!FWSEnv.DEBUG_REMOTE_LOADER_OVER_TIME_MODE) return;
			clearTimeout(this.overTimeHandler);
		}

		protected callListener(listener: FWSCommon.CallbackHandler): void
		{
			if (listener && listener.handler)
			{
				if (listener === this.onCompleted)
				{
					this.overTimeEnd();
					this._alreadyCompoleted = true;

					this._endTimer = new Date().getTime();
					if (this.logEnabled) console.log(FWSTool.Str.format("(Loading) 耗时: {0} ms - {1}", this.useTime, this.toString(true)));
				}

				listener.handler.call(listener.target, this, this);
			}
		}

		public reset(): void
		{
			this._alreadyBegin = false;
			this._alreadyCompoleted = false;
		}

		public begin(): void
		{
			this._beginTimer = new Date().getTime();
			this.callListener(this.onBegin);
		}

		public cancel(): void
		{
			this._alreadyBegin = false;
			this._alreadyCompoleted = false;
		}

		protected toStringAddon(): string
		{
			return "";
		}

		public toString(useAddon: boolean = false): string
		{
			if (this.text === null || this.text === undefined)
			{
				return "Task" + (useAddon ? this.toStringAddon() : "");
			}
			else
			{
				return this.text + (useAddon ? this.toStringAddon() : "");
			}
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

		public _asyncMode: boolean = false;
		public get asyncMode(): boolean { return this._asyncMode; }
		public set asyncMode(v: boolean)
		{
			// this._asyncMode = v;  //还在调试中，有些问题，所以暂时注掉，不启用此功能
		}

		constructor(text: string = "TaskList")
		{
			super(text);
		}

		public get tasks(): Task[] { return this._tasks.slice(0); }

		protected initTaskCallbacks(task: Task): void
		{
			try
			{
				task.onBegin = { handler: this.onTaskBegin, target: this, data: task };
				task.onCompleted = { handler: this.onTaskCompleted, target: this, data: task };
				task.onError = { handler: this.onTaskError, target: this, data: task };
				task.onProgress = { handler: this.onTaskProgress, target: this, data: task };
			}
			catch (err)
			{
				debugger
			}
		}



		protected onTaskBegin(list: TaskList, task: Task): void
		{
		}

		protected onTaskCompleted(list: TaskList, task: Task): void
		{
			// if (this.onProgress && this.onProgress.handler)
			// {
			// 	this.onProgress.handler.call(this.onProgress.target, this, task);
			// }

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
			if (this.checkAllCompoleted())
			{
				self._alreadyCompoleted = true;
				if (self.onCompleted && self.onCompleted.handler)
				{
					self.onCompleted.handler.call(self.onCompleted.target, self, self.onCompleted.data);
				}
				return;
			}

			// if (self._taskIndex >= self._tasks.length)
			// {
			// 	self._alreadyCompoleted = true;
			// 	self._endTimer = new Date().getTime();
			// 	if (self.onCompleted && self.onCompleted.handler)
			// 	{
			// 		self.onCompleted.handler.call(self.onCompleted.target, self, self.onCompleted.data);
			// 	}
			// 	return;
			// }

			if (this.asyncMode) return;

			var task: Task = self._tasks[self._taskIndex];
			if (!task) return;

			self.initTaskCallbacks(task);
			task.begin();
		}

		protected checkAllCompoleted(): boolean
		{
			var ret: boolean = true;

			for (var i: number = 0; i < this._tasks.length; i++)
			{
				if (!this._tasks[i].completed)
				{
					ret = false;
					break;
				}
			}

			return ret;
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
			if (this.asyncMode)
			{
				for (var i: number = 0; i < this._tasks.length; i++)
				{
					var task: FWSTask.Task = this._tasks[i];
					this.initTaskCallbacks(task);
					task.begin();
				}
				return;
			}

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

	//NOTE: 简单快速的使用方法

	export type TaskQuickOptions = {
		/** 成功时回调 */
		success: Function,
		/** 失败时回调 */
		fail?: Function,
		/** 失败时是否自动重试 */
		retry?: boolean
	};

	/** 快速建列一个任务列表 */
	export function begin(callbacks: TaskQuickOptions, ...tasks: Task[]): TaskList
	{
		if (tasks === null || tasks === undefined || tasks.length === 0)
		{
			if (callbacks && callbacks.success) callbacks.success();
			return null;
		}

		var taskList: TaskList = new TaskList();

		for (var i: number = 0; i < tasks.length; i++)
		{
			taskList.add(tasks[i]);
		}

		taskList.onCompleted = {
			target: null,
			handler: () =>
			{
				if (callbacks && callbacks.success) callbacks.success();
			}
		}

		taskList.onError = {
			target: null,
			handler: () =>
			{
				if (callbacks && callbacks.success) callbacks.fail();
			}
		}

		return taskList;
	}

}

export = FWSTask;

