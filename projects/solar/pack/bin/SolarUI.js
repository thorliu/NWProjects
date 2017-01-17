const $ = require("jQuery");
var SolarUI;
(function (SolarUI) {
    class SolarEditorUI {
        constructor() {
        }
        static get instance() {
            if (!SolarUI.SolarEditorUI._instance)
                SolarUI.SolarEditorUI._instance = new SolarUI.SolarEditorUI();
            return SolarUI.SolarEditorUI._instance;
        }
    }
    SolarUI.SolarEditorUI = SolarEditorUI;
})(SolarUI || (SolarUI = {}));
//# sourceMappingURL=SolarUI.js.map