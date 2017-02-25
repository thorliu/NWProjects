var SolarEditor;
(function (SolarEditor) {
    class JsonDataFileHandlers {
        constructor() {
        }
        write(data, path) {
            var jsonData = JSON.stringify(data);
            SolarOS.FileSystem.saveFileNow(path, jsonData, null);
            return true;
        }
        read(path) {
            var jsonData = SolarOS.FileSystem.loadFileNow(path, null);
            try {
                return JSON.parse(jsonData);
            }
            catch (err) {
            }
            return null;
        }
    }
    SolarEditor.JsonDataFileHandlers = JsonDataFileHandlers;
    class Module {
        constructor() {
        }
    }
    SolarEditor.Module = Module;
    class Modules {
        constructor() {
            this._mods = new Array();
        }
        static get instance() {
            if (!SolarEditor.Modules._instance) {
                SolarEditor.Modules._instance = new SolarEditor.Modules();
            }
            return SolarEditor.Modules._instance;
        }
        loadMods() {
        }
        startup() {
        }
        get mods() {
            return this._mods;
        }
    }
    SolarEditor.Modules = Modules;
})(SolarEditor || (SolarEditor = {}));
//# sourceMappingURL=SolarEditor.js.map