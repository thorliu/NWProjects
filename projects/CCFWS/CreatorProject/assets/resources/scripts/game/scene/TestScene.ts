/*
 * 测试场景
 * @Author: 刘强 
 * @Date: 2018-07-31 16:14:10 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-07-31 16:14:30
 */


const {ccclass, property} = cc._decorator;

import X = require('../../fws/utils/X');


@ccclass
export default class NewClass extends cc.Component {


    start () {
        X.log("Hello");
    }

    // update (dt) {}
}
