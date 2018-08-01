/*
 * 显示对象池
 * @Author: 刘强 
 * @Date: 2018-07-31 17:35:59 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 17:59:54
 */

module FWSNodePool
{
	/** 显示对象池创建接口 */
	export interface FWSNodePoolCreator
	{
		(): cc.Node;
	}

	/** 显示对象池 */
	export class NodePool
	{
		protected creator: FWSNodePoolCreator;
		protected used: cc.Node[];
		protected _initedCount: number;
		protected _limitCount: number;
		protected _pool: cc.NodePool;

		/**
		 * 构造
		 * @param creator 创建方法
		 * @param initedCount 初始数量
		 * @param limitCount 限制数量 (负数或者0表示不限制)
		 */
		constructor(
			creator: FWSNodePoolCreator, 
			initedCount: number = 0, 
			limitCount: number = -1)
		{
			this.used = [];
			this._pool = new cc.NodePool();

			this.creator = creator;
			this._initedCount = initedCount;
			this._limitCount = limitCount;

			this.createHandler();
		}

		/** 清除方法 */
		protected clearHandler(): void
		{
			this.putAllHandler();
			this._pool.clear();
		}

		/** 创建方法 */
		protected createHandler(): void
		{
			if (!this.creator) return;
			for (var i: number = 0; i < this._initedCount; i++)
			{
				var node: cc.Node = this.creator();
				if (node)
				{
					this._pool.put(node);
				}
			}
		}

		/** 获取方法 */
		protected getHandler(): cc.Node
		{
			var ret: cc.Node = null;
			if (this._pool.size() > 0)
			{
				ret = this._pool.get();
				if (!ret.isValid) ret = null;
			}

			if (!ret && this._limitCount <= 0 && this.creator)
			{
				ret = this.creator();
			}

			if (ret)
			{
				this.used.push(ret);
			}

			return ret;
		}

		/** 放入方法 */
		protected putHandler(node: cc.Node): void
		{
			if (!node) return;

			var i: number = this.used.indexOf(node);
			if (i >= 0) this.used.splice(i, 1);

			if (!node.isValid) return;
			this._pool.put(node);
		}

		/** 收回所有内容 */
		protected putAllHandler(): void
		{
			for (var i: number = 0; i < this.used.length; i++)
			{
				var node: cc.Node = this.used[i];
				if (!node.isValid) continue;
				this._pool.put(node);
			}
			this.used.splice(0, this.used.length);
		}

		/** 获取限制数量 */
		public get limitCount(): number
		{
			return this._limitCount;
		}

		/** 获取初始数量 */
		public get initedCount(): number
		{
			return this._initedCount;
		}

		/** 获了已经使用的数量 */
		public get usedCount(): number
		{
			return this.used.length;
		}

		/** 获取未使用的数量 */
		public get freedCount(): number
		{
			return this._pool.size();
		}

		/** 拿出对象 */
		public getNode(): cc.Node
		{
			return this.getHandler();
		}

		/** 收回指定对象 */
		public putNode(node: cc.Node): void
		{
			this.putHandler(node);
		}

		/** 收回所有对象 */
		public putAllNodes(): void
		{
			this.putAllHandler();
		}

		/** 重置对象池 */
		public reset(): void
		{
			this.clearHandler();
			this.createHandler();
		}
	}
}

export = FWSNodePool;


