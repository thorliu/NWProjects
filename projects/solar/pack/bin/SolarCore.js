var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SolarCore;
(function (SolarCore) {
    var CommandType;
    (function (CommandType) {
        CommandType[CommandType["None"] = 0] = "None";
        CommandType[CommandType["Label"] = 1] = "Label";
        CommandType[CommandType["Button"] = 2] = "Button";
    })(CommandType = SolarCore.CommandType || (SolarCore.CommandType = {}));
    var Command = (function () {
        function Command(cKey, cName, cIcon, cType, cData) {
            this.children = new Array();
            this.key = cKey;
            this.name = cName;
            this.icon = cIcon;
            this.data = cData;
            this.type = cType;
        }
        return Command;
    }());
    SolarCore.Command = Command;
    var FileHandler = (function () {
        function FileHandler(fType, fName, loadMethod, saveMethod, importMethod, exportMethod) {
            this._type = fType;
            this._name = fName;
            this._load = loadMethod;
            this._save = saveMethod;
            this._import = importMethod;
            this._export = exportMethod;
        }
        Object.defineProperty(FileHandler.prototype, "type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileHandler.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileHandler.prototype, "load", {
            get: function () { return this._load; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileHandler.prototype, "save", {
            get: function () { return this._save; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileHandler.prototype, "import", {
            get: function () { return this._import; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileHandler.prototype, "export", {
            get: function () { return this._export; },
            enumerable: true,
            configurable: true
        });
        return FileHandler;
    }());
    SolarCore.FileHandler = FileHandler;
    var ModuleAbstract = (function () {
        function ModuleAbstract(modKey, modName, modIcon) {
            this._key = modKey;
            this._name = modName;
            this._icon = modIcon;
            this.onInit();
        }
        ModuleAbstract.prototype.onInit = function () { };
        ModuleAbstract.prototype.onEnter = function () { };
        ModuleAbstract.prototype.onLeave = function () { };
        Object.defineProperty(ModuleAbstract.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModuleAbstract.prototype, "key", {
            get: function () { return this._key; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModuleAbstract.prototype, "icon", {
            get: function () { return this._icon; },
            enumerable: true,
            configurable: true
        });
        return ModuleAbstract;
    }());
    SolarCore.ModuleAbstract = ModuleAbstract;
    var ModuleFileAbstract = (function (_super) {
        __extends(ModuleFileAbstract, _super);
        function ModuleFileAbstract(modKey, modName, modIcon) {
            return _super.call(this, modKey, modName, modIcon) || this;
        }
        return ModuleFileAbstract;
    }(ModuleAbstract));
    SolarCore.ModuleFileAbstract = ModuleFileAbstract;
    var SolarEditor = (function () {
        function SolarEditor() {
            this._modules = new Array();
        }
        Object.defineProperty(SolarEditor, "current", {
            get: function () {
                if (SolarEditor._current) { }
                else {
                    SolarEditor._current = new SolarEditor();
                    SolarUI.Delegate.add("onModuleClick", SolarEditor.current.onModuleClick, SolarEditor._current);
                }
                return SolarEditor._current;
            },
            enumerable: true,
            configurable: true
        });
        SolarEditor.prototype.onModuleClick = function (key) {
            console.log("SolarEditor::onModuleClick", key);
        };
        Object.defineProperty(SolarEditor.prototype, "modules", {
            get: function () {
                return this._modules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SolarEditor.prototype, "currentModule", {
            get: function () {
                return this._currentModule;
            },
            enumerable: true,
            configurable: true
        });
        return SolarEditor;
    }());
    SolarCore.SolarEditor = SolarEditor;
})(SolarCore || (SolarCore = {}));
//# sourceMappingURL=SolarCore.js.map