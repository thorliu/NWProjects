/*
 * 本地资源加载器
 * @Author: 刘强 
 * @Date: 2018-08-02 11:32:31 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-08-28 18:45:39
 */

import X = require('../../utils/X');
import FWSTask = require('../../task/FWSTask');
import FWSAssertCaches = require('./FWSAssertCaches');


module LocalAssertLoader
{
	export type LocalAssertLoaderConfig = {
		key: string,
		type: any
	}

	/** 本地资源加载(单项) */
	export class LocalAssertLoader extends FWSTask.Task
	{
		protected _key: string;
		protected _resource: any;
		protected _type: any;

		constructor(key: string, type: any)
		{
			super("正在加载游戏资源");
			this._key = key;
			this._resource = null;
			this._type = type;
		}

		protected toStringAddon(): string
		{
			return "(" + this._key + ")";
		}

		public begin(): void
		{
			super.begin();
			if (this._alreadyBegin) return;
			this._alreadyBegin = true;
			var self: LocalAssertLoader = this;
			this._beginTimer = new Date().getTime();

			this.callListener(this.onProgress);

			if (this._key === null
				|| this._key === undefined
				|| this._key === "")
			{
				X.error("LocalAssertLoader", "无效的资源请求");
			}

			if (this._type)
			{
				var c: any = this.getFromCache(this._key, this._type);
				if (c)
				{
					this._resource = c;
					this.callListener(this.onCompleted);
					return;
				}

				cc.loader.loadRes(this._key, this._type, function (err, prefab)
				{
					var errIsAry: boolean = err instanceof (Array);

					if (errIsAry)
					{
						X.warn("cc.loader.loadRes 回调异常, err =", err);
					}

					if (err && !errIsAry)
					{
						X.error("LocalAssertLoader", "加载资源失败", err);

						self.callListener(self.onError);
					}
					else
					{
						self.addToCache(self._key, prefab, self._type);
						self._resource = prefab;
						self._alreadyCompoleted = true;
						self._endTimer = new Date().getTime();
						// YY.log("ResourceLoader", "加载资源成功", self._key, self._resource);
						self.callListener(self.onCompleted);
					}
				});
			}
			else
			{
				var c: any = this.getFromCache(this._key, cc.Prefab);
				if (c)
				{
					this._resource = c;
					this.callListener(this.onCompleted);
					return;
				}

				cc.loader.loadRes(this._key, function (err, prefab)
				{
					if (err)
					{
						X.error("LocalAssertLoader", "加载资源失败", err);

						self.callListener(self.onError);
					}
					else
					{
						self.addToCache(self._key, prefab, cc.Prefab);
						self._resource = prefab;
						self._alreadyCompoleted = true;

						self._endTimer = new Date().getTime();
						// YY.log("ResourceLoader", "加载资源成功", self._key, self._resource);

						self.callListener(self.onCompleted);
					}
				});
			}
		}

		protected addToCache(k: string, v: any, t: any): void
		{
			if (t === cc.Prefab) FWSAssertCaches.PrefabCaches.set(k, v);
			else if (t === cc.Texture2D) FWSAssertCaches.TextureCaches.set(k, v);
			else if (t === cc.ParticleSystem) FWSAssertCaches.ParticleCaches.set(k, v);
			else if (t === cc.BitmapFont) FWSAssertCaches.BitmapFontCaches.set(k, v);
			else if (t === cc.AudioClip) FWSAssertCaches.AudioCaches.set(k, v);
			else if (t === cc.SpriteAtlas) FWSAssertCaches.SpriteAtlasCaches.set(k, v);
			// console.log("addToCache", k, v, t);
		}

		protected getFromCache(k: string, t: any): any
		{
			if (t === cc.Prefab) return FWSAssertCaches.PrefabCaches.get(k);
			else if (t === cc.Texture2D) return FWSAssertCaches.TextureCaches.get(k);
			else if (t === cc.ParticleSystem) return FWSAssertCaches.ParticleCaches.get(k);
			else if (t === cc.BitmapFont) return FWSAssertCaches.BitmapFontCaches.get(k);
			else if (t === cc.AudioClip) return FWSAssertCaches.AudioCaches.get(k);
			else if (t === cc.SpriteAtlas) return FWSAssertCaches.SpriteAtlasCaches.get(k);

			return null;
		}


		public release(): void
		{
			if (this._resource)
			{
				try
				{
					this._resource.destroy();
				}
				catch (err) { }
			}
		}

		public get key(): string { return this._key; }
		public get resource(): any { return this._resource; }
	}

	/** 本地资源加载(多项) */
	export class LocalAssertLoaderManager extends FWSTask.TaskList
	{
		constructor()
		{
			super("正在加载游戏资源");
		}

		public addTask(assetPath: string, type: any = null): void
		{
			this._tasks.push(new LocalAssertLoader(assetPath, type));
		}

		public addTaskConfig(config: LocalAssertLoaderConfig[]): void
		{
			if (config === null || config === undefined) return;
			if (config.length === 0) return;
			for (var i: number = 0; i < config.length; i++)
			{
				var cfg: LocalAssertLoaderConfig = config[i];
				this.addTask(cfg.key, cfg.type);
			}
		}

		public getItem(assetPath: string, type: any): any
		{
			for (var i: number = 0; i < this._tasks.length; i++)
			{
				var task: LocalAssertLoader = this._tasks[i] as LocalAssertLoader;
				if (task && task.key === assetPath)
				{
					if (task.resource instanceof type)
					{
						return task.resource;
					}
				}
			}

			return null;
		}

		public getBitmapFont(assetPath: string): cc.BitmapFont
		{
			return this.getItem(assetPath, cc.BitmapFont);
		}

		public getPrefab(assetPath: string): cc.Prefab
		{
			return this.getItem(assetPath, cc.Prefab);
		}

		public getSpriteAtlas(assetPath: string): cc.SpriteAtlas
		{
			return this.getItem(assetPath, cc.SpriteAtlas);
		}

		public getSpriteFrame(assetPath: string, name: string): cc.SpriteFrame
		{
			var atlas: cc.SpriteAtlas = this.getSpriteAtlas(assetPath);
			if (!atlas) return null;
			return atlas.getSpriteFrame(name);
		}

		public setSprite(sprite: cc.Sprite, assetPath: string, name: string): void
		{
			if (!sprite) return;
			if (!sprite.isValid) return;
			var frame: cc.SpriteFrame = this.getSpriteFrame(assetPath, name);
			sprite.spriteFrame = frame;
		}

		public getSprite(assetPath: string, name: string): cc.Sprite
		{
			var sprite: cc.Sprite = new cc.Node().addComponent(cc.Sprite);
			this.setSprite(sprite, assetPath, name);
			return sprite;
		}

		public exist(key: string): boolean
		{
			for (var i: number = 0; i < this._tasks.length; i++)
			{
				var t: LocalAssertLoader = this._tasks[i] as LocalAssertLoader;
				if (t.key === key) return true;
			}

			return false;
		}

		public release(): void
		{
			for (var i: number = 0; i < this._tasks.length; i++)
			{
				var t: LocalAssertLoader = this._tasks[i] as LocalAssertLoader;
				t.release();
			}
		}
	}
}

export = LocalAssertLoader;