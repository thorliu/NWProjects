////////////////////////////////////////////////////////////////	N

var N = {
	inApp: function () {
		if (typeof (require) != "undefined") {
			return true;
		}
		else {
			return false;
		}
	}
	, create: function(mod){
		if(N.inApp())
		{
			return require(mod);
		}
		else return null;
	}
};

////////////////////////////////////////////////////////////////	N_FileSystem

var N_FileSystem = function () {
	this.init();
};

TClass.extend(N_FileSystem, TObject);
N_FileSystem.prototype.init = function () {
	this.fs = N.create("fs");
};

N_FileSystem.prototype.readFile = function(filename, encoding, callback)
{
	if(N.inApp())
	{
		this.fs.readFile(filename, encoding, callback);
	}
	else
	{
		callback(null, "");
	}
};

N.FS = new N_FileSystem();

////////////////////////////////////////////////////////////////	TEST

// N.FS.readFile("/Users/liuqiang/NWProjects/projects/excel/js/n.js1","utf8",function(err, data)
// {
// 	if(err)
// 	{
// 		alert("?");
// 	}
// 	else
// 	{
// 		alert(data);
// 	}
// });


//----------------
// 菜单
var template = [
	{
		label: 'Edit',
		submenu:[
        			{
        				label:'item1',
        				click:function(){alert("?");}
        			},
        			{
        				type: 'separator'
        			}
        		],
	}
];

var remote = require('electron').remote;
var Menu = remote.Menu;
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);