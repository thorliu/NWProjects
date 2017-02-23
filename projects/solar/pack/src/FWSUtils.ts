module FWSUtils
{
	
		/**
		 * 移除文本两端的空白
		 */
		export function trim(src: string): string
		{

			return src.replace(/^\s+/g, "").replace(/\s+$/g, "");
		}

		/**
		 * HtmlEncode
		 */
		export function htmlEncode(src: string): string
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
		export function htmlDecode(src: string): string
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
		export function urlEncode(src: string): string
		{
			return encodeURI(src);
		}

		/**
		 * UrlDecode
		 */
		export function urlDecode(src: string): string
		{
			return decodeURI(src);
		}

		/**
		 * 匹配所有结果
		 */
		export function matchs(src: string, re: RegExp): any
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
		export function format(src: string, ...args): string
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
		export function formatData(src: string, data: any): string
		{
			var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
			var ms = FWSUtils.matchs(src, re);
			var str = src + "";
			for (var i = ms.length - 1; i >= 0; i--)
			{
				var m = ms[i];
				var mIndex = m.index;
				var mLength = m[0].length;
				var mKey = m[0].substr(1, mLength - 2);
				var mValue = FWSUtils.getDataValue(data, mKey);
				var mStr = mValue ? mValue.toString() : "";
				str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
			}
			return str;
		}

		/**
		 * 格式化数组
		 */
		export function formatArray(src: string, spec: string, ary: any): string
		{
			if (!src) return "";
			if (!ary) return src + "";

			var str = src + "";
			var ret = "";

			for (var i = 0; i < ary.length; i++)
			{
				if (i > 0) ret += spec;
				ret += FWSUtils.formatData(str, ary[i]);
			}

			return ret;
		}

		/**
		 * 获取数据值
		 */
		export function getDataValue(data: any, key: string): any
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
		export function getQuery(name: string): string
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
		export function getQueryData(): any
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
					var k = FWSUtils.urlDecode(itemAry[0]);
					k = FWSUtils.trim(k);
					var v = FWSUtils.urlDecode(itemAry[1]);
					v = FWSUtils.trim(v);
					if (k.length > 0)
					{
						ret[k] = v;
					}
				}
			}

			return ret;
		}


}