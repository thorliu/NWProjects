/*
 * 关卡场景组件
 * @Author: 刘强 
 * @Date: 2018-10-22 11:56:07 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-30 16:31:25
 */

const { ccclass, property } = cc._decorator;

import EditorMsgs = require('../editor/core/EditorMsgs');

@ccclass
export default class StageComponent extends cc.Component
{
	/** 加载后 */
	public onLoad(): void
	{
		this.reset();
	}

	/** 激活时 */
	public onEnable(): void
	{
		this.reset();
		this.initEvents();
	}

	/** 屏蔽时 */
	public onDisable(): void
	{
		this.removeEvents();
	}

	/** 添加事件 */
	protected initEvents(): void
	{
		this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	}

	/** 移除事件 */
	protected removeEvents(): void
	{
		this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin);
		this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
		this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
		this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
	}

	//NOTE: -----

	/** 重置 */
	protected reset(): void
	{
		this.touchPressed = false;
		this.touchPressedPos = cc.Vec2.ZERO;
	}

	/** 是否已经按下 */
	protected touchPressed: boolean;
	/** 按下时的位置 */
	protected touchPressedPos: cc.Vec2;

	/** 按下时 */
	protected onTouchBegin(e: any): void
	{
		if (this.touchPressed) return;
		this.touchPressed = true;
		this.touchPressedPos = e.touch.getLocation();
		var curPos: cc.Vec2 = e.touch.getLocation();

		EditorMsgs.send<EditorMsgs.EditorTouchArgs>(EditorMsgs.Names.TouchBegin, {
			currentPos: curPos,
			pressedPos: curPos
		});
	}

	/** 移动时 */
	protected onTouchMove(e: any): void
	{
		if (!this.touchPressed) return;
		var curPos: cc.Vec2 = e.touch.getLocation();

		EditorMsgs.send<EditorMsgs.EditorTouchArgs>(EditorMsgs.Names.TouchMove, {
			currentPos: curPos,
			pressedPos: this.touchPressedPos
		});
	}

	/** 松开时 */
	protected onTouchEnd(e: any): void
	{
		if (!this.touchPressed) return;
		this.touchPressed = false;
		var curPos: cc.Vec2 = e.touch.getLocation();

		EditorMsgs.send<EditorMsgs.EditorTouchArgs>(EditorMsgs.Names.TouchEnd, {
			currentPos: curPos,
			pressedPos: this.touchPressedPos
		});
	}

	/** 取消时 */
	protected onTouchCancel(e: any): void
	{
		if (!this.touchPressed) return;
		this.touchPressed = false;
		var curPos: cc.Vec2 = e.touch.getLocation();

		EditorMsgs.send<EditorMsgs.EditorTouchArgs>(EditorMsgs.Names.TouchCancel, {
			currentPos: curPos,
			pressedPos: this.touchPressedPos
		});
	}


}