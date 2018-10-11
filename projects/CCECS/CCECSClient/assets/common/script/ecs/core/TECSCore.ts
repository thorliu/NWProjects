/*
 * ECS核心定义
 * @Author: 刘强 
 * @Date: 2018-10-11 14:03:03 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 14:29:50
 */

module TECSCore
{
	//NOTE: 枚举定义

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

	//NOTE: 常量定义

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

	/** 统一的tick接口 */
	export interface ITicker
	{
		onEcsTicker(d: number): void
	}
}

export = TECSCore;