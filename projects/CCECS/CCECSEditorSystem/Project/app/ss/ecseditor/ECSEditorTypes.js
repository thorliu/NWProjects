"use strict";
var ECSEditorTypes;
(function (ECSEditorTypes) {
    let HttpRetCodes;
    (function (HttpRetCodes) {
        HttpRetCodes[HttpRetCodes["SUCCESS"] = 0] = "SUCCESS";
        HttpRetCodes[HttpRetCodes["PARAM_ERROR"] = 1] = "PARAM_ERROR";
        HttpRetCodes[HttpRetCodes["UNKNOW_ERROR"] = 999] = "UNKNOW_ERROR";
    })(HttpRetCodes = ECSEditorTypes.HttpRetCodes || (ECSEditorTypes.HttpRetCodes = {}));
})(ECSEditorTypes || (ECSEditorTypes = {}));
module.exports = ECSEditorTypes;
//# sourceMappingURL=ECSEditorTypes.js.map