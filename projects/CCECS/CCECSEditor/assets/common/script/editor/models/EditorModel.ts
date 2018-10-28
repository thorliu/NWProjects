/*
 * 编辑器数据
 * @Author: 刘强 
 * @Date: 2018-10-27 23:01:33 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-27 23:12:08
 */

import TECSCore = require('../../ecs/core/TECSCore');
import TConfigCore = require('../../ecs/config/TConfigCore');
import FWSData = require('../../fws/data/FWSData');
import FWSTool = require('../../fws/utils/FWSTool');


module EditorModel
{
	class EditorModelClass extends FWSData.DependentObject
	{
		constructor()
		{
			super();
			this.init();
		}

		protected init(): void
		{
			this.set("stages", new FWSData.List<TConfigCore.TStageConfigData>());
		}

		/** 获取所有关卡 */
		public get stages(): FWSData.List<TConfigCore.TStageConfigData> { return this.get("stages"); }

		/** 获取或设置当前关卡 */
		public get currentStage():TConfigCore.TStageConfigData { return this.get("currentStage", null); }
		public set currentStage(v:TConfigCore.TStageConfigData) { this.set("currentStage", v); }
		
	}

	var instance: EditorModelClass;
	export function getInstance(): EditorModelClass
	{
		if (!instance) instance = new EditorModelClass();
		return instance;
	}
}

export = EditorModel;