/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:20:20 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 13:52:34
 */

import TConfigCore = require('./TConfigCore');
import TECSCore = require('../core/TECSCore');

module TConfigManager
{
	/** 动画配置 */
	export const animates: { [key: string]: TConfigCore.TFrameAnimateConfigData } = {
		"anim_flag": {
			texture: "texture/main",
			name: "anim_flag_{0}",
			first: 1,
			last: 3,
			loop: 0,
		},

		"anim_tank_0": {
			texture: "texture/main",
			name: "tank_0_{1}_{0}",
			first: 0,
			last: 1,
			loop: -1,
		}
	};

	/** 所有单位配置 */
	export const units: { [key: string]: TConfigCore.TUnitConfigData } = {
		"unit_tank_0": {
			hp: 1,
			prefab: "PrefabTank0",
			weapons: ["weapon_tank_0"]
		}
	};

	/** 所有武器配置 */
	export const weapons: { [key: string]: TConfigCore.TWeaponConfigData } = {
		"weapon_tank_0": {
			findTargetFilter: {},
			effects: ["effect_damage_tank_default"]
		}
	};

	/** 所有效果配置 */
	export const effects: { [key: string]: TConfigCore.TEffectConfigData } = {
		"effect_damage_tank_default": {
			effectTargetFilter: {},
			amounts: [1]
		}
	};
}

export = TConfigManager;