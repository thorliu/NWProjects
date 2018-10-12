/*
 * @Author: 刘强 
 * @Date: 2018-10-11 18:20:11 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 13:37:06
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
		amounts: any[]
	};

	/** 武器基础配置 (Weapon_#) */
	export type TWeaponConfigData = {

		/** 关联的效果 */
		effects?: string[]
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
}

export = TConfigCore;