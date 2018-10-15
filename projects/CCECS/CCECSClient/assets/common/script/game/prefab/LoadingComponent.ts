
/*
 * @Author: 刘强 
 * @Date: 2018-09-09 16:04:08 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-15 11:48:11
 */

const { ccclass, property } = cc._decorator;
import FWSTask = require('../../fws/task/FWSTask');
import LocalAssertLoader = require('../../fws/display/factory/LocalAssertLoader');
import FWSAssertCaches = require('../../fws/display/factory/FWSAssertCaches');
import FWSEnv = require('../../fws/FWSEnv');
import TGame = require('../../ecs/core/TGame');


@ccclass
export default class LoadingComponent extends cc.Component
{
	@property(cc.Label)
	public lblProgress: cc.Label = null;

	@property(cc.Label)
	public lblVersion: cc.Label = null;


	//NOTE: base

	protected taskList: FWSTask.TaskList;

	/** 启动 */
	public onLoad(): void
	{
		this.init();
	}

	/** 开始 */
	public onEnable(): void
	{
		if (this.lblVersion)
		{
			this.lblVersion.string = "VER " + FWSEnv.APP_VER;
		}

		this.taskList.begin();
	}

	/** 进度 */
	protected onTaskProgress(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		var progress: number = this.taskList.progress;
		progress = Math.floor(progress * 100);

		if (this.lblProgress) this.lblProgress.string = "LOADING\n" + progress + "%";
	}

	/** 失败 */
	protected onTaskError(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		task.reset();
		setTimeout(() =>
		{
			task.begin();
		}, 1000);
	}

	/** 完成 */
	protected onTaskCompleted(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		FWSAssertCaches.SpriteAtlasCaches.get("texture/main").getTexture().setAliasTexParameters();

		TGame.getInstance();
		// var sceneName: string = "_TestScene";
		var sceneName: string = "GameScene";

		cc.director.preloadScene(sceneName, function ()
		{
			cc.director.loadScene(sceneName);
		});
	}

	//NOTE: Loading

	/** 初始化任务表 */
	protected init(): void
	{
		this.taskList = new FWSTask.TaskList();
		this.taskList.onProgress = { target: this, handler: this.onTaskProgress };
		this.taskList.onError = { target: this, handler: this.onTaskError };
		this.taskList.onCompleted = { target: this, handler: this.onTaskCompleted };

		this.initConfigTasks();
		this.initLocalAssertTasks();
	}

	/** 配置文件任务 */
	protected initConfigTasks(): void
	{
	}

	/** 本地资源任务 */
	protected initLocalAssertTasks(): void
	{
		var items: any[] = [
			{ type: cc.SpriteAtlas, key: "texture/main" },
			{ type: cc.BitmapFont, key: "font/BMFDebug" },

			//prefabs
			{ type: cc.Prefab, key: "prefab/game/PrefabTank0"}
		];

		for (var i: number = 0; i < items.length; i++)
		{
			let item: any = items[i];
			this.taskList.add(new LocalAssertLoader.LocalAssertLoader(item.key, item.type));
		}
	}

	
}