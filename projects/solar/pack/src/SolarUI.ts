/*
 * Solar界面逻辑交互
 * @Author: thor.liu 
 * @Date: 2016-12-29 16:56:37 
 * @Last Modified by: thor.liu
 * @Last Modified time: 2016-12-29 20:05:38
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
			if (Delegate.inited) return;
			Delegate.inited = true;
			Delegate.handlers = new Object();
		}
		/**
		 * 添加一个委托侦听
		 */
		static add(name: string, handler: Function, thisObject: any): void {
			Delegate.init();

			if (Delegate.handlers[name]) {
				var exists = false;
				var ary = Delegate.handlers[name];
				for (var i = 0; i < ary.length; i++) {
					var e: DelegateHandler = ary[i];
					if (e.handler == handler && e.thisObject == thisObject) {
						exists = true;
						break;
					}
				}
				if (!exists) {
					var item: DelegateHandler = new DelegateHandler();
					item.handler = handler;
					item.thisObject = thisObject;
					ary.push(item);
				}
			}
		}

		/**
		 * 移除一个委托侦听
		 */
		static remove(name: string, handler: Function, thisObject: any): void {
			Delegate.init();
			if (Delegate.handlers[name]) {
				var ary = Delegate.handlers[name];
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
			Delegate.init();
			if (Delegate.handlers[name]) {
				delete Delegate.handlers[name];
			}
		}

		/**
		 * 移除指定函数的委托侦听
		 */
		static removeByHandler(handler: Function): void {
			Delegate.init();
			var names = Object.keys(Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (Delegate.handlers[name]) {
					var ary = Delegate.handlers[name];
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
			Delegate.init();
			var names = Object.keys(Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (Delegate.handlers[name]) {
					var ary = Delegate.handlers[name];
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
			Delegate.init();
			var names = Object.keys(Delegate.handlers);
			for (var j = 0; j < names.length; j++) {
				var name = names[j];
				if (Delegate.handlers[name]) {
					delete Delegate.handlers[name];
				}
			}
		}

		/**
		 * 执行委托侦听方法
		 */
		static execute(name: string, args: any): void {
			Delegate.init();
			if (Delegate.handlers[name]) {
				var ary = Delegate.handlers[name];
				for (var i = 0; i < ary.length; i++) {
					var handler: DelegateHandler = Delegate.handlers[name];
					handler.handler.apply(handler.thisObject, args);
				}
			}
		}
	}
}