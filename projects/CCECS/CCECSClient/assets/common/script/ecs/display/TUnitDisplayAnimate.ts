/*
 * @Author: 刘强 
 * @Date: 2018-10-11 20:49:29 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 13:06:25
 */

const { ccclass, property } = cc._decorator;

import TDisplayCore = require('./TDisplayCore');
import FWSAssertCaches = require('../../fws/display/factory/FWSAssertCaches');
import FWSTool = require('../../fws/utils/FWSTool');

class TUnitFrameAnimateDelegate extends TDisplayCore.TFrameAnimateDelegate
{
	protected getDirectIndex(): number
	{
		return 0;
	}
	protected updateFrame(): void
	{
		var frameName: string = FWSTool.Str.format(this.frame, this.currentFrame, this.getDirectIndex());
		console.log(frameName);
		var spriteFrame: cc.SpriteFrame = FWSAssertCaches.getSpriteFrame(frameName, this.texture);
		this.sprite.spriteFrame = spriteFrame;
	}
}

@ccclass
export default class TUnitDisplayAnimate extends cc.Component
{
	/** 纹理名称 */
	@property(cc.String)
	public texture: string = "texture/main";

	/** 帧名称 */
	@property(cc.String)
	public frame: string = "frame_{0}";

	/** 第一帧 */
	@property(Number)
	public firstFrame: number = 1;

	/** 最后一帧 */
	@property(Number)
	public lastFrame: number = 3;

	/** 循环次数(-1表示无限) */
	@property(Number)
	public loopCount: number = -1;

	/** 帧率 */
	@property(Number)
	public fps: number = 30;

	//----

	protected sprite: cc.Sprite;
	protected anim: TUnitFrameAnimateDelegate;

	public onLoad(): void
	{
		this.sprite = this.node.getComponent(cc.Sprite);
		this.anim = new TUnitFrameAnimateDelegate(
			this.sprite,
			this.texture,
			this.frame,
			this.firstFrame,
			this.lastFrame,
			this.loopCount,
			this.fps
		);
	}

	public onEnable(): void
	{
		this.anim.start();
	}

	public update(d: number): void
	{
		this.anim.onTick(d);
	}
}