"use strict";
var Application;
(function (Application) {
    function startUp() {
        window.alert("Application::startUp");
    }
    Application.startUp = startUp;
})(Application || (Application = {}));
Application.startUp();
module.exports = Application;
//# sourceMappingURL=Application.js.map