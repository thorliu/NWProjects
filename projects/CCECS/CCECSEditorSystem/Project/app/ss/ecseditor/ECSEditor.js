"use strict";
const { app } = require('electron');
const FS = require("fs");
const PATH = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const webServices = express();
const mime = require("mime");
mime.define({
    'text/plain': ['atlas', 'csv', 'json'],
});
var ECSEditor;
(function (ECSEditor) {
    class ECSEditorServiceAbstract {
        request(req, res, next, mime) {
            if (this.check(req, res, next)) {
                this.response(req, res, next, mime);
                return true;
            }
            else {
                return false;
            }
        }
        getAllQuery(req) {
            var ret = req.url.split("/");
            ret.splice(0, 1);
            return ret;
        }
        check(req, res, next) {
            return false;
        }
        response(req, res, next, mime) {
        }
    }
    ECSEditor.ECSEditorServiceAbstract = ECSEditorServiceAbstract;
    class ECSEditorClass {
        constructor() {
            this.web = "";
            this.running = false;
            this.port = 0;
            this.api = [];
        }
        run() {
            if (this.running)
                return;
            this.running = true;
            this.loadConfig();
            this.initAPIs();
        }
        list(path) {
            return FS.readdirSync(path);
        }
        combie(a, b) {
            return PATH.join(a, b);
        }
        loadFile(path) {
            try {
                return FS.readFileSync(path, "utf8");
            }
            catch (err) {
            }
            return null;
        }
        saveFile(path, data) {
            try {
                FS.writeFile(path, data, "utf8");
            }
            catch (err) {
            }
        }
        loadJson(path) {
            try {
                return JSON.parse(this.loadFile(path));
            }
            catch (err) {
                return null;
            }
        }
        saveJson(path, data) {
            try {
                this.saveFile(path, JSON.stringify(data));
            }
            catch (err) { }
        }
        loadConfig() {
            var exePath = app.getAppPath();
            var configPath = PATH.join(exePath, "../app.json");
            var configData = this.loadJson(configPath);
            if (configData) {
                this.port = configData.port;
                this.web = PATH.join(exePath, configData.web);
            }
            console.log(exePath, configData);
        }
        initAPIs() {
            var self = this;
            var handler = (req, res, next) => {
                try {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                    res.header("X-Powered-By", ' 3.2.1');
                    res.header("Content-Type", "text/plain");
                    var matched = false;
                    for (var i = 0; i < self.api.length; i++) {
                        if (self.api[i].request(req, res, next, mime)) {
                            matched = true;
                            break;
                        }
                    }
                    if (!matched) {
                        res.statusCode = 404;
                        res.send("url not found");
                    }
                }
                catch (err) {
                    res.statusCode = 500;
                    res.send('<p>' + err.message + '</p><p>' + err.stack.replace("\n", "<br/>") + '</p>');
                }
            };
            webServices.use(bodyParser.urlencoded({ extended: false }));
            webServices.get("*", handler);
            webServices.post("*", handler);
            this.server = webServices.listen(this.port);
        }
    }
    var instance;
    function getInstance() {
        if (!instance)
            instance = new ECSEditorClass();
        return instance;
    }
    ECSEditor.getInstance = getInstance;
})(ECSEditor || (ECSEditor = {}));
module.exports = ECSEditor;
//# sourceMappingURL=ECSEditor.js.map