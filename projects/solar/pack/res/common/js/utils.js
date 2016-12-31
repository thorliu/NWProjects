const T = {};
T.getQuery = function (name) {
	var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return decodeURI(result[1]);
};

T.getDataValue = function (data, key) {
	if (data) { } else return null;
	var ks = key.split(".");
	var temp = data;
	for (var i = 0; i < ks.length; i++) {
		var k = ks[i];
		if (k != "") {
			temp = temp[k];
		}
	}
	return temp;
};

///移除两端的空白
String.prototype.trim = function () {
	return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
};

///HtmlEncode
String.prototype.htmlEncode = function () {
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
String.prototype.htmlDecode = function () {
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
String.prototype.urlEncode = function () {
	return encodeURI(this);
};

///UrlDecode
String.prototype.urlDecode = function () {
	return decodeURI(this);
};

///匹配所有结果
String.prototype.matchs = function (re) {
	var result = new Array();
	var str = this + "";

	var item = null;

	while ((item = re.exec(str)) !== null) {
		result.push(item);
	}

	return result;
};

///格式化参数
String.prototype.format = function () {
	var str = this + "";
	for (var i = 0; i < arguments.length; i++) {
		var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};

///格式化数据
String.prototype.formatData = function (data) {
	var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
	var ms = this.matchs(re);
	var str = this + "";
	for (var i = ms.length - 1; i >= 0; i--) {
		var m = ms[i];
		var mIndex = m.index;
		var mLength = m[0].length;
		var mKey = m[0].substr(1, mLength - 2);
		var mValue = T.getDataValue(data, mKey);
		var mStr = mValue ? mValue.toString() : "";
		str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
	}
	return str;
};

///格式化数组
String.prototype.formatArray = function (ary) {
	var str = this + "";
	var ret = "";

	for (var i = 0; i < ary.length; i++) {
		ret += str.formatData(ary[i]);
	}

	return ret;
};
