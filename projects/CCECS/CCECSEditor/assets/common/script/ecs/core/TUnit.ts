/*
 * 单位实例
 * @Author: 刘强 
 * @Date: 2018-10-11 14:05:39 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 01:45:08
 */

import TECSCore = require('./TECSCore');

class TUnit
{
    /** 静态特征 */
    public staticAttributes: TECSCore.TUnitStaticAttributes = TECSCore.TUnitStaticAttributes.None;

    /** 动态特征 */
    public dynamicAttributes: TECSCore.TUnitDynamicAttributes = TECSCore.TUnitDynamicAttributes.None;

    

    //NOTE: ----

    /** 配置ID */
    private _id: string;

    /** 唯一标识 */
    private _guid: number;

    /** 隶属方 */
    private _owner: TECSCore.TPlayerInfo;

    /** 已绑定的组件 */
    private _components: { [key: string]: TECSCore.IUnitComponent };

    /** 显示对象节点 */
    public node:cc.Node = null;

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

    public onBind():void
    {
        for (var k in this._components)
        {
            var c: TECSCore.IUnitComponent = this._components[k];
            if (c)
            {
                c.onBind();
            }
        }
    }

    public onUnbind():void
    {
        for (var k in this._components)
        {
            var c: TECSCore.IUnitComponent = this._components[k];
            if (c)
            {
                c.onUnbind();
            }
        }
    }

    /** 获取指定的组件 */
    public getComponent(name: string | TECSCore.UnitComponentKeys): TECSCore.IUnitComponent
    {
        if(typeof(name)==="string")
        {
            return this._components[name];
        }
        else
        {
            return this._components[TECSCore.UnitComponentKeys[name]];
        }
        
    }

    /** 添加组件 */
    public add(component: TECSCore.IUnitComponent): void
    {
        if (this._components[component.key]) return;
        this._components[component.key] = component;
        component.unit = this;
        
    }

    /** 移除组件 */
    public remove(key: string): void
    {
        if (!this._components[key]) return;
        var c: TECSCore.IUnitComponent = this._components[key];
        if (c)
        {
            this._components[key] = undefined;
            c.unit = undefined;
        }
    }

    /** 获取所有组件 */
    public get components(): { [key: string]: TECSCore.IUnitComponent } { return this._components; }

    /** 获取配置id */
    public get id(): string { return this._id; }

    /** 获取唯一标识 */
    public get guid(): number { return this._guid; }

    /** 获取隶属玩家 */
    public get owner(): TECSCore.TPlayerInfo { return this._owner; }
}

export = TUnit;