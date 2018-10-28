"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ECSEditor = require("../ECSEditor");
const FS = require("fs");
class APIStageList extends ECSEditor.ECSEditorServiceAbstract {
    constructor() {
        super();
        this.regex = new RegExp("^/api/stages/\\d+$");
        this.fileType = new RegExp("\\.json$");
    }
    check(req, res, next) {
        return this.regex.test(req.url);
    }
    response(req, res, next, mime) {
        super.response(req, res, next, mime);
        var args = this.getAllQuery(req);
        var data = [];
        var ret = {
            code: 1,
            data: data
        };
        if (args.length >= 3) {
            ret.code = 0;
            var path = ECSEditor.getInstance().web;
            path = ECSEditor.getInstance().combie(path, "/res/stages/" + args[2]);
            var files = ECSEditor.getInstance().list(path);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!this.fileType.test(file))
                    continue;
                data.push(file.substr(0, file.length - 5));
            }
        }
        res.send(JSON.stringify(ret));
    }
}
exports.APIStageList = APIStageList;
//# sourceMappingURL=APIStageList.js.map