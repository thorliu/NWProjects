///<reference path="../creator.d.ts" />

/**
 * abc
 */
cc.Class({
	extends: cc.Node,
	
	onLoad: function ()
	{
		this.abc = 0;

		var test1: number = 1;
		var test2: string = "a";
		var test3: boolean = true;
		var test4: Array<number> = new Array<number>();
		test4.push(1);
		// var test5: cc.Node = new cc.Node();

		// this.init("abc");
		// this.init2();
	},

	statics: {
	},

	init: function (a1: number)
	{
	},

	properties: {
		a: {
			get: function ()
			{
				return 0;
			},
			set: function (v)
			{
			}
		}
	},

	onDestroy: {
	},

	onEnable: {
	},

	onDisable: {
	}
});
