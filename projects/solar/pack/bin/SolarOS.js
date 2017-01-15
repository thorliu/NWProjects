var SolarOS;
(function (SolarOS) {
    var NodeCore = (function () {
        function NodeCore() {
            this._FS = require("fs");
            this._PATH = require("path");
            this._APP = require("electron").remote.app;
            this._ELECTRON = require("electron");
            this._DIALOG = require("electron").remote.dialog;
            this._MENU = require("electron").remote.Menu;
            this._MENU_ITEM = require("electron").remote.MenuItem;
            this._jQuery = require("jQuery");
        }
        Object.defineProperty(NodeCore, "instance", {
            get: function () {
                if (!NodeCore._instance)
                    NodeCore._instance = new SolarOS.NodeCore();
                return NodeCore._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "FS", {
            get: function () { return this._FS; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "PATH", {
            get: function () { return this._PATH; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "APP", {
            get: function () { return this._APP; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "ELECTRON", {
            get: function () { return this._ELECTRON; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "DIALOG", {
            get: function () { return this._DIALOG; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "MENU", {
            get: function () { return this._MENU; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "MENU_ITEM", {
            get: function () { return this._MENU_ITEM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeCore.prototype, "JQuery", {
            get: function () { return this._jQuery; },
            enumerable: true,
            configurable: true
        });
        return NodeCore;
    }());
    NodeCore._instance = null;
    SolarOS.NodeCore = NodeCore;
    var FileSystem = (function () {
        function FileSystem() {
        }
        FileSystem.copy = function (path1, path2) {
            if (NodeCore.instance.FS) { }
            else
                return;
            if (NodeCore.instance.FS.existsSync(path1)) {
                if (NodeCore.instance.FS.statSync(path1).isDirectory()) {
                    FileSystem.copyDirectory(path1, path2);
                }
                else {
                    FileSystem.copyFile(path1, path2);
                }
            }
        };
        FileSystem.copyFile = function (path1, path2) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.createReadStream(path1).pipe(NodeCore.instance.FS.createWriteStream(path2));
                }
                catch (err) {
                }
            }
        };
        FileSystem.copyDirectory = function (path1, path2) {
            if (NodeCore.instance.FS) { }
            else
                return;
            FileSystem.createDirectory(path2);
            var files = new Array();
            if (NodeCore.instance.FS.existsSync(path1)) {
                files = NodeCore.instance.FS.readdirSync(path1);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var curPath = FileSystem.getJoinPath(path1, file);
                    var dstPath = FileSystem.getJoinPath(path2, file);
                    if (NodeCore.instance.FS.statSync(curPath).isDirectory()) {
                        FileSystem.copyDirectory(curPath, dstPath);
                    }
                    else {
                        FileSystem.copyFile(curPath, dstPath);
                    }
                }
            }
        };
        FileSystem.move = function (path1, path2) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.renameSync(path1, path2);
                }
                catch (err) {
                }
            }
        };
        FileSystem.createDirectory = function (path) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.mkdirSync(path);
                }
                catch (err) { }
            }
        };
        FileSystem.list = function (path, callback) {
            if (NodeCore.instance.FS) {
                var ret = NodeCore.instance.FS.readdirSync(path);
                for (var i = 0; i < ret.length; i++) {
                    ret[i] = FileSystem.getJoinPath(path, ret[i]);
                }
                return ret;
            }
            return [];
        };
        FileSystem.stat = function (path) {
            if (NodeCore.instance.FS) {
                try {
                    return NodeCore.instance.FS.statSync(path);
                }
                catch (err) {
                    return null;
                }
            }
            return null;
        };
        FileSystem.del = function (path) {
            if (NodeCore.instance.FS) { }
            else
                return;
            if (NodeCore.instance.FS.existsSync(path)) {
                if (NodeCore.instance.FS.statSync(path).isDirectory()) {
                    FileSystem.deleteDirectory(path);
                }
                else {
                    FileSystem.deleteFile(path);
                }
            }
        };
        FileSystem.deleteFile = function (path) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.unlinkSync(path);
                }
                catch (err) { }
            }
        };
        FileSystem.deleteDirectory = function (path) {
            if (NodeCore.instance.FS) { }
            else
                return;
            var files = new Array();
            if (NodeCore.instance.FS.existsSync(path)) {
                files = NodeCore.instance.FS.readdirSync(path);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var curPath = FileSystem.getJoinPath(path, file);
                    if (NodeCore.instance.FS.statSync(curPath).isDirectory()) {
                        FileSystem.deleteDirectory(curPath);
                    }
                    else {
                        NodeCore.instance.FS.unlinkSync(curPath);
                    }
                }
                NodeCore.instance.FS.rmdirSync(path);
            }
        };
        FileSystem.loadFile = function (path, callback, encoding) {
            if (NodeCore.instance.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.readFile(path, encoding, callback);
            }
            else {
                callback(true, null);
            }
        };
        FileSystem.loadFileNow = function (path, encoding) {
            try {
                return NodeCore.instance.FS.readFileSync(path, encoding);
            }
            catch (err) {
                return null;
            }
        };
        FileSystem.saveFile = function (path, data, callback, encoding) {
            if (NodeCore.instance.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.writeFile(path, data, encoding, callback);
            }
            else {
                callback(true);
            }
        };
        FileSystem.saveFileNow = function (path, data, encoding) {
            try {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.writeFileSync(path, data, encoding);
            }
            catch (err) {
            }
        };
        FileSystem.getDirectory = function (path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.dirname(path);
            }
            return null;
        };
        FileSystem.getFilename = function (path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.basename(path);
            }
            return null;
        };
        FileSystem.getFileType = function (path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.extname(path);
            }
            return null;
        };
        FileSystem.getJoinPath = function (aPath, bPath) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.join(aPath, bPath);
            }
            return null;
        };
        FileSystem.getRefPath = function (aPath, bPath) {
            var a = aPath.split(/[\\\/]/g);
            var b = bPath.split(/[\\\/]/g);
            var c = new Array();
            var check = true;
            for (var i = 0; i < b.length; i++) {
                var bItem = b[i];
                var aItem = null;
                if (i < a.length)
                    aItem = a[i];
                if (aItem != bItem)
                    check = false;
                if (check)
                    continue;
                c.push(bItem);
            }
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.join.apply(null, c);
            }
            return null;
        };
        FileSystem.getAppPath = function () {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getAppPath();
            }
            return null;
        };
        FileSystem.getHomePath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("home");
            else
                return null;
        };
        FileSystem.getAppDataPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("appData");
            else
                return null;
        };
        FileSystem.getUserDataPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("userData");
            else
                return null;
        };
        FileSystem.getTempPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("temp");
            else
                return null;
        };
        FileSystem.getExePath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("exe");
            else
                return null;
        };
        FileSystem.getModulePath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("module");
            else
                return null;
        };
        FileSystem.getDesktopPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("desktop");
            else
                return null;
        };
        FileSystem.getDocumentsPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("documents");
            else
                return null;
        };
        FileSystem.getDownloadPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("downloads");
            else
                return null;
        };
        FileSystem.getMusicPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("music");
            else
                return null;
        };
        FileSystem.getPicturePath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("pictures");
            else
                return null;
        };
        FileSystem.getVideoPath = function () {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("videos");
            else
                return null;
        };
        return FileSystem;
    }());
    SolarOS.FileSystem = FileSystem;
    var Application = (function () {
        function Application() {
        }
        Application.getName = function () {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getName();
            }
            return null;
        };
        Application.getVersion = function () {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getVersion();
            }
            return null;
        };
        Application.getLocale = function () {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getLocale();
            }
            return null;
        };
        Application.addRecentDocument = function (path) {
            if (NodeCore.instance.APP) {
                NodeCore.instance.APP.addRecentDocument(path);
            }
        };
        Application.clearRecentDocuments = function () {
            if (NodeCore.instance.APP) {
                NodeCore.instance.APP.clearRecentDocuments();
            }
        };
        return Application;
    }());
    SolarOS.Application = Application;
    var UserData = (function () {
        function UserData() {
        }
        UserData.init = function () {
            if (SolarOS.UserData.inited)
                return;
            SolarOS.UserData.inited = true;
            SolarOS.UserData.data = new Object();
        };
        UserData.getFilePath = function () {
            var basePath = FileSystem.getDocumentsPath();
            var folderName = Application.getName();
            var fileName = "UserData.json";
            if (basePath && folderName && fileName) {
                var ret = FileSystem.getJoinPath(basePath, folderName);
                ret = FileSystem.getJoinPath(ret, fileName);
                return ret;
            }
            return null;
        };
        UserData.load = function () {
            SolarOS.UserData.init();
            try {
                var jsonStr = FileSystem.loadFileNow(UserData.getFilePath(), null);
                SolarOS.UserData.data = JSON.parse(jsonStr);
            }
            catch (err) {
            }
        };
        UserData.save = function () {
            SolarOS.UserData.init();
            try {
                var userDataPath = UserData.getFilePath();
                var userDataFolderPath = FileSystem.getDirectory(userDataPath);
                FileSystem.createDirectory(userDataFolderPath);
                var jsonStr = JSON.stringify(SolarOS.UserData.data);
                FileSystem.saveFileNow(UserData.getFilePath(), jsonStr, null);
            }
            catch (err) {
            }
        };
        UserData.getValue = function (key, def) {
            SolarOS.UserData.init();
            if (SolarOS.UserData.data) {
                if (SolarOS.UserData.data[key]) {
                    return SolarOS.UserData.data[key];
                }
            }
            return def;
        };
        UserData.setValue = function (key, value) {
            SolarOS.UserData.init();
            SolarOS.UserData.data[key] = value;
        };
        return UserData;
    }());
    SolarOS.UserData = UserData;
    var MessageBoxIcons = (function () {
        function MessageBoxIcons() {
        }
        return MessageBoxIcons;
    }());
    MessageBoxIcons.None = "none";
    MessageBoxIcons.Info = "info";
    MessageBoxIcons.Error = "error";
    MessageBoxIcons.Question = "question";
    MessageBoxIcons.Warning = "warning";
    SolarOS.MessageBoxIcons = MessageBoxIcons;
    var UI = (function () {
        function UI() {
        }
        UI.showOpenFile = function (filters, callback) {
            filters = [
                { name: "json files", extensions: ["json"] }
            ];
            if (NodeCore.instance.DIALOG) {
                NodeCore.instance.DIALOG.showOpenDialog({
                    properties: ["openFile"],
                    filters: filters
                }, callback);
                return;
            }
            callback(null);
        };
        UI.showSaveFile = function (filters, callback) {
            filters = [
                { name: "json files", extensions: ["json"] }
            ];
            if (NodeCore.instance.DIALOG) {
                NodeCore.instance.DIALOG.showSaveDialog({
                    filters: filters
                }, callback);
                return;
            }
            callback(null);
        };
        UI.showErrorBox = function (title, content) {
            if (NodeCore.instance.DIALOG) {
                NodeCore.instance.DIALOG.showErrorBox(title, content);
            }
        };
        UI.showMessageBox = function (title, content, icon, buttons, defaultButtonIndex, cancelButtonIndex, callback) {
            if (NodeCore.instance.DIALOG) {
                NodeCore.instance.DIALOG.showMessageBox({
                    title: title,
                    message: content,
                    type: icon,
                    buttons: buttons,
                    defaultId: defaultButtonIndex,
                    cancelId: cancelButtonIndex
                }, callback);
            }
        };
        UI.showInfoBox = function (title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK"], 0, 0, callback);
        };
        UI.showInfoBox_OK_CANCEL = function (title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK", "Cancel"], 0, 1, callback);
        };
        UI.showInfoBox_YES_NO = function (title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No"], 0, 1, callback);
        };
        UI.showInfoBox_YES_NO_CANCEL = function (title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No", "Cancel"], 0, 2, callback);
        };
        return UI;
    }());
    SolarOS.UI = UI;
})(SolarOS || (SolarOS = {}));
//# sourceMappingURL=SolarOS.js.map