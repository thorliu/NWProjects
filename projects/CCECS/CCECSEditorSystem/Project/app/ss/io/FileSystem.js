"use strict";
const FS = require("fs");
const PATH = require("path");
const ELECTRON = require("electron");
const APP = ELECTRON.remote.app;
const DIALOG = ELECTRON.remote.dialog;
const MENU = ELECTRON.remote.Menu;
const MENUITEM = ELECTRON.remote.MenuItem;
var FileSystem;
(function (FileSystem) {
    class File {
        static load(path, callback = null) {
            if (FS)
                FS.readFile(path, "utf8", callback);
            else if (callback)
                callback(new Error("FS模块未找到"));
        }
        static save(path, data, callback = null) {
            if (FS)
                FS.writeFile(path, data, "utf8", callback);
            else if (callback)
                callback(new Error("FS模块未找到"));
        }
        static loadNow(path) {
            try {
                return FS.readFileSync(path, "utf8");
            }
            catch (err) {
            }
            return null;
        }
        static loadJson(path) {
            var ret = null;
            try {
                var j = this.loadNow(path);
                ret = JSON.parse(j);
            }
            catch (err) {
            }
            return ret;
        }
        static saveNow(path, data) {
            try {
                FS.writeFile(path, data, "utf8");
            }
            catch (err) {
            }
        }
        static saveJson(path, data) {
            try {
                this.saveNow(path, JSON.stringify(data));
            }
            catch (err) {
            }
        }
        static copy(source, target) {
            if (!FS)
                return;
            if (FS.existsSync(source)) {
                if (FS.statSync(source).isDirectory()) {
                    File.copyDirectory(source, target);
                }
                else {
                    File.copyFile(source, target);
                }
            }
        }
        static copyDirectory(source, target) {
            if (!FS)
                return;
            try {
                File.createDirectory(target);
                var files = [];
                if (FS.existsSync(source)) {
                    files = FS.readdirSync(source);
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var curPath = Path.combiePath(source, file);
                        var dstPath = Path.combiePath(target, file);
                        if (FS.statSync(curPath).isDirectory()) {
                            this.copyDirectory(curPath, dstPath);
                        }
                        else {
                            this.copyFile(curPath, dstPath);
                        }
                    }
                }
            }
            catch (err) {
            }
        }
        static copyFile(source, target) {
            if (!FS)
                return;
            try {
                FS.createReadStream(source).pipe(FS.createWriteStream(target));
            }
            catch (err) {
            }
        }
        static createDirectory(path) {
            if (!FS)
                return;
            try {
                FS.mkdirSync(path);
            }
            catch (err) {
            }
        }
        static move(source, target) {
            if (!FS)
                return;
            FS.renameSync(source, target);
        }
        static list(path) {
            if (FS) {
                var ret = FS.readdirSync(path);
                for (var i = 0; i < ret.length; i++) {
                    ret[i] = Path.combiePath(path, ret[i]);
                }
                return ret;
            }
            return [];
        }
        static getInfo(path) {
            if (FS) {
                try {
                    return FS.statSync(path);
                }
                catch (err) {
                }
            }
            return null;
        }
        static del(path) {
            if (!FS)
                return;
            if (File.isExists(path)) {
                if (File.isDirectory(path)) {
                    File.delDirectory(path);
                }
                else {
                    File.delFile(path);
                }
            }
        }
        static delFile(path) {
            if (!FS)
                return;
            try {
                FS.unlinkSync(path);
            }
            catch (err) {
            }
        }
        static delDirectory(path) {
            if (!FS)
                return;
            var files = [];
            if (File.isExists(path)) {
                files = File.list(path);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var curPath = Path.combiePath(path, file);
                    if (File.isDirectory(curPath)) {
                        File.delDirectory(curPath);
                    }
                    else {
                        File.delFile(curPath);
                    }
                }
                FS.rmdirSync(path);
            }
        }
        static isExists(path) {
            if (FS) {
                return FS.existsSync(path);
            }
            return false;
        }
        static isDirectory(path) {
            if (FS) {
                return FS.statSync(path).isDirectory();
            }
            return false;
        }
    }
    FileSystem.File = File;
    class Path {
        static getDirectory(path) {
            if (PATH)
                return PATH.dirname(path);
            return null;
        }
        static getFilename(path) {
            if (PATH)
                return PATH.basename(path);
            return null;
        }
        static getFileType(path) {
            if (PATH)
                return PATH.extname(path);
            return null;
        }
        static combiePath(a, b) {
            if (PATH)
                return PATH.join(a, b);
            return null;
        }
        static get appPath() { return APP ? APP.getAppPath() : null; }
        static get homePath() { return APP ? APP.getPath("home") : null; }
        static get appDataPath() { return APP ? APP.getPath("appData") : null; }
        static get userDataPath() { return APP ? APP.getPath("userData") : null; }
        static get tempPath() { return APP ? APP.getPath("temp") : null; }
        static get exePath() { return APP ? APP.getPath("exe") : null; }
        static get modulePath() { return APP ? APP.getPath("module") : null; }
        static get desktopPath() { return APP ? APP.getPath("desktop") : null; }
        static get documentsPath() { return APP ? APP.getPath("documents") : null; }
        static get downloadPath() { return APP ? APP.getPath("downloads") : null; }
        static get musicPath() { return APP ? APP.getPath("music") : null; }
        static get picturesPath() { return APP ? APP.getPath("pictures") : null; }
        static get videosPath() { return APP ? APP.getPath("videos") : null; }
    }
    FileSystem.Path = Path;
})(FileSystem || (FileSystem = {}));
window["FileSystem"] = FileSystem;
module.exports = FileSystem;
//# sourceMappingURL=FileSystem.js.map