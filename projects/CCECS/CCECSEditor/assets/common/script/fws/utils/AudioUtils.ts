/*
 * 音效/背景音乐模块
 * @Author: 刘强 
 * @Date: 2018-08-10 19:39:22 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-14 09:46:06
 */


import FWSTool = require('./FWSTool');
import { TaskList } from '../task/FWSTask';
import RemoteAssertLoader = require('../display/factory/RemoteAssertLoader');
import LocalStorageUtils = require('./LocalStorageUtils');
import FWSTask = require('../task/FWSTask');
import FWSMvc = require('../mvc/FWSMvc');
import FWSAssertCaches = require('../display/factory/FWSAssertCaches');




module AudioUtils
{
	// var _audioVol: number = 1;

	var _audioSwitch: boolean = true;
	var _musicSwitch: boolean = true;

	/** 获取音效的音量 */
	export function getAudioVol(): number
	{
		// return _audioVol;
		return cc.audioEngine.getEffectsVolume();
	}
	/** 设置音效的音量 */
	export function setAudioVol(v: number): void
	{
		v = Math.max(Math.min(1, v), 0);
		// _audioVol = v;
		// UIScrollTips.addBitmapLabel(FWSTool.Str.format("audioVol = {0}%", Math.floor(v * 100)));
		cc.audioEngine.setEffectsVolume(v);
		LocalStorageUtils.set("MusicVol", v);
	}

	/** 得到音效的开关 */
	export function getAudioSwitch(): boolean
	{
		return _audioSwitch;
	}
	/** 设置音效的开关 */
	export function setAudioSwitch(v: boolean): void
	{
		_audioSwitch = v;
	}





	// var _musicVol: number = 1;

	/** 获取音乐的音量 */
	export function getMusicVol(): number
	{
		return cc.audioEngine.getMusicVolume();
	}
	/** 设置音乐的音量 */
	export function setMusicVol(v: number): void
	{
		v = Math.max(Math.min(1, v), 0);
		// _musicVol = v;
		// UIScrollTips.addBitmapLabel(FWSTool.Str.format("musicVol = {0}%", Math.floor(v * 100)));
		cc.audioEngine.setMusicVolume(v);
		LocalStorageUtils.set("MusicVol", v);
	}

	/** 得到音效的开关 */
	export function getMusicSwitch(): boolean
	{
		return _musicSwitch;
	}
	/** 设置音效的音量 */
	export function setMusicSwitch(v: boolean): void
	{
		_musicSwitch = v;
	}

	/** 播放音效 */
	export function playAudio(key: string): void
	{
		if (!_audioSwitch)
		{
			return;
		}
		var a: cc.AudioClip = FWSAssertCaches.getAudio(key);
		if (a)
		{
			cc.audioEngine.playEffect(a, false);
		}
		else
		{
			// UIScrollTips.addBitmapLabel(FWSTool.Str.format("(404)audio {0}", key), cc.Color.RED);
		}
	}

	/** 播放音乐 */
	export function playMusic(key: string): boolean
	{
		if (!_musicSwitch)
		{
			return false;
		}
		//UIScrollTips.addBitmapLabel(FWSTool.Str.format("music {0}", key), cc.Color.RED);
		var a: cc.AudioClip = FWSAssertCaches.getAudio(key);
		if (a)
		{
			cc.audioEngine.playMusic(a, true);
			return true;
		}
		else
		{
			// UIScrollTips.addBitmapLabel(FWSTool.Str.format("(404)audio {0}", key), cc.Color.RED);
			return false;
		}
	}

	/** 播放音乐 */
	export function initVol(): void
	{
		var volKey: string = "MusicVol";
		if (!localStorage.hasOwnProperty(volKey))
		{
			LocalStorageUtils.set(volKey, 0.5);
		}
		var vol: number = LocalStorageUtils.get("MusicVol");
		setMusicVol(vol);
		setAudioVol(vol);
	}

	export function tryPlayMusic():void
	{
		if(CC_EDITOR) return;
		if(!AudioUtils.audioList) return;
		if(!AudioUtils.audioList.tasks) return;
		if(!AudioUtils.audioList.tasks[0].completed) return;
		if(musicLoaded) return;
		if(!FWSMvc.ContextManager().checkActivedById("root")) return;

		musicLoaded = true;
		AudioUtils.playMusic("bgm");
		console.log("MUSIC START");
	}


	export var audioList:FWSTask.TaskList;
	export var musicLoaded:boolean = false;
	export function loadAudios(): void
	{
		console.log("MUSIC LOADING");
		var keys: string[] = [
			//顺序要按加载的优先级来排，不要随便改
			"bgm",
			"click",
			"interfaceClose",
			"interfaceOpen",
			"slotsSpin",
			"slotsStop",
			"gr_steal1",
			"gr_steal2",
			"gr_attack1",
			"gr_attack2",
			"attackFail",
			"attackSuc",
			"raidFail",
			"raidSuc",
			"building",
			"buildSuc",
			"coinAdd",
			"shieldAdd",
			"spinAdd",
			"newChapterDot",
			"chapterSuc",
			"photo"
		];

		var list: TaskList = new TaskList("正在加载音频资源");
		audioList = list;
		list.onProgress = {
			handler: (taskList: FWSTask.TaskList, task: FWSTask.Task) =>
			{
				tryPlayMusic();
				initVol();
				
			}, target: null
		};
		for (var i: number = 0; i < keys.length; i++)
		{
			var loader: RemoteAssertLoader.RemoteAudioClipLoader = new RemoteAssertLoader.RemoteAudioClipLoader(keys[i]);
			loader.logEnabled = false;

			list.add(loader);
		}

		list.begin();
	}

}
export = AudioUtils;
window["AudioUtils"] = AudioUtils;
