/*
 * 远程资源加载器
 * @Author: 刘强 
 * @Date: 2018-08-02 11:31:48 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-05 20:04:11
 */

import FWSTask = require('../../task/FWSTask');
import FWSTool = require('../../utils/FWSTool');
import X = require('../../utils/X');
import FWSEnv = require('../../FWSEnv');
import WebClient = require('../../net/WebClient');
import FWSData = require('../../data/FWSData');
import HttpUtils = require('../../utils/HttpUtils');
import FWSAssertCaches = require('./FWSAssertCaches');


module RemoteAssertLoader
{
    /** 较大的图片资源的加载超时时间 */
    export const LARGE_TEXTURE_LOAD_TIME: number = 4;

    /** 较小的图片资源的加载超时时间 */
    export const SMALL_TEXTURE_LOAD_TIME: number = 2;

    export type RemoteTextureLoaderConfig = {
        /** 不包含扩展名的json文件名称 */
        jsonFile: string,
        /** 大图文件名，如果省略，则参考jsonFile的设定为同名的png文件名 */
        imgFile?: string,
        /** 如果省略的话，则自动追加FWSEnv的资源URL前缀 */
        baseUrl?: string,
    }

    /** 远程图集加载器 */
    export class RemoteTextureLoader extends FWSTask.Task
    {
        protected _atlas: any;
        protected _texture: cc.Texture2D;
        protected _key: string;
        protected _frames: FWSData.Dict<cc.SpriteFrame>;


        protected _config: RemoteTextureLoaderConfig;
        protected _pro: number = 0;

        public get texture(): cc.Texture2D { return this._texture; }
        public get progress(): number { return this._pro; }

        protected toStringAddon(): string
        {
            return "(" + this._key + ")";
        }

        constructor(cfg: RemoteTextureLoaderConfig)
        {
            super("正在加载图片资源");

            this._frames = new FWSData.Dict<cc.SpriteFrame>();

            this._config = cfg;
            this._key = FWSTool.Str.getFilename(cfg.jsonFile);

            if (cfg.imgFile === null || cfg.imgFile === undefined || cfg.imgFile === "")
            {
                cfg.imgFile = this._key + ".png";
            }

            if (cfg.baseUrl === null || cfg.baseUrl === undefined || cfg.baseUrl === "")
            {
                cfg.baseUrl = FWSEnv.RES_BASE_URL + "/asserts/textures/"
            }
        }

        /** 开始加载任务 */
        public begin(): void
        {
            super.begin();
            if (this._alreadyBegin) return;
            this._alreadyBegin = true;
            this._pro = 0;

            var c: FWSAssertCaches.RemoteSpriteAtlas = FWSAssertCaches.RemoteAtlasCaches.get(this._key);
            if (c)
            {
                this.callListener(this.onCompleted);
                return;
            }
            else
            {
                if (this.onHttpResponsed()) return;
            }

            this.overTimeBegin(LARGE_TEXTURE_LOAD_TIME);

            this.callListener(this.onProgress);

            this.loadTexture();
            this.loadAtlas();
        }

        /** 加载纹理图片 */
        protected loadTexture(): void
        {
            var self: RemoteAssertLoader.RemoteTextureLoader = this;
            this.onHttpResponsed();
            var url: string = this._config.baseUrl + this._config.imgFile;
            var orignUrl: string = url.toString();

            url = HttpUtils.getTargetUrl(orignUrl);

            cc.loader.load(url, (err: any, tex: cc.Texture2D) =>
            {
                if (err)
                {
                    X.error("RemoteAssertLoader", "加载资源失败", err);
                    self.callListener(self.onError);
                }
                else
                {
                    HttpUtils.setTargetUrl(orignUrl, url);
                    if (!self._texture) self._texture = tex;
                    self._pro += 0.5;

                    // if (self.onProgress && self.onProgress.handler)
                    // {
                    //     self.onProgress.handler.call(self.onProgress.target, self, self);
                    // }

                    self.onHttpResponsed();
                }
            });
        }

        /** 加载纹理信息 */
        protected loadAtlas(): void
        {
            var url: string = this._config.baseUrl + this._config.jsonFile + ".json";
            var orignUrl: string = url.toString();
            url = HttpUtils.getTargetUrl(orignUrl);

            if (FWSEnv.HTTP_CACHE_ENABLED)
            {
                var cache: string = HttpUtils.getHttpCache(orignUrl);
                if (!FWSTool.Str.isEmpty(cache))
                {
                    this._atlas = JSON.parse(cache);
                    this._pro += 0.5;
                    this.onHttpResponsed();
                    return;
                }
            }

            var self: RemoteAssertLoader.RemoteTextureLoader = this;

            WebClient.get(url, {}, this,
                (res: XMLHttpRequest) =>
                {
                    try
                    {
                        self._atlas = JSON.parse(res.responseText);
                        self._pro += 0.5;

                        // if (self.onProgress && self.onProgress.handler)
                        // {
                        //     self.onProgress.handler.call(self.onProgress.target, self, self);
                        // }
                        HttpUtils.setTargetUrl(orignUrl, url);
                        if (FWSEnv.HTTP_CACHE_ENABLED)
                        {
                            HttpUtils.setHttpCache(orignUrl, res.responseText);
                        }
                        this.onHttpResponsed();
                    }
                    catch (err)
                    {
                        X.error("RemoteAssertLoader", "加载资源失败", err);
                        self.callListener(self.onError);
                    }
                },
                () =>
                {
                    self.callListener(self.onError);
                });
        }

        /** HTTP请求完成时(两次请求，一次是json, 一次是图片) */
        protected onHttpResponsed(): boolean
        {
            if (this._atlas === null || this._atlas === undefined) return false;
            if (this._texture === null || this._texture === undefined) return false;

            // console.log(this._atlas, this._texture);
            this.parseFrames();

            this._alreadyCompoleted = true;
            this._pro = 1;
            this.callListener(this.onCompleted);

            return true;
        }

        /** 解析并生成frames */
        protected parseFrames(): void
        {
            var c: FWSAssertCaches.RemoteSpriteAtlas = {
                texture: this._texture,
                frames: new FWSAssertCaches.FWSAssertCacheItem<cc.SpriteFrame>()
            };
            for (var k in this._atlas.frames)
            {
                var szKey: string = FWSTool.Str.getFilename(k.toString());
                var atlasFrame: any = this._atlas.frames[k];

                var frame: cc.SpriteFrame = new cc.SpriteFrame(
                    this._texture, //texture
                    cc.rect(atlasFrame.frame.x, atlasFrame.frame.y, atlasFrame.frame.w, atlasFrame.frame.h), //rect
                    atlasFrame.rotated, //rotated
                    new cc.Vec2(atlasFrame.spriteSourceSize.x, atlasFrame.spriteSourceSize.y),
                    new cc.Size(atlasFrame.sourceSize.w, atlasFrame.sourceSize.h)
                )

                frame.name = k;


                c.frames.set(FWSTool.Str.getFilename(k), frame);

                this._frames.setItem(szKey, frame);
            }

            FWSAssertCaches.RemoteAtlasCaches.set(this._key, c);
        }

        /** 获取纹理名称 */
        public get key(): string { return this._key; }

        /** 获取小图 */
        public getSpriteFrame(name: string): cc.SpriteFrame
        {
            var ret: cc.SpriteFrame = FWSAssertCaches.getSpriteFrame(name, this._key);
            return ret;
        }

        /** 释放资源 */
        public release(): void
        {
            this._frames.clear();
            if (this._texture)
            {
                this._texture.destroy();
                this._texture = null;
            }
        }
    }

    /** 远程单图加载器 */
    export class RemoteSingleTextureLoader extends FWSTask.Task
    {
        protected _texture: cc.Texture2D;
        protected _key: string;
        protected _note: string;

        public get key(): string { return this._key; }
        public get texture(): cc.Texture2D { return this._texture; }

        constructor(key: string)
        {
            super("正在加载图片资源");
            this._key = key;
        }

        protected toStringAddon(): string
        {
            return "(" + this._key + ")";
        }

        /** 通知出错 */
        protected notifyError(): void
        {
            if (this.onError && this.onError.handler)
            {
                this.onError.handler.call(this.onError.target, this, this);
            }
        }

        public begin(): void
        {
            super.begin();
            if (this._alreadyBegin) return;
            this._alreadyBegin = true;


            if (this._texture)
            {
                this.callListener(this.onCompleted);
                return;
            }


            this.overTimeBegin(SMALL_TEXTURE_LOAD_TIME);

            this.callListener(this.onProgress);

            var self: RemoteSingleTextureLoader = this;
            var url: string = this._key + "";

            if (!HttpUtils.isUrl(url))
            {
                url = FWSEnv.RES_BASE_URL + url;
            }

            var orignUrl: string = url.toString();
            url = HttpUtils.getTargetUrl(url);

            cc.loader.load(url, (err: any, tex: cc.Texture2D) =>
            {
                if (err)
                {
                    X.error("RemoteSingleTextureLoader", "加载资源失败", err);
                    self.notifyError();
                }
                else
                {
                    HttpUtils.setTargetUrl(orignUrl, url);
                    if (!self._texture) self._texture = tex;
                    self._alreadyCompoleted = true;

                    FWSAssertCaches.TextureCaches.set(self._key, tex);
                    FWSAssertCaches.SpriteFrameCaches.set(self._key, new cc.SpriteFrame(tex));

                    self.callListener(self.onCompleted);
                }
            });
        }

        public release(): void
        {
            if (this._texture)
            {
                this._texture.destroy();
                this._texture = null;
            }
        }
    }

    //#region Particle Designer JSON 格式
    /** Particle Designer JSON 格式 */


    //#endregion

    /** 远程粒子加载器 */
    export class RemoteParticleSystemLoader extends FWSTask.Task
    {
        protected _tex: cc.Texture2D;
        protected _data: any;
        protected _pro: number = 0;

        protected _key: string;

        public get key(): string { return this._key; }
        public get progress(): number { return this._pro; }

        constructor(key: string)
        {
            super("正在加载粒子资源");
            this._key = key;
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

            this._pro = 0;

            if (this._tex && this._data)
            {
                this.callListener(this.onCompleted);
                return;
            }



            this.overTimeBegin(SMALL_TEXTURE_LOAD_TIME);

            this.callListener(this.onProgress);

            this.loadTexture();
            this.loadData();
        }

        protected loadTexture(): void
        {
            var self: RemoteParticleSystemLoader = this;
            var url: string = this._key;

            if (!HttpUtils.isUrl(url)) url = FWSEnv.RES_BASE_URL + "/asserts/particles/" + url;

            url += ".png";

            var orignUrl: string = url.toString();
            url = HttpUtils.getTargetUrl(orignUrl);

            cc.loader.load(url, (err: any, tex: cc.Texture2D) =>
            {
                if (err)
                {
                    X.error("RemoteParticleSystemLoader", "加载粒子失败", err);
                    self.notifyError();
                }
                else
                {
                    if (!self._tex) self._tex = tex;
                    self._pro += 0.5;

                    HttpUtils.setTargetUrl(orignUrl, url);

                    // if (self.onProgress && self.onProgress.handler)
                    // {
                    //     self.onProgress.handler.call(self.onProgress.target, self, self);
                    // }

                    self.onHttpResponsed();
                }
            });
        }

        protected loadData(): void
        {
            var self: RemoteParticleSystemLoader = this;
            var url: string = this._key;

            if (!HttpUtils.isUrl(url)) url = FWSEnv.RES_BASE_URL + "/asserts/particles/" + url;

            url += ".json";
            var orignUrl: string = url.toString();
            url = HttpUtils.getTargetUrl(orignUrl);

            if (FWSEnv.HTTP_CACHE_ENABLED)
            {
                var cache: string = HttpUtils.getHttpCache(orignUrl);
                if (!FWSTool.Str.isEmpty(cache))
                {
                    try
                    {
                        this._data = JSON.parse(cache);
                        this._pro += 0.5;
                        this.onHttpResponsed();
                        return;
                    }
                    catch (err) { }
                }
            }

            WebClient.get(url, {}, this,
                (res: XMLHttpRequest) =>
                {
                    try
                    {
                        self._data = JSON.parse(res.responseText);
                        self._pro += 0.5;

                        // if (self.onProgress && self.onProgress.handler)
                        // {
                        //     self.onProgress.handler.call(self.onProgress.target, self, self);
                        // }

                        if(FWSEnv.HTTP_CACHE_ENABLED)
                        {
                            HttpUtils.setHttpCache(orignUrl, res.responseText);
                        }

                        HttpUtils.setTargetUrl(orignUrl, url);
                        this.onHttpResponsed();
                    }
                    catch (err)
                    {
                        X.error("RemoteParticleSystemLoader", "加载粒子数据失败", err);
                        self.notifyError();
                    }
                },
                () =>
                {
                    self.notifyError();
                });

        }


        protected onHttpResponsed(): void
        {
            if (!this._tex) return;
            if (!this._data) return;

            this._alreadyCompoleted = true;

            var c: FWSAssertCaches.RemoteParticleSystem = {
                texture: this._tex,
                data: this._data
            };

            FWSAssertCaches.RemoteParticleCaches.set(this._key, c);

            this.callListener(this.onCompleted);
        }

        /** 通知出错 */
        protected notifyError(): void
        {
            if (this.onError && this.onError.handler)
            {
                this.onError.handler.call(this.onError.target, this, this);
            }
        }

        public release(): void
        {
            // if(this._tex)
            // {
            //     this._tex.destroy();
            //     this._tex = null;
            // }
        }

        public getParticleSystem(ps: cc.ParticleSystem = null): cc.ParticleSystem
        {
            return FWSAssertCaches.getParticle(this._key, ps);
        }

    }

    /** 远程音频加载器 */
    export class RemoteAudioClipLoader extends FWSTask.Task
    {
        protected _audio: cc.AudioClip;
        public get audioClip(): cc.AudioClip { return this._audio; }

        protected _key: string;
        public get key(): string { return this._key; }

        constructor(key: string)
        {
            super("正在加载音频资源");
            this._key = key;
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

            if (this._audio)
            {
                this.callListener(this.onCompleted);
                return;
            }

            this.overTimeBegin(SMALL_TEXTURE_LOAD_TIME);

            this.callListener(this.onProgress);

            var self: RemoteAudioClipLoader = this;
            var url: string = FWSTool.Str.format("{0}/asserts/audio/{1}.mp3", FWSEnv.RES_BASE_URL, this._key);
            var orignUrl: string = url.toString();
            url = HttpUtils.getTargetUrl(orignUrl);

            cc.loader.load(url, (err: any, audio: cc.AudioClip) =>
            {
                if (err)
                {
                    X.error("RemoteAudioSystemLoader", "加载音频资源失败", err);
                    self.callListener(self.onError);
                }
                else
                {
                    HttpUtils.setTargetUrl(orignUrl, url);
                    if (!self._audio) self._audio = audio;
                    FWSAssertCaches.AudioCaches.set(self._key, audio);
                    self._alreadyCompoleted = true;
                    self.callListener(self.onCompleted);
                }
            });


        }

        public release(): void
        {
            if (this._audio)
            {
                this._audio.destroy();
                this._audio = null;
            }
        }
    }
}

export = RemoteAssertLoader;