// console.group("List");
// var list: FWSData.List<number> = new FWSData.List<number>();
// for (var i: number = 0; i < 10; i++)
// {
// 	list.add(i);
// }
// console.log(list.length, list + "");
// list.add(99);
// console.log(list.length, list + "");
// list.remove(5);
// console.log(list.length, list + "");
// list.removeAt(3);
// console.log(list.length, list + "");
// list.insert(88, 3);
// console.log(list.length, list + "");
// list.clear();
// console.log(list.length, list + "");
// for (var i: number = 0; i < 5; i++)
// {
// 	list.add(i);
// }
// console.log(list.length, list + "");

// console.log("indexOf", list.indexOf(2));
// console.log("toArray", list.toArray());
// console.groupEnd();
// //----------------------------------------------
// console.group("Dict");
// var dict: FWSData.Dict<string> = new FWSData.Dict<string>();
// dict.setItem("a", "111");
// dict.setItem("b", "222");
// dict.setItem("c", "333");
// console.log(dict.count, dict.toString());
// dict.deleteKey("b");
// console.log(dict.count, dict.toString());
// dict.setItem("c", "ccccc");
// console.log(dict.count, dict.toString());

// console.log("getItem", dict.getItem("c"));
// console.log("keys", dict.keys);
// console.log("values", dict.values);
// console.log("toObject", dict.toObject());
// console.groupEnd();

// //----------------------------------------------
// console.group("Queue");
// var queue: FWSData.Queue<string> = new FWSData.Queue<string>();
// queue.add("abc");
// queue.add("def");
// queue.add("ghi");
// console.log(queue.current, queue.length, queue.toString());
// queue.clear();
// console.log(queue.current, queue.length, queue.toString());
// queue.add("jkl");
// queue.add("mno");
// queue.add("pqr");
// console.log(queue.current, queue.length, queue.toString());
// console.log("remove", queue.remove());
// console.log(queue.current, queue.length, queue.toString());
// console.log("toArray", queue.toArray());
// console.groupEnd();
// //----------------------------------------------
// console.group("Node");
// var microsoft: FWSData.Node<string> = new FWSData.Node<string>("microsoft");
// var visualstudio: FWSData.Node<string> = new FWSData.Node<string>("visualstudio");
// var cs: FWSData.Node<string> = new FWSData.Node<string>("cs");
// var vb: FWSData.Node<string> = new FWSData.Node<string>("vb");
// var ts: FWSData.Node<string> = new FWSData.Node<string>("ts");
// var office: FWSData.Node<string> = new FWSData.Node<string>("office");
// var outlook: FWSData.Node<string> = new FWSData.Node<string>("outlook");
// var word: FWSData.Node<string> = new FWSData.Node<string>("word");
// var excel: FWSData.Node<string> = new FWSData.Node<string>("excel");

// microsoft.data = "microsoft";
// visualstudio.data = "VisualStudio";
// cs.data = "CSharp";
// vb.data = "VisualBasic";
// ts.data = "TypeScript";

// office.data = "Office";
// outlook.data = "Outlook";
// word.data = "Word";
// excel.data = "Excel";

// microsoft.add(visualstudio);
// visualstudio.add(cs);
// visualstudio.add(vb);
// visualstudio.add(ts);

// microsoft.add(office);
// office.add(outlook);
// office.add(word);
// office.add(excel);
// console.log("microsoft", microsoft);
// console.groupEnd();
//----------------------------------------------
console.group("MVC");
var router = FWSMvc.getFMessageRouter();
var contextManager = FWSMvc.getFContextManager();

var p9:FWSMvc.FContext = new FWSMvc.FContext();
var loading: FWSMvc.FContext = new FWSMvc.FContext();
var main:FWSMvc.FContext = new FWSMvc.FContext();
var room:FWSMvc.FContext = new FWSMvc.FContext();
var game:FWSMvc.FContext = new FWSMvc.FContext();

contextManager.addContext("p9", p9);
contextManager.addContext("loading", loading, p9);
contextManager.addContext("main", main, p9);
contextManager.addContext("room", room, main);
contextManager.addContext("game", game, main);

contextManager.goto(room);
contextManager.goto(game);
contextManager.goto(loading);

console.groupEnd();
