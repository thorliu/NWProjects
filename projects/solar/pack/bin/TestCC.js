cc.Class({
    extends: cc.Node,
    onLoad: function () {
        this.abc = 0;
        var test1 = 1;
        var test2 = "a";
        var test3 = true;
        var test4 = new Array();
        test4.push(1);
    },
    statics: {},
    init: function (a1) {
    },
    properties: {
        a: {
            get: function () {
                return 0;
            },
            set: function (v) {
            }
        }
    },
    onDestroy: {},
    onEnable: {},
    onDisable: {}
});
//# sourceMappingURL=TestCC.js.map