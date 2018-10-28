/*
 * 样本实例加载器
 * @Author: 刘强 
 * @Date: 2018-08-23 12:44:19 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-10 10:27:09
 */

import FWSCommon = require('../core/FWSCommon');
import X = require('../utils/X');
import FWSAssertCaches = require('./factory/FWSAssertCaches');


class UIPrefabLoader
{
	protected _node: cc.Node;
	protected _prefabName: string;
	protected _prefabNode: cc.Node;
	protected prefabNodeCreated: boolean = false;
	protected _fillToScene: boolean = false;

	static cachePrefabs: any = {};

	constructor(prefabName: string, fillToScene: boolean = true)
	{
		this._prefabName = prefabName;
		this._fillToScene = fillToScene;
		this._node = this.createContainerNode();
		this.addPrefab();
	}

	protected createContainerNode(): cc.Node
	{
		var ws: cc.Size = cc.director.getWinSize();
		var ret: cc.Node = new cc.Node();
		ret.setAnchorPoint(0.5, 0.5);
		if(this._fillToScene)
		{
			ret.setContentSize(ws.width, ws.height);
			ret.setPosition(ws.width / 2, ws.height / 2);
		}
		return ret;
	}

	protected addPrefab(): void
	{
		var self: UIPrefabLoader = this;
		var p: cc.Prefab = FWSAssertCaches.getPrefab(this._prefabName);
		if (p)
		{
			// console.log("(UIPrefabLoader) cacheFactory ", this._prefabName);
			setTimeout(() =>
			{
				self._prefabNode = cc.instantiate(p);
				self._node.addChild(self._prefabNode);
				self.onPrefabNodeCreated();
			}, 10);

			return;
		}

		p = UIPrefabLoader.cachePrefabs[this._prefabName];
		if (p)
		{
			// console.log("(UIPrefabLoader) cachePrefab ", this._prefabName);
			setTimeout(() =>
			{
				self._prefabNode = cc.instantiate(p);
				self._node.addChild(self._prefabNode);
				self.onPrefabNodeCreated();
			}, 10);
			return;
		}

		var self: UIPrefabLoader = this;
		console.log("(UIPrefabLoader) cc.loader.loadRes ", this._prefabName);
		cc.loader.loadRes(this._prefabName, cc.Prefab, (err: any, prefab: cc.Prefab) =>
		{
			var errIsArray: boolean = err instanceof (Array);
			if (errIsArray)
			{
				X.warn("(UIPrefabLoader) cc.loader.loadRes 回调异常, err =", err);
			}

			if (err && !errIsArray)
			{
				X.error("(UIPrefabLoader) UIPrefabLoader 加载资源失败", err);
			}
			else
			{
				p = prefab;
				UIPrefabLoader.cachePrefabs[this._prefabName] = p;
				self._prefabNode = cc.instantiate(p);
				self._node.addChild(self._prefabNode);
				self.onPrefabNodeCreated();
			}
		});
	}

	protected onPrefabNodeCreated(): void
	{
		this.prefabNodeCreated = true;
		var ws: cc.Size = cc.director.getWinSize();

		
		this._prefabNode.setPosition(0, 0);
		

		// window["TEST_NODE"] = this;		
		

		var self: UIPrefabLoader = this;
		var handler: number = 0;
		handler = setInterval(() =>
		{
			var needRemove: boolean = false;
			if (self._prefabNode && self.prefabNodeCreated)
			{
				if (!self._prefabNode.isValid)
				{
					// console.log("(UIPreafabLoader) remove !isValid");
					needRemove = true;
				}
				else if (!self._prefabNode.parent)
				{
					// console.log("(UIPreafabLoader) remove !parent");
					needRemove = true;
				}
			}

			if (needRemove)
			{
				self._node.destroy();
				clearInterval(handler);
			}
		}, 100);
	}




	public destroy(): void
	{
		if (this._prefabNode) this._prefabNode.destroy();
		if (this._node) this._node.destroy();
	}


	public get node(): cc.Node { return this._node; }
	public get prefabNode(): cc.Node { return this._prefabNode; }
}

export = UIPrefabLoader;
window["UIPrefabLoader"] = UIPrefabLoader;