"use strict";
const FileSystem = require("./ss/io/FileSystem");
var Application;
(function (Application) {
    function startUp() {
        FileSystem.File.copy("/Users/liuqiang/Documents/temp/temp/test", "/Users/liuqiang/Documents/temp/temp/test2");
    }
    Application.startUp = startUp;
})(Application || (Application = {}));
Application.startUp();
module.exports = Application;
//# sourceMappingURL=Application.js.map