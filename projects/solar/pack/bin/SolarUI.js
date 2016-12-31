var SolarUI;
(function (SolarUI) {
    var DelegateHandler = (function () {
        function DelegateHandler() {
        }
        return DelegateHandler;
    }());
    SolarUI.DelegateHandler = DelegateHandler;
    var Delegate = (function () {
        function Delegate() {
        }
        Delegate.init = function () {
            if (SolarUI.Delegate.inited)
                return;
            SolarUI.Delegate.inited = true;
            SolarUI.Delegate.handlers = new Object();
        };
        Delegate.add = function (name, handler, thisObject) {
            SolarUI.Delegate.init();
            console.log("Delegate::add", name);
            var ary = null;
            if (SolarUI.Delegate.handlers[name]) {
                var exists = false;
                ary = SolarUI.Delegate.handlers[name];
                for (var i = 0; i < ary.length; i++) {
                    var e = ary[i];
                    if (e.handler == handler && e.thisObject == thisObject) {
                        exists = true;
                        break;
                    }
                }
                if (exists)
                    return;
            }
            else {
                ary = new Array();
                SolarUI.Delegate.handlers[name] = ary;
            }
            var item = new DelegateHandler();
            item.handler = handler;
            item.thisObject = thisObject;
            ary.push(item);
            console.log("Delegate::add push", name);
        };
        Delegate.remove = function (name, handler, thisObject) {
            SolarUI.Delegate.init();
            if (SolarUI.Delegate.handlers[name]) {
                var ary = SolarUI.Delegate.handlers[name];
                for (var i = ary.length - 1; i >= 0; i--) {
                    var e = ary[i];
                    if (e.handler == handler && e.thisObject == thisObject) {
                        ary.splice(i, 1);
                        break;
                    }
                }
            }
        };
        Delegate.removeByName = function (name) {
            SolarUI.Delegate.init();
            if (SolarUI.Delegate.handlers[name]) {
                delete SolarUI.Delegate.handlers[name];
            }
        };
        Delegate.removeByHandler = function (handler) {
            SolarUI.Delegate.init();
            var names = Object.keys(SolarUI.Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (SolarUI.Delegate.handlers[name]) {
                    var ary = SolarUI.Delegate.handlers[name];
                    for (var i = ary.length - 1; i >= 0; i--) {
                        var e = ary[i];
                        if (e.handler == handler) {
                            ary.splice(i, 1);
                        }
                    }
                }
            }
        };
        Delegate.removeByThis = function (thisObject) {
            SolarUI.Delegate.init();
            var names = Object.keys(SolarUI.Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (SolarUI.Delegate.handlers[name]) {
                    var ary = SolarUI.Delegate.handlers[name];
                    for (var i = ary.length - 1; i >= 0; i--) {
                        var e = ary[i];
                        if (e.thisObject == thisObject) {
                            ary.splice(i, 1);
                        }
                    }
                }
            }
        };
        Delegate.removeAll = function () {
            SolarUI.Delegate.init();
            var names = Object.keys(SolarUI.Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (SolarUI.Delegate.handlers[name]) {
                    delete SolarUI.Delegate.handlers[name];
                }
            }
        };
        Delegate.execute = function (name, args) {
            SolarUI.Delegate.init();
            console.log("SolarUI.Delegate.execute:", name, args);
            if (SolarUI.Delegate.handlers[name]) {
                var ary = SolarUI.Delegate.handlers[name];
                for (var i = 0; i < ary.length; i++) {
                    var handler = ary[i];
                    handler.handler.apply(handler.thisObject, args);
                }
            }
        };
        return Delegate;
    }());
    SolarUI.Delegate = Delegate;
})(SolarUI || (SolarUI = {}));
//# sourceMappingURL=SolarUI.js.map