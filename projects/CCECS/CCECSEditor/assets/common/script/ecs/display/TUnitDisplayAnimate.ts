/*
 * 单位动画组件
 * @Author: 刘强 
 * @Date: 2018-10-11 20:49:29 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-15 15:08:09
 */

const { ccclass, property } = cc._decorator;

import TDisplayCore = require('./TDisplayCore');
import FWSAssertCaches = require('../../fws/display/factory/FWSAssertCaches');
import FWSTool = require('../../fws/utils/FWSTool');
import TUnitDelegateComponent = require('../core/TUnitDelegateComponent');
import TUnitEntity = require('../components/TUnitEntity');


class TUnitFrameAnimateDelegate extends TDisplayCore.TFrameAnimateDelegate
{
	public direct: number = 0;
	public flip: boolean = true;

	protected getDirectIndex(): number
	{
		//TODO: 计算方向索引
		return 1;
	}
	protected updateFrame(): void
	{
		var frameName: string = FWSTool.Str.format(this.frame, this.currentFrame, this.getDirectIndex());
		// console.log(frameName);
		var spriteFrame: cc.SpriteFrame = FWSAssertCaches.getSpriteFrame(frameName, this.texture);
		this.sprite.spriteFrame = spriteFrame;
	}
}

@ccclass
export default class TUnitDisplayAnimate extends cc.Component
{
	/** 所属单位 */
	@property(cc.Node)
	public unitNode: cc.Node = null;

	/** 是否绑定到移动方向 */
	@property(cc.Boolean)
	public moveDirect: boolean = true;

	/** 纹理名称 */
	@property(cc.String)
	public texture: string = "texture/main";

	/** 帧名称 */
	@property(cc.String)
	public frame: string = "frame_{1}_{0}";

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
	public fps: number = 15;

	//----

	protected sprite: cc.Sprite;
	protected anim: TUnitFrameAnimateDelegate;
	protected delegate: TUnitDelegateComponent.default;
	protected entity: TUnitEntity;

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
		if (this.unitNode)
		{
			if (!this.delegate)
			{
				this.delegate = this.unitNode.getComponent(TUnitDelegateComponent.default);
				this.entity = this.delegate.unit.getComponent("TUnitEntity") as TUnitEntity;
			}
		}
		this.anim.start();

	}

	public update(d: number): void
	{
		this.anim.onTick(d);


		if (this.entity && this.moveDirect)
		{
			this.anim.direct = this.entity.direct;
		}

	}
}