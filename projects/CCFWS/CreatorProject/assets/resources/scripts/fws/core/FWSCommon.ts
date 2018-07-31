/*
 * @Author: 刘强 
 * @Date: 2018-07-18 11:24:49 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:18:00
 */

///<reference path="../../../../../creator.d.ts"/>

import FWSMvc = require('../mvc/FWSMvc');
import FWSData = require('../data/FWSData');


module FWSCommon
{
	/** 用于存放回调方法 */
	export type YYCallbackHandler = {
		/** 回调函数 */
		handler: Function,
		/** 回调函数的目标对象，决定this是谁 */
		target: any,
		/** 附加数据对象 */
		data?: any
	}

	/** context 类型简写 */
	export type YYContext = FWSData.Node<FWSMvc.IContext>;

	/** 切换到指定id的context */
	export function gotoID(id:string):void
	{
		FWSMvc.ContextManager().gotoID(id);
	}
}

export = FWSCommon;