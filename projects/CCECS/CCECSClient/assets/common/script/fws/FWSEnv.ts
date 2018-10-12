/*
 * 环境参数
 * @Author: 刘强 
 * @Date: 2018-07-31 15:20:34 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-12 10:14:50
 */

module FWSEnv
{
	// NOTE: 基础参数

	/** 版本号 */
	export const APP_VER: string = "1.0.10";
	export const TEST_VER: string = "";
	/** 是否使用生产环境 */
	export const PROD: boolean = false;	//CC_BUILD;// && !CC_DEBUG;
	/** 连还是不连服务器 */
	export const ConnectServer:boolean = true;

	/** HTTP接口地址  */
	export const API_BASE_URL: string = PROD ?
		//正式环境
		"https://nfydt.rivergame.net:8081/" :
		//测试环境
		"http://10.1.5.232:8081"; 

	/** 远程资源地址 */ 
	export var RES_BASE_URL: string = PROD ?
		//正式环境(坦克也是这个地址，别动)
		"https://ssllcdn.rivergame.net/tank/" + APP_VER :
		//"https://www.blah.com/"+APP_VER :	
		//测试环境
		"http://10.1.5.191:8590";	//本机启动一个测试站点 (用nodejs启动client/tools/web/main.js)

	/** WebSocket地址 */
	export var WS_BASE_URL: string = PROD ?
		//正式环境
		"wss://" :
		//测试环境 
		"ws://";

	/** 是否开启调试功能 */
	export const DEBUG: boolean = CC_DEBUG;

	/** 是否模拟器环境 */
	export const SIMULATOR: boolean = CC_PREVIEW;

	/** 是否编辑器环境 */
	export const EDITOR: boolean = CC_EDITOR;

	

	// NOTE: 高级参数

	/** 是否开启高级调试功能 */
	export const DEBUG_ADVANCED: boolean = DEBUG && SIMULATOR && true;

	/** 是否跟踪MVC通知 */
	export const DEBUG_MVC_TRACE: boolean = DEBUG && false;

	/** 是否跟踪CONTEXT开关 */
	export const DEBUG_CONTEXT_TRACE: boolean = DEBUG && false;

	/** 是否跟踪HTTP请求 */
	export const DEBUG_WEBCLIENT_TRACE: boolean = DEBUG && false;

	/** 是否跟踪SOCKET数据 */
	export const DEBUG_WEBSOCKET_TRACE: boolean = DEBUG && true;
	

	

}
export = FWSEnv;