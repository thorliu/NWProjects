/*
 * @Author: 刘强 
 * @Date: 2018-08-04 10:02:53 
 * @Last Modified by: 刘强
 * @Last Modified time: 2018-09-04 15:21:15
 */

import FWSMvc = require('../mvc/FWSMvc');
import X = require('../utils/X');
import FWSEnv = require('../FWSEnv');


module SocketClient
{
    export const TRACE_ON_MOBILE: boolean = FWSEnv.DEBUG_WEBSOCKET_TRACE && true;

    export const ReceiveData: any[] = [];
    export const SendData: any[] = [];

    export class SocketClient
    {
        protected _ws: WebSocket;

        constructor(name: string = "")
        {
            this._name = name;
        }

        /** 重置状态 */
        public reset(): void
        {
            if(this._ws)
            {
                this._ws.onopen = null;
                this._ws.onmessage = null;
                this._ws.onerror = null;
                this._ws.onclose = null;
                this._ws = null;
            }
            this._ws = null;
            this._connected = false;
        }

        /** 发起连接请求 */
        public connect(url: string): boolean
        {
            if (this._ws)
            {
                //忽略正在连接的情况
                if (this._connecting)  return false;
                //忽略已经连接的情况
                if (this._connected) return false;

                this.reset();
            }
            
            this._connecting = true;

            if (TRACE_ON_MOBILE) console.log("(连接) connect", url);
            
            this._ws = new WebSocket(url);

            var self: SocketClient = this;
            this._ws.onopen = (e: Event) =>
            {
                self._connected = true;
                self.onConnect(e);
            };
            this._ws.onmessage = (e: MessageEvent) =>
            {
                self.onMessage(e);
            };
            this._ws.onerror = (e: Event) =>
            {
                self._connected = false;
                self._ws = null;
                self.onError(e);
            };
            this._ws.onclose = (e: CloseEvent) => 
            {
                self._connected = false;
                self._ws = null;
                self.onClose(e);
            };

            return true;
        }

        /** 连接成功时 */
        protected onConnect(e: Event): void
        {
            if(!this._connecting) {
                console.log("(连接) 保护逻辑，忽略意外的onConnect");
                return;
            }

            this._connected = true;
            if (TRACE_ON_MOBILE) console.log("(连接) onConnect success");
            new FWSMvc.FMessage<any>("WebSocketOnConnect", 0).send();
        }

        /** 连接失败时 */
        protected onError(e: Event): void
        {
            if(!this._connecting) {
                console.log("(连接) 保护逻辑，忽略意外的onError");
                return;
            }

            this._connected = false;
            if (TRACE_ON_MOBILE) console.log("(连接) onError");
            new FWSMvc.FMessage<any>("WebSocketOnConnect", 1).send();
        }

        /** 收到消息时 */
        protected onMessage(e: MessageEvent): void
        {
            try
            {
                var data: any = JSON.parse(e.data);

                if (TRACE_ON_MOBILE)
                {
                    if (data.id !== 10101)
                    {
                        console.log("(连接) onMessage", e.data);
                    }
                }

                // if (TRACE_ON_MOBILE) ReceiveData.push(data);

                new FWSMvc.FMessage<any>("WebSocketOnReceive", data).send();
            } catch (err)
            {
                X.warn(err);
            }
        }

       
        /** 连接被关闭时 */
        protected onClose(e: CloseEvent): void
        {
            this._connected = false;
            this._connecting = false;
            if (TRACE_ON_MOBILE) console.log("(连接) onClose");
            new FWSMvc.FMessage<any>("WebSocketOnClose", null).send();
        }

        /** 发送数据 */
        public send(data: any): void
        {
            if (!this._ws) return;
            if (this._ws.readyState !== WebSocket.OPEN) return;

            if (TRACE_ON_MOBILE)
            {
                if (data.id !== 10101)
                {
                    console.log("(连接) send", data);
                }
            }

            if (FWSEnv.DEBUG_WEBSOCKET_TRACE) SendData.push(data);

            var json: string = JSON.stringify(data);


            this._ws.send(json)
        }

        /** 断开连接 */
        public close(): void
        {
            if (TRACE_ON_MOBILE) console.log("(连接) close");
            if (!this._ws) return;
            this._ws.close();
            this._ws = null;
            this._connected = false;
            this._connecting = false;
        }

        //NOTE properties

        protected _name: string;
        public get name(): string { return this.name; }

        protected _connected: boolean;
        public get connected(): boolean { return this._connected; }

        protected _connecting: boolean;
        public get connecting():boolean { return this._connecting; }
    }
}

export = SocketClient;

window["SocketClient"] = SocketClient;
