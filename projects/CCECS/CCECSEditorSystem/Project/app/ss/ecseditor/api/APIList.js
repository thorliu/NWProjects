"use strict";
const ECSEditor = require("../ECSEditor");
const APIStageList = require("./APIStageList");
var APIList;
(function (APIList) {
    function init() {
        ECSEditor.getInstance().api.push(new APIStageList.APIStageList());
    }
    APIList.init = init;
})(APIList || (APIList = {}));
module.exports = APIList;
//# sourceMappingURL=APIList.js.map