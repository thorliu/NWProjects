/*
 * @Author: 刘强 
 * @Date: 2018-09-07 19:35:47 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-11 20:08:11
 */


module T2D
{
    /**
     * 获取两点间的距离
     * @param v1 第一个点
     * @param v2 第二个点
     */
    export function distance(v1: cc.Vec2, v2: cc.Vec2): number
    {
        var dx: number = Math.abs(v1.x - v2.x);
        var dy: number = Math.abs(v1.y - v2.y);

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 获取两点间的角度
     * @param p1 第一个点
     * @param p2 第二个点
     * @param use360 是否换算成360度
     */
    export function angle(p1: cc.Vec2, p2: cc.Vec2, use360: boolean = false): number
    {
        var dx: number = p2.x - p1.x;
        var dy: number = p2.y - p1.y;

        var r: number = Math.atan2(dx, dy) * (180.0 / Math.PI);

        if (use360)
        {
            r += 360;
            r %= 360;
            r = 360 - r + 90;
            r = r % 360;
        }
        return r;
    }

    /**
     * 获取相对一个起始点，角度以及距离的一个目标点位置
     * @param p 起始点
     * @param angle 角度
     * @param distance 距离
     */
    export function position(p: cc.Vec2, angle: number, distance: number): cc.Vec2
    {
        var r: cc.Vec2 = new cc.Vec2();
        var a: number = angle / (180 / Math.PI);
        var cx: number = distance * Math.cos(a);
        var cy: number = distance * Math.sin(a);

        r.x = p.x + cx;
        r.y = p.y + cy;

        return r;
    }
}
export = T2D;