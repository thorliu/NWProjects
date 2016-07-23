/*************
 * Common Utils by liuqiang(thor.liu@outlook.com) 2016
 */
var T = {

	trim: function (str) {
		return str.replace(/^\s+/g, "").replace(/\s+$/g, "");
	},

	format: function () {
		if (arguments.length == 0)
			return null;
		var str = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
			str = str.replace(re, arguments[i]);
		}
		return str;
	},

	htmlEncode: function (str) {
		var s = "";
		if (str.length == 0) return "";
		s = str.replace(/&/g, "&gt;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		// s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "'");
		s = s.replace(/\"/g, "&quot;");
		s = s.replace(/\n/g, "<br>");
		return s;
	},

	htmlDecode: function (str) {
		var s = "";
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
	},

	getQueryString: function (name) {
		var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return decodeURI(result[1]);
	}
};
