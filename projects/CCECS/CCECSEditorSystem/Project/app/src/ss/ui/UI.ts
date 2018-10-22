/*
 * @Author: thor.liu 
 * @Date: 2018-04-18 15:23:22 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-22 11:28:29
 */

module UI
{
	/** UI指令匹配信息 */
	export type UICommand = {
		key: string,
		text?: string,
		icon?: string,
		items?: UICommand[]
	};

	//TODO: MenuBar *
	//TODO: ContextMenu *
	//TODO: ToolButtons
}

export = UI;

