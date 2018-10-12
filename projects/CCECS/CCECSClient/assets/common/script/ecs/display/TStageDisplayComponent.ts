/*
 * @Author: 刘强 
 * @Date: 2018-10-12 13:44:46 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 13:47:23
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class TStageDisplayComponent extends cc.Component
{
	@property(cc.Node)
	public background: cc.Node = null;

	@property(cc.Node)
	public terrain: cc.Node = null;

	@property(cc.Node)
	public footer: cc.Node = null;

	@property(cc.Node)
	public ground: cc.Node = null;

	@property(cc.Node)
	public air: cc.Node = null;

	@property(cc.Node)
	public projectile: cc.Node = null;

	@property(cc.Node)
	public effects: cc.Node = null;

	@property(cc.Node)
	public goods: cc.Node = null;

	@property(cc.Node)
	public guide: cc.Node = null;
}
