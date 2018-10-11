/*
 * 单位实例
 * @Author: 刘强 
 * @Date: 2018-10-11 14:05:39 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 16:38:10
 */

import TECSCore = require('./TECSCore');

class TUnit
{
    /** 配置ID */
    private _id: string;

    /** 唯一标识 */
    private _guid: number;

    /** 隶属方 */
    private _owner: TECSCore.TPlayerInfo;

    /** 已绑定的组件 */
    private _components: { [key: string]: TECSCore.IUnitComponent };

    /**
     * 构造
     * @param id 配置id
     * @param guid 唯一标识
     * @param owner 隶属玩家
     */
    constructor(id: string, guid: number, owner: TECSCore.TPlayerInfo)
    {
        this._components = {};
        this._id = id;
        this._guid = guid;
        this._owner = owner;
    }

    /** tick逻辑 */
    public onTick(d: number): void
    {
        for (var k in this._components)
        {
            var c: TECSCore.IUnitComponent = this._components[k];
            if (c)
            {
                c.onTick(d);
            }
        }
    }

    /** 获取指定的组件 */
    public getComponent(name: string): TECSCore.IUnitComponent
    {
        return this._components[name];
    }

    /** 添加组件 */
    public add(component: TECSCore.IUnitComponent): void
    {
        if (this._components[component.key]) return;
        this._components[component.key] = component;
        component.unit = this;
        component.onBind();
    }

    /** 移除组件 */
    public remove(key: string): void
    {
        if (!this._components[key]) return;
        var c: TECSCore.IUnitComponent = this._components[key];
        if (c)
        {
            this._components[key] = undefined;
            c.onUnbind();
            c.unit = undefined;
        }
    }

    /** 获取配置id */
    public get id(): string { return this._id; }

    /** 获取唯一标识 */
    public get guid(): number { return this._guid; }

    /** 获取隶属玩家 */
    public get owner(): TECSCore.TPlayerInfo { return this._owner; }
}

export = TUnit;