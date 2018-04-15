//NOTE:  控制台逻辑
if(os && os.onNotify)
{
    os.onNotify.saveScreenPageContentOptionsEx = function (args)
    {
        console.log("saveScreenPageContentOptionsEx", args);
        ScreenPageContent.excelFileName = args.filePath;
        ScreenPageContent.requestData();
    }
}


//NOTE:  主要逻辑
var ScreenPageContent = {
    excelFileName: null,
	onLoad: function ()
	{
	},

	requestData: function ()
	{
        if(!ScreenPageContent.excelFileName) return;

		//加载数据, 并生成每个屏幕页的HTML内容
		ScreenPageContent.pages = [];
        ScreenPageContent.loadFile();
        ScreenPageContent.loadHtmlString();
        console.log('pages',ScreenPageContent.pages)
		//通知APP, 页面内容已经加载就绪
		if (os) os.notify({ cmd: "ScreenPageContentPagesCompleted" });
	},

	pages: [],

    excel: {},
	/**
	 * 每一页的内容放在哪个节点下(JQuery选择器指定)
	 */
	containerSelector: "#screenFg",

    loadFile: function()
    {
        if(!ScreenPageContent.excelFileName) return;

        var fromTo = '';
        var CMresults = os.xlsx.readFile(ScreenPageContent.excelFileName);
        var resultJson = os.xlsx.utils.sheet_to_json(ScreenPageContent.excelFileName);
        for(var sheet in CMresults.Sheets){
            var arr = [];
            if(CMresults.Sheets.hasOwnProperty(sheet)){
                fromTo = CMresults.Sheets[sheet]['!ref'];
                console.log(fromTo);
                arr = os.xlsx.utils.sheet_to_json(CMresults.Sheets[sheet]);
                ScreenPageContent.excel[sheet] = arr;
            }
        }

        console.log('excel',JSON.stringify(ScreenPageContent.excel));
        console.log('cmrsults',CMresults);
    },
    loadHtmlString: function()
    {
        if(!ScreenPageContent.excel) return;

        var map = {};
        var sheet1 = ScreenPageContent.excel['sheet1'];
        for(var key in sheet1[0]){
            switch(key){
                case 'rank':
                    map[key] = '排名 Rank';
                    break;
                case 'no':
                    map[key] = '编号 No.';
                    break;
                case 'player':
                    map[key] = '选手 Player';
                    break;
                case 'tp':
                    map[key] = 'IMP';
                    break;
                case 'mp':
                    map[key] = '比赛分 MP';
                    break;
                default:
                    break;
            }
        }
        
        var table = '', thead = '', tbody = '',tbodyTr = '',th = '', td = '';

        for(var thr in map)
        {
            th += '<div class="th">'+map[thr]+'</div>';
        }
        thead = '<div class="thead"><div class="tr">'+th+'</div></div class="thead">';

        for(var item=0;item<sheet1.length;item++)
        {   
            td = '';
            for(var tdArr in map)
            {
                var rank = sheet1[item]['rank'];
                console.log('nonono',rank);
                if(rank == 1 || rank == 2 || rank == 3) sheet1[item][tdArr] = '';
                console.log('tdarr',sheet1[item][tdArr]);
                td += '<div class="td">'+sheet1[item][tdArr]+'</div>';
                console.log('tdtdtd',td);
            }
            switch(item)
            {
                case 0:
                    tbodyTr += '<div class="first-tr tr">'+td+'</div>';
                    break;
                case 1:
                    tbodyTr += '<div class="second-tr tr">'+td+'</div>';
                    break;
                case 2:
                    tbodyTr += '<div class="third-tr tr">'+td+'</div>';
                    break;
                default:
                    tbodyTr += '<div class="tr">'+td+'</div>';
                    break;                    
            }
            if((item+1)%7 === 0 && item !== 0){
                tbody = '<div class="tobdy">'+tbodyTr+'</div>';
                table = '<div class="table">'+ thead + tbody + '</div>';

                var box = '<div id="contentBg">'+
                                '<div id="content">'+
                                    table+
                                '</div>'+
                        '</div>';
                console.log('box',box);
                ScreenPageContent.pages.push(box);
                tbodyTr = '';
                td = '';
            }
        }
        
    }
};


