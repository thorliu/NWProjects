/*
 * @Author: 刘强 
 * @Date: 2018-10-11 18:20:11 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 18:44:33
 */

import TECSCore = require('../core/TECSCore');

module TConfigCore
{

	/** 帐动画配置 (FrameAnim_#) */
	export type TFrameAnimateConfigData = {
		/** ID */
		id: string,
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
		/** ID */
		id: string,
		/** 静态特征过滤 */
		staticFilter: TECSCore.TUnitStaticAttributes,
		/** 动态特征过滤 */
		dynamicFilter: TECSCore.TUnitDynamicAttributes,
		/** 关系过滤 */
		relationshipFilter: TECSCore.TForceRelationship,
		/** 相关数值 */
		amounts: string
	};

	/** 武器基础配置 (Weapon_#) */
	export type TWeaponConfigData = {
		/** ID */
		id: string,
		/** 静态特征过滤 */
		staticFilter: TECSCore.TUnitStaticAttributes,
		/** 动态特征过滤 */
		dynamicFilter: TECSCore.TUnitDynamicAttributes,
		/** 关系过滤 */
		relationshipFilter: TECSCore.TForceRelationship,
		/** 关联的效果 */
		effects: string
	};

	/** 单位显示配置 (UnitDisplay_#) */
	export type TUnitDisplayConfigData = {
		/** ID */
		id: string,
		/** 状态(UnitDisplayStates;animate|...) */
		status: string
	};

	/** 单位基础配置 (Unit_#) */
	export type TUnitConfigData = {
		/** ID */
		id: string,
		/** 生命值 */
		hp: number,
		/** 能量值 */
		mp?: number,
		/** 武器/主动能力 */
		weapons?: string //id;id;id
	};
}

export = TConfigCore;