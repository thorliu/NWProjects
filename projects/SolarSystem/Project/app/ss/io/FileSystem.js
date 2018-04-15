"use strict";
const NodeHack = require("../utils/NodeHack");
const FS = NodeHack.require("fs");
const PATH = NodeHack.require("path");
var FileSystem;
(function (FileSystem) {
    class File {
        static load(path, callback = null) {
            if (FS)
                FS.readFile(path, "utf8", callback);
            else if (callback)
                callback(null);
        }
        static save(path, data, callback = null) {
            if (FS)
                FS.writeFile(path, data, "utf8", callback);
            else if (callback)
                callback(null);
        }
    }
    FileSystem.File = File;
})(FileSystem || (FileSystem = {}));
module.exports = FileSystem;
//# sourceMappingURL=FileSystem.js.map