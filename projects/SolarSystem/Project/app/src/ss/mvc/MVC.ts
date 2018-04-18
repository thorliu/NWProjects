/*
 * @Author: thor.liu 
 * @Date: 2018-04-18 15:29:13 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2018-04-18 16:02:36
 */

module MVC
{
	/** MVC消息 */
	export type MVCMessage = {
		/** 消息名称 */
		name: string,
		/** 消息参数 */
		args?: any
	}

	//#region Main进程

	// /**
	//  * 从Main进程发出通知
	//  * @param {MVCMessage} msg 
	//  */
	// export function notifyByMain(msg: MVCMessage): void
	// {
	// 	console.log("notifyByMain", msg);
	// }

	// /**
	//  * 在Main进程收到通知
	//  * @param {MVCMessage} msg 
	//  */
	// export function receiveByMain(msg: MVCMessage): void
	// {
	// 	console.log("receiveByMain", msg);
	// }

	//#endregion


	//#region Render进程

	// /**
	//  * 从Render进程发出通知
	//  * @param {MVCMessage} msg 
	//  */
	// export function notifyByRender(msg: MVCMessage): void
	// {
	// 	console.log("notifyByRender", msg);
	// }

	// /**
	//  * 在Render进程收到通知
	//  * @param {MVCMessage} msg 
	//  */
	// export function receiveByRender(msg: MVCMessage): void
	// {
	// 	console.log("receiveByRender", msg);
	// }

	//#endregion

}

export = MVC;