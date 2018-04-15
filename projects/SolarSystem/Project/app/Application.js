"use strict";
const FileSystem = require("./ss/io/FileSystem");
var Application;
(function (Application) {
    function startUp() {
        FileSystem.File.save("/Users/liuqiang/Documents/temp/temp/test.txt", "Hello 中文", function () {
            debugger;
        });
        FileSystem.File.load("/Users/liuqiang/Documents/temp/temp/CMSModel.cs", function () {
            debugger;
        });
    }
    Application.startUp = startUp;
})(Application || (Application = {}));
Application.startUp();
module.exports = Application;
//# sourceMappingURL=Application.js.map