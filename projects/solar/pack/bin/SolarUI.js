var $ = require("jQuery");
var SolarUI;
(function (SolarUI) {
    var SolarEditorUI = (function () {
        function SolarEditorUI() {
        }
        Object.defineProperty(SolarEditorUI, "instance", {
            get: function () {
                if (!SolarUI.SolarEditorUI._instance)
                    SolarUI.SolarEditorUI._instance = new SolarUI.SolarEditorUI();
                return SolarUI.SolarEditorUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        return SolarEditorUI;
    }());
    SolarUI.SolarEditorUI = SolarEditorUI;
})(SolarUI || (SolarUI = {}));
//# sourceMappingURL=SolarUI.js.map