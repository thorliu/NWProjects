/*
 * 表示一个游戏
 * @Author: 刘强 
 * @Date: 2018-10-13 10:00:21 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 11:08:34
 */

import TECSCore = require('./TECSCore');
import TStage = require('./TStage');
import FWSData = require('../../fws/data/FWSData');


module TGame
{
	class TGameClass extends FWSData.DependentObject
	{
		constructor()
		{
			super();

			this.stage = new TStage();
		}

		/** 获取或设置当前关卡场景 */
		public get stage(): TStage { return this.get("stage", null); }
		public set stage(v: TStage) { this.set("stage", v); }
	}

	var instance: TGameClass;
	export function getInstance(): TGameClass
	{
		if (!instance) instance = new TGameClass();
		return instance;
	}
}

export = TGame;