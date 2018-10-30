/*
 * 编辑器的MVC通知
 * @Author: 刘强 
 * @Date: 2018-10-27 18:01:31 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-30 16:30:23
 */

import FWSMvc = require('../../fws/mvc/FWSMvc');

module EditorMsgs
{
	/** 消息通知名称 */
	export enum Names
	{
		//NOTE: -----

		/** 加载关卡清单 */
		LoadStages,
		/** 加载关卡数据 */
		LoadStage,
		/** 保存关卡数据 */
		SaveStage,

		//NOTE: -----

		TouchBegin,
		TouchMove,
		TouchEnd,
		TouchCancel
	}

	/** 发送消息通知 */
	export function send<T>(name: Names, args: T = null, queue: string = ""): FWSMvc.FMessage<T>
	{
		var n: string = Names[name];
		var msg: FWSMvc.FMessage<T> = new FWSMvc.FMessage<T>(n, args, queue);
		msg.send();
		return msg;
	}

	//NOTE -------------------------------------------------

	/** 编辑器触摸事件参数 */
	export type EditorTouchArgs = {
		currentPos: cc.Vec2,
		pressedPos?: cc.Vec2
	}
}
export = EditorMsgs;