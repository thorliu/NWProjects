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
                return FileSystem.FS.statSync(path);
            }
            return null;
        };
        FileSystem.deleteFile = function (path) {
            if (FileSystem.FS) {
                FileSystem.FS.unlinkSync(path);
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
        return FileSystem;
    }());
    SolarOS.FileSystem = FileSystem;
})(SolarOS || (SolarOS = {}));
//# sourceMappingURL=SolarOS.js.map