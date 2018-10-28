/*
 * 弹出窗管理器
 * @Author: 刘强 
 * @Date: 2018-08-06 20:23:22 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-29 14:53:30
 */

import FWSData = require('../data/FWSData');
import UILayers = require('./UILayers');


module UIPopuper
{
	type PopuperInfo = {
		node: cc.Node,
		overlayer: boolean,
		topmost: boolean
	}

	var _instance: UIPopuperManager;
	export function instance(): UIPopuperManager
	{
		if (!_instance) _instance = new UIPopuperManager();
		return _instance;
	}

	class UIPopuperManager
	{
		protected popupers: PopuperInfo[];

		constructor()
		{
			this.popupers = [];
		}

		/** 弹出内容 */
		public open(node: cc.Node, topmost: boolean = false, overlayer: boolean = true): cc.Node
		{
			if (!node) return node;
			if (node.parent) return node;

			var parentNode: cc.Node = topmost ? UILayers.nodes().popuper_top : UILayers.nodes().popuper_normal;
			parentNode.addChild(node);

			this.popupers.push({
				node: node,
				overlayer: overlayer,
				topmost: topmost
			});

			this.tick();

			return node;
		}

		/** 关掉所有内容 */
		public closeAll(): void
		{
			for (var i: number = 0; i < this.popupers.length; i++)
			{
				var p: PopuperInfo = this.popupers[i];
				if (p && p.node) p.node.removeFromParent();
			}
			this.popupers.splice(0, this.popupers.length);
		}

		/** 更新逻辑 */
		public tick(): void
		{
			this.checkRemovedNodes();
			if (this.popupers.length === 0) {
				this.showOverlayerToItem(null);
				return;
			}
			this.checkOverlayer();
		}

		/** 检查已经移除的内容 */
		protected checkRemovedNodes(): void
		{
			for (var i: number = this.popupers.length - 1; i >= 0; i--)
			{
				var p: PopuperInfo = this.popupers[i];
				if (p.node.parent) continue;
				this.popupers.splice(i, 1);
			}
		}

		/** 检查覆盖层 */
		protected checkOverlayer(): void
		{
			var topmost_item: PopuperInfo = null;
			var normal_item: PopuperInfo = null;
			for (var i: number = this.popupers.length - 1; i >= 0; i--)
			{
				var item: PopuperInfo = this.popupers[i];
				if (!item.overlayer) continue;

				if (item.topmost)
				{
					if (!topmost_item) topmost_item = item;
				}
				else
				{
					if (!normal_item) normal_item = item;
				}
			}

			if (topmost_item) this.showOverlayerToItem(topmost_item);
			else if (normal_item) this.showOverlayerToItem(normal_item);
			else this.showOverlayerToItem(null);
		}


		/** 显示覆盖层到目标项 */
		protected showOverlayerToItem(item: PopuperInfo): void
		{
			if (item)
			{
				// if(item.node.parent !== UILayers.nodes().overlayer.parent)
				// {
				// 	UILayers.nodes().overlayer.removeFromParent(false);
				// 	item.node.parent.addChild(UILayers.nodes().overlayer);
				// }

				// if(item.node.parent !== UILayers.nodes().masklayer.parent)
				// {
				// 	UILayers.nodes().masklayer.removeFromParent(false);
				// 	item.node.parent.addChild(UILayers.nodes().masklayer);
				// }

				UILayers.nodes().overlayer.parent = UILayers.nodes().masklayer.parent = item.node.parent;
				

				for (var i: number = 0; i < this.popupers.length; i++)
				{
					var p: PopuperInfo = this.popupers[i];
					p.node.zIndex = (i + 1) * 10;

					if (p === item)
					{
						UILayers.nodes().overlayer.zIndex = (i + 1) * 10 - 1;
						UILayers.nodes().masklayer.zIndex = (i + 1) * 10 - 2;
					}
				}

				if(!UILayers.nodes().overlayer.active || !UILayers.nodes().overlayer.active)
				{
					UILayers.nodes().masklayer.active = true;
					UILayers.nodes().overlayer.active = true;
					UILayers.nodes().masklayer.active = true;
					UILayers.nodes().overlayer.stopAllActions();
					UILayers.nodes().overlayer.opacity = 0;
					UILayers.nodes().overlayer.runAction(cc.fadeTo(0.2, 128));
				}
			}
			else
			{
				UILayers.nodes().overlayer.active = false;
				UILayers.nodes().masklayer.active = false;
			}
		}
	}
}

export = UIPopuper;

window["UIPopuper"] = UIPopuper;

if(!CC_EDITOR)
{
	setInterval(() =>
	{
		UIPopuper.instance().tick();
	}, 100);
}