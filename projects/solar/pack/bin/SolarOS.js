var SolarOS;
(function (SolarOS) {
    class NodeCore {
        constructor() {
            this._FS = require("fs");
            this._PATH = require("path");
            this._APP = require("electron").remote.app;
            this._ELECTRON = require("electron");
            this._DIALOG = require("electron").remote.dialog;
            this._MENU = require("electron").remote.Menu;
            this._MENU_ITEM = require("electron").remote.MenuItem;
            this._jQuery = require("jQuery");
        }
        static get instance() {
            if (!NodeCore._instance)
                NodeCore._instance = new SolarOS.NodeCore();
            return NodeCore._instance;
        }
        get FS() { return this._FS; }
        get PATH() { return this._PATH; }
        get APP() { return this._APP; }
        get ELECTRON() { return this._ELECTRON; }
        get DIALOG() { return this._DIALOG; }
        get MENU() { return this._MENU; }
        get MENU_ITEM() { return this._MENU_ITEM; }
        get JQuery() { return this._jQuery; }
    }
    NodeCore._instance = null;
    SolarOS.NodeCore = NodeCore;
    class FileSystem {
        static copy(path1, path2) {
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
        }
        static copyFile(path1, path2) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.createReadStream(path1).pipe(NodeCore.instance.FS.createWriteStream(path2));
                }
                catch (err) {
                }
            }
        }
        static copyDirectory(path1, path2) {
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
        }
        static move(path1, path2) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.renameSync(path1, path2);
                }
                catch (err) {
                }
            }
        }
        static createDirectory(path) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.mkdirSync(path);
                }
                catch (err) { }
            }
        }
        static list(path, callback) {
            if (NodeCore.instance.FS) {
                var ret = NodeCore.instance.FS.readdirSync(path);
                for (var i = 0; i < ret.length; i++) {
                    ret[i] = FileSystem.getJoinPath(path, ret[i]);
                }
                return ret;
            }
            return [];
        }
        static stat(path) {
            if (NodeCore.instance.FS) {
                try {
                    return NodeCore.instance.FS.statSync(path);
                }
                catch (err) {
                    return null;
                }
            }
            return null;
        }
        static del(path) {
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
        }
        static deleteFile(path) {
            if (NodeCore.instance.FS) {
                try {
                    NodeCore.instance.FS.unlinkSync(path);
                }
                catch (err) { }
            }
        }
        static deleteDirectory(path) {
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
        }
        static loadFile(path, callback, encoding) {
            if (NodeCore.instance.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.readFile(path, encoding, callback);
            }
            else {
                callback(true, null);
            }
        }
        static loadFileNow(path, encoding) {
            try {
                return NodeCore.instance.FS.readFileSync(path, encoding);
            }
            catch (err) {
                return null;
            }
        }
        static saveFile(path, data, callback, encoding) {
            if (NodeCore.instance.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.writeFile(path, data, encoding, callback);
            }
            else {
                callback(true);
            }
        }
        static saveFileNow(path, data, encoding) {
            try {
                if (encoding) { }
                else
                    encoding = "utf8";
                NodeCore.instance.FS.writeFileSync(path, data, encoding);
            }
            catch (err) {
            }
        }
        static getDirectory(path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.dirname(path);
            }
            return null;
        }
        static getFilename(path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.basename(path);
            }
            return null;
        }
        static getFileType(path) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.extname(path);
            }
            return null;
        }
        static getJoinPath(aPath, bPath) {
            if (NodeCore.instance.PATH) {
                return NodeCore.instance.PATH.join(aPath, bPath);
            }
            return null;
        }
        static getRefPath(aPath, bPath) {
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
        }
        static getAppPath() {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getAppPath();
            }
            return null;
        }
        static getHomePath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("home");
            else
                return null;
        }
        static getAppDataPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("appData");
            else
                return null;
        }
        static getUserDataPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("userData");
            else
                return null;
        }
        static getTempPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("temp");
            else
                return null;
        }
        static getExePath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("exe");
            else
                return null;
        }
        static getModulePath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("module");
            else
                return null;
        }
        static getDesktopPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("desktop");
            else
                return null;
        }
        static getDocumentsPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("documents");
            else
                return null;
        }
        static getDownloadPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("downloads");
            else
                return null;
        }
        static getMusicPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("music");
            else
                return null;
        }
        static getPicturePath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("pictures");
            else
                return null;
        }
        static getVideoPath() {
            if (NodeCore.instance.APP)
                return NodeCore.instance.APP.getPath("videos");
            else
                return null;
        }
    }
    SolarOS.FileSystem = FileSystem;
    class Application {
        static getName() {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getName();
            }
            return null;
        }
        static getVersion() {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getVersion();
            }
            return null;
        }
        static getLocale() {
            if (NodeCore.instance.APP) {
                return NodeCore.instance.APP.getLocale();
            }
            return null;
        }
        static addRecentDocument(path) {
            if (NodeCore.instance.APP) {
                NodeCore.instance.APP.addRecentDocument(path);
            }
        }
        static clearRecentDocuments() {
            if (NodeCore.instance.APP) {
                NodeCore.instance.APP.clearRecentDocuments();
            }
        }
    }
    SolarOS.Application = Application;
    class UserData {
        static init() {
            if (SolarOS.UserData.inited)
                return;
            SolarOS.UserData.inited = true;
            SolarOS.UserData.data = new Object();
        }
        static getFilePath() {
            var basePath = FileSystem.getDocumentsPath();
            var folderName = Application.getName();
            var fileName = "UserData.json";
            if (basePath && folderName && fileName) {
                var ret = FileSystem.getJoinPath(basePath, folderName);
                ret = FileSystem.getJoinPath(ret, fileName);
                return ret;
            }
            return null;
        }
        static load() {
            SolarOS.UserData.init();
            try {
                var jsonStr = FileSystem.loadFileNow(UserData.getFilePath(), null);
                SolarOS.UserData.data = JSON.parse(jsonStr);
            }
            catch (err) {
            }
        }
        static save() {
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
        }
        static getValue(key, def) {
            SolarOS.UserData.init();
            if (SolarOS.UserData.data) {
                if (SolarOS.UserData.data[key]) {
                    return SolarOS.UserData.data[key];
                }
            }
            return def;
        }
        static setValue(key, value) {
            SolarOS.UserData.init();
            SolarOS.UserData.data[key] = value;
        }
    }
    SolarOS.UserData = UserData;
    class MessageBoxIcons {
    }
    MessageBoxIcons.None = "none";
    MessageBoxIcons.Info = "info";
    MessageBoxIcons.Error = "error";
    MessageBoxIcons.Question = "question";
    MessageBoxIcons.Warning = "warning";
    SolarOS.MessageBoxIcons = MessageBoxIcons;
    class UI {
        static showOpenFile(filters, callback) {
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
        }
        static showSaveFile(filters, callback) {
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
        }
        static showErrorBox(title, content) {
            if (NodeCore.instance.DIALOG) {
                NodeCore.instance.DIALOG.showErrorBox(title, content);
            }
        }
        static showMessageBox(title, content, icon, buttons, defaultButtonIndex, cancelButtonIndex, callback) {
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
        }
        static showInfoBox(title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK"], 0, 0, callback);
        }
        static showInfoBox_OK_CANCEL(title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["OK", "Cancel"], 0, 1, callback);
        }
        static showInfoBox_YES_NO(title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No"], 0, 1, callback);
        }
        static showInfoBox_YES_NO_CANCEL(title, content, callback) {
            UI.showMessageBox(title, content, MessageBoxIcons.Info, ["Yes", "No", "Cancel"], 0, 2, callback);
        }
        static setupMenuBar(...args) {
            var template = null;
            if (args.length == 0) {
                var folder = SolarOS.FileSystem.getAppPath();
                var file = "mods/menus.json";
                var filePath = SolarOS.FileSystem.getJoinPath(folder, file);
                var fileData = SolarOS.FileSystem.loadFileNow(filePath, "utf8");
                template = JSON.parse(fileData);
            }
            else
                template = args[0];
            template = SolarOS.NodeCore.instance.MENU.buildFromTemplate(template);
            if (template)
                SolarOS.NodeCore.instance.MENU.setApplicationMenu(template);
        }
    }
    SolarOS.UI = UI;
})(SolarOS || (SolarOS = {}));
//# sourceMappingURL=SolarOS.js.map