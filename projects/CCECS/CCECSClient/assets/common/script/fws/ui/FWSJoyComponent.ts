/*
 * 摇杆组件
 * @Author: 刘强 
 * @Date: 2018-09-07 18:40:21 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-10-21 01:57:59
 */

const { ccclass, property } = cc._decorator;
import FWS2DUtils = require('../utils/FWS2DUtils');
import TJoy = require('../../ecs/core/TJoy');



@ccclass
export default class FWSJoyComponent extends cc.Component 
{
    //#region 参数

    /** 按钮名称 */
    protected ButtonNames: string[] = ["A", "B", "C", "D"];

    /** 按钮直径 */
    protected ButtonRadius: number = 100 / 2;

    /** 摇杆范围 */
    protected ThumbRangeRadius: number = 150 / 2;

    /** 是否支持45度角 */
    protected SupportAngle45: boolean = true;

    /** 是否支持任意斜角 */
    protected SupportAngleAny: boolean = true;

    /** 调试模式 */
    protected DebugMode: boolean = CC_DEBUG;

    /** 是否支持移动呼出轮盘 */
    protected AlterableActiveMode: boolean = true;

    /** 屏蔽区域 */
    protected NeutralOffset: number = 0;

    //#endregion

    //#region 属性

    /** 左手主节点 */
    @property(cc.Node)
    public leftNode: cc.Node = null;

    /** 右手主节点 */
    @property(cc.Node)
    public rightNode: cc.Node = null;

    /** 左手方向 */
    @property(cc.Sprite)
    public leftThumbNode: cc.Sprite = null;


    /** 按钮 */
    @property(cc.Sprite)
    public buttons: cc.Sprite[] = [];



    /** 调试信息 */
    @property(cc.Label)
    public debug: cc.Label = null;

    protected defaultThumbPos: cc.Vec2 = cc.Vec2.ZERO;

    protected leftThumbDrag: boolean = false;
    protected leftThumbPressedPos: cc.Vec2 = null;
    protected leftThumbPressTimer: number = 0;
    protected leftThumbPressRelayout: boolean = false;
    protected leftThumbPressMoved: boolean = false;


    //#endregion

    //#region 生命周期

    /** 初次启动时 */
    public start(): void
    {
    }

    /** 加载时 */
    public onLoad(): void
    {
    }

    /** 激活时 */
    public onEnable(): void
    {
        this.initEvents();

        this.defaultThumbPos = this.leftNode.getPosition();
        var ws: cc.Size = cc.director.getWinSize();
        this.defaultThumbPos.x = -(ws.width / 2) + 150;
        this.defaultThumbPos.y = -150;
        this.leftNode.setPosition(this.defaultThumbPos);
    }

    /** 屏蔽时 */
    public onDisable(): void
    {
        this.removeEvents();

        TJoy.direct = null;
        TJoy.buttons = {};

    }

    //#endregion

    //#region 显示

    /** 设置按钮显示状态 */

    protected releaseOpacity: number = 160;
    protected pressedOpacity: number = 255;

    protected releaseThumbOpacity: number = 255;
    protected pressedThumbOpacity: number = 255;

    /** 设置按钮显示状态 */
    protected setButtonDisplayState(name: string): void
    {
        for (var i: number = 0; i < this.ButtonNames.length; i++)
        {
            var btn: cc.Sprite = this.buttons[i];
            var n: string = this.ButtonNames[i];
            if (n !== name) continue;

            if (this.pressedButtons[name] === null ||
                this.pressedButtons[name] === undefined)
            {
                btn.node.opacity = this.releaseOpacity;
            }
            else
            {
                btn.node.opacity = this.pressedOpacity;
            }
        }
    }

    /** 设置摇杆显示状态 */
    protected setThumbDisplayState(): void
    {
        if (CC_BUILD)
        {
            if (this.leftThumbNode.node) this.leftThumbNode.node.active = false;
            return;
        }

        if (!this.leftThumbNode) return;

        if (this.currentAngle === null || this.currentAngle === undefined)
        {
            this.leftThumbNode.node.opacity = this.releaseThumbOpacity;
            this.leftThumbNode.node.setPosition(cc.Vec2.ZERO);
        }
        else
        {
            this.leftThumbNode.node.opacity = this.pressedThumbOpacity;
            var thumbPos: cc.Vec2 = this.leftNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var dist: number = FWS2DUtils.distance(thumbPos, this.thumbPressedPosition);
            dist = Math.min(dist, this.ThumbRangeRadius);
            thumbPos = FWS2DUtils.position(thumbPos, this.currentAngle, dist);
            thumbPos = this.leftThumbNode.node.parent.convertToNodeSpaceAR(thumbPos);

            this.leftThumbNode.node.setPosition(thumbPos);

            
            // var thumbPos = this.leftThumbNode.node.parent.convertToNodeSpaceAR(this.currentPos);
            // this.leftThumbNode.node.setPosition(thumbPos);
        }
    }

    //#endregion

    //#region 事件
    /** 是否按住了摇杆 */
    protected thumbPressed: boolean = false;
    /** 按住摇杆的手指 */
    protected thumbId: number = null;
    /** 按住摇杆的位置 */
    protected thumbPressedPosition: cc.Vec2 = cc.Vec2.ZERO;

    /** 当前角度 */
    protected currentAngle: number = null;

    /** 被按住的按钮 (NAME = ID) */
    protected pressedButtons: any = {};

    protected currentPos: cc.Vec2 = null;

    /** 设置按住按钮的状态 */
    protected setPressedButtonState(name: string, id: number, pressed: boolean): void
    {
        if (name === null || name === undefined) return;

        if (pressed)
        {
            // this.trace("+", name);
            this.pressedButtons[name] = id;
            this.setButtonDisplayState(name);

            TJoy.buttons[name] = new Date().getTime();
        }
        else
        {
            // this.trace("-", name);
            this.pressedButtons[name] = undefined;
            this.setButtonDisplayState(name);

            TJoy.buttons[name] = undefined;
        }
    }

    /** 更新摇杆位置 */
    protected updateThumbState(id: number, pos: cc.Vec2): void
    {
        this.currentPos = pos;
        if (!this.thumbPressed)
        {
            this.currentAngle = null;
            this.setThumbDisplayState();

            TJoy.direct = null;
            return;
        }

        if (this.thumbId !== id) return;


        var now: number = new Date().getTime();
        var distX: number = 0;
        var distY: number = 0;
        var ws: cc.Size = cc.director.getWinSize();

        distX = Math.abs(this.leftThumbPressedPos.x - pos.x);
        distY = Math.abs(this.leftThumbPressedPos.y - pos.y);

        var offsetDist: number = 20;
        var thisMoved: boolean = false;
        if (this.AlterableActiveMode) // && (distX > offsetDist || distY > offsetDist))
        {
            thisMoved = true;
        }

        // && (now - this.leftThumbPressTimer < 1000) 
        if ((pos.x < ws.width / 2) && thisMoved && !this.leftThumbPressMoved && !this.leftThumbPressRelayout)
        {
            this.leftThumbPressRelayout = true;
            var newPos: cc.Vec2 = new cc.Vec2(this.leftThumbPressedPos.x, this.leftThumbPressedPos.y);
            //
            if (newPos.x < 100) newPos.x = 100;
            if (newPos.y < 100) newPos.y = 100;
            if (newPos.y > ws.height - 150) newPos.y = ws.height - 150;
            newPos = this.leftNode.parent.convertToNodeSpaceAR(newPos);

            this.leftNode.setPosition(newPos);
        }

        if (thisMoved) this.leftThumbPressMoved = true;


        this.thumbPressedPosition = pos;

        var thumbPos: cc.Vec2 = this.leftNode.convertToWorldSpaceAR(cc.Vec2.ZERO);

        var tempPos: cc.Vec2 = new cc.Vec2(this.thumbPressedPosition.x, this.thumbPressedPosition.y);



        //---

        var angle: number = FWS2DUtils.angle(thumbPos, tempPos, true);

        // SupportAngleAny
        // SupportAngle45
        if (!this.SupportAngleAny)
        {
            if (!this.SupportAngle45)
            {
                if (angle < 45 || angle > 315) angle = 0;
                else if (angle >= 45 && angle < 135) angle = 90;
                else if (angle >= 135 && angle < 225) angle = 180;
                else angle = 270;
            }
            else
            {
                if (angle < 22.5 || angle > 337.5) angle = 0;
                else if (angle >= 22.5 && angle < 67.5) angle = 45;
                else if (angle >= 67.5 && angle < 112.5) angle = 90;
                else if (angle >= 112.5 && angle < 157.5) angle = 135;
                else if (angle > 157.5 && angle < 202.5) angle = 180;
                else if (angle >= 202.5 && angle < 247.5) angle = 225;
                else if (angle >= 247.5 && angle < 292.5) angle = 270;
                else angle = 335;
            }
        }



        if (Math.abs(thumbPos.x - tempPos.x) > this.NeutralOffset || Math.abs(thumbPos.y - tempPos.y) > this.NeutralOffset)
        {
            this.currentAngle = angle;
        } 
        else
        {
            this.currentAngle = null;
        }

        this.setThumbDisplayState();


        //事件
        TJoy.direct = this.currentAngle;
    }

    /** 尝试改变按钮状态 */
    protected tryPressedButtonState(pressed: boolean, touchId: number, touchPos: cc.Vec2): void
    {
        if (this.buttons.length !== this.ButtonNames.length) return;

        //方向操作
        if (!pressed)
        {
            if (this.thumbId === touchId)
            {
                this.leftThumbPressRelayout = false;
                this.leftThumbPressMoved = false;
                this.thumbId = undefined;
                this.thumbPressed = false;
                this.updateThumbState(touchId, touchPos);
                // this.trace("-", touchId);

                this.leftNode.setPosition(this.defaultThumbPos);
            }
        }
        else
        {
            var ws: cc.Size = cc.director.getWinSize();
            if ((touchPos.x < ws.width / 2) && (this.thumbId === null || this.thumbId === undefined))
            {
                this.leftThumbPressRelayout = false;
                this.leftThumbPressMoved = false;
                this.leftThumbPressTimer = new Date().getTime();
                this.leftThumbPressedPos = new cc.Vec2(touchPos.x, touchPos.y);
                var thumbPos: cc.Vec2 = this.leftNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var thumbDist: number = FWS2DUtils.distance(touchPos, thumbPos);
                // this.trace(thumbDist);



                this.thumbId = touchId;
                this.thumbPressed = true;
                // this.trace("+", touchId);
                this.updateThumbState(touchId, touchPos);

            }
        }

        //动作按钮 (松开)
        if (!pressed)
        {
            for (var i: number = 0; i < this.ButtonNames.length; i++)
            {
                var btn: cc.Sprite = this.buttons[i];
                var name: string = this.ButtonNames[i];
                if (this.pressedButtons[name] === touchId)
                {
                    this.setPressedButtonState(name, touchId, false);
                    break;
                }
            }
            return;
        }

        //动作按钮 (按下)
        for (var i: number = 0; i < this.ButtonNames.length; i++)
        {
            var btn: cc.Sprite = this.buttons[i];
            var name: string = this.ButtonNames[i];
            var pos: cc.Vec2 = btn.node.getPosition();
            pos = btn.node.parent.convertToWorldSpaceAR(pos);

            var dist: number = FWS2DUtils.distance(touchPos, pos);

            if (dist < this.ButtonRadius)
            {
                this.setPressedButtonState(name, touchId, true);
                return;
            }
        }
    }

    /** 初如化事件 */
    protected initEvents(): void
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        // if (this.DebugMode)
        // {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // }
    }

    /** 移除事件 */
    protected removeEvents(): void
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);

        // if (this.DebugMode)
        // {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // }
    }

    /** 按下 */
    protected onTouchBegin(event: any): void
    {
        var touchId: number = event.touch.__instanceId;
        var touchPos: cc.Vec2 = event.touch.getLocation();
        this.tryPressedButtonState(true, touchId, touchPos);
        // this.trace("onTouchBegin", touchId, Math.floor(touchPos.x), Math.floor(touchPos.y));
    }

    /** 移动 */
    protected onTouchMove(event: any): void
    {
        var touchId: number = event.touch.__instanceId;
        var touchPos: cc.Vec2 = event.touch.getLocation();

        this.updateThumbState(touchId, touchPos);

        // this.trace("onTouchMove", touchId, Math.floor(touchPos.x), Math.floor(touchPos.y));
    }

    /** 松开 */
    protected onTouchEnd(event: any): void
    {
        var touchId: number = event.touch.__instanceId;
        var touchPos: cc.Vec2 = event.touch.getLocation();

        this.tryPressedButtonState(false, touchId, touchPos);


        // this.trace("onTouchEnd", touchId, Math.floor(touchPos.x), Math.floor(touchPos.y));
    }

    /** 取消 */
    protected onTouchCancel(event: any): void
    {
        var touchId: number = event.touch.__instanceId;
        var touchPos: cc.Vec2 = event.touch.getLocation();

        this.tryPressedButtonState(false, touchId, touchPos);
        // this.trace("onTouchCancel", touchId, Math.floor(touchPos.x), Math.floor(touchPos.y));
    }

    /** 左键(A) */
    protected LEFT_KEY: number = 65;
    /** 右键(D) */
    protected RIGHT_KEY: number = 68;
    /** 上键(W) */
    protected UP_KEY: number = 87;
    /** 下键(S) */
    protected DOWN_KEY: number = 83;
    /** 按键(J,K,L,U,I,O) */
    protected BUTTON_KEYS: number[] = [74, 75, 76, 85, 73, 79];

    /** 已经按下的键 */
    protected keyboardPressed: any = {};

    /** 有键按下时 */
    protected onKeyDown(e: KeyboardEvent): void
    {
        switch (e.keyCode)
        {
            //方向
            case this.LEFT_KEY:
            case this.RIGHT_KEY:
            case this.UP_KEY:
            case this.DOWN_KEY:
                {
                    this.keyboardPressed[e.keyCode] = true;
                    this.updateThumbByKeyboard();
                    this.leftNode.setPosition(this.defaultThumbPos);
                }
                break;

            //按键
            default:
                {
                    var i: number = this.BUTTON_KEYS.indexOf(e.keyCode);
                    if (i >= 0)
                    {
                        this.keyboardPressed[e.keyCode] = true;
                        this.setPressedButtonState(this.ButtonNames[i], i, true);
                    }
                }
                break;
        }
    }

    /** 有键松开时 */
    protected onKeyUp(e: KeyboardEvent): void
    {
        switch (e.keyCode)
        {
            //方向
            case this.LEFT_KEY:
            case this.RIGHT_KEY:
            case this.UP_KEY:
            case this.DOWN_KEY:
                {
                    this.keyboardPressed[e.keyCode] = false;
                    this.updateThumbByKeyboard();
                }
                break;

            //按键
            default:
                {
                    var i: number = this.BUTTON_KEYS.indexOf(e.keyCode);
                    if (i >= 0)
                    {
                        this.keyboardPressed[e.keyCode] = true;
                        this.setPressedButtonState(this.ButtonNames[i], i, false);
                    }
                }
                break;
        }
    }

    protected updateThumbByKeyboard(): void
    {
        var pressLeft: boolean = this.keyboardPressed[this.LEFT_KEY];
        var pressRight: boolean = this.keyboardPressed[this.RIGHT_KEY];
        var pressUp: boolean = this.keyboardPressed[this.UP_KEY];
        var pressDown: boolean = this.keyboardPressed[this.DOWN_KEY];

        var angle: number = null;

        if (pressLeft && pressRight)
        {

        }
        else if (pressUp && pressDown)
        {
        }
        else if (pressUp && pressLeft)
        {
            // console.log("左上");
            if (this.SupportAngle45) angle = 135;
        }
        else if (pressUp && pressRight)
        {
            // console.log("右上");
            if (this.SupportAngle45) angle = 45;
        }
        else if (pressDown && pressLeft)
        {
            // console.log("左下");
            if (this.SupportAngle45) angle = 225;
        }
        else if (pressDown && pressRight)
        {
            // console.log("右下");
            if (this.SupportAngle45) angle = 315;
        }
        else if (pressUp)
        {
            // console.log("上");
            angle = 90;
        }
        else if (pressDown)
        {
            // console.log("下");
            angle = 270;
        }
        else if (pressLeft)
        {
            // console.log("左");
            angle = 180;
        }
        else if (pressRight)
        {
            // console.log("右");
            angle = 0;
        }

        if (angle === null || angle === undefined)
        {
            this.thumbId = null;
            this.thumbPressed = false;
            this.currentAngle = null;
        }
        else
        {
            this.thumbId = 999;
            this.thumbPressed = true;
            this.currentAngle = angle;
            var thumbPos: cc.Vec2 = this.leftNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
            this.thumbPressedPosition = FWS2DUtils.position(thumbPos, angle, this.ThumbRangeRadius * 2);

            if(this.leftThumbNode) this.leftThumbNode.node.setPosition(this.thumbPressedPosition.x, this.thumbPressedPosition.y);
        }

        this.leftThumbPressedPos = this.thumbPressedPosition;
        this.updateThumbState(999, this.thumbPressedPosition);
    }

    //#endregion

}
