var SolarCore;
(function (SolarCore) {
    class FileHandler {
        constructor(fType, fName, loadMethod, saveMethod, importMethod, exportMethod) {
            this._type = fType;
            this._name = fName;
            this._load = loadMethod;
            this._save = saveMethod;
            this._import = importMethod;
            this._export = exportMethod;
        }
        get type() { return this._type; }
        get name() { return this._name; }
        get load() { return this._load; }
        get save() { return this._save; }
        get import() { return this._import; }
        get export() { return this._export; }
    }
    SolarCore.FileHandler = FileHandler;
    class ModuleAbstract {
        constructor(modKey, modName) {
            this._key = modKey;
            this._name = modName;
            this.onInit();
        }
        onInit() { }
        onEnter() { }
        onLeave() { }
        get name() { return this._name; }
        get key() { return this._key; }
    }
    SolarCore.ModuleAbstract = ModuleAbstract;
    class ModuleFileAbstract extends ModuleAbstract {
        constructor(modKey, modName) {
            super(modKey, modName);
        }
    }
    SolarCore.ModuleFileAbstract = ModuleFileAbstract;
    class SolarEditor {
        constructor() {
            this._modules = new Array();
        }
        static get current() {
            if (SolarEditor._current) { }
            else {
                SolarEditor._current = new SolarEditor();
            }
            return SolarEditor._current;
        }
        startup(window) {
        }
        get modules() {
            return this._modules;
        }
    }
    SolarCore.SolarEditor = SolarEditor;
})(SolarCore || (SolarCore = {}));
//# sourceMappingURL=SolarCore.js.map