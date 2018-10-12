/*
 * @Author: 刘强 
 * @Date: 2018-10-11 18:20:11 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 14:01:34
 */

import TECSCore = require('../core/TECSCore');

module TConfigCore
{

	/** 帧动画配置 (FrameAnim_#) */
	export type TFrameAnimateConfigData = {
		/** 纹理 */
		texture: string;
		/** 文件 */
		name: string;
		/** 起如帧 */
		first: number;
		/** 结速帧 */
		last: number;
		/** 循环 */
		loop: number
	};

	/** 效果配置 (Effect_#) */
	export type TEffectConfigData = {
		/** 相关数值 */
		amounts: any[],
		/** 效果作用目标过滤 */
		effectTargetFilter: TECSCore.TUnitFilter
	};

	/** 武器基础配置 (Weapon_#) */
	export type TWeaponConfigData = {

		/** 关联的效果 */
		effects?: string[],
		/** 目标过滤 */
		findTargetFilter: TECSCore.TUnitFilter
	};

	/** 单位基础配置 (Unit_#) */
	export type TUnitConfigData = {
		/** 生命值 */
		hp?: number,
		/** 能量值 */
		mp?: number,
		/** 预制体 */
		prefab?: string,
		/** 武器/主动能力 */
		weapons?: string[] //id;id;id
	};

	/** 关卡模式 */
	export enum TStageMode
	{
		/** 无 */
		None
	}

	/** 关卡地型 */
	export type TStageTerrain = {
		/** 行数 */
		rows: number,
		/** 列数 */
		cols: number,
		/** 地格 */
		tiles: []
	}

	/** 关卡位置标记类型 */
	export enum TStageLocationType
	{
		Point,
		Region
	}
	/** 关卡位置标记数据 */
	export type TStageLocation = {
		/** 类 */
		type: TStageLocationType,
		/** 数值 [Point(x,y,r)|Region(x,y,w,h)] */
		amounts: number[]
	}

	/** 关卡数据 */
	export type TStageConfigData = {
		/** 关卡模式 */
		mode: TStageMode,
		/** 备注 */
		note: string,
		/** 关卡名称 */
		name: string,
		/** 关卡描述 */
		description: string,
		/** 地形设定 */
		terrain: TStageTerrain,
	}

}

export = TConfigCore;