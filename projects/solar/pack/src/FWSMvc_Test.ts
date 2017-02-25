console.group("iter");

var dict:FWSData.Dict<number> = new FWSData.Dict<number>();

dict.setItem("a", 123);
dict.setItem("b", 456);
dict.setItem("c", 789);

var list:FWSData.List<number> = new FWSData.List<number>();

list.add(123);
list.add(456);
list.add(789);

var queue:FWSData.Queue<number> = new FWSData.Queue<number>();

queue.add(123);
queue.add(456);
queue.add(789);

var microsoft: FWSData.Node<string> = new FWSData.Node<string>("microsoft");
var visualstudio: FWSData.Node<string> = new FWSData.Node<string>("visualstudio");
var cs: FWSData.Node<string> = new FWSData.Node<string>("cs");
var vb: FWSData.Node<string> = new FWSData.Node<string>("vb");
var ts: FWSData.Node<string> = new FWSData.Node<string>("ts");
var office: FWSData.Node<string> = new FWSData.Node<string>("office");
var outlook: FWSData.Node<string> = new FWSData.Node<string>("outlook");
var word: FWSData.Node<string> = new FWSData.Node<string>("word");
var excel: FWSData.Node<string> = new FWSData.Node<string>("excel");

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


// var iter:FWSData.IEnumerator = dict.getEnumerator();
// var iter:FWSData.IEnumerator = list.getEnumerator();
// var iter:FWSData.IEnumerator = queue.getEnumerator();
var iter:FWSData.IEnumerator =  microsoft.getEnumerator();
while(!iter.end())
{
	console.log(iter.getCurrent());
	iter.moveNext();
}


console.groupEnd();

console.info("** Completed **");