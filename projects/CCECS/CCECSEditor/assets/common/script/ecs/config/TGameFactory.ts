/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:19:08 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 17:47:29
 */

import TECSCore = require('../core/TECSCore');
import FWSTool = require('../../fws/utils/FWSTool');
import TConfigCore = require('./TConfigCore');
import TUnit = require('../core/TUnit');
import TConfigManager = require('./TConfigManager');
import FWSAssertCaches = require('../../fws/display/factory/FWSAssertCaches');
import TGame = require('../core/TGame');
import TUnitDelegateComponent = require('../core/TUnitDelegateComponent');
import TUnitHp = require('../components/TUnitHp');
import TUnitMp = require('../components/TUnitMp');
import TUnitMover = require('../components/TUnitMover');
import TUnitWeapon = require('../components/TUnitWeapon');
import TUnitAbility = require('../components/TUnitAbility');
import TStage = require('../core/TStage');
import TUnitEntity = require('../components/TUnitEntity');
import TUnitBehavior = require('../components/TUnitBehavior');




module TGameFactory
{
	var nextGuid: number = 0;

	/** 重置 */
	export function reset(): void
	{
		nextGuid = 0;
	}

	/** 获取单位显示对象节点 */
	function getDisplayNode(key: string): cc.Node
	{
		var prefab: cc.Prefab = FWSAssertCaches.getPrefab(key);
		if (!prefab) return null;

		return cc.instantiate(prefab);
	}

	/** 创建生命组件 */
	export function createHP(unit: TUnit, cfg: TConfigCore.TUnitConfigData): TUnitHp
	{
		if (cfg && !FWSTool.Obj.isEmpty(cfg.hp))
		{
			var hp: TUnitHp = new TUnitHp();
			hp.lifeMax = cfg.hp;
			hp.life = cfg.hp;
			unit.add(hp);

			return hp;
		}
		return null;
	}

	/** 创建能量组件 */
	export function createMP(unit: TUnit, cfg: TConfigCore.TUnitConfigData): TUnitMp
	{
		if (!FWSTool.Obj.isEmpty(cfg.mp))
		{
			var mp: TUnitMp = new TUnitMp();
			mp.energyMax = cfg.mp;
			mp.energy = cfg.mp;
			return mp;
		}
		return null;
	}

	/** 创建移动组件 */
	export function createMover(unit: TUnit, cfg: TConfigCore.TUnitConfigData): TUnitMover
	{
		if (cfg && !FWSTool.Obj.isEmpty(cfg.speed))
		{
			var mover: TUnitMover = new TUnitMover();
			mover.speedMax = cfg.speed;
			
			mover.speedCurrent = mover.speedMax;
			mover.accelerate = 1;
			mover.decelerate = 1;
			mover.turn = 1;

			unit.add(mover);

			return mover;
		}
		return null;
	}

	/** 创建武器组件 */
	export function createWeapon(unit:TUnit, cfg: TConfigCore.TUnitConfigData): TUnitWeapon
	{
		if (!FWSTool.Obj.isEmpty(cfg.weapons))
		{
			var weapon:TUnitWeapon = new TUnitWeapon();
			unit.add(weapon);

			for (var i: number = 0; i < cfg.weapons.length; i++)
			{
				var weaponConfigId: string = cfg.weapons[i];

				//TODO:
			}

			return weapon;
		}
		return null;
	}

	/** 创建能力组件 */
	export function createAbility(unit:TUnit, cfg:TConfigCore.TUnitConfigData):TUnitAbility
	{
		if(cfg && !FWSTool.Obj.isEmpty(cfg.abilities))
		{
			var ability:TUnitAbility = new TUnitAbility();

			for(var i:number = 0; i < cfg.abilities.length; i++)
			{
				var abilityId:string = cfg.abilities[i];

				//TODO: ...
			}

			return ability;
		}

		return null;
	}

	/** 创建行为组件 */
	export function createBehavior(unit:TUnit, cfg:TConfigCore.TUnitConfigData):TUnitBehavior
	{
		if(cfg && !FWSTool.Obj.isEmpty(cfg.behavior))
		{
			var behavior:TUnitBehavior = new TUnitBehavior();
			behavior.type = cfg.behavior;
			unit.add(behavior);

			return behavior;
		}
		return null;
	}

	/** 创建单位节点 */
	export function createUnitNode(unit:TUnit, cfg:TConfigCore.TUnitConfigData):void
	{
		//显示对象
		if (cfg.prefab)
		{
			var node: cc.Node = getDisplayNode(cfg.prefab);
			unit.node = node;
			if (node)
			{
				var unitDelegate: TUnitDelegateComponent.default = node.getComponent(TUnitDelegateComponent.default);
				if (unitDelegate) 
				{
					unitDelegate.unit = unit;
					unit.add(unitDelegate);
				}
			}
		}
	}

	/** 创建单位 */
	export function createUnit(id: string, owner: TECSCore.TPlayerInfo): TUnit
	{

		var cfg: TConfigCore.TUnitConfigData = TConfigManager.units[id];
		if (!cfg) return null;
		nextGuid++;

		//创建单位
		var unit: TUnit = new TUnit(id, nextGuid, owner);
		unit.staticAttributes = cfg.attributes;

		unit.add(new TUnitEntity());

		createHP(unit, cfg);
		createMP(unit, cfg);
		createMover(unit, cfg);
		createWeapon(unit, cfg);
		createAbility(unit, cfg);
		createBehavior(unit, cfg);

		createUnitNode(unit, cfg);
		
		return unit;
	}
}

export = TGameFactory;