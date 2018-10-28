/*
 * @Author: 刘强 
 * @Date: 2018-10-27 22:55:40 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-27 22:57:13
 */

import EditorMsgs = require('../core/EditorMsgs');
import FWSMvc = require('../../fws/mvc/FWSMvc');

class EditorStageModel extends FWSMvc.FMessageConnectionAbstract
{
	public onFMessage_LoadStages(msg:FWSMvc.FMessage<any>):boolean
	{
		return true;
	}
}

export = EditorStageModel;