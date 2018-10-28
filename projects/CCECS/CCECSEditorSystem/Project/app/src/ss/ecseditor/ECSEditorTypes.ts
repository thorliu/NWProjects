

/*
 * @Author: 刘强 
 * @Date: 2018-10-28 19:17:21 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-28 23:34:42
 */

module ECSEditorTypes
{
	export type HttpResponseData = {
		code: number,
		data?: any
	};

	export enum HttpRetCodes
	{
		SUCCESS,
		PARAM_ERROR,
		UNKNOW_ERROR = 999
	}
}
export = ECSEditorTypes;