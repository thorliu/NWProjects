/*
 * 加载
 * @Author: 刘强 
 * @Date: 2018-10-22 10:29:18 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-27 15:20:15
 */


const { ccclass, property } = cc._decorator;
import FWSTask = require('../fws/task/FWSTask');
import FWSTool = require('../fws/utils/FWSTool');
import FWSEnv = require('../fws/FWSEnv');
import LocalAssertLoader = require('../fws/display/factory/LocalAssertLoader');



@ccclass
export default class LoadingComponent extends cc.Component 
{
	@property(cc.Label)
	public lblProgress: cc.Label = null;

	@property(cc.Label)
	public lblVersion: cc.Label = null;

	protected taskList: FWSTask.TaskList;

	public onLoad(): void
	{
		this.init();
	}

	public onEnable(): void
	{
		if (this.lblVersion) this.lblVersion.string = "VER " + FWSEnv.APP_VER;

		this.taskList.begin();
	}

	/** 进度 */
	protected onTaskProgress(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		var progress: number = this.taskList.progress;
		progress = Math.floor(progress * 100);

		if (this.lblProgress) this.lblProgress.string = progress + "%";
	}

	/** 失败 */
	protected onTaskError(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		console.error("onTaskError", task);
		task.reset();
		setTimeout(() =>
		{
			task.begin();
		}, 1000);
	}

	/** 完成 */
	protected onTaskCompleted(tasklist: FWSTask.TaskList, task: FWSTask.Task): void
	{
		// FWSAssertCaches.SpriteAtlasCaches.get("texture/main").getTexture().setAliasTexParameters();

		// var sceneName: string = "_TestScene";
		var sceneName: string = "StageScene";

		cc.director.preloadScene(sceneName, function ()
		{
			cc.director.loadScene(sceneName);
		});
	}


	//NOTE: ---------------

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
			{ type: cc.SpriteAtlas, key: "texture/editor" },
			{ type: cc.BitmapFont, key: "font/BMFEditor" },
			
		];

		for (var i: number = 0; i < items.length; i++)
		{
			let item: any = items[i];
			this.taskList.add(new LocalAssertLoader.LocalAssertLoader(item.key, item.type));
		}
	}


}
