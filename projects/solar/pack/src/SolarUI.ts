/*
 * Solar界面逻辑交互
 * @Author: thor.liu 
 * @Date: 2016-12-29 16:56:37 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-31 20:32:04
 */
module SolarUI {

	///委托过程
	export class DelegateHandler {
		constructor() {

		}

		public handler: Function;
		public thisObject: any;
	}

	/**
	 * 提供给JS与TS之间的委托接口
	 */
	export class Delegate {

		static handlers: any;
		static inited: boolean;

		/**
		 * 初始化
		 */
		static init(): void {
			if (SolarUI.Delegate.inited) return;
			SolarUI.Delegate.inited = true;
			SolarUI.Delegate.handlers = new Object();
		}
		/**
		 * 添加一个委托侦听
		 */
		static add(name: string, handler: Function, thisObject: any): void {
			SolarUI.Delegate.init();

			console.log("Delegate::add", name);

			var ary = null;
			if (SolarUI.Delegate.handlers[name]) {
				var exists = false;
				ary = SolarUI.Delegate.handlers[name];
				for (var i = 0; i < ary.length; i++) {
					var e: DelegateHandler = ary[i];
					if (e.handler == handler && e.thisObject == thisObject) {
						exists = true;
						break;
					}
				}
				if (exists) return;
			}
			else {
				ary = new Array();
				SolarUI.Delegate.handlers[name] = ary;
			}

			var item: DelegateHandler = new DelegateHandler();
			item.handler = handler;
			item.thisObject = thisObject;
			ary.push(item);
			console.log("Delegate::add push", name);
		}

		/**
		 * 移除一个委托侦听
		 */
		static remove(name: string, handler: Function, thisObject: any): void {
			SolarUI.Delegate.init();
			if (SolarUI.Delegate.handlers[name]) {
				var ary = SolarUI.Delegate.handlers[name];
				for (var i = ary.length - 1; i >= 0; i--) {
					var e: DelegateHandler = ary[i];
					if (e.handler == handler && e.thisObject == thisObject) {
						ary.splice(i, 1);
						break;
					}
				}
			}
		}

		/**
		 * 移除指定名称的委托侦听
		 */
		static removeByName(name: string): void {
			SolarUI.Delegate.init();
			if (SolarUI.Delegate.handlers[name]) {
				delete SolarUI.Delegate.handlers[name];
			}
		}

		/**
		 * 移除指定函数的委托侦听
		 */
		static removeByHandler(handler: Function): void {
			SolarUI.Delegate.init();
			var names = Object.keys(SolarUI.Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (SolarUI.Delegate.handlers[name]) {
					var ary = SolarUI.Delegate.handlers[name];
					for (var i = ary.length - 1; i >= 0; i--) {
						var e: DelegateHandler = ary[i];
						if (e.handler == handler) {
							ary.splice(i, 1);
						}
					}
				}
			}
		}

		/**
		 * 移除指定对象的委托侦听
		 */
		static removeByThis(thisObject: any): void {
			SolarUI.Delegate.init();
			var names = Object.keys(SolarUI.Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (SolarUI.Delegate.handlers[name]) {
					var ary = SolarUI.Delegate.handlers[name];
					for (var i = ary.length - 1; i >= 0; i--) {
						var e: DelegateHandler = ary[i];
						if (e.thisObject == thisObject) {
							ary.splice(i, 1);
						}
					}
				}
			}
		}

		/**
		 * 移除所有的委托侦听
		 */
		static removeAll(): void {
			SolarUI.Delegate.init();
			var names = Object.keys(SolarUI.Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (SolarUI.Delegate.handlers[name]) {
					delete SolarUI.Delegate.handlers[name];
				}
			}
		}

		/**
		 * 执行委托侦听方法
		 */
		static execute(name: string, args: any): void {
			SolarUI.Delegate.init();
			console.log("SolarUI.Delegate.execute:", name, args);
			if (SolarUI.Delegate.handlers[name]) {
				var ary = SolarUI.Delegate.handlers[name];
				for (var i = 0; i < ary.length; i++) {
					var handler: DelegateHandler = ary[i];
					handler.handler.apply(handler.thisObject, args);
				}
			}
		}
	}
}