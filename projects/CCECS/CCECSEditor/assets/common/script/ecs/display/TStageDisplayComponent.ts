/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:44:46 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 14:47:18
 */

const { ccclass, property } = cc._decorator;
import TGameFactory = require('../config/TGameFactory');
import TUnit = require('../core/TUnit');
import TGame = require('../core/TGame');
import TDisplayFacade = require('../core/TDisplayFacade');



@ccclass
export default class TStageDisplayComponent extends cc.Component
{
	/** 容器 */
	@property(cc.Node)
	public container: cc.Node = null;

	/** 背景 */
	@property(cc.Node)
	public background: cc.Node = null;

	/** 地形 */
	@property(cc.Node)
	public terrain: cc.Node = null;

	/** 地表 */
	@property(cc.Node)
	public footer: cc.Node = null;

	/** 地面单位 */
	@property(cc.Node)
	public ground: cc.Node = null;

	/** 空中单位 */
	@property(cc.Node)
	public air: cc.Node = null;

	/** 投射物 */
	@property(cc.Node)
	public projectile: cc.Node = null;

	//测试代码
	public onEnable(): void
	{
		TDisplayFacade.stageDisplayComponent = this;

		var id: string = "hero_1";
		var unit: TUnit = TGameFactory.createUnit(id, TGame.getInstance().stage.forces[0].players[0]);

		TGame.getInstance().stage.add(unit);

		window["TEST_UNIT"] = unit;
	}
}
