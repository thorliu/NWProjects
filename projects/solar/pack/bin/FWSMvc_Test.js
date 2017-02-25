console.group("DependentObject");
class User extends FWSData.DependentObject {
    get id1() { return this.get("id1", 0); }
    set id1(v) { this.set("id1", v); }
    get id2() { return this.get("id2", 0); }
    set id2(v) { this.set("id2", v); }
    get name() { return this.get("name", ""); }
    set name(v) { this.set("name", v); }
}
var user1 = new User();
var user2 = new User();
console.log("-- BEGIN --");
FWSData.bindProperties(user1, user2, FWSData.DataBindMode.TwoWay, { "id2": "id1" });
console.log("set 1 : 1");
user1.id1 = 1;
console.groupEnd();
//# sourceMappingURL=FWSMvc_Test.js.map