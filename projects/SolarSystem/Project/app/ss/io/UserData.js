"use strict";
const AppUtils = require("../utils/AppUtils");
const FileSystem = require("./FileSystem");
var UserData;
(function (UserData) {
    var _data;
    function getFilePath() {
        var basePath = FileSystem.Path.documentsPath;
        var folderName = AppUtils.getName();
        var fileName = "UserData.json";
        if (basePath && folderName && fileName) {
            var ret = FileSystem.Path.combiePath(basePath, folderName);
            ret = FileSystem.Path.combiePath(ret, fileName);
            return ret;
        }
        return null;
    }
    class current {
        static load() {
            try {
                var path = getFilePath();
                var jsonStr = FileSystem.File.loadNow(path);
                _data = JSON.parse(jsonStr);
            }
            catch (err) {
            }
        }
        static save() {
            try {
                var path = getFilePath();
                var folderPath = FileSystem.Path.getDirectory(path);
                FileSystem.File.createDirectory(folderPath);
                var jsonStr = JSON.stringify(_data);
                FileSystem.File.saveNow(path, jsonStr);
            }
            catch (err) {
            }
        }
        static get data() {
            if (!_data)
                _data = {};
            return _data;
        }
    }
    UserData.current = current;
})(UserData || (UserData = {}));
module.exports = UserData;
//# sourceMappingURL=UserData.js.map