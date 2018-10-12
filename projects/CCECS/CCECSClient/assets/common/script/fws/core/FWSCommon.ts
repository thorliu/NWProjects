/*
 * 通用类型定义，方法简写之类的
 * @Author: 刘强 
 * @Date: 2018-07-18 11:24:49 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-29 20:05:49
 */

///<reference path="../../../../../creator.d.ts"/>

import FWSMvc = require('../mvc/FWSMvc');
import FWSData = require('../data/FWSData');
import UILayers = require('../display/UILayers');
import X = require('../utils/X');
import UIPopuper = require('../display/UIPopuper');



module FWSCommon
{
	/**
	 * OpenGL 混合公式类型
	 * @export
	 * @enum {number}
	 */
	export enum FWSBlendFactor
	{
		ZERO = 0,
		ONE = 1,
		SRC_COLOR = 0x300,
		ONE_MINUS_SRC_COLOR = 0x301,
		SRC_ALPHA = 0x302,
		ONE_MINUS_SRC_ALPHA = 0x303,
		DST_ALPHA = 0x304,
		ONE_MINUS_DST_ALPHA = 0x305,
		DST_COLOR = 0x306,
		ONE_MINUS_DST_COLOR = 0x307
	}


	/** 分享时的关键词变量 */
	export type ShareKeywords = {
		/** (自动) 当前玩家昵称 */
		myName?: string,
		/** (自动) 当前玩家的金币数 */
		myCoins?: number,
		//TODO: 看需求再补	
	}

	/** 用于存放回调方法 */
	export type CallbackHandler = {
		/** 回调函数 */
		handler: Function,
		/** 回调函数的目标对象，决定this是谁 */
		target: any,
		/** 附加数据对象 */
		data?: any
	}

	/** context 类型简写 */
	export type Context = FWSData.Node<FWSMvc.IContext>;
	var delayGoto: number;

	/** 切换到指定id的context */
	export function gotoID(id: string): void
	{
		FWSMvc.ContextManager().gotoID(id); 
	}

	//-------------------

	export function showLoading():void
	{
		UILayers.nodes().loading.active = true;
	}

	export function hideLoading():void
	{
		UILayers.nodes().loading.active = false;
	}

	//-------------------

	export enum PopupAnimEffects
	{
		None,
		Scale,
		Scroll
	}

	/** 
		 弹出窗口 
	 @param node {cc.Node} 窗口显示对象
	 @param topmost {boolean} true表示置顶窗口, false表示普通窗口
	 */
	export function popup(
		node: cc.Node,
		topmost: boolean = false,
		overlayer: boolean = true,
		popupAnimEffect: PopupAnimEffects = PopupAnimEffects.Scale
	): void
	{
		// X.trace("FWSCommon:popup", topmost, node, overlayer);
		UIPopuper.instance().open(node, topmost, overlayer);

		var ws: cc.Size = cc.director.getWinSize();
		var cs: cc.Size = node.getContentSize();
		var ps: cc.Vec2 = node.getPosition();

		switch (popupAnimEffect)
		{
			//中间弹出
			case PopupAnimEffects.Scale:
				node.stopAllActions();
				node.scale = 0;
				// node.runAction(cc.scaleTo(0.5, 1).easing(cc.easeBounceOut()));
				node.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
				break;

			//底部滑出
			case PopupAnimEffects.Scroll:
				node.stopAllActions();
				node.opacity = 0;
				node.runAction(
					cc.sequence(
						cc.delayTime(0),
						cc.moveTo(0, ws.width / 2, -ws.height / 2),
						cc.fadeIn(0),
						cc.moveTo(0.3, ws.width / 2, ws.height / 2).easing(cc.easeBackOut())
					)
				);
				break;
		}

		// window["TestPopupNode"] = node;
	}



	export function callInNextTick(callback, p1?, p2?):number
	{
		if (callback) 
		{
			return setTimeout(function () {
				callback(p1, p2);
			}, 0);
		}
		return -1;
	}
}

export = FWSCommon;

window["FWSCommon"] = FWSCommon;