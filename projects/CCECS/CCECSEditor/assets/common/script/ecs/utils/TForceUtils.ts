/*
 * 玩家和势力相关的常用逻辑
 * @Author: 刘强 
 * @Date: 2018-10-11 14:18:23 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 14:42:18
 */


import TECSCore = require('../core/TECSCore');

module TForceUtils
{
	/** 获取玩家的所属势力 */
	export function getForceInfo(player: TECSCore.TPlayerInfo): TECSCore.TForceInfo
	{
		return null;
	}

	/** 获取玩家之间的关系 */
	export function getPlayersRelationship(self: TECSCore.TPlayerInfo, target: TECSCore.TPlayerInfo): TECSCore.TForceRelationship
	{
		var ret: TECSCore.TForceRelationship = TECSCore.TForceRelationship.Unknow;

		if (self && target)
		{
			//被营救方视所有人为友好
			if (self.type === TECSCore.TForceTypes.Rescued) return TECSCore.TForceRelationship.Friendly;
			//所有人视被营救方为盟友
			if (target.type === TECSCore.TForceTypes.Rescued) return TECSCore.TForceRelationship.Alliance;


			var selfForce: TECSCore.TForceInfo = self ? getForceInfo(self) : null;
			var targetForce: TECSCore.TForceInfo = target ? getForceInfo(target) : null;

			if (self === target)
			{
				//自己
				ret = TECSCore.TForceRelationship.Self;
			}
			else
			{
				if (selfForce === targetForce)
				{
					//相同势力为盟友
					ret = TECSCore.TForceRelationship.Alliance;
				}
				else
				{
					//不同势力
					if (self.type === TECSCore.TForceTypes.NeutralFriendly || target.type === TECSCore.TForceTypes.NeutralFriendly)
					{
						//中立友好者视所有人友好
						ret = TECSCore.TForceRelationship.Friendly;
					}
					else
					{
						//其它情况一律视为敌对
						ret = TECSCore.TForceRelationship.Enemy;
					}
				}
			}
		}

		return ret;
	}


}

export = TForceUtils;
