/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:44:46 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-13 09:50:59
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class TStageDisplayComponent extends cc.Component
{
	/** 容器 */
	@property(cc.Node)
	public container:cc.Node = null;

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
}
