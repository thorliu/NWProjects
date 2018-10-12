/*
 * 界面层级结构
 * @Author: 刘强 
 * @Date: 2018-08-01 10:49:03 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-29 19:42:55
 */


module UILayers
{

	class UILayerNodes
	{
		constructor()
		{
			this.init();
		}

		/** 创建节点 */
		private createNode(name: string, parent?: cc.Node, useCenterAnchor: boolean = false): cc.Node
		{
			var ret: cc.Node = new cc.Node();
			ret.name = name;
			if (useCenterAnchor)
			{
				ret.setAnchorPoint(0.5, 0.5);
			}
			else
			{
				ret.setAnchorPoint(0, 0);
			}

			if (!CC_EDITOR)
			{
				var widget: cc.Widget = ret.addComponent(cc.Widget);
				widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
				widget.top = widget.bottom = widget.left = widget.right = 0;
			}




			if (parent) parent.addChild(ret);

			return ret;
		};

		private init(): void
		{
			if (CC_EDITOR) return;

			this.ui = this.createNode("ui");
			this.background = this.createNode("background", this.ui);
			this.frontground = this.createNode("frontground", this.ui);
			this.frontground_normal = this.createNode("frontground_normal", this.frontground);
			this.frontground_top = this.createNode("frontground_top", this.frontground);
			this.overlayer = this.createNode("overlayer", this.ui);
			this.masklayer = this.createNode("masklayer", this.ui);
			this.popuper = this.createNode("popuper", this.ui);
			this.popuper_normal = this.createNode("popuper_normal", this.popuper);
			this.popuper_top = this.createNode("popuper_top", this.popuper);
			this.marquee = this.createNode("marquee", this.ui);
			this.coinsAnim = this.createNode("coinsAnim", this.ui);
			this.cloudAnim = this.createNode("cloudAnim", this.ui);
			this.scrollTips = this.createNode("scrollTips", this.ui);
			this.loading = this.createNode("loading", this.ui);
			this.connecting = this.createNode("connecting", this.ui);
			this.guide = this.createNode("guide", this.ui);

			//----

			var maskLayerButton: cc.Button = this.masklayer.addComponent(cc.Button);
			// var overlayerSprite: cc.Sprite = this.overlayer.addComponent(cc.Sprite);

			// overlayerSprite.spriteFrame = LocalAssertFactory.getSpriteFrame("texture/main", "rect");
			// this.overlayer.color = new cc.Color(0, 255, 0);
			// this.overlayer.opacity = 255.0 * 0.8;
			// this.overlayer.setContentSize(cc.director.getWinSize());

			this.connecting.active = false;
			this.masklayer.active = false;
			this.overlayer.active = false;

		}

		/** 震动屏幕 */
		public shock(times: number = 1): void
		{
			if (window["wx"] && window["wx"].vibrateShort)
			{
				window["wx"].vibrateShort();
				// return;
			}

			//如果没这接口或者微信API不可用时，抖一下画面
			var ws: cc.Size = cc.director.getWinSize();
			var x: number = -ws.width / 2;
			var y: number = -ws.height / 2;
			var node: cc.Node = this.ui;
			node.stopAllActions();

			var dist: number = 10;
			var speed: number = 0.05;

			node.runAction(
				cc.repeat(
					cc.sequence(
						cc.moveTo(speed, x - dist, y),
						cc.moveTo(speed, x, y + dist),
						cc.moveTo(speed, x + dist, y),
						cc.moveTo(speed, x, y - dist),
						cc.moveTo(speed, x, y))
					, times)
			);
		}

		/** UI根节点 */
		public ui: cc.Node;
		/** 背景层 */
		public background: cc.Node;
		/** 前景主节点 */
		private frontground: cc.Node;
		/** 普通前景层 */
		public frontground_normal: cc.Node;
		/** 置顶前景层 */
		public frontground_top: cc.Node;
		/** 覆盖层 */
		public overlayer: cc.Node;
		/** 屏蔽层 */
		public masklayer: cc.Node;
		/** 弹出主节点 */
		private popuper: cc.Node;
		/** 普通弹出层 */
		public popuper_normal: cc.Node;
		/** 置顶弹出层 */
		public popuper_top: cc.Node;
		/**跑马灯层 */
		public marquee: cc.Node;
		/** 金币动画层 */
		public coinsAnim: cc.Node;
		/** 云层动画 */
		public cloudAnim: cc.Node;
		/** 滚动提示 */
		public scrollTips: cc.Node;
		/** 全局加载等待层 */
		public loading: cc.Node;
		/** 全局连接等待层 */
		public connecting: cc.Node;
		/** 指引层 */
		public guide: cc.Node;
	}

	var _nodes: UILayerNodes;
	export function nodes(): UILayerNodes
	{
		if (!_nodes) _nodes = new UILayerNodes();
		return _nodes;
	}

	export function removeSelf():void
	{
		_nodes = null;
	}



}

export = UILayers;

window["UILayers"] = UILayers.nodes();