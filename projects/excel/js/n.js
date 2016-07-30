/*************
 * Note-Webkit Utils by liuqiang(thor.liu@outlook.com) 2016
 */
var N = {
    inited: false,
    debug: true,

    inApp: (typeof (require) != "undefined"),
    gui: null,
    menubar: null,
    win: null,
    fs: null,
    app: null,
    fspath: null,
    xlsx: null,


    // core
    init: function () {
        if (N.inited) return;
        N.inited = true;

        //-----

        if (!N.inApp) {
            N.options.onLoad();
            return;
        }

        N.gui = N.require("nw.gui");
        N.menubar = new N.gui.Menu({ type: "menubar" });
        N.win = N.gui.Window;
        N.fs = N.require("fs");
        N.app = N.gui.App;
        N.fspath = N.require("path");
        N.xlsx = N.require("XLSX");
        //----

        // if (N.debug) N.win.get().showDevTools();



        $.queue(document, "N.init", N.options.load);
        $.queue(document, "N.init", N.options.onLoad);

        $.dequeue(document, "N.init");
    },
    require: function (src) {
        if (N.inApp) return require(src);
        else return null;
    },
    // app
    appName: function () {
        if (N.inApp) return N.gui.App.manifest.name;
        else return "$appName";
    },
    appVersion: function () {
        if (N.inApp) return N.gui.App.manifest.version;
        else return "0.0.0";
    },
    // ui
    setupMenuBar: function () {
        if (!N.inApp) return;
        N.win.get().menu = N.menubar;
    },
    // file
    loadFile: function (path, callback) { //callback(error, data)
        if (!N.inApp) return;
        N.fs.readFile(path, "utf8", callback);
    },
    saveFile: function (path, data, callback) { //callback(error)
        if (!N.inApp) return;
        N.fs.writeFile(path, data, callback);
    },
    fileStat: function (path, callback) { //callback(err,stats)
        if (!N.inApp) return;
        N.fs.stat(path, callback);
    },
    deleteFile: function (path) {
        //TODO:
    },
    deleteDirectory: function (path) {
        //TODO:
    },
    createDirectory: function (path) {
        //TODO:
    },
    dir: function (path, callback) //callback (err, files)
    {
        if (!N.inApp) return;
        else N.fs.readdir(path, callback);
    }
};

//---user options
N.options = {
    data: {},
    onLoad: function () {

    },
    load: function () {
        if (!N.inApp) return;
        var data = JSON.stringify(N.options.data);
        var file = "options.json";
        var folder = N.app.dataPath + "";
        file = N.fspath.join(folder, file);

        N.loadFile(file, function (err, data) {
            if (err) {

            } else {
                N.options.data = jQuery.parseJSON(data);
                $.dequeue(document, "N.init");
            }
        });
    },
    save: function () {
        if (!N.inApp) return;
        var data = JSON.stringify(N.options.data);
        var file = "options.json";
        var folder = N.app.dataPath + "";
        file = N.fspath.join(folder, file);

        N.saveFile(file, data, function (err) {

        });
    },
    get: function (key) {
        return N.options.data[key];
    },
    set: function (key, value) {
        N.options.data[key] = value;

        if (!N.inApp) return;

        N.options.save();
    }
};

//---dialog
N.dialog = {
    choose: function (selector, callback, type) {
        var chooser = $(selector);

        if (type) {
            chooser.attr("accept", type);
        }
        chooser.unbind("change");
        chooser.change(function (e) {
            var v = $(this).val();
            callback(v);
            $(this).val('');
        });
        chooser.trigger("click");
    },
    openFile: function (callback, type) {
        N.dialog.choose("#dialogOpenFile", callback, type);
    },
    saveFile: function (callback, type) {
        N.dialog.choose("#dialogSaveFile", callback, type);
    },
    browseFolder: function (callback) {
        N.dialog.choose("#dialogBrowseFolder", callback);
    }
};


//---xlsx
N.xlsxFile = {
    load: function (filename) {

        if (!N.inApp) return null;

        try {
            var ret = new Object();
            var workbook = N.xlsx.readFile(filename);

            for (var sheetIndex = 0; sheetIndex < workbook.SheetNames.length; sheetIndex++) {
                var sheetName = workbook.SheetNames[sheetIndex];
                var worksheet = workbook.Sheets[sheetName];
                var obj = N.xlsx.utils.sheet_to_row_object_array(worksheet);

                ret[sheetName] = obj;
            }
            return ret;
        }
        catch (error) {
            return null;
        }
    }
};