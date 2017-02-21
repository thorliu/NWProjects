var SolarEditor;
(function (SolarEditor) {
    var JsonDataFileHandlers = (function () {
        function JsonDataFileHandlers() {
        }
        JsonDataFileHandlers.prototype.write = function (data, path) {
            var jsonData = JSON.stringify(data);
            SolarOS.FileSystem.saveFileNow(path, jsonData, null);
            return true;
        };
        JsonDataFileHandlers.prototype.read = function (path) {
            var jsonData = SolarOS.FileSystem.loadFileNow(path, null);
            try {
                return JSON.parse(jsonData);
            }
            catch (err) {
            }
            return null;
        };
        return JsonDataFileHandlers;
    }());
    SolarEditor.JsonDataFileHandlers = JsonDataFileHandlers;
    var Module = (function () {
        function Module() {
        }
        return Module;
    }());
    SolarEditor.Module = Module;
    var Modules = (function () {
        function Modules() {
            this._mods = new Array();
        }
        Object.defineProperty(Modules, "instance", {
            get: function () {
                if (!SolarEditor.Modules._instance) {
                    SolarEditor.Modules._instance = new SolarEditor.Modules();
                }
                return SolarEditor.Modules._instance;
            },
            enumerable: true,
            configurable: true
        });
        Modules.prototype.loadMods = function () {
        };
        Modules.prototype.startup = function () {
        };
        Object.defineProperty(Modules.prototype, "mods", {
            get: function () {
                return this._mods;
            },
            enumerable: true,
            configurable: true
        });
        return Modules;
    }());
    SolarEditor.Modules = Modules;
})(SolarEditor || (SolarEditor = {}));
//# sourceMappingURL=SolarEditor.js.map