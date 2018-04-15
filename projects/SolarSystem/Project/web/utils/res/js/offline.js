var offline = {};

//---------------------------------------------------

offline.testMode = false;

if (offline.testMode) {
	offline.apiBaseUrl = "/test/";
} else {
	offline.apiBaseUrl = Game.Urls.baseURLs.webhost+'/';
	// offline.apiBaseUrl = "http://poker.smzy.cc/";
}
offline.token = function()
{	
	try{
		return NF.user.token;
	}catch(err){}
}
offline.userId = function()
{
	try{
		return NF.user.userId;
	}catch(err){}
}
offline.imgBaseUrl = "http://poker.smzy.cc/";
offline.getLinkHost = function (link) {
	var begin = link.indexOf("://");
	if (begin < 0) return link;
	var end = link.indexOf("/", begin + 3);
	if (end < 0) return link.substr(begin + 3);

	return link.substr(begin + 3, end - begin - 3);
};

//--------------------------------------------------- NOTE: 首页

offline.homePage = {};
offline.homePage.areas = {
	user: "北京,上海,成都,南京".split(","),
	team: "北京,南京,上海,成都".split(",")
};
offline.homePage.templates = {
	matchListGroup: '<h1>{0}</h1><ul>{1}</ul>',
	//个人赛列表项
	matchList1: '<li><a href="detail.html?id={matchId}">' +
		'<h2>{matchName}</h2>' +
		'<h3><span class="svg small white svg-map-marker"></span>{address}</h3>' +
		'<p>{rewordDesc}</p>' +
		'<ul class="media">' +
		'<li><span class="svg small white svg-match-field-cond"></span>{condisionDesc}</li>' +
		'<li><span class="svg small white svg-match-field-player"></span> {currentNum}/{maxNum}</li>' +
		'</ul>' +
		'<div class="time">' +
		'<ul class="media">' +
		'<li>{_startTime_hour}</li>' +
		'<li>:</li>' +
		'<li>{_startTime_minute}</li>' +
		'</ul>' +
		'<div>{city}</div>' +
		'</div></a></li>',
	//战队赛列表项
	matchList2: '<li><a href="list.html?id={matchId}">' +
		'<h2>{matchName}</h2>' +
		'<h3><span class="svg small white svg-map-marker"></span>{address}</h3>' +
		'<p>&nbsp;</p>' +
		'<ul class="media">' +
		'<li>{eventListDesc}</li>' +
		'</ul>' +
		'<div class="time">' +
		'<ul class="media">' +
		'<li>{_startTime_hour}</li>' +
		'<li>:</li>' +
		'<li>{_startTime_minute}</li>' +
		'</ul>' +
		'<div>{city}</div>' +
		'</div></a></li>'
};
offline.homePage.onReady = function (e) {
	//轮播

	//地区
	offline.homePage.initAreas("#homePageUserMatchsAreas", offline.homePage.areas.user, 1);
	offline.homePage.initAreas("#homePageTeamMatchsAreas", offline.homePage.areas.team, 2);
	offline.homePage.initAreasEvent("#homePageUserMatchsAreas>*");
	offline.homePage.initAreasEvent("#homePageTeamMatchsAreas>*");

	fws.navi.setup();


	$("#homeNav>LI").click(offline.homePage.onNaviItemClick);

	//FIXME: 不显示个人赛的内容
	$("#homePageUser").removeClass("selected");
	$("#homePageTeam").addClass("selected");

	offline.homePage.loadMatchs(2, "全部");
};
offline.homePage.initAreas = function (selector, dataAry, flag) {
	var ul = $(selector);
	var template = '<li data-flag="{1}">{0}</li>';
	dataAry.splice(0, 0, "全部");
	var html = "";
	for (var i = 0; i < dataAry.length; i++) {
		html += template.format(dataAry[i], flag);
	}
	ul.html(html);
};
offline.homePage.initAreasEvent = function (selector) {
	$(selector).click(offline.homePage.onAreaItemClick);
};
offline.homePage.onNaviItemClick = function (e) {
	var t = e.currentTarget;
	var flag = parseInt($(t).attr("data-flag"));
	var n = "";

	switch (flag) {
		case 1:
			n = $("#homePageUserMatchsAreas>LI.selected").text();
			break;

		case 2:
			n = $("#homePageTeamMatchsAreas>LI.selected").text();
			break;
	}

	offline.homePage.loadMatchs(flag, n);
};
offline.homePage.onAreaItemClick = function (e) {
	var t = $(e.currentTarget);
	var f = t.attr("data-flag");
	var a = t.text();
	offline.homePage.loadMatchs(parseInt(f), a);
	return false;
};
offline.homePage.loadMatchs = function (flag, area) {
	var url = "";
	switch (flag) {
		case 1:
			url = offline.testMode ? "home.matchs.user.json" : "matchviewport/individual_list";
			break;

		case 2:
			url = offline.testMode ? "home.matchs.team.json" : "matchviewport/match_list";
			break;
	}


	if (area === "全部") area = "";
	url = offline.apiBaseUrl + url + "?city=" + area + "&time=" + new Date().getTime();
	$.get(url, function (data) {
		try {
			data = JSON.parse(data);

			if (data && data.data && data.data.list) {
				offline.homePage.rendeMatchs(flag, data.data.list)
			}
			console.log(data);
		} catch (err) {}
	}, "text");
};
offline.homePage.rendeMatchs = function (flag, data) {
	var render = new Array();
	//数据预处理
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		var startTime = item.startTime.split(" ");
		var startTime_date = startTime[0].split("-");
		var startTime_time = startTime[1].split(":");
		item._startTime_hour = startTime_time[0];
		item._startTime_minute = startTime_time[1];
		var groupName = startTime_date.join(".");

		var groupExist = false;
		var group = null;
		for (var j = 0; j < render.length; j++) {
			group = render[j];
			if (group.name === groupName) {
				groupExist = true;
				break;
			}
		}
		if (!groupExist) {
			group = {
				name: groupName,
				items: []
			};
			render.push(group);
		}

		group.items.push(item);
	}

	console.log(render);

	//---
	var html = "";
	var templateList = offline.homePage.templates["matchList" + flag];
	for (var i = 0; i < render.length; i++) {
		var group = render[i];
		var htmlGroup = "";
		for (var j = 0; j < group.items.length; j++) {
			var item = group.items[j];
			htmlGroup += templateList.formatData(item);
		}
		html += offline.homePage.templates.matchListGroup.format(group.name, htmlGroup);
	}

	switch (flag) {
		case 1:
			$("#homePageUserMatchsList").html(html);
			break;

		case 2:
			$("#homePageTeamMatchsList").html(html);
			break;
	}
};
offline.homePage.init = function () {
	$(document).ready(offline.homePage.onReady);
};

//--------------------------------------------------- NOTE: 战队赛列表页

offline.matchList = {};
offline.matchList.templates = {
	//分赛列表
	listEvent: '<li class="media" onclick=\'javascript:location=\"sub_race_detail.html?matchId={matchId}&eventId={eventId}&eventType={eventType}&eventName={eventName}\"\'>' +
		'<p><span class="svg large white svg-match-event{eventType}"></span></p>' +
		'<p>{eventName}</p>' +
		'<p>{eventStatus_html}</p>' +
		'<p><span class="svg large white svg-menu-arrow"></span></p>' +
		'</li>',

	//分赛状态
	listEventState1: '<span>未开始</span>',
	listEventState2: '<span class="red-fg"><i class="svg large svg-match-state-running" style="margin:0.2rem;vertical-align:middle"></i>进行中</span>',
	listEventState3: '<span class="doc-content-fg">已结束</span>',

	//战队
	teamList: '<li>' +
		'<div><img src="{icon}"></img></div>' +
		'<p>{clubName}</p>' +
		'</li>',

	//直播
	liveList: '<tr>' +
		'<td><span class="flagIcon{icon}"></span>{name}</td>' +
		'<td><a href="{url}" target="_blank">{url_host}</a></td>' +
		'</tr>'

};

offline.matchList.onReady = function (e) {
	offline.matchList.loadDetail();
	$("#categories>li").click(offline.matchList.onCategoryItemClick);
	offline.matchList.loadCategoryData(0);
};
offline.matchList.onCategoryItemClick = function (e) {
	var target = e.currentTarget;
	var type = $(target).attr("data-type");
	offline.matchList.loadCategoryData(parseInt(type));
	return false;
};

offline.matchList.loadCategoryData = function (type) {
	var contents = $("#categoryContentBody>*");
	contents.hide();

	if(type===null || type===undefined)
	{
		type = offline.matchList.prevType;
	}

	offline.matchList.prevType = type;
	$(contents[type]).show();

	switch (type) {
		case 0:
			offline.matchList.loadScores();
			break;

		case 1:
			offline.matchList.loadTeams();
			break;

		case 2:
			offline.matchList.loadLives();
			break;

		case 3:
			offline.matchList.loadReadme();
			break;
	}
	console.log("loadCategoryData", type);
};

//积分
offline.matchList.loadScores = function () {
	var query = T.getQueryData();
	var url = offline.apiBaseUrl + "match.matchs.scores.json";
	if (!offline.testMode) {
		url = offline.apiBaseUrl + "matchviewport/match_team_score";
	}
	url += "?matchId=" + query.id + "&time=" + new Date().getTime();

	$.get(url, function (data)
	{
		// try
		// {
		data = JSON.parse(data);
		if (data && data.data && data.data.list)
		{
			data.data.list = data.data.list.sort(function(a,b){
				if(a.total === b.total) return 0;
				else if(a.total < b.total) return 1;
				else return -1;	
			});
			console.log("data.data.list", data.data.list);

			var roundTotal = 0;
			for (var i = 0; i < data.data.list.length; i++)
			{
				var dataItem = data.data.list[i];
			}

			var html = "";
			for (var i = 0; i < data.data.list.length; i++)
			{
				var dataItem = data.data.list[i];

				if (dataItem.scoreList && dataItem.scoreList.length > roundTotal)
				{
					roundTotal = dataItem.scoreList.length;
				}

				if (i === 0)
				{
					html += '<tr><th>战队</th><th>总分</th>';
					for (var r = 0; r < roundTotal; r++)
					{
						html += '<th>' + (r + 1).toString() + '阶段</th>';
					}
					html += '</tr>';
				}

				html += '<tr>';
				html += '<td>{clubName}</td>'.formatData(dataItem);
				if(dataItem.total === -1){
					dataItem.total = '-';
				}
				html += '<td>{total}</td>'.formatData(dataItem);

				var unfinishIndexList = dataItem.unfinishIndexList;
				var icon = null;
				var maps = {};
				for(var n in unfinishIndexList){
					maps[unfinishIndexList[n]] = 1;
				}
				

				for (var j = 0; j < roundTotal; j++)
				{
					var s = "-";

					if (j < dataItem.scoreList.length)
					{
						if (dataItem.scoreList[j] >= 0 && dataItem.scoreList[j] !== null && dataItem.scoreList[j] !== undefined)
						{
							s = dataItem.scoreList[j].toString();
						}
					}

					if(maps[j]){
						icon = '<i class="svg small svg-match-state-running" style="position:absolute;right:0.6rem;top:50%;transform:translate(3px,-50%) scaleX(-1);transform-origin:center center;"></i>';
					}else{
						icon = '';
					}
				
					html += '<td style="position:relative">{0}{1}</td>'.format(s,icon);

				}
				html += '</tr>';
			}
			// console.log("html", html);
			$("#scoreTable").html(html);
		}
		// } catch (err) { }
	}, "text");
};

//战队
offline.matchList.loadTeams = function () {
	///matchviewport/match_team_list?matchId?=1244323423433
	var query = T.getQueryData();
	var url = offline.apiBaseUrl + "match.teams.json";
	if (!offline.testMode) {
		url = offline.apiBaseUrl + "matchviewport/match_team_list";
	}
	url += "?matchId=" + query.id.toString() + "&time=" + new Date().getTime();

	$.get(url, function (data) {
		try {
			data = JSON.parse(data);
			console.log('战队',data);
			if (data && data.data) {
				var teamsList = $("#teamsList");
				var html = "";
				if (data.data.list) {
					html = offline.matchList.templates.teamList.formatArray(data.data.list);
				}
				teamsList.html(html);
			}
		} catch (err) {}
	}, "text");
};

//直播
offline.matchList.loadLives = function () {
	var query = T.getQueryData();
	var url = offline.apiBaseUrl + "match.lives.json";

	if (!offline.testMode) {
		url = offline.apiBaseUrl + "matchviewport/live_list";
	}

	url += "?matchId=" + query.id + "&time=" + new Date().getTime();

	$.get(url, function (data) {
		try {
			var data = JSON.parse(data);
			console.log('直播',data);
			var html = "<tr><th>平台</th><th>直播网址</th></tr>";
			if (data && data.data) {
				var livesList = $("#livesList");


				if (data.data.list) {
					for (var i = 0; i < data.data.list.length; i++) {
						var item = data.data.list[i];
						
						item.url_host = offline.getLinkHost(item.url);
						if(NFUtils.checkAppVer("1.0.29"))
						{
							//FIXME: 改为新的JRZ://接口, 通知2dx打开专门的浏览窗口
							// item.url = "jrz://...";
						}
					}
					html = offline.matchList.templates.liveList.formatArray(data.data.list);
				}

			}

			livesList.html(html);
		} catch (err) {}
	}, "text");
};

//章程
offline.matchList.loadReadme = function () {
	var query = T.getQueryData();
	var url = offline.apiBaseUrl + "readme.json";

	if (!offline.testMode) {
		url = offline.apiBaseUrl + "matchviewport/charter_info";
	}

	if (!offline.matchList.detailData) return;

	url += "?" + "charterId=" + offline.matchList.detailData.charterId + "&time=" + new Date().getTime();

	$.get(url, function (data) {
		/*
		 
		*/
		try {
			data = JSON.parse(data);
			console.log('章程 ',data);
			if (data && data.data) {
				$("#readme").html(data.data.charterBody);
			}
		} catch (err) {}

	}, "text");
};

//详情
offline.matchList.loadDetail = function () {
	var query = T.getQueryData();
	var url = offline.apiBaseUrl + "match.detail.json";

	if (!offline.testMode) {
		url = offline.apiBaseUrl + "matchviewport/match_info";
	}

	url += "?matchId=" + query.id + "&token=" + offline.token() + "&timer=" + new Date().getTime();

	$.get(url, function (data) {
		try {
			data = JSON.parse(data);
			offline.matchList.detailData = data.data;
			if (data && data.data) {
				offline.matchList.rendeDetail(data.data);
			}
		} catch (err) {}
	}, "text");

};
offline.matchList.rendeDetail = function (data) {
	console.log(data);
	$("#navCenter").text(data.matchName);
	$("#lblInfoAddress").html('<span class="svg small white svg-map-marker"></span>{0}'.format(data.address));
	$("#lblInfoTime").html('<span class="svg small white svg-time"></span>{0}'.format(data.startTime));
	var query = T.getQueryData();
	for (var i = 0; i < data.eventList.length; i++) {
		data.eventList[i].matchId = query.id;
		data.eventList[i].eventStatus_html = offline.matchList.templates["listEventState" + data.eventList[i].eventStatus];
	}
	$("#listEvents").html(offline.matchList.templates.listEvent.formatArray(data.eventList));
	if(location.href.search(/[^_]list.html/)>=0 && data.captain){
		var btn = '';
		if(!$('.leader-btn')[0]){
			if(data.checkin === 1){
				btn = '<div class="leader-btn">'+
						'<a href="set_mem_list.html?matchId='+data.matchId+'&clubId='+data.captain+'&token='+offline.token()+'">安排出战</a>'+
						'<a href="'+offline.apiBaseUrl+'h5app/index.html#/code/image/checkin/'+offline.token()+'/'+data.matchId+'">检录</a>'+
					'</div>';
			}else if(data.checkin === 0){
				btn = '<div class="leader-btn">'+
						'<a href="set_mem_list.html?matchId='+data.matchId+'&clubId='+data.captain+'&token='+offline.token()+'">安排出战</a>'+
					'</div>';
			}
			
			$('#categoryContent').after(btn);
			var btnHeight =  $('.leader-btn').height();
			$("#categoryContent").css("padding-bottom", btnHeight);
		}
	}
	if(location.href.search(/[^_]list.html/)>=0){
		var btn = '';
		if(!$('.leader-btn')[0]){
			if(data.checkin === 1){
				btn = '<div class="leader-btn">'+
						'<a href="'+offline.apiBaseUrl+'h5app/index.html#/code/image/checkin/'+offline.token()+'/'+data.matchId+'">检录</a>'+
					'</div>';
			}else if(data.checkin === 0){
				return;
			}
			
			$('#categoryContent').after(btn);
			var btnHeight =  $('.leader-btn').height();
			$("#categoryContent").css("padding-bottom", btnHeight);
		}
	}

};
offline.matchList.init = function () {
	$(document).ready(offline.matchList.onReady);
};




//分赛详情页面
var SUBRACE = {};
SUBRACE.baseUrl = Game.Urls.baseURLs.webhost;
// SUBRACE.baseUrl = 'http://poker.smzy.cc';
SUBRACE.blindTableUrl = SUBRACE.baseUrl + '/matchviewport/blind_table';
SUBRACE.roundTeamScore = SUBRACE.baseUrl + '/matchviewport/event_team_score';
SUBRACE.subRaceDetail = SUBRACE.baseUrl + '/matchviewport/event_info';
SUBRACE.AlertTableData = SUBRACE.baseUrl + '/matchviewport/event_round_score';
SUBRACE.cardTable = SUBRACE.baseUrl + '/matchviewport/event_table_score';
SUBRACE.targetTime = 0;
SUBRACE.countDownTime = null;
SUBRACE.reAskRaceDetail = null;
SUBRACE.blindId = '';

SUBRACE.matchId = /[\?&]?matchId=(\w+)&?/.exec(location.search) ? /[\?&]?matchId=(\w+)&?/.exec(location.search)[1] : '';
SUBRACE.eventId = /[\?&]?eventId=(\w+)&?/.exec(location.search) ? /[\?&]?eventId=(\w+)&?/.exec(location.search)[1] : '';
SUBRACE.eventName = /[\?&]?eventName=(.+)&?/.exec(location.search) ? decodeURI(/[\?&]?eventName=(.+)&?/.exec(location.search)[1]) : '';
SUBRACE.eventType = /[\?&]?eventType=(\w+)&?/.exec(location.search) ? /[\?&]?eventType=(\w+)&?/.exec(location.search)[1] : '';
SUBRACE.currentEventId = '';
SUBRACE.currentIndex = 0;
SUBRACE.currentLevel = 0;
SUBRACE.currentTime = 0;
SUBRACE.loadBlindMode = true;
SUBRACE.intervalTimes = 0;

SUBRACE.recordTable = [];
SUBRACE.recordTab = null;

SUBRACE.subRaceDetailData = null;
//onit
SUBRACE.onit = function () {
	SUBRACE.loadSubRaceDetail();
	SUBRACE.loadRoundTeamScore();
	SUBRACE.loadCardTable.onit(SUBRACE.eventType);

	SUBRACE.reAskRaceDetail = window.setInterval(function ()
	{
		SUBRACE.loadSubRaceDetail();
		SUBRACE.loadRoundTeamScore();
		SUBRACE.loadCardTable.onit(SUBRACE.eventType);
		SUBRACE.intervalTimes++;
	}, 5000);
	$('#navLeft').click(function () {
		// location = SUBRACE.baseUrl + '/h5app/#/client/raceList/'+SUBRACE.matchId;
		history.go(-1);
	})
}


//加载战队赛单项赛详情
SUBRACE.loadSubRaceDetail = function ()
{
	$('.left-info .race-type').text(SUBRACE.eventName);
	$.ajax({
		type: 'GET',
		url: SUBRACE.subRaceDetail,
		data: {
			matchId: SUBRACE.matchId,
			eventId: SUBRACE.eventId
		},
		success: function (result) {
			console.log('详情数据', result);
			console.log('111111', result.data.currentTime);
			var data = result.data;
			if(!SUBRACE.subRaceDetailData){
				doSubRaceDetail(data);
			}
			SUBRACE.subRaceDetailData = data;
			//缓存数据
			SUBRACE.blindId = data.blindId;
			SUBRACE.currentEventId = data.currentEventId;
			SUBRACE.currentIndex = data.currentIndex;
			SUBRACE.currentLevel = data.currentLevel;
			if(!SUBRACE.currentTime){
				SUBRACE.currentTime = data.currentTime;
			}
			if(!SUBRACE.targetTime){

				SUBRACE.targetTime = new Date().getTime() + data.currentTime * 1000;
			}

		},
		complete: function () {
			if(SUBRACE.intervalTimes<1){
				var navHeight = $(".nav-detail").height();
				$("#categoryContent").css({
					"position": 'relative',
					'top': navHeight,
					'bottom': 0
				});
			}
			console.log(SUBRACE.currentEventId === SUBRACE.eventId);
			if (SUBRACE.currentEventId === SUBRACE.eventId) {
				$('#blindTable tr:not(:first)').eq(SUBRACE.currentIndex).addClass('highlight').siblings().removeClass('highlight');
			}
			if (SUBRACE.loadBlindMode) {
				SUBRACE.loadDataBlindTable();
			} else {
				return;
			}
		}
	});
}

SUBRACE.doInterval = setInterval(function () {
	if (SUBRACE.subRaceDetailData) {
		doSubRaceDetail(SUBRACE.subRaceDetailData);
	} else {
		return;
	}
}, 100);

function doSubRaceDetail(data) {
	$('#navCenter').text(data.matchName);
	$('.left-info .race-round .round-num').text(data.currentRoundId);
	$('.left-info .race-round .all-round-num').text(data.totalRound);
	var currentAnte = data.currentAnte;
	var currentSB = data.currentSB;
	var currentBB = data.currentBB;
	var nextAnte = data.nextAnte;
	var nextSB = data.nextSB;
	var nextBB = data.nextBB;
	if (!data.nextLevel) {
		nextAnte = '-';
		nextSB = '-';
		nextBB = '-';
	}
	$('.blind-detail .ante>h1').text(currentAnte || '0');
	$('.blind-detail .blind>h1>span.sb').text(currentSB || '0');
	$('.blind-detail .blind>h1>span.bb').text(currentBB || '0');
	$('.blind-detail .next-blind>h1>span.next-sb').text(nextSB);
	$('.blind-detail .next-blind>h1>span.next-bb').text(nextBB);
	$('.blind-detail .next-blind>h1>span.next-ante').text(nextAnte);

	$('.right-info .current-level').text(data.currentLevel);
	

	if (data.restLevel) {
		var restTime = parseInt(data.restTime / 60);
		$('.level-rest-end').html('第<span class="white-fg">' + data.restLevel + '</span>级别结束后休息<span class="white-fg">' + restTime + '</span>分钟');
		// $('.right-info .level-rest').html('休息<span class="white-fg">' + restTime + '</span>分钟');
	} else {
		$('.level-rest-end').html('&nbsp;');
		// $('.right-info .level-rest').html('');
	}

	if (data.eventStatus === 1) { //比赛未开始
		SUBRACE.targetTime = 0;
		$('.no-start').removeClass('hidden').siblings().addClass('hidden');
		$('.no-start').find('h2').text('比赛尚未开始..');
	} else if (data.eventStatus === 2) { //比赛进行中

		if (data.blindStatus == 0) { //盲注暂停
			return;
		} else if (data.blindStatus == 1) { //盲注运行
			$('.running').removeClass('hidden').siblings().addClass('hidden');

			var newTime = new Date().getTime() + data.currentTime * 1000;


			if (SUBRACE.currentLevel == data.currentLevel) {
				if (Math.abs(SUBRACE.targetTime - newTime) > 10000) {
					console.log('盲注进行中倒计时:--------')
					console.log('oldtargettime:',SUBRACE.targetTime,'newtargettime:',newTime);
					console.log('差值:',Math.abs(SUBRACE.targetTime - newTime));
					SUBRACE.targetTime = newTime;
				} 
			}else{
				SUBRACE.targetTime = newTime;
			}

			var mytime = countDown(SUBRACE.targetTime);
			$('#countDownTime').text(mytime);
			$('#statusTitle').text('距离下一级别还有');
			if(mytime === '00:00:00'){
				SUBRACE.loadSubRaceDetail();
				SUBRACE.loadRoundTeamScore();
				SUBRACE.loadCardTable.onit(SUBRACE.eventType);
			}
		} else if (data.blindStatus == 2) { //盲注未开始
			SUBRACE.targetTime = 0;
			$('.no-start').removeClass('hidden').siblings().addClass('hidden');
			$('.no-start').find('h2').text('比赛尚未开始..');
		} else if (data.blindStatus == 3) { //盲注休息中
			$('.right-info .current-level').text(data.currentLevel);
			$('.no-start').addClass('hidden').siblings().removeClass('hidden');
			$('#statusTitle').text('休息中');

			var newTime = new Date().getTime() + data.currentTime * 1000
			if (SUBRACE.currentLevel == data.currentLevel) {
				if (Math.abs(SUBRACE.targetTime - newTime) > 10000) {
					console.log('盲注休息中倒计时:--------')
					console.log('oldtargettime:',SUBRACE.targetTime,'newtargettime:',newTime);
					console.log('差值:',Math.abs(SUBRACE.targetTime - newTime));
					SUBRACE.targetTime = newTime;
				} 
			}else{
				SUBRACE.targetTime = newTime;
			}
			var mytime = countDown(SUBRACE.targetTime);
			$('#countDownTime').text(mytime);
			if(mytime === '00:00:00'){
				SUBRACE.loadSubRaceDetail();
				SUBRACE.loadRoundTeamScore();
				SUBRACE.loadCardTable.onit(SUBRACE.eventType);
			}
		}
	} else if (data.eventStatus === 3) { //比赛已结束
		$('.no-start').addClass('hidden').siblings().removeClass('hidden');
		$('#statusTitle').text('已结束');

		$('#countDownTime').text('00:00:00');
		if (!data.nextLevel) {
			nextAnte = '-';
			nextSB = '-';
			nextBB = '-';
		}
		$('.blind-detail .ante>h1').text('-');
		$('.blind-detail .blind>h1>span.sb').text('-');
		$('.blind-detail .blind>h1>span.bb').text('-');
		$('.blind-detail .next-blind>h1>span.next-sb').text('-');
		$('.blind-detail .next-blind>h1>span.next-bb').text('-');
		$('.blind-detail .next-blind>h1>span.next-ante').text('-');
		$('.right-info .current-level').text('-');
	}
}

//加载盲注表
SUBRACE.loadDataBlindTable = function ()
{
	$.ajax({
		type: 'GET',
		data: {
			blindId: SUBRACE.blindId
		},
		url: SUBRACE.blindTableUrl,
		success: function (result) {
			console.log('盲注表', result);
			var data = result.data;
			var tr = '';
			tr = '<tr>' +
				'<th>级别</th>' +
				'<th>前注</th>' +
				'<th>盲注</th>' +
				'<th>时间</th>' +
				'</tr>';
			$.each(data.list, function (i, v) {
				var td = '';
				var minute = v.time / 60 ? parseInt(v.time / 60) + '\'' : '';
				var second = v.time % 60 ? parseInt(v.time % 60) + '\'\'' : '';
				if (v.level != -1) {
					td = '<td>' + v.level + '</td>' +
						'<td>' + v.ante + '</td>' +
						'<td>' + v.sb + '/' + v.bb + '</td>' +
						'<td>' + minute + second + '</td>';
				} else {
					minute = /(\d+)?'/.exec(minute) ? /(\d+)?'/.exec(minute)[1] + '分钟' : '';
					second = /(\d+)?''/.exec(second) ? /(\d+)?''/.exec(second)[1] + '秒' : '';
					td = '<td colspan="4">休息' + minute + second + '</td>';
				}
				tr += '<tr>' + td + '</tr>';
			});
			$('#blindTable').html(tr);
			
			if (SUBRACE.blindId) {
				SUBRACE.loadBlindMode = false;
			}
		}
	});
}

//加载单项赛积分表
SUBRACE.loadRoundTeamScore = function () {

	$.ajax({
		type: 'GET',
		url: SUBRACE.roundTeamScore,
		data: { matchId: SUBRACE.matchId, eventId: SUBRACE.eventId },
		success: function (result)
		{
			console.log('积分表', result);
			var data = result.data;
			var thead = '';
			var tbody = '';
			var th = '';

			th = '<th>战队</th>' +
				'<th>总分</th>';
			for (var i = 1; i <= data.roundNum; i++) {
				th += '<th>第' + i + '轮</th>';
			}
			thead = '<thead>' +
				'<tr>' + th + '</tr>' +
				'</thead>';
			$('#teamScoreTable>thead>tr').html(th);
			var tr = '';
			$.each(data.list, function (j, k) {
				var trH = '';
				var trF = '</tr>';
				var td = '';
				var total = k.total === -1 ? '-' : k.total;
				var unfinishIndexList = k.unfinishIndexList;
				var icon = null;
				trH = '<tr data-clubid="' + k.clubId + '">' +
					'<td>' + k.clubName + '</td>' +
					'<td>' + total + '</td>';
				for (var n = 0; n < data.roundNum; n++) {
					var score = k.scoreList[n];
					score = score !== -1 ? score : '-';
					if (score === '-') {
						td += '<td>' + score + '</td>';
					} else {
						var maps = {};
						for(var q in unfinishIndexList){
							maps[unfinishIndexList[q]] = 1;
						}
						if(maps[n]){
							icon = '<i class="svg small svg-match-state-running" style="position:absolute;right:1rem;top:50%;transform:translate(3px,-50%) scaleX(-1);transform-origin:center center;"></i>';
						}else{
							icon = '';
						}
						td += '<td data-round="' + (n + 1) + '"style="position:relative">' + score + icon + '</td>';
					}
				}
				tr += trH + td + trF;
			});
			tbody = '<tbody>' + tr + '</tbody>';
			$('#teamScoreTable').html(thead + tbody);
		},
		complete: function () {
			$('#teamScoreTable').unbind('click');
			clickScore();
		}
	});

}

function clickScore() {
	//点击单场比赛
	$('#teamScoreTable').on('click', 'tbody td[data-round]', function (e)
	{
		var clubId = $(this).parent().attr('data-clubid');
		var round = $(this).attr('data-round');
		fws.popuper.show('#dialogTest');
		switch (SUBRACE.eventType)
		{
			case '1':
				ALERTTABLE.addSNG(clubId, round);
				break;
			case '2':
				ALERTTABLE.addDT(clubId, round);
				break;
			case '3':
				ALERTTABLE.addDT(clubId, round);
				break;
			case '4':
				ALERTTABLE.addHuntSNG(clubId, round);
				break;
			default:
				break;
		}
	});
}


//倒计时
function countDown(time) {
	console.log('目标时间:',time);
	var mytime = "".formatTime( (time/1000 - new Date().getTime()/1000) );
	console.log('处理后时间:',mytime);
	return mytime;
}



//表格弹出
var ALERTTABLE = {};
//sng猎人
ALERTTABLE.addHuntSNG = function (clubId, round) {
	$('#dialogTest').html('');
	var tableDomObj = '';
	var title = '';
	tableDomObj = $('<table class="score-table">' +
		'<thead>' +
		'<tr>' +
		'<th>队员</th>' +
		'<th>桌号</th>' +
		'<th>名次得分</th>' +
		'<th>猎人得分</th>' +
		'<th>总计</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody class="aj-bottom">' +

		'</tbody>' +
		'</table>');
	$.ajax({
		type: 'GET',
		url: SUBRACE.AlertTableData,
		data: { clubId: clubId, roundId: round, matchId: SUBRACE.matchId, eventId: SUBRACE.eventId },
		success: function (result)
		{
			console.log('sng猎人弹框表格:', result);
			var tr = '';
			var data = result.data;
			title = '<h1 class="score-title-alert">' + (data.clubName || '-') + '战队 第' + (data.roundId || '-') + '轮得分</h1>';
			$.each(data.list, function (i, v) {
				var td = '';
				$.each(v.players, function (o, p) {
					td = '<td>' + (p.realName || p.userName)  + '</td>';
				});
				var rankScore = v.rankScore === -1 ? '-' : v.rankScore;
				var huntScore = v.huntScore === -1 ? '-' : v.huntScore;
				var totalScore = v.totalScore === -1 ? '-' : v.totalScore;

				td += '<td>' + v.tableId + '</td>' +
					'<td>' + rankScore + '</td>' +
					'<td>' + huntScore + '</td>' +
					'<td>' + totalScore + '</td>';
				tr += '<tr>' + td + '</tr>';
			});
			tableDomObj.find('tbody').html(tr);
			$('#dialogTest').append(title)
				.append(tableDomObj);
		}
	});
}
//sng
ALERTTABLE.addSNG = function (clubId, round) {
	$('#dialogTest').html('');
	var tableDomObj = '';
	var title = '';
	tableDomObj = $('<table class="score-table">' +
		'<thead>' +
		'<tr>' +
		'<th>队员</th>' +
		'<th>桌号</th>' +
		'<th>名次得分</th>' +
		'<th>总计</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody class="aj-bottom">' +

		'</tbody>' +
		'</table>');
	$.ajax({
		type: 'GET',
		url: SUBRACE.AlertTableData,
		data: { clubId: clubId, roundId: round, matchId: SUBRACE.matchId, eventId: SUBRACE.eventId },
		success: function (result)
		{
			console.log('sng弹框表格:', result);
			var tr = '';
			var data = result.data;
			title = '<h1 class="score-title-alert">' + (data.clubName || '-') + '战队 第' + (data.roundId || '-') + '轮得分</h1>';
			$.each(data.list, function (i, v) {
				var td = '';
				$.each(v.players, function (o, p) {
					td = '<td>' + (p.realName || p.userName) + '</td>';
				});
				var rankScore = v.rankScore === -1 ? '-' : v.rankScore;
				var totalScore = v.totalScore === -1 ? '-' : v.totalScore;
				td += '<td>' + v.tableId + '</td>' +
					'<td>' + rankScore + '</td>' +
					'<td>' + totalScore + '</td>';
				tr += '<tr>' + td + '</tr>';
			});
			tableDomObj.find('tbody').html(tr);
			$('#dialogTest').append(title)
				.append(tableDomObj);
		}
	});
}
//单挑
ALERTTABLE.addDT = function (clubId, round) {
	$('#dialogTest').html('');
	var tableDomObj = '';
	var title = '';
	tableDomObj = $('<table class="score-table">' +
		'<thead>' +
		'<tr>' +
		'<th>队员</th>' +
		'<th>得分</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody>' +

		'</tbody>' +
		'<tfoot>' +

		'</tfoot>' +
		'</table>');
	$.ajax({
		type: 'GET',
		url: SUBRACE.AlertTableData,
		data: { clubId: clubId, roundId: round, matchId: SUBRACE.matchId, eventId: SUBRACE.eventId },
		success: function (result)
		{
			console.log('单挑弹框表格:', result);
			var tr = '';
			var data = result.data;
			title = '<h1 class="score-title-alert">' + (data.clubName || '-') + '战队 第' + (data.roundId || '-') + '轮得分</h1>';
			var foot = '';
			foot = '<tr>' +
				'<td>额外奖励</td>' +
				'<td>' + (data.extraScore || '-') + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>总计</td>' +
				'<td>' + (data.allScore || '-') + '</td>' +
				'</tr>';
			$.each(data.list, function (i, v) {
				var td = '';
				var player = '';
				$.each(v.players, function (o, p) {
					player += '<span>' + (p.realName || p.userName) + '</span>,';
				});
				player = player.replace(/,$/, '');
				var totalScore = v.totalScore === -1 ? '-' : v.totalScore;
				td += '<td>' + player + '</td>' +
					'<td>' + totalScore + '</td>';
				tr += '<tr>' + td + '</tr>';
			});
			tableDomObj.find('tbody').html(tr);
			tableDomObj.find('tfoot').html(foot);
			$('#dialogTest').append(title)
				.append(tableDomObj);
		}
	});
}


//牌桌
SUBRACE.loadCardTable = {
	onit:function(eventType){
		switch (eventType)
		{
			case '1':
				SUBRACE.loadCardTable.load(SUBRACE.loadCardTable.dealSNG);				
				break;
			case '2':
				SUBRACE.loadCardTable.load(SUBRACE.loadCardTable.dealDT);
				break;
			case '3':
				SUBRACE.loadCardTable.load(SUBRACE.loadCardTable.dealDT);
				break;
			case '4':
				SUBRACE.loadCardTable.load(SUBRACE.loadCardTable.dealHuntSNG);
				break;
			default:
				break;
		}
	},
	load:function(callback){
		$.ajax({
			type:'GET',
			url:SUBRACE.cardTable,
			dataType:'text',
			data:{matchId:SUBRACE.matchId,eventId:SUBRACE.eventId},
			success:callback,
			complete:clickCardTable
		});
	},
	dealHuntSNG:function(result){
		try{
			result = JSON.parse(result);
			console.log(result);
			if(result && result.data && result.data.list){
				var data = result.data;
				var table = '';
				var thead = '';
				var th = '';
				var tr = '';
				
				thead = '<thead>'+
							'<tr>'+
								'<th>名次</th>'+
								'<th>参赛者</th>'+
								'<th>座位</th>'+
								'<th>名次分</th>'+
								'<th>猎人分</th>'+
								'<th>总分</th>'+
							'</tr>'+
						'</thead>';
				$.each(data.list,function(i,v){
					var subTr = '';	
					var subTable = '';									
					$.each(v.seats,function(o,p){
						var tableRank = p.scoreInfo.tableRank === -1 ? '-' : p.scoreInfo.tableRank;
						var rankScore = p.scoreInfo.rankScore === -1 ? '-' : p.scoreInfo.rankScore;
						var huntScore = p.scoreInfo.huntScore === -1 ? '-' : p.scoreInfo.huntScore;
						var totalScore = p.scoreInfo.totalScore === -1 ? '-' : p.scoreInfo.totalScore;

						var perTd = '';
						var pName = '';
						$.each(p.players,function(n,m){
							var blueName = '';
							var myUserId = offline.userId();
							if(myUserId == m.userId){
								blueName = 'font-blue';
							}
							pName += '<p class="'+blueName+'">'+(m.realName || m.userName || '')+'</p>'
						});

						var opacity = '';
						if(tableRank !== '-' && tableRank !==1){
							opacity = 'opa';
						}else{
							opacity = '';
						}
						perTd = '<td><img class="team '+opacity+'" src="'+ offline.imgBaseUrl +'icons/teams/'+p.players[0].clubId+'.png'+'"/>'+pName+'</td>'

						
						subTr += '<tr>'+
									'<td>'+tableRank+'</td>'+
									perTd+
									'<td>'+p.seatId+'号位</td>'+
									'<td>'+rankScore+'</td>'+
									'<td>'+huntScore+'</td>'+
									'<td>'+totalScore+'</td>'+
								'</tr>';

					});
					subTable =  '<table>'+subTr+'</table>';
					tr +=   '<tr class="group">'+
								'<td colspan="6">'+v.tableId+'号桌</td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="6">'+subTable+'</td>'+
							'</tr>';
				});
				table = '<table class="data can-row-expanded table1-column-widths">'+thead+'<tbody>'+tr+'</tbody></table>';
				$('#vsTable').html(table);
				if(SUBRACE.recordTable.length === 0){
					$('#vsTable tbody>tr:first').addClass('expand');
				}else{
					$.each(SUBRACE.recordTable,function(i,v){
						$('#vsTable tbody>tr:nth-child('+(v+1)+')').addClass('expand');
					});
				}
			}
		}catch(err){}

	},
	dealSNG:function(result){
		// try{
			result = JSON.parse(result);
			console.log(result);
			if(result && result.data && result.data.list){
				var data = result.data;
				var table = '';
				var thead = '';
				var th = '';
				var tr = '';
				
				thead = '<thead>'+
							'<tr>'+
								'<th>名次</th>'+
								'<th>参赛者</th>'+
								'<th>座位</th>'+
								'<th>总分</th>'+
							'</tr>'+
						'</thead>';
				$.each(data.list,function(i,v){
					var subTr = '';	
					var subTable = '';									
					$.each(v.seats,function(o,p){
						var tableRank = p.scoreInfo.tableRank === -1 ? '-' : p.scoreInfo.tableRank;
						var totalScore = p.scoreInfo.totalScore === -1 ? '-' : p.scoreInfo.totalScore;

						var perTd = '';
						var pName = '';
						$.each(p.players,function(n,m){
							var blueName = '';
							var myUserId = offline.userId();
							if(myUserId == m.userId){
								blueName = 'font-blue';
							}
							pName += '<p class="'+blueName+'">'+(m.realName || m.userName || '')+'</p>'
						});
						var opacity = '';
						if(tableRank !== '-' && tableRank !==1){
							opacity = 'opa';
						}else{
							opacity = '';
						}
						perTd = '<td><img class="team '+opacity+'" src="'+ offline.imgBaseUrl +'icons/teams/'+p.players[0].clubId+'.png'+'"/>'+pName+'</td>'

						
						subTr += '<tr>'+
									'<td>'+tableRank+'</td>'+
									perTd+
									'<td>'+p.seatId+'号位</td>'+
									'<td>'+totalScore+'</td>'+
								'</tr>';

					});
					subTable =  '<table>'+subTr+'</table>';
					tr +=   '<tr class="group">'+
								'<td colspan="6">'+v.tableId+'号桌</td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="6">'+subTable+'</td>'+
							'</tr>';
				});
				table = '<table class="data can-row-expanded table1-column-widths">'+thead+'<tbody>'+tr+'</tbody></table>';
				$('#vsTable').html(table);
				if(SUBRACE.recordTable.length === 0){
					$('#vsTable tbody>tr:first').addClass('expand');
				}else{
					$.each(SUBRACE.recordTable,function(i,v){
						$('#vsTable tbody>tr:nth-child('+(v+1)+')').addClass('expand');
					});
				}
			}
		// }catch(err){}
	},
	dealDT:function(result){
		try{
			result = JSON.parse(result);
			console.log(result);
			if(result && result.data && result.data.list){
				var data = result.data
				var table = '';
				var tr = '';
				$.each(data.list,function(i,v){
					var td1 = '',td2 = '',td3 = '',td4 = '',td5 = '',td6 = '';
					var vs1 = null,vs2 = null;
					var vsScore = null;
					var subTd = '';
					if(v.seats[0] && v.seats[0].scoreInfo){
						vs1 = v.seats[0].scoreInfo.totalScore;
					}
					if(v.seats[1] && v.seats[1].scoreInfo){
						vs2 = v.seats[1].scoreInfo.totalScore;
					}
					if(vs1 === -1 || vs2 === -1){
						vsScore = 'VS';
					}else{
						vsScore = vs1 + ':' + vs2;
					}
					var opacity1 = '',opacity2 = '';
					if(vs1>vs2){
						opacity2 = 'opa';
					}else if(vs1<vs2){
						opacity1 = 'opa';
					}else{
						opacity1 = '';
						opacity2 = '';
					}
					
					td1 = '<td>'+( data.tableMaps[i+1] || ( (i+1) +'号桌' ) )+'</td>';
					td2 = '<td><img class="team '+opacity1+'" src="'+ offline.imgBaseUrl +'icons/teams/'+v.seats[0].players[0].clubId+'.png'+'"/></td>';
					td4 = '<td><div>'+vsScore+'</div></td>';
					td6 = '<td><img class="team '+opacity2+'" src="'+ offline.imgBaseUrl+'icons/teams/'+v.seats[1].players[0].clubId+'.png'+'"/></td>';
					var pName1 = '';
					var pName2 = '';
					$.each(v.seats[0].players,function(o,p){
						var blueName = '';
						var myUserId = offline.userId();
						if(myUserId == p.userId){
							blueName = 'font-blue';
						}
						pName1 += '<p class="'+blueName+'">'+(p.realName || p.userName || '')+'</p>';
					});
					$.each(v.seats[1].players,function(o,p){
						var blueName = '';
						var myUserId = offline.userId();
						if(myUserId == p.userId){
							blueName = 'font-blue';
						}
						pName2 += '<p class="'+blueName+'">'+(p.realName || p.userName || '')+'</p>';
					});
					td3 = '<td>'+pName1+'</td>';
					td5 = '<td>'+pName2+'</td>';
					tr += '<tr>'+td1+td2+td3+td4+td5+td6+'</tr>';
				});
				table = '<table class="nvn">'+tr+'</table>';
				$('#vsTable').html(table);
			}
		}catch(err){}
	}

}

//牌桌展开折叠
function clickCardTable (){
	$("#vsTable table.can-row-expanded tr.group").click(function (e) {
		var t = $(e.currentTarget);
		// t.addClass("expand").siblings(".expand").removeClass("expand");
		// SUBRACE.recordTable = t.index();
		if (t.hasClass("expand")) {
			t.removeClass("expand");
		} else {
			t.addClass("expand");
		}
		SUBRACE.recordTable = [];
		$("#vsTable table.can-row-expanded tr.group").each(function(i,v){
			if($(v).hasClass('expand')){
				SUBRACE.recordTable.push($(v).index());
			}
		});		
	});
}

