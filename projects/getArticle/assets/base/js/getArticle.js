var GA = {
    sites: [],
    currentTask: null,
    init: function () {

        GA.sites.push(new GASetting("d.163.com","div.article-content>h1","#endText","#endText img","gbk"));

        $("#btnGet").click(GA.get);
    },
    getSetting: function(hostname)
    {
        for(var i = 0; i < GA.sites.length; i ++)
        {
            var setting = GA.sites[i];
            if(setting.domain.toLowerCase() == hostname.toLowerCase()) return setting;
        }

        return null;
    },
    get: function (e) {

        GA.clearLog();

        var szurl = $("#txtUrl").val();
        var szdir = $("#txtFolder").val();

        var http = require('http');
        var url = require('url');
        var util = require('util');

        var argUrl = szurl;
        var parsedUrl = url.parse(argUrl, true);

        var setting = GA.getSetting(parsedUrl.hostname);
        if(!setting)
        {
            alert(parsedUrl.hostname + "的站点配置没有找到, 无法抓取!");
            return;
        }

        var task = new GATask(szurl, szdir);
        task.html="";
        task.setting = setting;
        
        GA.currentTask = task;

        var request = require("request");
        var iconv = require("iconv-lite");
        request({
            encoding:null,
            url: szurl
        }, function(error, response, body){
            if(!error && response.statusCode == 200)
            {
                task.html = iconv.decode(body, GA.currentTask.setting.encoding).toString();
                GA.loaded(task.html);
            }
        });

        
        // var options = { host: null, port:-1, path:null, method:"GET"};
        // options.host = parsedUrl.hostname;
        // options.port = parsedUrl.port;
        // options.path = parsedUrl.pathname;
        // if(parsedUrl.search) options.path += "?"+parsedUrl.search;


        // var req = http.request(options, function(res){
        //     util.log("STATUS: " + res.statusCode);
        //     util.log("HEADERS: " + util.inspect(res.headers));
        //     res.setEncoding(null);    //utf8
        //     res.on("data", function(chunk){
        //         // util.log("BODY:" + chunk);
        //         GA.currentTask.html += chunk;
        //     });
        //     res.on("error", function(err){
        //         util.log("RESPONSE ERR:" + err);
        //     });
        //     res.on("end", function(){
        //         util.log(GA.currentTask.html);
        //     });
        // });

        // req.on("error", function(err){
        //     util.log("REQUEST ERR:" + err);
        // });

        
        // req.end();
    }
    ,
    loaded: function (body) {
        var html = $(body);
        var g = $(GA.currentTask.setting.selectorImages,html);

        for(var i = 0; i < g.length; i++)
        {
            GA.download(g[i]);
        }

        var t = $(GA.currentTask.setting.selectorTitle, html).text();

        $("embed",html).remove();
        $("a", html).attr("href", "#");
        $("*", html).removeAttr("class");
        $("img", html).removeAttr("width");
        $("img", html).removeAttr("height");
        $("img", html).removeAttr("style");

        // $("*", html).removeAttr("id");

        
        var d = $(GA.currentTask.setting.selectorDescription, html).html();

       
        
        GA.addLog("<input type='text' value='"+GA.htmlEncode(t)+"'></input>");
        GA.addLog("<textarea>"+ GA.htmlEncode(d) + "</textarea>");
        // console.log(g);
    },
    htmlEncode: function( html ) {
        return document.createElement( 'a' ).appendChild( 
         document.createTextNode( html ) ).parentNode.innerHTML;
    },
    onError: function(){
    },
    clearLog: function(){
        $("#divLog").html("");
    },
    addLog: function(str){
        $("#divLog").append("<li>"+str+"</li>");
    },
    download: function(img){
        var file_url = $(img).attr("src");
        GA.addLog("download: "+ file_url);

        var fs = require("fs");
        var url = require("url");
        var http = require("http");
        var exec = require("child_process").exec;
        var spawn = require("child_process").spawn;

        var download_dir = GA.currentTask.folder;
        var file_name = url.parse(file_url).pathname.split("/").pop();
        var file_path = download_dir + file_name;
        // GA.addLog("save: " + file_path);
        var file = fs.createWriteStream(file_path);
        var curl = spawn("curl", [file_url]);
        curl.stdout.on("data", function(data){
            file.write(data); 
        });
        curl.stdout.on("end", function(data){
            file.end(); 
        });
        curl.on("exit", function(code){
            if(code!=0)
            {
                // GA.addLog("download failed");
            }
            else
            {
                // GA.addLog("download success");
            } 
        });
    }
};

//--------------

function GASetting(szDomain, szSelectorTitle, szSelectorDescription, szSelectorImage, szEncoding) {
    this.domain = szDomain;
    this.selectorTitle = szSelectorTitle;
    this.selectorDescription = szSelectorDescription;
    this.selectorImages = szSelectorImage;
    this.encoding = szEncoding;
};

GASetting.prototype.domain = "";
GASetting.prototype.selectorTitle = "";
GASetting.prototype.selectorDescription = "";
GASetting.prototype.selectorImages = "";
GASetting.prototype.encoding = "";

//--------------

function GATask(szUrl, szFolder) {
    this.url = szUrl;
    this.folder = szFolder;
};

GATask.prototype.url = "";
GATask.prototype.folder = "";
GATask.prototype.html = "";
GATask.prototype.setting = null;
GATask.prototype.toString = function () {
    return "{ " + this.folder + " " + this.url + " }";
};

//--------------

$(document).ready(function () {
    GA.init();
});