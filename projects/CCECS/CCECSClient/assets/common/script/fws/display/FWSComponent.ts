/*
 * 组件脚本
 * @Author: 刘强 
 * @Date: 2018-07-31 16:18:57 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-01 21:40:03
 */

const {ccclass, property} = cc._decorator;
import FWSMvc = require('../mvc/FWSMvc');
import X = require('../utils/X');


@ccclass
export default class FWSComponent extends cc.Component {

	/** MVC委托模块 */
	protected mvcDelegate:FWSMvc.FMessageConnectionDelegate;
	
	/** 构造 */
	public constructor()
	{
		super();
		this.mvcDelegate = new FWSMvc.FMessageConnectionDelegate(this);
	}

	/** 组件可用时 */
	public onEnable():void
	{
		this.mvcDelegate.connect();
	}

	/** 组件不可用时 */
	public onDisable():void
	{
		this.mvcDelegate.disconnect();
	}
}