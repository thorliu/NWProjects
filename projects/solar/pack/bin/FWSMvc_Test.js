var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MsgConnection1 = (function (_super) {
    __extends(MsgConnection1, _super);
    function MsgConnection1() {
        return _super.apply(this, arguments) || this;
    }
    MsgConnection1.prototype.onFMessage_test = function (msg) {
        console.log("MsgConnection1", msg);
        return true;
    };
    return MsgConnection1;
}(FWSMvc.FMessageConnection));
var MsgConnection2 = (function (_super) {
    __extends(MsgConnection2, _super);
    function MsgConnection2() {
        return _super.apply(this, arguments) || this;
    }
    MsgConnection2.prototype.onFMessage_test = function (msg) {
        console.log("MsgConnection2", msg);
        return true;
    };
    return MsgConnection2;
}(FWSMvc.FMessageConnection));
var MsgConnection3 = (function (_super) {
    __extends(MsgConnection3, _super);
    function MsgConnection3() {
        return _super.apply(this, arguments) || this;
    }
    MsgConnection3.prototype.onFMessage_hello = function (msg) {
        console.log("MsgConnection3", msg);
        return true;
    };
    return MsgConnection3;
}(FWSMvc.FMessageConnection));
console.group("MVC");
var router = FWSMvc.getFMessageRouter();
router.createQueue("ui");
var contextManager = FWSMvc.getFContextManager();
var p9 = new FWSMvc.FContext();
var loading = new FWSMvc.FContext();
var main = new FWSMvc.FContext();
var room = new FWSMvc.FContext(new MsgConnection1(), new MsgConnection2());
var game = new FWSMvc.FContext(new MsgConnection1(), new MsgConnection3());
contextManager.addContext("p9", p9);
contextManager.addContext("loading", loading, p9);
contextManager.addContext("main", main, p9);
contextManager.addContext("room", room, main);
contextManager.addContext("game", game, main);
contextManager.goto(game);
new FWSMvc.FMessage("test", "ui").send();
new FWSMvc.FMessage("hello", "ui").send();
new FWSMvc.FMessage("test", "").send();
console.groupEnd();
//# sourceMappingURL=FWSMvc_Test.js.map