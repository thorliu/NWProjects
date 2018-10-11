/*
 * 单位实例
 * @Author: 刘强 
 * @Date: 2018-10-11 14:05:39 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 14:28:14
 */

import TECSCore = require('./TECSCore');

class TUnit
{
    /** 配置ID */
    private _id: string;

    /** 唯一标识 */
    private _guid: number;

    /** 隶属方 */
    private _owner:TECSCore.TPlayerInfo;

    /**
     * 构造
     * @param id 配置id
     * @param guid 唯一标识
     * @param owner 隶属玩家
     */
    constructor(id: string, guid: number, owner: TECSCore.TPlayerInfo)
    {
        this._id = id;
        this._guid = guid;
        this._owner = owner;
    }

    /** 获取配置id */
    public get id(): string { return this._id; }

    /** 获取唯一标识 */
    public get guid(): number { return this._guid; }

    /** 获取隶属玩家 */
    public get owner():TECSCore.TPlayerInfo { return this._owner; }
}

export = TUnit;