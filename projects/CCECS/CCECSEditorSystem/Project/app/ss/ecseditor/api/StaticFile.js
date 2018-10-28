"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ECSEditor = require("../ECSEditor");
var fs = require("fs");
class StaticFile extends ECSEditor.ECSEditorServiceAbstract {
    constructor() {
        super();
        this.regex = new RegExp("^/res/");
    }
    check(req, res, next) {
        return this.regex.test(req.url);
    }
    response(req, res, next, mime) {
        super.response(req, res, next, mime);
        var path = req.url;
        path = ECSEditor.getInstance().combie(ECSEditor.getInstance().web, path);
        fs.readFile(path, function (err, data) {
            if (err) {
                res.statusCode = 404;
                res.send("url not found");
            }
            else {
                res.setHeader("Content-Type", mime.lookup(path));
                res.send(data);
            }
        });
    }
}
exports.StaticFile = StaticFile;
//# sourceMappingURL=StaticFile.js.map