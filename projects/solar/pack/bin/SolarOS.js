var SolarOS;
(function (SolarOS) {
    var FileSystem = (function () {
        function FileSystem() {
        }
        FileSystem.copy = function (path1, path2) {
            if (FileSystem.FS) { }
            else
                return;
            if (FileSystem.FS.existsSync(path1)) {
                if (FileSystem.FS.statSync(path1).isDirectory()) {
                    FileSystem.copyDirectory(path1, path2);
                }
                else {
                    FileSystem.copyFile(path1, path2);
                }
            }
        };
        FileSystem.copyFile = function (path1, path2) {
            if (FileSystem.FS) {
                try {
                    FileSystem.FS.createReadStream(path1).pipe(FileSystem.FS.createWriteStream(path2));
                }
                catch (err) {
                }
            }
        };
        FileSystem.copyDirectory = function (path1, path2) {
            if (FileSystem.FS) { }
            else
                return;
            FileSystem.createDirectory(path2);
            var files = new Array();
            if (FileSystem.FS.existsSync(path1)) {
                files = FileSystem.FS.readdirSync(path1);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var curPath = FileSystem.getJoinPath(path1, file);
                    var dstPath = FileSystem.getJoinPath(path2, file);
                    if (FileSystem.FS.statSync(curPath).isDirectory()) {
                        FileSystem.copyDirectory(curPath, dstPath);
                    }
                    else {
                        FileSystem.copyFile(curPath, dstPath);
                    }
                }
            }
        };
        FileSystem.move = function (path1, path2) {
            if (FileSystem.FS) {
                try {
                    FileSystem.FS.renameSync(path1, path2);
                }
                catch (err) {
                }
            }
        };
        FileSystem.createDirectory = function (path) {
            if (FileSystem.FS) {
                try {
                    FileSystem.FS.mkdirSync(path);
                }
                catch (err) { }
            }
        };
        FileSystem.list = function (path, callback) {
            if (FileSystem.FS) {
                var ret = FileSystem.FS.readdirSync(path);
                for (var i = 0; i < ret.length; i++) {
                    ret[i] = FileSystem.getJoinPath(path, ret[i]);
                }
                return ret;
            }
            return [];
        };
        FileSystem.stat = function (path) {
            if (FileSystem.FS) {
                try {
                    return FileSystem.FS.statSync(path);
                }
                catch (err) {
                    return null;
                }
            }
            return null;
        };
        FileSystem.del = function (path) {
            if (FileSystem.FS) { }
            else
                return;
            if (FileSystem.FS.existsSync(path)) {
                if (FileSystem.FS.statSync(path).isDirectory()) {
                    FileSystem.deleteDirectory(path);
                }
                else {
                    FileSystem.deleteFile(path);
                }
            }
        };
        FileSystem.deleteFile = function (path) {
            if (FileSystem.FS) {
                try {
                    FileSystem.FS.unlinkSync(path);
                }
                catch (err) { }
            }
        };
        FileSystem.deleteDirectory = function (path) {
            if (FileSystem.FS) { }
            else
                return;
            var files = new Array();
            if (FileSystem.FS.existsSync(path)) {
                files = FileSystem.FS.readdirSync(path);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var curPath = FileSystem.getJoinPath(path, file);
                    if (FileSystem.FS.statSync(curPath).isDirectory()) {
                        FileSystem.deleteDirectory(curPath);
                    }
                    else {
                        FileSystem.FS.unlinkSync(curPath);
                    }
                }
                FileSystem.FS.rmdirSync(path);
            }
        };
        FileSystem.loadFile = function (path, callback, encoding) {
            if (FileSystem.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                FileSystem.FS.readFile(path, encoding, callback);
            }
            else {
                callback(true, null);
            }
        };
        FileSystem.loadFileNow = function (path, encoding) {
            try {
                return FileSystem.FS.readFileSync(path, encoding);
            }
            catch (err) {
                return null;
            }
        };
        FileSystem.saveFile = function (path, data, callback, encoding) {
            if (FileSystem.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                FileSystem.FS.writeFile(path, data, encoding, callback);
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
                FileSystem.FS.writeFileSync(path, data, encoding);
            }
            catch (err) {
            }
        };
        FileSystem.getDirectory = function (path) {
            if (FileSystem.PATH) {
                return FileSystem.PATH.dirname(path);
            }
            return null;
        };
        FileSystem.getFilename = function (path) {
            if (FileSystem.PATH) {
                return FileSystem.PATH.basename(path);
            }
            return null;
        };
        FileSystem.getFileType = function (path) {
            if (FileSystem.PATH) {
                return FileSystem.PATH.extname(path);
            }
            return null;
        };
        FileSystem.getJoinPath = function (aPath, bPath) {
            if (FileSystem.PATH) {
                return FileSystem.PATH.join(aPath, bPath);
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
            if (FileSystem.PATH) {
                return FileSystem.PATH.join.apply(null, c);
            }
            return null;
        };
        FileSystem.getAppPath = function () {
            if (FileSystem.APP) {
                return FileSystem.APP.getAppPath();
            }
            return null;
        };
        FileSystem.getHomePath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("home");
            else
                return null;
        };
        FileSystem.getAppDataPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("appData");
            else
                return null;
        };
        FileSystem.getUserDataPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("userData");
            else
                return null;
        };
        FileSystem.getTempPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("temp");
            else
                return null;
        };
        FileSystem.getExePath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("exe");
            else
                return null;
        };
        FileSystem.getModulePath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("module");
            else
                return null;
        };
        FileSystem.getDesktopPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("desktop");
            else
                return null;
        };
        FileSystem.getDocumentsPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("documents");
            else
                return null;
        };
        FileSystem.getDownloadPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("downloads");
            else
                return null;
        };
        FileSystem.getMusicPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("music");
            else
                return null;
        };
        FileSystem.getPicturePath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("pictures");
            else
                return null;
        };
        FileSystem.getVideoPath = function () {
            if (FileSystem.APP)
                return FileSystem.APP.getPath("videos");
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
            if (FileSystem.APP) {
                return FileSystem.APP.getName();
            }
            return null;
        };
        Application.getVersion = function () {
            if (FileSystem.APP) {
                return FileSystem.APP.getVersion();
            }
            return null;
        };
        Application.getLocale = function () {
            if (FileSystem.APP) {
                return FileSystem.APP.getLocale();
            }
            return null;
        };
        Application.addRecentDocument = function (path) {
            if (FileSystem.APP) {
                FileSystem.APP.addRecentDocument(path);
            }
        };
        Application.clearRecentDocuments = function () {
            if (FileSystem.APP) {
                FileSystem.APP.clearRecentDocuments();
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
            if (UI.DIALOG) {
                UI.DIALOG.showOpenDialog({
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
            if (UI.DIALOG) {
                UI.DIALOG.showSaveDialog({
                    filters: filters
                }, callback);
                return;
            }
            callback(null);
        };
        UI.showErrorBox = function (title, content) {
            if (UI.DIALOG) {
                UI.DIALOG.showErrorBox(title, content);
            }
        };
        UI.showMessageBox = function (title, content, icon, buttons, defaultButtonIndex, cancelButtonIndex, callback) {
            if (UI.DIALOG) {
                UI.DIALOG.showMessageBox({
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