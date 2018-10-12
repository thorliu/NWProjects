/*
 * @Author: 刘强 
 * @Date: 2018-10-11 21:19:01 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 09:54:55
 */


module TDisplayCore
{
	/** 帧动画 */
	export class TFrameAnimateDelegate
	{
		/** 帧率 */
		public fps: number = 30;
		/** 第一帧 */
		public firstFrame: number = 1;
		/** 最后一帧 */
		public lastFrame: number = 3;
		/** 循环几次 */
		public loopCount: number = 0;
		/** 是否已暂停 */
		public paused: boolean = true;
		/** 纹量 */
		public texture: string = "";
		/** 帧名 */
		public frame: string = "";

		//------

		/** 图片 */
		protected sprite: cc.Sprite;
		/** 上次更新时间 */
		protected prevTimer: number = 0;
		/** 当前帧 */
		protected currentFrame: number = 0;
		/** 循环计数 */
		protected loopCounter: number = 0;

		//------

		


		/** 构造 */
		constructor(
			s: cc.Sprite,
			texture: string,
			frame: string,
			firstFrame: number,
			lastFrame: number,
			loopCount: number,
			fps: number
		)
		{
			this.sprite = s;
			this.texture = texture;
			this.frame = frame;
			this.firstFrame = firstFrame;
			this.lastFrame = lastFrame;
			this.loopCount = loopCount;
			this.fps = fps;
		}

		/** tick逻辑 */
		public onTick(d: number): void
		{
			if (this.paused) return;
			if (!this.sprite) return;
			if (new Date().getTime() - this.prevTimer < (1000 / this.fps)) return;
			this.nextFrame();
		}

		/** 完成时 */
		protected finish(): void
		{
		}

		/** 更新到下一帧 */
		protected nextFrame(): void
		{
			this.prevTimer = new Date().getTime();

			this.currentFrame++;
			if (this.currentFrame > this.lastFrame)
			{
				//不循环
				if (this.loopCount === 0)
				{
					this.finish();
					return;
				}
				else if (this.loopCount > 0 && this.loopCounter >= this.loopCount)
				{
					this.finish();
					return;
				}

				this.loopCounter++;
				this.currentFrame = this.firstFrame;
			}

			console.log(this.currentFrame);
		}

		/** 开始 */
		public start(): void
		{
			this.paused = false;
			this.loopCounter = 0;
			this.currentFrame = this.firstFrame - 1;
			this.nextFrame();
		}




	}
}

export = TDisplayCore;