/*
 * 测试场景
 * @Author: 刘强 
 * @Date: 2018-07-31 16:14:10 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 19:57:52
 */


const { ccclass, property } = cc._decorator;

import X = require('../../fws/utils/X');
import FWSComponent = require('../../fws/display/FWSComponent');
import WebClient = require('../../fws/net/WebClient');


@ccclass
export default class TestScene extends FWSComponent.default
{

    start()
    {
        WebClient.get("https://www.baidu.com", {}, this, 
        (res) => {
            X.log("success", res);
            debugger
        }, 
        (res) => {
            X.log("fail", res);
            debugger
        });
    }
}
