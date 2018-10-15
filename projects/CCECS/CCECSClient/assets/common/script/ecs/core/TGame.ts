/*
 * 表示一个游戏
 * @Author: 刘强 
 * @Date: 2018-10-13 10:00:21 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-15 13:46:27
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

		public onTick(d: number): void
		{
			if (this.stage)
			{
				this.stage.onTick(d);
			}
		}

		/** 获取或设置当前关卡场景 */
		public get stage(): TStage { return this.get("stage", null); }
		public set stage(v: TStage) { this.set("stage", v); }
	}

	var instance: TGameClass;
	export function getInstance(): TGameClass
	{
		if (!instance) 
		{
			instance = new TGameClass();


			//测试
			setInterval(() =>
			{
				getInstance().onTick(new Date().getTime());
			}, 1000 / 60);
			
		}
		return instance;
	}
}

export = TGame;