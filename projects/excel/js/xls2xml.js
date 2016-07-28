var xls2xml = {
    tasks_xml: "",
    localFolders: {},
    localFolderNames: [],
    taskPath: "",
    taskFiles: [],
    taskLoadIndex: -1,
    tasks: [],
    excelDatas: {},

    //初始化
    init: function() {
        $("#task .header a").click(xls2xml.openConfig);
        $("#config-ok").click(xls2xml.onConfigOK);
        $("#config-cancel").click(xls2xml.onConfigCancel);

        N.options.onLoad = xls2xml.startup;
        N.init();
    },

    //启动
    startup: function() {
        xls2xml.loadConfig();
    },

    //加载任务
    loadTasks: function() {
        if (!N.inApp) return;
        var taskPath = N.fspath.join(xls2xml.tasks_xml, "Tasks");
        xls2xml.taskPath = taskPath;
        xls2xml.tasks = [];
        N.dir(taskPath, function(err, files) {
            if (err) {} else {
                // $.queue(document, "N.init", N.options.load);
                xls2xml.taskFiles = files;
                xls2xml.taskLoadIndex = -1;
                for (var i = 0; i < files.length; i++) {
                    $.queue(document, "loadTask", xls2xml.loadTaskFile);
                }
                $.queue(document, "loadTask", xls2xml.renderTaskList);
                $.dequeue(document, "loadTask");
            }
        });
    },

    //读取任务配置
    loadTaskFile: function() {
        xls2xml.taskLoadIndex++;
        if (!N.inApp) {
            $.dequeue(document, "loadTask");
            return;
        }

        var fileName = xls2xml.taskFiles[xls2xml.taskLoadIndex];
        var filePath = N.fspath.join(xls2xml.taskPath, fileName);
        var taskName = fileName.substr(0, fileName.length - 4);

        N.loadFile(filePath, function(err, data) {
            if (err) {} else {
                var nodeRoot = $(data);
                var taskInfo = new TaskInfo(taskName, nodeRoot);
                xls2xml.tasks.push(taskInfo);
            }
            $.dequeue(document, "loadTask");
        });
    },

    //更新界面显示
    renderTaskList: function() {

        $("#taskList>UL>LI").remove();

        var t = "<li><b>{0}</b><i>{1} targets</i><a href=\"javascript:xls2xml.runTask('{0}');\">Run</a></li>";
        for (var i = 0; i < xls2xml.tasks.length; i++) {
            var task = xls2xml.tasks[i];
            var h = T.format(t, task.name, task.files.length);
            $("#taskList>UL").append(h);
        }
        $.dequeue(document, "loadTask");
    },

    //执行任务
    runTask: function(taskName) {
        $("#task").hide();
        $("#progress").show();
        $("#progress > .header").html(taskName);

        $("#progress > UL > LI").remove();

        var currentTask = null;
        for (var i = 0; i < xls2xml.tasks.length; i++) {
            var task = xls2xml.tasks[i];
            if (task.name == taskName) {
                currentTask = task;
                break;
            }
        }
        if (!currentTask) return;

        xls2xml.excelDatas = new Object();
        var progressList = $("#progress > UL");
        var t = "<li id='progress_{1}'>{0}<b class=\"ok\"></b></li>";
        var list = new Array();
        for (var i = 0; i < currentTask.files.length; i++) {
            var taskInfo = currentTask.files[i];
            list.push(T.format(T.format("加载Excel表: {0} @ {1}", taskInfo.table, taskInfo.path)));
            list.push(T.format(T.format("加载Xml文档: {0}", taskInfo.xmlName)));
            list.push(T.format(T.format("修改Xml文档: {0}", taskInfo.xmlPath)));
        }

        for (var i = 0; i < list.length; i++) {
            progressList.append(T.format(t, list[i], i));
        }

        //TODO: 准备动作队列
    },

    //加载配置
    loadConfig: function() {
        if (!N.inApp) {
            // xls2xml.tasks_xml = "/Users/liuqiang/aoeii/Document/02.Design";
            return;
        } else {
            xls2xml.tasks_xml = N.options.get("project");
        }

        //--- 读取 localFolders.xml
        xls2xml.localFolders = {};
        xls2xml.localFolderNames = [];
        var filePath = N.fspath.join(xls2xml.tasks_xml, "localFolders.xml");
        N.loadFile(filePath, function(err, data) {
            if (err) {} else {
                $(data).find("appSettings > add").each(function(index, ele) {
                    var vs = $(ele).attr("value").split("|");
                    for (var i = 0; i < vs.length; i++) {
                        var v = vs[i];
                        xls2xml.localFolderNames.push(v);

                        xls2xml.localFolders[v] = N.options.get(v);
                    }

                    xls2xml.loadTasks();
                });
            }
        });
    },

    //打开配置
    openConfig: function(e) {
        $("#configList>UL").html("");

        xls2xml.addConfigItem("project");

        for (var i = 0; i < xls2xml.localFolderNames.length; i++) {
            xls2xml.addConfigItem(xls2xml.localFolderNames[i]);
        }

        $("#task").hide();
        $("#config").show();
    },

    //添加配置项
    addConfigItem: function(name) {
        var t = "<li id='_option_{0}'><b>{0}</b><i>{1}</i><a href=\"javascript:xls2xml.browsePath('{0}')\">Set</a></li>";
        var v = N.options.get(name);
        if (!v) v = "";
        var h = T.format(t, name, v);
        var target = $("#configList>UL");
        target.append(h);
    },

    //浏览目录
    browsePath: function(name) {
        N.dialog.browseFolder(function(path) {
            var selector = "#_option_" + name + ">I";
            $(selector).text(path);
        });
    },

    //确认选项
    onConfigOK: function() {
        var selector = "#configList>UL>LI";
        var list = $(selector);

        for (var i = 0; i < list.length; i++) {
            var li = list[i];
            var li_id = $(li).attr("id") + "";
            li_id = li_id.replace("_option_", "");

            var v = $("I", li).text();

            N.options.set(li_id, v);
        }

        xls2xml.loadConfig();

        xls2xml.onConfigCancel();
    },

    //取消选项
    onConfigCancel: function() {
        $("#config").hide();
        $("#task").show();
    }
};

//任务信息
function TaskInfo(taskName, nodeRoot) {
    this.name = taskName;
    this.files = new Array();

    var nodeFiles = nodeRoot.find("file");
    for (var i = 0; i < nodeFiles.length; i++) {
        var nodeFile = $(nodeFiles[i]);
        var fileInfo = new TaskFileInfo(nodeFile);
        this.files.push(fileInfo);
    }
};
TaskInfo.prototype.name = "";
TaskInfo.prototype.files = [];
TaskInfo.prototype.toString = function() {
    return JSON.stringify(this);
}

//任务文件信息
function TaskFileInfo(nodeFile) {

    this.key = nodeFile.attr("key");
    this.path = nodeFile.attr("path");
    this.block = nodeFile.attr("block");
    this.table = nodeFile.attr("table");

    var tableSpecIndex = this.table.indexOf("$");
    if (tableSpecIndex > 0) {
        this.table = this.table.substr(0, tableSpecIndex);
    }

    var nodeXmls = nodeFile.find("xml");
    for (var j = 0; j < nodeXmls.length; j++) {
        var nodeXml = $(nodeXmls[j]);
        this.xmlName = nodeXml.attr("name");
        this.xmlPath = nodeXml.attr("xpath");
        this.xmlNode = nodeXml.attr("node");

        var nodeAttributes = nodeXml.find("attribute");
        for (var k = 0; k < nodeAttributes.length; k++) {
            var nodeAttr = $(nodeAttributes[k]);
            var attribData = new TaskAttributeInfo(nodeAttr);

            this.attrs.push(attribData);
        }
    }

};

TaskFileInfo.prototype.key = "";
TaskFileInfo.prototype.path = "";
TaskFileInfo.prototype.block = "";
TaskFileInfo.prototype.table = "";

TaskFileInfo.prototype.attrs = [];
TaskFileInfo.prototype.xmlName = "";
TaskFileInfo.prototype.xmlPath = "";
TaskFileInfo.prototype.xmlNode = "";
TaskFileInfo.prototype.toString = function() {
    return JSON.stringify(this);
};

//系统属性信息
function TaskAttributeInfo(attributeNode) {
    this.name = attributeNode.attr("name");
    this.column = attributeNode.attr("column");
    this.ignempty = attributeNode.attr("ignempty");
};

TaskAttributeInfo.prototype.name = "";
TaskAttributeInfo.prototype.column = "";
TaskAttributeInfo.prototype.ignempty = "";

TaskAttributeInfo.prototype.toString = function() {
    return JSON.stringify(this);
}