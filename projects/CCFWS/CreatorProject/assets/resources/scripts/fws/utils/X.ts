/*
 * 调试功能
 * @Author: 刘强 
 * @Date: 2018-07-31 15:40:50 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:16:01
 */

import FWSEnv = require('../FWSEnv');


module X
{
	/** 控制台颜色值 */
	export type ConsoleColor = "red" | "green" | "blue" | "orange" | "violet";

	/** 获取任意内容的文本信息 */
	function getString(args: any[]): string
	{
		var ret: string = "";
		var ary: string[] = [];
		if (args !== null && args !== undefined)
		{
			for (var i: number = 0; i < args.length; i++)
			{
				var a: any = args[i];
				if (a === null) ary.push("NULL");
				else if(a === undefined) ary.push("UNDEFINED");
				else ary.push(a.toString());
			}
		}
		ret = ary.join(" ");
		return ret;
	}

	/** 执行控制台指令 */
	function executeConsole(api:string, args:any[]):void
	{
		var handler:Function = console[api];
		if(!handler) return;

		if(FWSEnv.DEBUG_ADVANCED)
		{
			handler.apply(null, args);
		}
		else
		{
			handler.call(null, getString(args));
		}
	}

	/**
	 * 输出普通日志
	 * @param args 内容
	 */
	export function log(...args: any[]): void
	{
		if (!FWSEnv.DEBUG) return;

		executeConsole("log", args);
	}

	/**
	 * 输出信息日志
	 * @param args 内容
	 */
	export function info(...args: any[]): void
	{
		if (!FWSEnv.DEBUG) return;

		executeConsole("info", args);
	}

	/**
	 * 输出警告日志
	 * @param args 内容
	 */
	export function warn(...args: any[]): void
	{
		if (!FWSEnv.DEBUG) return;

		executeConsole("warn", args);
	}

	/**
	 * 输出借误日志
	 * @param args 内容
	 */
	export function error(...args: any[]): void
	{
		if (!FWSEnv.DEBUG) return;

		executeConsole("error", args);
	}

	/**
	 * 按照指定的颜色输出日志
	 * @param color {ConsoleColor} 按照
	 * @param args 任意内容
	 */
	export function color(color: ConsoleColor, ...args: any[]): void
	{
		if (!FWSEnv.DEBUG_ADVANCED) return;

		var msg:string = getString(args);
		console.log("%c" + msg, "color:"+ color);
	}

	/** 开始一段可展开和收起的日志项(展开状态) */
	export function group(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.group.apply(null, args);
		
	}

	/** 开始一段可展开和收起的日志项(收起状态) */
	export function groupCollapsed(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;
		console.groupCollapsed.apply(null, args);
	}

	/** 结束一段可展开和收起的日志项 */
	export function groupEnd():void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.groupEnd();
	}

	/** 表格形式输出数据 */
	export function table(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.table.apply(null, args);
	}

	/** 计时开始 */
	export function time(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.time();
	}

	/** 计时结束 */
	export function timeEnd(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.timeEnd();
	}

	/** 输出堆栈调用 */
	export function trace(...args:any[]):void
	{
		if(!FWSEnv.DEBUG_ADVANCED) return;

		console.trace.apply(null, args);
	}
}
export = X;

window["X"] = X;