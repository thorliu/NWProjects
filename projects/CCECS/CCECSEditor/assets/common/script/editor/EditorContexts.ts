/*
 * @Author: 刘强 
 * @Date: 2018-10-30 16:34:09 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-30 16:46:08
 */


import FWSCommon = require('../fws/core/FWSCommon');
import FWSMvc = require('../fws/mvc/FWSMvc');

//NOTE: controllers

//NOTE: models

//NOTE: views

//NOTE: -----------------------------

module EditorContexts
{
	var inited: boolean = false;

	export function startup(): void
	{
		init();
		FWSMvc.ContextManager().gotoID("list");
	}

	function init(): void
	{
		if (inited) return;
		inited = true;

		//NOTE: ---------------------------- 

		var root: FWSCommon.Context = FWSMvc.createContext("root", null);
		/*--*/var main: FWSCommon.Context = FWSMvc.createContext("main", root);
		/*----*/var list: FWSCommon.Context = FWSMvc.createContext("list", main);
		/*----*/var stage: FWSCommon.Context = FWSMvc.createContext("stage", main);
		/*------*/var terrains: FWSCommon.Context = FWSMvc.createContext("terrains", stage);
		/*------*/var units: FWSCommon.Context = FWSMvc.createContext("units", stage);
		/*------*/var regions: FWSCommon.Context = FWSMvc.createContext("regions", stage);

		//NOTE: ---------------------------- 

		FWSMvc.ContextManager().init(root);
	}
}

export = EditorContexts;