console.group("iter");
var dict = new FWSData.Dict();
dict.setItem("a", 123);
dict.setItem("b", 456);
dict.setItem("c", 789);
var list = new FWSData.List();
list.add(123);
list.add(456);
list.add(789);
var queue = new FWSData.Queue();
queue.add(123);
queue.add(456);
queue.add(789);
var microsoft = new FWSData.Node("microsoft");
var visualstudio = new FWSData.Node("visualstudio");
var cs = new FWSData.Node("cs");
var vb = new FWSData.Node("vb");
var ts = new FWSData.Node("ts");
var office = new FWSData.Node("office");
var outlook = new FWSData.Node("outlook");
var word = new FWSData.Node("word");
var excel = new FWSData.Node("excel");
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
var iter = microsoft.getEnumerator();
while (!iter.end()) {
    console.log(iter.getCurrent());
    iter.moveNext();
}
console.groupEnd();
console.info("** Completed **");
var testObj = {
    myUser: {
        id: 123,
        name: "liuqiang"
    },
    cards: [
        { id: 1, color: 2, amount: 3 },
        { id: 4, color: 5, amount: 6 },
        { id: 7, color: 8, amount: 9 }
    ]
};
console.log(FWSData.getValueFromPath(testObj, "cards.4.id", 0));
//# sourceMappingURL=FWSMvc_Test.js.map