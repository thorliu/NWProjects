/*
 * ECS核心定义
 * @Author: 刘强 
 * @Date: 2018-10-11 14:03:03 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 18:00:11
 */

module TECSCore
{
	//NOTE: 常量定义

	//NOTE: 枚举定义

	/** 移动方式 */
	export enum UnitMoverType
	{
		/** 无 */
		None,
		/** 步行 */
		Walk,
		/** 飞行 */
		Fly
	}

	/** 单位显示状态 */
	export enum UnitDisplayStates
	{
		/** 无 */
		None,
		/** 站立 */
		Stand,
		/** 移动 */
		Move,
		/** 攻击 */
		Attack,
		/** 死亡 */
		Dead
	}

	/** 单位组件标识 */
	export enum UnitComponentKeys
	{
		/** 实体 */
		TUnitEntity,
		/** 生命 */
		TUnitHp,
		/** 能量 */
		TUnitMp,
		/** 移动 */
		TUnitMover,
		/** 主动 */
		TUnitWeapon,
		/** 被动 */
		TUnitAbility,
		/** 行为 */
		TUnitBehavior
	}

	/** 势力类型 */
	export enum TForceTypes
	{
		/** 玩家控制 */
		Player,
		/** 电脑控制 */
		Computer,
		/** 中立友好 */
		NeutralFriendly,
		/** 中立敌对 */
		NeutralHostile,
		/** 中立被营救 */
		Rescued
	}

	/** 势力关系 */
	export enum TForceRelationship
	{
		/** 未知(异常) */
		Unknow,
		/** 己方 */
		Self,
		/** 盟友 */
		Alliance,
		/** 敌方 */
		Enemy,
		/** 友好 */
		Friendly
	}

	/** 单位静态特征 */
	export enum TUnitStaticAttributes
	{
		/** 无 */
		None = 0,
		/** 地面 */
		Ground = 1 << 0,
		/** 空中 */
		Air = 1 << 1,
		/** 水面 */
		Water = 1 << 2,
		/** 机械 */
		Machine = 1 << 3,
		/** 生物 */
		Biology = 1 << 4,
		/** 物品 */
		Goods = 1 << 5,
		/** 投射物 */
		Projectile = 1 << 6,
		/** 英雄 */
		Hero = 1 << 7,
		/** 宠物 */
		Pet = 1 << 8,
		/** 怪物 */
		Monster = 1 << 9,
		/** 幽能 */
		Psionic = 1 << 10
	}

	/** 单位动态特征 */
	export enum TUnitDynamicAttributes
	{
		/** 无 */
		None = 0,
		/** 活的 */
		Alive = 1 << 0,
		/** 死的 */
		Dead = 1 << 1,
		/** 无敌的 */
		Invincible = 1 << 2
	}

	/** 行为类型 */
	export enum TUnitBehaviorType
	{
		/** 无行为 */
		None,
		/** 玩家摇杆控制 */
		Joy,
		/** AI控制 */
		AI
	}

	//NOTE: 类型定义

	/** 玩家信息 */
	export type TPlayerInfo = {
		/** 帐号标识 */
		id: string,
		/** 玩家名称 */
		name?: string,
		/** 玩家头像 */
		avatar?: string,
		/** 附加数据 */
		data?: any,
		/** 玩家类型 */
		type: TForceTypes
	}

	/** 势力信息 */
	export type TForceInfo = {
		/** 势力名称 */
		name?: string,
		/** 玩家成员 */
		players: TPlayerInfo[]
	}

	/** 单位过滤选项 */
	export type TUnitFilter = {
		/** 必须满足的静态特征 */
		mustStaticAttributes?: TUnitStaticAttributes,
		/** 必须满足的动态特征 */
		mustDyanmicAttributes?: TUnitDynamicAttributes,
		/** 必须满足的关系 */
		mustRelationship?: TForceRelationship,

		/** 排除的静态特征 */
		excludeStaticAttributes?: TUnitStaticAttributes,
		/** 排除的动态特征 */
		excludeDynamicAttributes?: TUnitDynamicAttributes,
		/** 排除的关系 */
		excludeRelationship?: TForceRelationship
	}




	//NOTE: 接口定义

	/** 单位接口 */
	export interface IUnitComponent
	{
		/** 唯一标识 */
		key: string,
		/** 所属单位 */
		unit: any,
		/** tick逻辑 */
		onTick(d: number): void;
		/** 建立绑定时 */
		onBind(): void;
		/** 解除绑定时 */
		onUnbind(): void;
	}

	/** 单位行为接口 */
	export interface IUnitBehavior
	{
		onTick(d: number, behavior: IUnitComponent): void
	}

	//NOTE: 核心功能

	/** 游戏逻辑FPS */
	export const FPS_GAME:number = 60;
	/** 游戏逻辑FPS间隔 */
	export const FPS_GAME_INTERVAL:number = 1000 / FPS_GAME;

	/** 获取当前游戏时间 */
	export function getTimer():number
	{
		return new Date().getTime();
	}
}

export = TECSCore;