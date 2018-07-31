/*
 * 环境参数
 * @Author: 刘强 
 * @Date: 2018-07-31 15:20:34 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:59:27
 */

module FWSEnv
{
	// NOTE: 基础参数

	/** 是否使用生产环境 */
	export const PROD: boolean = false;

	export const API_BASE_URL:string = PROD ? 
										"" :
										"";
	export const WS_BASE_URL:string = PROD ?
										"" :
										"";

	/** 是否开启调试功能 */
	export const DEBUG :boolean = CC_DEBUG;

	/** 是否模拟器环境 */
	export const SIMULATOR: boolean = true;

	/** 是否编辑器环境 */
	export const EDITOR:boolean = CC_EDITOR;

	// NOTE: 高级参数

	/** 是否开启高级调试功能 */
	export const DEBUG_ADVANCED: boolean = DEBUG && SIMULATOR && true;

	/** 是否跟踪MVC通知 */
	export const DEBUG_MVC_TRACE: boolean = DEBUG && true;
	
	/** 是否跟踪CONTEXT开关 */
	export const DEBUG_CONTEXT_TRACE: boolean = DEBUG && false;

	/** 是否跟踪HTTP请求 */
	export const DEBUG_WEBCLIENT_TRACE: boolean = DEBUG && false;
}
export = FWSEnv;