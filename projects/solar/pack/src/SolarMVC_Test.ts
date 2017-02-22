console.group("List");
var list:SolarMVC.List<number> = new SolarMVC.List<number>();
for(var i:number = 0; i < 10; i ++)
{
	list.add(i);
}
console.log(list.length, list + "");
list.add(99);
console.log(list.length, list + "");
list.remove(5);
console.log(list.length, list + "");
list.removeAt(3);
console.log(list.length, list + "");
list.insert(88,3);
console.log(list.length, list + "");
list.clear();
console.log(list.length, list + "");
for(var i:number = 0; i < 5; i ++)
{
	list.add(i);
}
console.log(list.length, list + "");

console.log("indexOf", list.indexOf(2));
console.log("toArray", list.toArray());
console.groupEnd();
//----------------------------------------------
console.group("Dict");
var dict:SolarMVC.Dict<string> = new SolarMVC.Dict<string>();
dict.setItem("a", "111");
dict.setItem("b", "222");
dict.setItem("c", "333");
console.log(dict.count, dict.toString());
dict.deleteKey("b");
console.log(dict.count, dict.toString());
dict.setItem("c", "ccccc");
console.log(dict.count, dict.toString());

console.log("getItem", dict.getItem("c"));
console.log("keys", dict.keys);
console.log("values", dict.values);
console.log("toObject", dict.toObject());
console.groupEnd();

//----------------------------------------------
console.group("Queue");
var queue:SolarMVC.Queue<string> = new SolarMVC.Queue<string>();
queue.add("abc");
queue.add("def");
queue.add("ghi");
console.log(queue.current, queue.length, queue.toString());
queue.clear();
console.log(queue.current, queue.length, queue.toString());
queue.add("jkl");
queue.add("mno");
queue.add("pqr");
console.log(queue.current, queue.length, queue.toString());
console.log("remove", queue.remove());
console.log(queue.current, queue.length, queue.toString());
console.log("toArray", queue.toArray());
console.groupEnd();
//----------------------------------------------
console.group("Node");
var microsoft:SolarMVC.Node<string> = new SolarMVC.Node<string>("microsoft");
var visualstudio:SolarMVC.Node<string> = new SolarMVC.Node<string>("visualstudio");
var cs:SolarMVC.Node<string> = new SolarMVC.Node<string>("cs");
var vb:SolarMVC.Node<string> = new SolarMVC.Node<string>("vb");
var ts:SolarMVC.Node<string> = new SolarMVC.Node<string>("ts");
var office:SolarMVC.Node<string> = new SolarMVC.Node<string>("office");
var outlook:SolarMVC.Node<string> = new SolarMVC.Node<string>("outlook");
var word:SolarMVC.Node<string> = new SolarMVC.Node<string>("word");
var excel:SolarMVC.Node<string> = new SolarMVC.Node<string>("excel");

microsoft.data = "microsoft";
visualstudio.data = "VisualStudio";
cs.data = "CSharp";
vb.data = "VisualBasic";
ts.data = "TypeScript";

office.data = "Office";
outlook.data = "Outlook";
word.data = "Word";
excel.data = "Excel";

microsoft.add(visualstudio);
visualstudio.add(cs);
visualstudio.add(vb);
visualstudio.add(ts);

microsoft.add(office);
office.add(outlook);
office.add(word);
office.add(excel);
console.log("microsoft", microsoft);
console.groupEnd();
//----------------------------------------------
console.group("FMessageRouter");
var router = SolarMVC.getFMessageRouter();



console.groupEnd();
