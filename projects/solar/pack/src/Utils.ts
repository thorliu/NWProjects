module Utils
{
	export class StrUtils
	{
		/**
		 * 移除文本两端的空白
		 */
		static trim(src: string): string
		{
			return src.replace(/^\s+/g, "").replace(/\s+$/g, "");
		}

		/**
		 * HtmlEncode
		 */
		static htmlEncode(src: string): string
		{
			var s = "";
			var str = src + "";
			if (str.length == 0) return "";
			s = str.replace(/&/g, "&gt;");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			// s = s.replace(/ /g, "&nbsp;");
			s = s.replace(/\'/g, "'");
			s = s.replace(/\"/g, "&quot;");
			s = s.replace(/\n/g, "<br>");
			return s;
		}

		/**
		 * HtmlDecode
		 */
		static htmlDecode(src: string): string
		{
			var s = "";
			var str = src + "";
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
		}

		/**
		 * UrlEncode
		 */
		static urlEncode(src: string): string
		{
			return encodeURI(src);
		}

		/**
		 * UrlDecode
		 */
		static urlDecode(src: string): string
		{
			return decodeURI(src);
		}

		/**
		 * 匹配所有结果
		 */
		static matchs(src: string, re: RegExp): any
		{
			var result = new Array();
			var str = src + "";
			var item = null;
			while ((item = re.exec(str)) !== null)
			{
				result.push(item);
			}
			return result;
		}

		/**
		 * 格式化参数
		 */
		static format(src: string): string
		{
			var str = src + "";
			for (var i = 1; i < arguments.length; i++)
			{
				var re: RegExp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
				str = str.replace(re, arguments[i]);
			}

			return str;
		}

		/**
		 * 格式化数据
		 */
		static formatData(src: string, data: any): string
		{
			var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
			var ms = Utils.StrUtils.matchs(src, re);
			var str = src + "";
			for (var i = ms.length - 1; i >= 0; i--)
			{
				var m = ms[i];
				var mIndex = m.index;
				var mLength = m[0].length;
				var mKey = m[0].substr(1, mLength - 2);
				var mValue = Utils.StrUtils.getDataValue(data, mKey);
				var mStr = mValue ? mValue.toString() : "";
				str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
			}
			return str;
		}

		/**
		 * 格式化数组
		 */
		static formatArray(src: string, spec: string, ary: any): string
		{
			if (!src) return "";
			if (!ary) return src + "";

			var str = src + "";
			var ret = "";

			for (var i = 0; i < ary.length; i++)
			{
				if (i > 0) ret += spec;
				ret += Utils.StrUtils.formatData(str, ary[i]);
			}

			return ret;
		}

		/**
		 * 获取数据值
		 */
		static getDataValue(data: any, key: string): any
		{
			if (data) { } else return null;
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
		}

		/**
		 * 获取GET参数值
		 */
		static getQuery(name: string): string
		{
			var result = document.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
			if (result == null || result.length < 1)
			{
				return "";
			}
			return decodeURI(result[1]);
		}

		/**
		 * 获取GET参数组成的对象
		 */
		static getQueryData(): any
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
					var k = Utils.StrUtils.urlDecode(itemAry[0]);
					k = Utils.StrUtils.trim(k);
					var v = Utils.StrUtils.urlDecode(itemAry[1]);
					v = Utils.StrUtils.trim(v);
					if (k.length > 0)
					{
						ret[k] = v;
					}
				}
			}

			return ret;
		}

	}
}