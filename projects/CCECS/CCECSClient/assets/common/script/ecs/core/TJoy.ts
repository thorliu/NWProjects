/*
 * 摇杆状态
 * @Author: 刘强 
 * @Date: 2018-10-17 11:51:48 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-17 14:01:48
 */

module TJoy
{
	/** 当前方向 */
	export var direct: number = null;

	/** 当前按钮状态 */
	export var buttons: { [key: string]: number } = {};
}

export = TJoy;