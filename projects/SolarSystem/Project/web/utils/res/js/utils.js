var T = {};
T.getQuery = function (name)
{
	var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1)
	{
		return "";
	}
	return decodeURI(result[1]);
};

T.getQueryData = function ()
{
	var queryString = document.location.search + "";
	queryString = queryString.trim().replace(/^\?/g, "");
	var items = queryString.split("&");
	var ret = new Object();

	for (var i = 0; i < items.length; i++)
	{
		var item = items[i];
		var itemAry = item.split("=");
		if (itemAry.length == 2)
		{
			var k = itemAry[0].urlDecode().trim();
			var v = itemAry[1].urlDecode().trim();
			if (k.length > 0)
			{
				ret[k] = v;
			}
		}
	}

	return ret;
};

T.getDataValue = function (data, key)
{
	if (data || data == 0) { } else return null;
	var ks = key.split(".");
	var temp = data;
	for (var i = 0; i < ks.length; i++)
	{
		var k = ks[i];
		if (k != "")
		{
			temp = temp[k];
		}
	}
	return temp;
};

///移除两端的空白
String.prototype.trim = function ()
{
	return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
};

///HtmlEncode
String.prototype.htmlEncode = function ()
{
	var s = "";
	var str = this + "";
	if (str.length == 0) return "";
	s = str.replace(/&/g, "&gt;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	// s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "'");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
};

///HtmlDecode
String.prototype.htmlDecode = function ()
{
	var s = "";
	var str = this + "";
	if (str.length == 0) return "";
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, "");
	s = s.replace(/'/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	s = s.replace(/&#39;/g, "\'");
	return s;
};

///UrlEncode
String.prototype.urlEncode = function ()
{
	return encodeURI(this);
};

///UrlDecode
String.prototype.urlDecode = function ()
{
	return decodeURI(this);
};

///匹配所有结果
String.prototype.matchs = function (re)
{
	var result = new Array();
	var str = this + "";

	var item = null;

	while ((item = re.exec(str)) !== null)
	{
		result.push(item);
	}

	return result;
};

///格式化参数
String.prototype.format = function ()
{
	var str = this + "";
	for (var i = 0; i < arguments.length; i++)
	{
		var re = new RegExp('\\{' + (i).toString() + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};

///格式化数据
String.prototype.formatData = function (data)
{
	var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
	var ms = this.matchs(re);
	var str = this + "";
	for (var i = ms.length - 1; i >= 0; i--)
	{
		var m = ms[i];
		var mIndex = m.index;
		var mLength = m[0].length;
		var mKey = m[0].substr(1, mLength - 2);
		var mValue = T.getDataValue(data, mKey);
		var mStr = (mValue || mValue == 0) ? mValue.toString() : "";
		str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
	}
	return str;
};

///格式化数组
String.prototype.formatArray = function (ary)
{
	var str = this + "";
	var ret = "";

	for (var i = 0; i < ary.length; i++)
	{
		ret += str.formatData(ary[i]);
	}

	return ret;
};


String.prototype.padLeft = function (count, str)
{
	var ret = this.toString();
	for (var i = 0; i < count; i++)
	{
		ret = str + ret;
	}
	return ret.substr(ret.length - count, count);
};

String.prototype.padRight = function (count, str)
{
	var ret = this.toString();
	for (var i = 0; i < count; i++)
	{
		ret = ret + str;
	}
	return ret.substr(0, count);
};

String.prototype.formatTime = function (seconds)
{
	if (seconds < 0) seconds = 0;
	var format = this;
	if (format.length == 0)
	{
		format = "{hours}:{minutes}:{seconds}";
	}
	var hasDay = false;
	var temp = seconds;
	var _s = 1;
	var _m = _s * 60;
	var _h = _m * 60;
	var _d = _h * 24;

	var d = Math.floor(temp / _d);
	if (hasDay)
	{
		temp = temp % _d;
	}

	var h = Math.floor(temp / _h);
	temp = temp % _h;
	var m = Math.floor(temp / _m);
	temp = temp % _m;
	var s = Math.floor(temp / _s);
	temp = temp % _s;

	var ret = "";

	var dat = {};

	dat.days = d.toString();


	dat.hours = h.toString().padLeft(2, '0');

	dat.minutes = m.toString().padLeft(2, '0');
	dat.seconds = s.toString().padLeft(2, '0');


	ret = format.formatData(dat);

	return ret;
},

	//****锚点数据
	function getAnchorArgs()
	{
		var newUrl = location.toString();
		var index = newUrl.indexOf('#');
		if (index >= 0)
		{
			var args = {};
			var anchor = newUrl.substr(index + 1);
			var anchorParams = anchor.split("&");
			var counter = 0;
			for (var i = 0; i < anchorParams.length; i++)
			{
				var anchorParamsItem = anchorParams[i];
				var anchorParamsItemData = anchorParamsItem.split("=");
				if (anchorParamsItemData.length == 2)
				{
					var k = anchorParamsItemData[0];
					var v = anchorParamsItemData[1].urlDecode();
					counter++;
					args[k] = v;
				}
			}
			console.log(args);
			return args;
		}
	}


function judgmentUrl(){
	var url =  location.href;
	var judgment = url.indexOf('https');
	if(judgment !== -1){
		if(Game.testMode){
			Game.Urls.baseURLs.webhost = "https://game.smzy.cc"
		}else{
			Game.Urls.baseURLs.webhost =  "https://poker.smzy.cc"
		}
	}else{
		if(Game.testMode){
			Game.Urls.baseURLs.webhost = "http://game.smzy.cc"
		}else{
			Game.Urls.baseURLs.webhost =  "http://poker.smzy.cc"
		}
	}
}

//公共host
var Game = {};
Game.testMode = true;
Game.Urls = {};
Game.Urls.baseURLs = {
	webhost:""
	//	内外测试地址
	// webhost: "https://game.smzy.cc"
	//	公网测试地址
	// webhost: "https://poker.smzy.cc"
};
judgmentUrl();