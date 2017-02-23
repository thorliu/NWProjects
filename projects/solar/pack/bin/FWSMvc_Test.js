console.group("MVC");
var router = FWSMvc.getFMessageRouter();
var contextManager = FWSMvc.getFContextManager();
var p9 = new FWSMvc.FContext();
var loading = new FWSMvc.FContext();
var main = new FWSMvc.FContext();
var room = new FWSMvc.FContext();
var game = new FWSMvc.FContext();
contextManager.addContext("p9", p9);
contextManager.addContext("loading", loading, p9);
contextManager.addContext("main", main, p9);
contextManager.addContext("room", room, main);
contextManager.addContext("game", game, main);
contextManager.goto(room);
contextManager.goto(game);
contextManager.goto(loading);
console.groupEnd();
//# sourceMappingURL=FWSMvc_Test.js.map