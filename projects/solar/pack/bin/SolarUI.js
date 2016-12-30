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
            if (Delegate.inited)
                return;
            Delegate.inited = true;
            Delegate.handlers = new Object();
        };
        Delegate.add = function (name, handler, thisObject) {
            Delegate.init();
            if (Delegate.handlers[name]) {
                var exists = false;
                var ary = Delegate.handlers[name];
                for (var i = 0; i < ary.length; i++) {
                    var e = ary[i];
                    if (e.handler == handler && e.thisObject == thisObject) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    var item = new DelegateHandler();
                    item.handler = handler;
                    item.thisObject = thisObject;
                    ary.push(item);
                }
            }
        };
        Delegate.remove = function (name, handler, thisObject) {
            Delegate.init();
            if (Delegate.handlers[name]) {
                var ary = Delegate.handlers[name];
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
            Delegate.init();
            if (Delegate.handlers[name]) {
                delete Delegate.handlers[name];
            }
        };
        Delegate.removeByHandler = function (handler) {
            Delegate.init();
            var names = Object.keys(Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (Delegate.handlers[name]) {
                    var ary = Delegate.handlers[name];
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
            Delegate.init();
            var names = Object.keys(Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (Delegate.handlers[name]) {
                    var ary = Delegate.handlers[name];
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
            Delegate.init();
            var names = Object.keys(Delegate.handlers);
            for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (Delegate.handlers[name]) {
                    delete Delegate.handlers[name];
                }
            }
        };
        Delegate.execute = function (name, args) {
            Delegate.init();
            if (Delegate.handlers[name]) {
                var ary = Delegate.handlers[name];
                for (var i = 0; i < ary.length; i++) {
                    var handler = Delegate.handlers[name];
                    handler.handler.apply(handler.thisObject, args);
                }
            }
        };
        return Delegate;
    }());
    SolarUI.Delegate = Delegate;
})(SolarUI || (SolarUI = {}));
//# sourceMappingURL=SolarUI.js.map