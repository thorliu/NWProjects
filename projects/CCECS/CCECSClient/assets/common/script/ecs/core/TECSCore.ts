/*
 * ECS核心定义
 * @Author: 刘强 
 * @Date: 2018-10-11 14:03:03 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 17:10:02
 */

module TECSCore
{
	//NOTE: 常量定义

	//NOTE: 枚举定义

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
		Machine = 1 << 2,
		/** 生物 */
		Biology = 1 << 3,
		/** 物品 */
		Goods = 1 << 4,
		/** 投射物 */
		Projectile = 1 << 5
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
}

export = TECSCore;