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










var ScreenPageContent = {
    excelFileName: null,
    // basePath:'/Users/mac/workspace/PokerDataService/Tools/ScreenTool/Project/',
	onLoad: function ()
	{
		//测试代码: 显示os对象的日志
		// console.log("test", os);

        
		//测试代码: 弹框显示FileSystem.getAppPath()的返回值
		// if (FileSystem)
		// {
		// 	alert(FileSystem.getAppPath());
		// }
	},

	requestData: function ()
	{
        if(!ScreenPageContent.excelFileName) return;
		//加载数据, 并生成每个屏幕页的HTML内容
		ScreenPageContent.pages = [];
        ScreenPageContent.loadFile();
        ScreenPageContent.loadHtmlString();
        console.log('pages',ScreenPageContent.pages)
		//测试代码: 通知APP, 页面内容已经加载就绪
		if (os) os.notify({ cmd: "ScreenPageContentPagesCompleted" });
	},

	pages: [],

    excel: {},
	/**
	 * 每一页的内容放在哪个节点下(JQuery选择器指定)
	 */
	containerSelector: "#screenFg",


    seatsNum:16,
    loadFile: function()
    {
        if(!ScreenPageContent.excelFileName) return;
        var spc = ScreenPage.current();
        var url = spc.currentContentUrl;
        ScreenPageContent.query = StringUtils.getQueryDataFromUrl(spc.currentContentUrl);
        console.log('query',ScreenPageContent.query);
        ScreenPageContent.seatsNum = parseInt(ScreenPageContent.query.seatNumber);
        if(!ScreenPageContent.seatsNum){
            alert('参数错误');
        }
        
        var fromTo = '';
        var CMseats = os.xlsx.readFile(ScreenPageContent.excelFileName);
        var resultJson = os.xlsx.utils.sheet_to_json(ScreenPageContent.excelFileName);
        for(var sheet in CMseats.Sheets){
            var arr = [];
            if(CMseats.Sheets.hasOwnProperty(sheet)){
                fromTo = CMseats.Sheets[sheet]['!ref'];
                console.log(fromTo);
                arr = os.xlsx.utils.sheet_to_json(CMseats.Sheets[sheet]);
                ScreenPageContent.excel[sheet] = arr;
            }
        }

        console.log('excel',JSON.stringify(ScreenPageContent.excel));
        console.log('cmseats',CMseats);
    },
    loadHtmlString: function()
    {
        var screenTxt = {
            '22':{
                title:'主屏幕',
                txt:'Screen'
            },
            '16':{
                title:'01',
                txt:'Live Broadcast Area'
            }
        }
        var box = '';
        var sheet1 = ScreenPageContent.excel['sheet1'];
        //右侧屏幕示意图
        var rightPic = '';
        if(ScreenPageContent.seatsNum === 16)
        {
            var screenIcon = '<div class="screen-icon'+ScreenPageContent.seatsNum+'">'+
                                    '<div>'+
                                        '<div>'+
                                            '<h3><span class="live-icon-gray"></span><span class="no1-'+ScreenPageContent.seatsNum+'">'+screenTxt[ScreenPageContent.seatsNum].title+'</span></h3>'+
                                            '<p>'+screenTxt[ScreenPageContent.seatsNum].txt+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
        }else{
            var screenIcon = '<div class="screen-icon'+ScreenPageContent.seatsNum+'">'+
                                '<div>'+
                                    '<div>'+
                                        '<h3>'+screenTxt[ScreenPageContent.seatsNum].title+'</span></h3>'+
                                        '<p>'+screenTxt[ScreenPageContent.seatsNum].txt+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
        }
        if(ScreenPageContent.seatsNum === 16)
        {
            var screenIconBox = '<div class="screen-icon-box">'+
                                    '<div class="segment-line">'+
                                        '<span>Table</span>'+
                                    '</div>'+
                                '</div>';
        }else
        {
            var screenIconBox = '<div class="screen-icon-box">'+
                                        screenIcon+
                                    '<div class="segment-line">'+
                                        '<span>Table</span>'+
                                    '</div>'+
                                '</div>';
        }

        
        //左侧表格头
        var leftPic = '';
        var table = '', thead = '', tbody = '',tbodyTr = '', td = '';
        thead = '<thead>'+
                    '<tr>'+
                        '<th>'+
                            '<h4>桌号</h4>'+
                            '<p>table</p>'+
                        '</th>'+
                        '<th>'+
                            '<h4>东</h4>'+
                            '<p>East</p>'+
                        '</th>'+
                        '<th>'+
                            '<h4>南</h4>'+
                            '<p>South</p>'+
                        '</th>'+
                        '<th>'+
                            '<h4>西</h4>'+
                            '<p>West</p>'+
                        '</th>'+
                        '<th>'+
                            '<h4>北</h4>'+
                            '<p>North</p>'+
                        '</th>'+
                    '</tr>'+
                '</thead>';

        //挂excel数据
        var bgNum = 0;
        for(var item=0;item<sheet1.length;item++)
        {   
            bgNum++;
            td = '';
            var noContent = '';
            if(sheet1[item].no == 1){
                noContent = '<span class="live-icon-white"></span>';
            }else{
                noContent = '<span>'+(sheet1[item].no<10 ? '0'+sheet1[item].no : sheet1[item].no)+'</span>';
            }
            tbodyTr += '<tr>'+
                            '<td>'+
                                '<div class="rank-bg bg'+bgNum+'">'+
                                    '<span>'+noContent+'</span>'+
                                '</div>'+
                            '</td>'+
                            '<td>'+
                                '<h5>'+sheet1[item].east_no+'</h5>'+
                                '<p>'+sheet1[item].east_name+'</p>'+
                            '</td>'+
                            '<td>'+
                                '<h5>'+sheet1[item].south_no+'</h5>'+
                                '<p>'+sheet1[item].south_name+'</p>'+
                            '</td>'+
                            '<td>'+
                                '<h5>'+sheet1[item].west_no+'</h5>'+
                                '<p>'+sheet1[item].west_name+'</p>'+
                            '</td>'+
                            '<td>'+
                                '<h5>'+sheet1[item].north_no+'</h5>'+
                                '<p>'+sheet1[item].north_name+'</p>'+
                            '</td>'+
                       '</tr>';
            
            //每页数据字符串 
            var seatBox = '';
            if((item+1)%8 === 0 && item !== 0){
                tbody = '<tbody>'+tbodyTr+'</tbody>';
                table = '<table>'+ thead + tbody + '</table>';

                leftPic = '<div class="content-left">'+
                                table+
                          '</div>';

                //右侧座位图
                var seatIcon = '';
                for(var seat=0; seat<ScreenPageContent.seatsNum;seat++)
                {
                    
                    var seatNum = (seat+1)<10 ? '0'+(seat+1) : (seat+1);
                    if(item < seat)
                    {
                        if(seatNum === '01')
                        {
                            var seatHtml = '<span style="font-size:43px;color:#a9a9a9;">备</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon" style="background-color:transparent;">'+
                                                seatHtml+
                                        '</div>';
                        }else{
                            var seatHtml = '<span>'+seatNum+'</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon opa">'+
                                                seatHtml+
                                        '</div>';
                        }
                        
                    }
                    else if(item-7 > seat)
                    {
                        if(seatNum === '01')
                        {
                            var seatHtml = '<span style="font-size:43px;color:#a9a9a9;">备</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon" style="background-color:transparent;">'+
                                                seatHtml+
                                        '</div>';
                        }else{
                            var seatHtml = '<span>'+seatNum+'</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon opa">'+
                                                seatHtml+
                                        '</div>';
                        }
                        
                    }else
                    {
                        if(seatNum === '01')
                        {
                            var seatHtml = '<span style="font-size:43px;color:#a9a9a9;">备</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon" style="background-color:transparent;">'+
                                                seatHtml+
                                        '</div>';
                        }else{
                            var seatHtml = '<span>'+seatNum+'</span>';
                            seatIcon += '<div class="seat'+ScreenPageContent.seatsNum+'-icon">'+
                                                seatHtml+
                                        '</div>';                            
                        }
                        
                    }
                    
                }
                if(ScreenPageContent.seatsNum === 16)
                {
                    seatBox = '<div class="seat-box">'+screenIcon+seatIcon+'</div>';
                }else
                {
                    seatBox = '<div class="seat-box">'+seatIcon+'</div>';
                }
                var jtEastIcon = '<div class="jt-east-icon">'+
                                    '<b class="east-icon"></b>'+
                                    '<i class="jt-icon"></i>'+
                                '</div>';
                var liveScreen = '<div class="screen-icon16" style="position:absolute;right:20px;bottom:30px;">'+
                                    '<div>'+
                                        '<div>'+
                                            '<h3><span class="live-icon-gray"></span><span class="no1-16">'+screenTxt['16'].title+'</span></h3>'+
                                            '<p>'+screenTxt['16'].txt+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                if(ScreenPageContent.seatsNum === 16)
                {
                    rightPic = '<div class="content-right box16">'+
                                    screenIconBox+
                                    seatBox+
                                    jtEastIcon+
                                '</div>'
                }else
                {
                    rightPic = '<div class="content-right">'+
                                    screenIconBox+
                                    seatBox+
                                    liveScreen+
                                    jtEastIcon+
                                '</div>'
                }
                box = '<div id="contentBg">'+
                            '<div id="content">'+
                                leftPic+rightPic;
                            '</div>'+
                        '</div>';
                console.log('box',box);
                ScreenPageContent.pages.push(box);
                tbodyTr = '';
                td = '';
                bgNum = 0;
            }
        }
        
    }
};