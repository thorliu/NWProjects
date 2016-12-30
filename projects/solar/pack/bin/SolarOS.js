var SolarOS;
(function (SolarOS) {
    var FileSystem = (function () {
        function FileSystem() {
        }
        FileSystem.createDirectory = function (path) {
            if (FileSystem.FS) {
                FileSystem.FS.mkdirSync(path);
            }
        };
        FileSystem.list = function (path, callback) {
            if (FileSystem.FS) {
                FileSystem.FS.readdir(path, callback);
            }
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
        FileSystem.saveFile = function (path, data, callback, encoding) {
            if (FileSystem.FS) {
                if (encoding) { }
                else
                    encoding = "utf8";
                FileSystem.FS.writeFile(path, data, callback);
            }
            else {
                callback(true);
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
        return FileSystem;
    }());
    SolarOS.FileSystem = FileSystem;
})(SolarOS || (SolarOS = {}));
//# sourceMappingURL=SolarOS.js.map