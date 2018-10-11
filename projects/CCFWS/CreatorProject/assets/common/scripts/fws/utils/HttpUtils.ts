/*
 * Http 常用功能
 * @Author: 刘强 
 * @Date: 2018-07-16 17:47:09 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-16 17:47:29
 */
module HttpUtils
{

	/**
	 * URL正则表达式
	 */
	const regexUrl: RegExp = /^(http|https):\/\/([^\/\:]+)(:\d+)?([^\?\#]*)(\?[^#]*)?(#[^\r\n]*)?$/;

	/**
	 * 添加一个k/v参数字符串
	 * @export
	 * @param {string} src 
	 * @param {string} name 
	 * @param {*} value 
	 * @returns {string} 
	 */
	export function addParam(src: string, name: string, value: any): string
	{
		var ret: string = src + "";

		if (!name) return ret;
		if (value === null || value === undefined) return ret;

		if (ret.length > 0) ret += "&";

		ret += encodeURIComponent(name);
		ret += "=";
		ret += encodeURIComponent(value.toString());

		return ret;
	}

	/**
	 * 获取k/v参数集的字符串
	 * @export
	 * @param {*} data 
	 * @returns {string} 
	 */
	export function getParams(data: any): string
	{
		var ret: string = "";

		if (data && typeof (data) === "object")
		{
			for (var key in data)
			{
				var value: any = data[key];
				ret = addParam(ret, key.toString(), value);
			}
		}

		return ret;
	}

	/**
	 * 检查是否是合法的URL地址
	 * @param uri 
	 */
	export function isUrl(uri: string): boolean
	{
		if (uri.toLowerCase() === "about:blank") return true;
		else return regexUrl.test(uri);
	}

	/**
	 * URL地址处理类, 仅限http/https方案
	 * @class URL
	 */
	export class URL
	{
		/**
		 * 方案
		 * @protected
		 * @type {string}
		 * @memberof URL
		 */
		private _scheme: string;

		/**
		 * 主机
		 * @protected
		 * @type {string}
		 * @memberof URL
		 */
		private _host: string;

		/**
		 * 端口
		 * @protected
		 * @type {number}
		 * @memberof URL
		 */
		private _port: number;

		/**
		 * 路径
		 * @protected
		 * @type {string}
		 * @memberof URL
		 */
		private _path: string;

		/**
		 * 请求参数
		 * @protected
		 * @type {string}
		 * @memberof URL
		 */
		private _query: string;

		/**
		 * 锚点参数
		 * @protected
		 * @type {string}
		 * @memberof URL
		 */
		private _anchor: string;

		/**
		 * 构造
		 * @param {string} uri 参考地址
		 * @param {string} baseUrl 基础地址
		 * @memberof URL
		 */
		constructor(uri?: string, baseUrl?: string)
		{
			this._scheme = "";
			this._host = "";
			this._port = 0;
			this._path = "";
			this._query = "";
			this._anchor = "";
			this.parse(uri, baseUrl);
		}

		/**
		 * 检查URL是否合法
		 * @param {string} uri 
		 * @returns {boolean} 
		 * @memberof URL
		 */
		static isUrl(uri: string): boolean
		{
			return HttpUtils.isUrl(uri);
		}

		/**
		 * 解析URL地址
		 * @protected
		 * @param {string} uri 参考地址
		 * @param {string} baseUrl 基础地址
		 * @memberof URL
		 */
		protected parse(uri: string, baseUrl: string): void
		{
			if (!uri) return;
			var url: string = uri;
			if (baseUrl && baseUrl.length > 0)
			{
				if (baseUrl.substr(baseUrl.length - 1, 1) === "/" || uri.substr(0, 1) === "/")
				{
					url = baseUrl + uri;
				}
				else
				{
					url = baseUrl + "/" + uri;
				}
			}

			if (!regexUrl.test(url)) return;

			var ps: RegExpExecArray = regexUrl.exec(url);

			this._scheme = (ps[1] ? ps[1] : "");
			this._host = (ps[2] ? ps[2] : "");
			if (ps[3] && ps[3].length > 1)
			{
				this._port = parseInt(ps[3].substr(1));
			}
			else this._port = 0;
			this._path = (ps[4] ? ps[4] : "");

			//query
			if (ps[5] && ps[5].length > 1)
			{
				this._query = ps[5].substr(1);
			}
			else this._query = "";

			//anchor
			if (ps[6] && ps[6].length > 1)
			{
				this._anchor = ps[6].substr(1);
			}
			else this._anchor = "";
		}

		/**
		 * 添加一个请求参数
		 * @param {string} name 
		 * @param {*} value 
		 * @memberof URL
		 */
		public addQueryParam(name: string, value: any): void
		{
			this._query = addParam(this._query, name, value);
		}

		/**
		 * 添加一个锚点参数
		 * @param {string} name 
		 * @param {*} value 
		 * @memberof URL
		 */
		public addAnchorParam(name: string, value: any): void
		{
			this._anchor = addParam(this._anchor, name, value);
		}



		/**
		 * 设置请求数据
		 * @param {*} data 
		 * @memberof URL
		 */
		public setQueryParams(data: any): void
		{
			this._query = getParams(data);
		}

		/**
		 * 设置锚点数据
		 * @param {*} data 
		 * @memberof URL
		 */
		public setAnchorParams(data: any): void
		{
			this._anchor = getParams(data);
		}

		/**
		 * 获取URL地址字符串
		 * @returns {string} 
		 * @memberof URL
		 */
		public toString(): string
		{
			var ret: string = "";

			ret += this._scheme + "://";
			ret += this._host;
			if (this._port > 0)
			{
				ret += ":" + this._port.toString();
			}
			ret += this._path;
			if (this._query && this._query.length > 0)
			{
				ret += "?" + this._query;
			}
			if (this._anchor && this._anchor.length > 0)
			{
				ret += "#" + this._anchor;
			}

			return ret;
		}

		//属性

		/**
		 * 获取或设置地址方案(HTTP/HTTPS)
		 * @type {string}
		 * @memberof URL
		 */
		public get scheme(): string
		{
			return this._scheme;
		}
		public set scheme(v: string)
		{
			this._scheme = v;
		}

		/**
		 * 获取或设置主机地址(域名或者端口)
		 * @type {string}
		 * @memberof URL
		 */
		public get host(): string
		{
			return this._host;
		}
		public set host(v: string)
		{
			this._host = v;
		}

		/**
		 * 获取或设置端口号
		 * @type {number}
		 * @memberof URL
		 */
		public get port(): number
		{
			return this._port;
		}
		public set port(v: number)
		{
			this._port = v;
		}

		/**
		 * 获取或设置路径
		 * @type {string}
		 * @memberof URL
		 */
		public get path(): string
		{
			return this._path;
		}
		public set path(v: string)
		{
			this._path = v;
		}

		/**
		 * 获取或设置请求参数(GET)
		 * @type {string}
		 * @memberof URL
		 */
		public get query(): string
		{
			return this._query;
		}
		public set query(v: string)
		{
			this._query = v;
		}

		/**
		 * 获取或设置锚点参数
		 * @type {string}
		 * @memberof URL
		 */
		public get anchor(): string
		{
			return this._anchor;
		}
		public set anchor(v: string)
		{
			this._anchor = v;
		}
	}
}

export = HttpUtils;

// SAMPLE:
// var u = new HttpUtils.URL("http://www.163.com:8080/abcde/ddd/p/1232345.html?a=1&b=2&c=3#abcdefg");
// var u = new HttpUtils.URL("/module/api", "http://poker.smzy.cc:8080");
// u.addQueryParam("token","OOOOOOO");
// u.addQueryParam("userid", "10175000062");
// u.addAnchorParam("gameuuid", "XXXXXXXX");
// console.log(u);
// console.log(u.toString());

