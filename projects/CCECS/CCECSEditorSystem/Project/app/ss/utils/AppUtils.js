"use strict";
const ELECTRON = require("electron");
const APP = ELECTRON.remote.app;
var AppUtils;
(function (AppUtils) {
    function getName() {
        if (APP) {
            return APP.getName();
        }
        return "";
    }
    AppUtils.getName = getName;
    function getVersion() {
        if (APP) {
            return APP.getVersion();
        }
        return "";
    }
    AppUtils.getVersion = getVersion;
    function getLocale() {
        if (APP) {
            return APP.getLocale();
        }
        return "";
    }
    AppUtils.getLocale = getLocale;
    function addRecentDocument(path) {
        if (APP) {
            APP.addRecentDocument(path);
        }
    }
    AppUtils.addRecentDocument = addRecentDocument;
    function clearRecentDocument() {
        if (APP) {
            APP.clearRecentDocuments();
        }
    }
    AppUtils.clearRecentDocument = clearRecentDocument;
})(AppUtils || (AppUtils = {}));
window["AppUtils"] = AppUtils;
module.exports = AppUtils;
//# sourceMappingURL=AppUtils.js.map