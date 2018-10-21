/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:20:20 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 17:43:37
 */

import TConfigCore = require('./TConfigCore');
import TECSCore = require('../core/TECSCore');

module TConfigManager
{
	/** 动画配置 */
	export const animates: { [key: string]: TConfigCore.TFrameAnimateConfigData } = {

	};

	/** 所有单位配置 */
	export const units: { [key: string]: TConfigCore.TUnitConfigData } = {
		"hero_1": {
			attributes:
				TECSCore.TUnitStaticAttributes.Ground |
				TECSCore.TUnitStaticAttributes.Hero,
			hp: 1,
			mp: 1,
			speed: 10,
			prefab: "prefab/game/hero/PrefabHero1",
			behavior: TECSCore.TUnitBehaviorType.Joy,
			weapons: []
		}
	};

	/** 所有武器配置 */
	export const weapons: { [key: string]: TConfigCore.TWeaponConfigData } = {
		"weapon_1": {
			findTargetFilter:
			{
				mustDyanmicAttributes: TECSCore.TUnitDynamicAttributes.Alive,
				mustRelationship: TECSCore.TForceRelationship.Enemy,
				mustStaticAttributes:
					TECSCore.TUnitStaticAttributes.Air |
					TECSCore.TUnitStaticAttributes.Ground
			},
			effects: ["damage_1"]
		}
	};

	/** 所有效果配置 */
	export const effects: { [key: string]: TConfigCore.TEffectConfigData } = {
		"damage_1": {
			type: TConfigCore.TEffectType.HP,
			amounts: [0, 1],
			effectTargetFilter: {
				mustDyanmicAttributes: TECSCore.TUnitDynamicAttributes.Alive,
				mustRelationship: TECSCore.TForceRelationship.Enemy,
				mustStaticAttributes:
					TECSCore.TUnitStaticAttributes.Air |
					TECSCore.TUnitStaticAttributes.Ground
			}
		}
	};
}

export = TConfigManager;