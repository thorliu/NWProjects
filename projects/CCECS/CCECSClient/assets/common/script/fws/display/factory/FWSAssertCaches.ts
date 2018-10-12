/*
 * 资源类对象缓存
 * @Author: 刘强 
 * @Date: 2018-08-28 15:15:32 
 * @Last Modified by: zhaozhenguo
 * @Last Modified time: 2018-10-09 14:25:45
 */

import FWSData = require('../../data/FWSData');
import FWSTool = require('../../utils/FWSTool');


module FWSAssertCaches
{
	export type ParticleSystemDataType = {
		startColorAlpha: number,
		startParticleSizeVariance: number,
		startColorGreen: number,
		sourcePositionx: number,
		sourcePositiony: number,
		rotatePerSecond: number,
		radialAcceleration: number,
		yCoordFlipped: number,
		emitterType: number,
		blendFuncSource: number,
		finishColorVarianceAlpha: number,
		rotationEnd: number,
		startColorVarianceBlue: number,
		rotatePerSecondVariance: number,
		particleLifespan: number,
		minRadius: number,
		configName: string,
		tangentialAcceleration: number,
		rotationStart: number,
		startColorVarianceGreen: number,
		speed: number,
		minRadiusVariance: number,
		finishColorVarianceBlue: number,
		finishColorBlue: number,
		finishColorGreen: number,
		blendFuncDestination: number,
		finishColorAlpha: number,
		sourcePositionVariancex: number,
		startParticleSize: number,
		sourcePositionVariancey: number,
		startColorRed: number,
		finishColorVarianceRed: number,
		absolutePosition: boolean,
		textureFileName: string,
		startColorVarianceAlpha: number,
		maxParticles: number,
		finishColorVarianceGreen: number,
		finishParticleSize: number,
		duration: number,
		startColorVarianceRed: number,
		finishColorRed: number,
		gravityx: number,
		maxRadiusVariance: number,
		finishParticleSizeVariance: number,
		gravityy: number,
		rotationEndVariance: number,
		startColorBlue: number,
		rotationStartVariance: number,
		speedVariance: number,
		radialAccelVariance: number,
		// textureImageData: string,
		tangentialAccelVariance: number,
		particleLifespanVariance: number,
		angleVariance: number,
		angle: number,
		maxRadius: number,
	};

	/** 远程图集信息 */
	export type RemoteSpriteAtlas = {
		texture: cc.Texture2D,
		frames: FWSAssertCacheItem<cc.SpriteFrame>
	}

	/** 远程粒子信息 */
	export type RemoteParticleSystem = {
		texture: cc.Texture2D,
		data: any
	}

	/** 资源缓存信息 */
	export class FWSAssertCacheItem<T>
	{
		protected _items: FWSData.Dict<T>;

		constructor()
		{
			this._items = new FWSData.Dict<T>();
		}

		public get(key: string): T
		{
			return this._items.getItem(key);
		}

		public set(key: string, val: T): T
		{
			this._items.setItem(key, val);
			return val;
		}

		public del(key: string): T
		{
			var v: T = this._items.getItem(key);
			this._items.deleteKey(key);
			return v;
		}

		public clear(): void
		{
			this._items.clear();
		}

		public getKeys(): string[] { return this._items.keys; }
		public getValues(): T[] { return this._items.values; }
	}

	/** 样本缓存 */
	export const PrefabCaches: FWSAssertCacheItem<cc.Prefab> = new FWSAssertCacheItem<cc.Prefab>();

	/** 纹理缓存 */
	export const TextureCaches: FWSAssertCacheItem<cc.Texture2D> = new FWSAssertCacheItem<cc.Texture2D>();

	/** 音频缓存 */
	export const AudioCaches: FWSAssertCacheItem<cc.AudioClip> = new FWSAssertCacheItem<cc.AudioClip>();

	/** 粒子缓存 */
	export const ParticleCaches: FWSAssertCacheItem<cc.ParticleSystem> = new FWSAssertCacheItem<cc.ParticleSystem>();

	/** 位图字体 */
	export const BitmapFontCaches: FWSAssertCacheItem<cc.BitmapFont> = new FWSAssertCacheItem<cc.BitmapFont>();

	/** 帧 */
	export const SpriteFrameCaches: FWSAssertCacheItem<cc.SpriteFrame> = new FWSAssertCacheItem<cc.SpriteFrame>();

	/** 图集 */
	export const SpriteAtlasCaches: FWSAssertCacheItem<cc.SpriteAtlas> = new FWSAssertCacheItem<cc.SpriteAtlas>();

	/** 远程图集 */
	export const RemoteAtlasCaches: FWSAssertCacheItem<RemoteSpriteAtlas> = new FWSAssertCacheItem<RemoteSpriteAtlas>();

	/** 远程粒子 */
	export const RemoteParticleCaches: FWSAssertCacheItem<RemoteParticleSystem> = new FWSAssertCacheItem<RemoteParticleSystem>();


	//NOTE: 业务接口

	/** 获取样本 */
	export function getPrefab(key: string): cc.Prefab
	{
		var ret: cc.Prefab = FWSAssertCaches.PrefabCaches.get(key);
		return ret;
	}

	/** 获取图片 */
	export function getTexture(key: string): cc.Texture2D
	{
		var ret: cc.Texture2D = FWSAssertCaches.TextureCaches.get(key);
		return ret;
	}

	/** 获取音频 */
	export function getAudio(key: string): cc.AudioClip
	{
		var ret: cc.AudioClip = FWSAssertCaches.AudioCaches.get(key);
		return ret;
	}

	/** 获取粒子 */
	export function getParticle(key: string, ps: cc.ParticleSystem = null): cc.ParticleSystem
	{
		var ret: cc.ParticleSystem = FWSAssertCaches.ParticleCaches.get(key);
		if (!ret)
		{
			var r: RemoteParticleSystem = FWSAssertCaches.RemoteParticleCaches.get(key);
			if (r)
			{
				var node: cc.Node = null;
				var particle: cc.ParticleSystem = null;

				if (ps) node = ps.node;
				if (!node) node = new cc.Node();

				particle = node.getComponent(cc.ParticleSystem);
				if (!particle) particle = node.addComponent(cc.ParticleSystem);

				ret = particle;

				var d: ParticleSystemDataType = r.data;

				particle.custom = true;
				particle.texture = r.texture;

				particle.positionType = d.absolutePosition ?
					cc.ParticleSystem.PositionType.FREE :
					cc.ParticleSystem.PositionType.GROUPED;

				particle.angle = d.angle;
				particle.angleVar = d.angleVariance;

				particle.srcBlendFactor = d.blendFuncSource;
				particle.dstBlendFactor = d.blendFuncDestination;

				particle.name = d.configName;
				particle.duration = d.duration;

				if (d.emitterType === 0)
				{
					particle.emitterMode = cc.ParticleSystem.EmitterMode.GRAVITY;
				}
				else if (d.emitterType === 1)
				{
					particle.emitterMode = cc.ParticleSystem.EmitterMode.RADIUS;
				}

				particle.endColor = new cc.Color(
					255 * d.finishColorRed,
					255 * d.finishColorGreen,
					255 * d.finishColorBlue,
					// 255
					255 * d.finishColorAlpha
				);

				particle.endColorVar = new cc.Color(
					255 * d.finishColorVarianceRed,
					255 * d.finishColorVarianceGreen,
					255 * d.finishColorVarianceBlue,
					// 255
					255 * d.finishColorVarianceAlpha
				);

				particle.endSize = d.finishParticleSize;
				particle.endSizeVar = d.finishParticleSizeVariance;

				particle.gravity = new cc.Vec2(d.gravityx, d.gravityy);

				particle.totalParticles = d.maxParticles;

				particle.startRadius = d.maxRadius;
				particle.startRadiusVar = d.maxRadiusVariance;

				particle.endRadius = d.minRadius;
				particle.endRadiusVar = d.minRadiusVariance;

				particle.life = d.particleLifespan;
				particle.lifeVar = d.particleLifespanVariance;

				particle.radialAccel = d.radialAcceleration;
				particle.radialAccelVar = d.radialAccelVariance;

				particle.rotatePerS = d.rotatePerSecond;
				particle.rotatePerSVar = d.rotatePerSecondVariance;

				particle.emissionRate = (particle.totalParticles / particle.life);

				particle.posVar = new cc.Vec2(d.sourcePositionVariancex, d.sourcePositionVariancey);

				particle.speed = d.speed;
				particle.speedVar = d.speedVariance;

				particle.startColor = new cc.Color(
					255 * d.startColorRed,
					255 * d.startColorGreen,
					255 * d.startColorBlue,
					// 255
					255 * d.startColorAlpha
				);

				particle.startColorVar = new cc.Color(
					255 * d.startColorVarianceRed,
					255 * d.startColorVarianceGreen,
					255 * d.startColorVarianceBlue,
					// 255
					255 * d.startColorVarianceAlpha
				);

				particle.startSize = d.startParticleSize;
				particle.startSizeVar = d.startParticleSizeVariance;

				particle.tangentialAccel = d.tangentialAcceleration;
				particle.tangentialAccelVar = d.tangentialAccelVariance;

				particle.resetSystem();
			}
		}
		return ret;
	}

	/** 获取位图字体 */
	export function getBitmapFont(key: string): cc.BitmapFont
	{
		var ret: cc.BitmapFont = FWSAssertCaches.BitmapFontCaches.get(key);
		return ret;
	}

	/** 获取帧 */
	export function getSpriteFrame(key: string, texture: string = null): cc.SpriteFrame
	{
		var ret: cc.SpriteFrame = FWSAssertCaches.SpriteFrameCaches.get(key);

		//尝试本地资源
		if (!ret)
		{
			let textureNames: string[] = FWSAssertCaches.SpriteAtlasCaches.getKeys();
			for (var i: number = 0; i < textureNames.length; i++)
			{
				let textureName: string = textureNames[i];
				if (FWSTool.Str.isEmpty(texture) || textureName === texture)
				{
					let atlas: cc.SpriteAtlas = FWSAssertCaches.SpriteAtlasCaches.get(textureName);
					ret = atlas.getSpriteFrame(key);
					if (ret) return ret;
				}
			}
		}

		//尝试远程资源
		if (!ret)
		{
			let textureNames: string[] = FWSAssertCaches.RemoteAtlasCaches.getKeys();
			for (var i: number = 0; i < textureNames.length; i++)
			{
				let textureName: string = textureNames[i];
				if (FWSTool.Str.isEmpty(texture) || textureName === texture)
				{
					let atlas: FWSAssertCaches.RemoteSpriteAtlas = FWSAssertCaches.RemoteAtlasCaches.get(textureName);
					ret = atlas.frames.get(key);
					if (ret) return ret;
				}
			}
		}
		return ret;
	}
	export function LoadRoemoteImg(iconUrl:string,onLoadFinish:Function)
    {
        cc.loader.load({url:iconUrl, type: 'jpg'}, function (err, texture) {
            if(err) {
                console.error("加载头像失败：",iconUrl);
            } else {
                try {
                    onLoadFinish&&onLoadFinish(new cc.SpriteFrame(texture));
                } catch (e) {
                    console.error(e);
                }
            } 
        });
    }
}

export = FWSAssertCaches;
// window["FWSAssertCaches"] = FWSAssertCaches;