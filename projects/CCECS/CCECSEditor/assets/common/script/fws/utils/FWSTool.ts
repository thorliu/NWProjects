/*
 * 常用工具类
 * @Author: 刘强 
 * @Date: 2018-08-02 11:29:26 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-17 18:03:04
 */

module FWSTool
{
	/**
	 * 对象相关的常用功能
	 * @export
	 * @class Obj
	 */
	export class Obj
	{
		/**
		 * 判定对象是否为null或者undefined
		 * @static
		 * @param {*} target 目标对象
		 * @returns {boolean} 
		 * @memberOf Obj
		 */
		static isEmpty(target: any): boolean 
		{
			return (target === null || target === undefined);
		}

		/** 判定target是否是指定的类型type */
		static is(target: any, type: any): boolean
		{
			var ret: boolean = false;

			if (type === Function && typeof (target) === "function") ret = true;
			else if (type === Number && typeof (target) === "number") ret = true;
			else if (type === Boolean && typeof (target) === "boolean") ret = true;
			else if (type === String && typeof (target) === "string") ret = true;
			else if (typeof (target) === "object")
			{
				ret = target instanceof (type);
			}

			return ret;
		}

		/**
		 * 判定对象是否为字符串
		 * @static
		 * @param {*} target 
		 * @returns {boolean} 
		 * @memberOf Obj
		 */
		static isString(target: any): boolean
		{
			return typeof (target) === "string";
		}

		/**
		 * 判定对象是否为数值
		 * @static
		 * @param {*} target 
		 * @returns {boolean} 
		 * @memberOf Obj
		 */
		static isNumber(target: any): boolean
		{
			return typeof (target) === "number";
		}

		/**
		 * 判定对象是否为函数
		 * @static
		 * @param {*} target 
		 * @returns {boolean} 
		 * 
		 * @memberOf Obj
		 */
		static isFunction(target: any): boolean
		{
			return typeof (target) === "function";
		}

		static getClassName(target: any): string
		{
			if (target !== null && target !== undefined)
			{
				if (target.constructor)
				{
					if (target.constructor.name !== null && target.constructor.name !== undefined)
					{
						return target.constructor.name;
					}
				}
			}
			return "";
		}
	}

	/**
	 * 字符串相关的常用功能
	 * @export
	 * @class Str
	 */
	export class Str
	{
		static date(): string
		{
			var now: Date = new Date();
			return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
		}
		/** 获取一个guid */
		static guid(): string
		{
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
			{
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

		/**
		 * 获取一个移除了左边所有空白字符的新字符串
		 * @static
		 * @param {string} target 
		 * @returns {string} 
		 * @memberOf Str
		 */
		static ltrim(target: string): string
		{
			return target.replace(/^\s+/g, "");
		}

		/**
		 * 获取一个移除了右边所有空白字符的新字符串
		 * @static
		 * @param {string} target 
		 * @returns {string} 
		 * @memberOf Str
		 */
		static rtrim(target: string): string
		{
			return target.replace(/\s+$/g, "");
		}

		/**
		 * 获取一个移除了左边和右边所有空白字符的新字符串
		 * @static
		 * @param {string} target 
		 * @returns {string} 
		 * 
		 * @memberOf Str
		 */
		static trim(target: string): string
		{
			return Str.ltrim(Str.rtrim(target));
		}

		/**
		 * 重复n个字符串的结果
		 * @param count 重复次数
		 * @param char 重复的内容
		 */
		static repeat(count: number, char: string): string
		{
			var ret: string = "";
			for (var i: number = 0; i < count; i++)
			{
				ret += char;
			}
			return ret;
		}

		/**
		 * 在字符串的左边填充内容至指定位数
		 * @static
		 * @param {string} source 
		 * @param {number} count 
		 * @param {string} fill 
		 * @returns {string} 
		 * 
		 * @memberOf Str
		 */
		static padLeft(source: string, count: number, fill: string): string
		{
			var ret: string = Str.repeat(count, fill) + source;
			ret = ret.substr(ret.length - count);
			return ret;
		}

		/**
		 * 在字符串的右边填充内容至指定位数
		 * 
		 * @static
		 * @param {string} source 
		 * @param {number} count 
		 * @param {string} fill 
		 * @returns {string} 
		 * 
		 * @memberOf Str
		 */
		static padRight(source: string, count: number, fill: string): string
		{
			var ret: string = source + Str.repeat(count, fill);
			ret = ret.substr(0, count);
			return ret;
		}

		/**
		 * 当前时间信息
		 * @static
		 * @returns {string} 
		 * @memberOf Str
		 */
		static nowDateTime(): string
		{
			var date: Date = new Date();
			var ret: string = Str.padLeft(date.getFullYear().toString(), 4, "0");
			ret += "/";
			ret += Str.padLeft((date.getMonth() + 1).toString(), 2, "0");
			ret += "/";
			ret += Str.padLeft(date.getDate().toString(), 2, "0");
			ret += " ";
			ret += Str.padLeft(date.getHours().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getMinutes().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getSeconds().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getMilliseconds().toString(), 3, "0");
			return ret;
		}

		/**
		 * 格式化时间 
		 * @param date 
		 */
		static dateTime(date: Date): string
		{
			var ret: string = Str.padLeft(date.getFullYear().toString(), 4, "0");
			ret += "/";
			ret += Str.padLeft((date.getMonth() + 1).toString(), 2, "0");
			ret += "/";
			ret += Str.padLeft(date.getDate().toString(), 2, "0");
			ret += " ";
			ret += Str.padLeft(date.getHours().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getMinutes().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getSeconds().toString(), 2, "0");
			ret += ":";
			ret += Str.padLeft(date.getMilliseconds().toString(), 3, "0");
			return ret;
		}

		/**
		 * 格式化时间
		 * @param date 时间戳
		 * @param fmt 格式
		 * 
		 	var date = new Date();
			date.Format("yyyy年MM月dd日 hh:mm:ss.S") //输出: 2016年04月01日 10:41:08.133
			date.Format("yyyy-MM-dd hh:mm:ss") //输出: 2016-04-01 10:41:08
			date.Format("yy-MM-dd hh:mm:ss") //输出: 16-04-01 10:41:08
			date.Format("yy-M-d hh:mm:ss") //输出: 16-4-1 10:41:08

		 * @memberOf Str
		 */
		static dateTimeFormat(date: Date, fmt: string): string
		{
			var o = {
				"y+": date.getFullYear(),
				"M+": date.getMonth() + 1,                 //月份
				"d+": date.getDate(),                    //日
				"h+": date.getHours(),                   //小时
				"m+": date.getMinutes(),                 //分
				"s+": date.getSeconds(),                 //秒
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度
				"S+": date.getMilliseconds()             //毫秒
			};
			for (var k in o)
			{
				if (new RegExp("(" + k + ")").test(fmt))
				{
					if (k == "y+")
					{
						fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
					}
					else if (k == "S+")
					{
						var lens = RegExp.$1.length;
						lens = lens == 1 ? 3 : lens;
						fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
					}
					else
					{
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
					}
				}
			}
			return fmt;
		}

		/**
		 * 判定字符串是否是个空的
		 * @static
		 * @param {string} target 
		 * @returns {boolean} 
		 * @memberOf Str
		 */
		static isEmpty(target: string): boolean
		{
			if (target === null || target === undefined) return true;
			if (target.length === 0) return true;
			if (Str.trim(target.toString()).length === 0) return true;

			return false;
		}

		/**
		 * 比较判定两个版本号
		 * @static
		 * @param {string} a 版本号a
		 * @param {string} b 版本号b
		 * @returns {number} 0表示两个版本号完全相同, 负数表示a小于b, 正数表示a大于b
		 * @memberOf Str
		 */
		static versionCompare(a: string, b: string): number
		{
			if (!a && !b) return 0;
			if (a.length === 0 && b.length === 0) return 0;

			var aVer: string[] = a.split(".");
			var bVer: string[] = b.split(".");

			var len: number = Math.max(aVer.length, bVer.length);

			for (var i: number = 0; i < len; i++)
			{
				let aSzVer: string = aVer[i];
				let bSzVer: string = bVer[i];

				let aNum: number = 0;
				let bNum: number = 0;
				if (aSzVer) aNum = parseInt(aSzVer);
				if (bSzVer) bNum = parseInt(bSzVer);

				if (aNum > bNum) return 1;
				else if (aNum < bNum) return -1;
			}

			return 0;
		}

		/** 获取路径的文件名 */
		static getFilename(path: string): string
		{

			if (path !== null && path !== undefined)
			{
				var ret: string = path + "";
				var i1: number = path.lastIndexOf("/");
				var i2: number = path.lastIndexOf("\\");
				var i: number = -1;

				if (i1 >= 0 || i2 >= 0)
				{
					i = Math.max(i1, i2);
					if (i < ret.length)
					{
						ret = ret.substr(i + 1);
					}
				}

				var p: number = ret.lastIndexOf(".");
				if (p >= 0)
				{
					ret = ret.substr(0, p);
				}
				return ret;
			}
			else return "";
		}

		/** 结路径加一个扩展名 */
		static addFileType(path: string, type: string): string
		{
			var ret: string = path + "";

			if (ret.length >= type.length)
			{
				if (ret.substr(ret.length - type.length).toUpperCase() !== type.toUpperCase())
				{
					ret += type;
				}
			}
			else ret += type;

			return ret;
		}

		/**
	 * 匹配字符串的多个结果
	 * @param {RegExp} re 正则表达式
	 * @param {string} str 字符串
	 */
		static matchs(re: RegExp, str: string): any[]
		{
			var result = new Array();

			var item = null;

			while ((item = re.exec(str)) !== null)
			{
				result.push(item);
			}

			return result;
		}

		/**
	 * 格式化字符串, 例如: format("{0}@{1}", "username", "domain.com") 返回 "username@domain.com"
	 * @param {string} template 模板内容，使用{数字}表示参数占位符
	 * @param {...string[]} args 参数内容
	 */
		static format(template: string, ...args: any[]): string
		{
			var str: string = template + "";
			for (var i = 0; i < args.length; i++)
			{
				var re = new RegExp('\\{' + (i) + '\\}', 'gm');
				var a: any = args[i];
				var s: string = FWSTool.Str.isEmpty(a) ? "" : a.toString();
				str = str.replace(re, s);
			}
			return str;
		}

		/**
		 * 格式化字符串, 例如: formatObject("{username}@{domain}", {username: "AAAA", domain: "BBBB"}) 返回 "AAAA@BBBB"
		 * @param {string} template 模板内容，使用{path}表示参数占位符
		 * @param {any} obj 
		 */
		static formatObject(template: string, obj: any): string
		{
			var re = new RegExp('\\{[^\\{\\}]*\\}', 'gm');
			var ms = Str.matchs(re, template);
			var str = template + "";
			for (var i = ms.length - 1; i >= 0; i--)
			{
				var m = ms[i];
				var mIndex = m.index;
				var mLength = m[0].length;
				var mKey = m[0].substr(1, mLength - 2);
				var mValue = obj[mKey];
				var mStr = (!Obj.isEmpty(mValue)) ? mValue.toString() : "";
				str = str.substr(0, mIndex) + mStr + str.substr(mIndex + mLength);
			}
			return str;
		}

		/**
		 * 格式化字符串
		 * @param {string} template 模板内容
		 * @param {arny[]} ary 包含数据对象的数组
		 * @param {string} sep 分隔符内容
		 */
		static formatArray(template: string, ary: any[], sep: string = ""): string
		{
			if (ary === null || ary === undefined || ary.length === 0) return "";

			var temp: string[] = [];

			for (var i: number = 0; i < ary.length; i++)
			{
				temp.push(Str.formatObject(template, ary[i]));
			}

			return temp.join(sep);
		}


		/** 千分位样式化数值 */
		static formatNumbericThousand(n: number, rate: number = 1): string
		{
			var v: string = Math.floor(n / rate).toString();
			var ret: string = "";
			for (var i: number = 0; i < v.length; i++)
			{
				var c: string = v.substr(v.length - 1 - i, 1);

				if (i >= 3 && (i % 3) === 0)
				{
					ret = "," + ret;
				}

				ret = c + ret;
			}

			return ret;
		}

		/** 按K，M，G，T为单位格式化 (???,??? U 形式) */
		static formatNumbericK(n: number): string
		{
			var units: string[] = ["K", "M", "G", "T"];
			for (var i: number = 4; i >= 1; i--)
			{
				if (n >= Math.pow(1000, i + 1)) return this.formatNumbericThousand(n, Math.pow(1000, i)) + " " + units[i - 1];
			}

			return this.formatNumbericThousand(n);
		}
	}

	/**
	 * 数组相关的常用功能
	 * @export
	 * @class Ary
	 */
	export class Ary
	{
		/**
		 * 检查索引是否在数组的范围内
		 * @static
		 * @param {Array<any>} ary 
		 * @param {number} index 
		 * @returns {boolean} 
		 * 
		 * @memberOf Ary
		 */
		static inRange(ary: Array<any>, index: number): boolean
		{
			if (Obj.isEmpty(ary)) return false;
			return index >= 0 && index < ary.length;
		}

		static remove(ary: Array<any>, item: any): void
		{
			var index: number = ary.indexOf(item);
			if (index >= 0 && index < ary.length)
			{
				ary.splice(index, 1);
			}
		}
	}

	/**
	 * 枚举相关功能
	 */
	export class Enum
	{
		/**
		 * 判定a中是否包含了b
		 * @static
		 * @param {number} a 
		 * @param {number} b 
		 * @returns {boolean} 
		 * 
		 * @memberOf Enum
		 */
		static contain(a: number, b: number): boolean
		{
			if (!Obj.isEmpty(a) && !Obj.isEmpty(b))
			{
				return (a & b) === b;
			}
			return false;
		}

		/**
		 * 产生一个新的枚举值, 里面包含了a和b (按位或)
		 * 
		 * @static
		 * @param {number} a 
		 * @param {number} b 
		 * @returns {number} 
		 * 
		 * @memberOf Enum
		 */
		static add(a: number, b: number): number
		{
			if (Obj.isEmpty(a) && Obj.isEmpty(b))
			{
				return 0;
			}
			else if (Obj.isEmpty(a))
			{
				return b;
			}
			else if (Obj.isEmpty(b))
			{
				return a;
			}
			else return a | b;
		}

		/**
		 * 返回一个新的枚举值, 从a中移除b
		 * @static
		 * @param {number} a 
		 * @param {number} b 
		 * @returns {number} 
		 * @memberOf Enum
		 */
		static remove(a: number, b: number): number
		{
			if (Obj.isEmpty(a))
			{
				return 0;
			}
			else if (Obj.isEmpty(b))
			{
				return a;
			}
			else 
			{
				if ((a & b) == b)
				{
					return a - b;
				}
				else
				{
					return a;
				}
			}
		}
	}

	/**
	 * 随机数
	 */
	export class Random
	{
		/**
		 * 获取一个浮点随机数
		 * @static
		 * @param {number} min 
		 * @param {number} max 
		 * @returns {number} 
		 * @memberOf Random
		 */
		static getFloat(min: number, max: number): number
		{
			return (Math.random() * (max - min)) + min;
		}

		/**
		 * 获取一个整数随机数
		 * @static
		 * @param {number} min 
		 * @param {number} max 
		 * @returns {number} 
		 * @memberOf Random
		 */
		static getInt(min: number, max: number): number
		{
			return Math.round(Random.getFloat(min, max));
		}

		/**
		 * 从数组中随机取一个成员
		 * @static
		 * @param {Array<any>} ary 
		 * @returns {*} 
		 * @memberOf Random
		 */
		static getArray(ary: Array<any>): any
		{
			if (ary && ary.length > 0)
			{
				var i: number = Random.getInt(0, ary.length - 1);
				return ary[i];
			}
			return null;
		}

		/**
		 * 根据机率权重值, 从数组中随机取一个成员
		 * @static
		 * @param {Array<any>} ary 
		 * @param {Array<number>} prob 
		 * @returns {*} 
		 * @memberOf Random
		 */
		static getArrayByProbability(ary: Array<any>, prob: Array<number>): any
		{
			if (ary && ary.length > 0 && prob && prob.length === ary.length)
			{
				var max: number = 0;
				for (var i: number = 0; i < prob.length; i++)
				{
					max += prob[i];
				}

				var r: number = Random.getInt(0, max);
				var tmpMin: number = 0;
				var tmpMax: number = 0;
				for (var i: number = 0; i < prob.length; i++)
				{
					tmpMax += prob[i];
					//check

					if (r >= tmpMin && r <= tmpMax)
					{
						return ary[i];
					}

					tmpMin += prob[i];
				}

			}
			return null;
		}

		static toArray(ary: Array<any>): Array<any>
		{
			var arr: Array<any> = ary.slice(0);

			var len: number = arr.length;
			for (var i: number = 0; i < len - 1; i++)
			{
				var idx: number = Math.floor(Math.random() * (len - i));
				var temp = arr[idx];
				arr[idx] = arr[len - i - 1];
				arr[len - i - 1] = temp;
			}

			return arr;
		}
	}
}

export = FWSTool;
window["FWSTool"] = FWSTool;


// ## 去除空白
// var str: string = "  Hello  ";
// console.log("去除左边的空白内容 <" + FWSTool.Str.ltrim(str) + ">");
// console.log("去除右边的空白内容 <" + FWSTool.Str.rtrim(str) + ">");
// console.log("去除左边和右边的空白内容 <" + FWSTool.Str.trim(str) + ">");
// // 去除左边的空白内容 <Hello  >
// // FWSTool.ts:681 去除右边的空白内容 <  Hello>
// // FWSTool.ts:682 去除左边和右边的空白内容 <Hello>


// // ## 日期和时间格式化
// var date: Date = new Date();
// console.log(FWSTool.Str.dateTimeFormat(date, "yyyy年MM月dd日 hh:mm:ss.S"));
// console.log(FWSTool.Str.dateTimeFormat(date, "yyyy-MM-dd hh:mm:ss"));
// console.log(FWSTool.Str.dateTimeFormat(date, "yy-MM-dd hh:mm:ss"));
// console.log(FWSTool.Str.dateTimeFormat(date, "yy-M-d hh:mm:ss"));
// // 2018年08月10日 15:18:27.104
// // FWSTool.ts:687 2018-08-10 15:18:27
// // FWSTool.ts:688 18-08-10 15:18:27
// // FWSTool.ts:689 18-8-10 15:18:27


// // ## 参数格式化
// console.log(FWSTool.Str.format("{0}年{1}月{2}日", 2018, 8, 10));
// //2018年8月10日


// // ## 对象格式化
// var obj = { year: 2018, month: 8, day: 10};
// console.log(FWSTool.Str.formatObject("{year}年{month}月{day}日", obj));
// //2018年8月10日


// // ## 数组格式化
// var ary = [];
// ary.push({ year: 2018, month: 7, day: 10});
// ary.push({ year: 2018, month: 8, day: 11});
// ary.push({ year: 2018, month: 9, day: 12});
// console.log(FWSTool.Str.formatArray("{year}年{month}月{day}日", ary, " | "));
// //2018年7月10日 | 2018年8月11日 | 2018年9月12日

// // ## 获取文件名
// console.log(FWSTool.Str.getFilename("/abc/def/ghi/jkl/test1.jpg"));
// console.log(FWSTool.Str.getFilename("http://abc/def/ghi/jkl/test2.jpg"));
// console.log(FWSTool.Str.getFilename("c:\\abc\\def\\ghi\\jkl\\test3.jpg"));

// // ## 补齐字符串
// console.log(FWSTool.Str.padLeft("123", 10, "0"));
// console.log(FWSTool.Str.padRight("123", 10, "0"));

// // ## 重复字符串
// console.log(FWSTool.Str.repeat(3, "O."));

// // ## 字符串判空
// console.log("null:", FWSTool.Str.isEmpty(null));
// console.log("undefined:", FWSTool.Str.isEmpty(undefined));
// console.log("empty:", FWSTool.Str.isEmpty(" \t"));

// debugger