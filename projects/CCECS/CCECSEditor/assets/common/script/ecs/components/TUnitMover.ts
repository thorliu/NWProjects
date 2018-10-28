/*
 * 移动方式
 * @Author: 刘强 
 * @Date: 2018-10-11 19:03:30 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 17:43:10
 */

import TECSCore = require('../core/TECSCore');
import TUnitComponentAbstract = require('../core/TUnitComponentAbstract');
import TUnitEntity = require('./TUnitEntity');
import TUnitDelegateComponent = require('../core/TUnitDelegateComponent');
import FWS2DUtils = require('../../fws/utils/FWS2DUtils');
import FWSTool = require('../../fws/utils/FWSTool');


class TUnitMover extends TUnitComponentAbstract
{
	/** 是否正在跑 */
	public running: boolean;
	/** 起始速度 */
	protected speedStart;
	/** 当前速度 */
	public speedCurrent;
	/** 最快速度 */
	public speedMax: number;
	/** 加速度(百分比) */
	public accelerate: number;
	/** 减速度(百分比) */
	public decelerate: number;
	/** 转身速度(百分比) */
	public turn: number;


	protected prevRunning: boolean;
	protected prevTimer: number;

	/** 初始化 */
	protected onInit(): void
	{

		this.accelerate = 1;
		this.decelerate = 1;
		this.speedMax = 5;
		this.speedCurrent = 0;
		this.speedStart = 1;
		this.turn = 1;

		this.prevRunning = false;
		this.running = false;
	}

	protected getKey(): string
	{
		return "TUnitMover";
	}


	//----

	protected entity: TUnitEntity;
	protected delegate: TUnitDelegateComponent.default;

	public onBind(): void
	{
		this.entity = this.unit.getComponent("TUnitEntity") as TUnitEntity;
		this.delegate = this.unit.getComponent("TUnitDelegateComponent") as TUnitDelegateComponent.default;
	}

	public onUnbind(): void
	{
		this.entity = null;
		this.delegate = null;
	}

	public onTick(d: number): void
	{
		if (!this.entity) return;
		this.tickMove();
	}

	//NOTE: ---

	protected tickMove(): void
	{
		var now: number = TECSCore.getTimer();
		if (this.prevTimer === null || this.prevTimer === undefined)
		{
			this.prevTimer = now;
			this.handle();
		}
		else
		{
			var times: number = Math.floor((now - this.prevTimer) / TECSCore.FPS_GAME_INTERVAL);
			for (var i: number = 0; i < times; i++)
			{
				this.handle();
				this.prevTimer += TECSCore.FPS_GAME_INTERVAL;
			}
		}
	}

	protected handle(): void
	{
		//NOTE: 速度变化
		var newSpeed: number = this.speedCurrent;

		if (this.running)
		{
			if (!this.prevRunning)
			{
				//初始速度
				newSpeed = this.speedStart;
			}
			else
			{
				//加速
				newSpeed += this.speedMax * this.accelerate;
				newSpeed = Math.min(newSpeed, this.speedMax);
			}
		}
		else
		{
			//减速
			newSpeed -= this.speedMax * this.decelerate;
			newSpeed = Math.max(newSpeed, 0);
		}

		this.prevRunning = this.running;

		this.speedCurrent = newSpeed;


		//角度变化


		//位置变化
		var newPos: cc.Vec2 = FWS2DUtils.position(this.entity.pos, this.entity.direct, this.speedCurrent);

		//TODO: 碰撞判定


		// console.log(FWSTool.Str.format("ex={0},ey={1},d={2},nx={3},ny={4}",
		// 	this.entity.pos.x,
		// 	this.entity.pos.y,
		// 	this.entity.direct,
		// 	newPos.x,
		// 	newPos.y,
		// 	this.speedCurrent));


		//更新位置
		this.entity.pos.x = newPos.x;
		this.entity.pos.y = newPos.y;


	}


}

export = TUnitMover;