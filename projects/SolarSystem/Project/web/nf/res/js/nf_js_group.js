
// eventId=20427_1499854979378_0
// matchId=20427_1499855011540_1 

// http://mjsq.smzy.cc/matchviewport/event_table_score?matchId=20427_1499855011540_1&eventId=20427_1499854979378_0&time=1499855190047

// http://mjsq.smzy.cc/icons/members/108732.png
// http://mjsq.smzy.cc/icons/members/108732_thumb.png


var ScreenPageContent = {};
ScreenPageContent.init = function ()
{
	$(".wpt-team-side-bg").addClass(ScreenPageContent.query.align);
	$(".wpt-team-members").addClass(ScreenPageContent.query.align);
};

ScreenPageContent.onLoad = function ()
{
	var spc = ScreenPage.current();
	var url = spc.currentContentUrl;
	ScreenPageContent.query = StringUtils.getQueryDataFromUrl(spc.currentContentUrl);
	ScreenPageContent.init();

};

ScreenPageContent.requestData = function ()
{
	var eventId = ScreenPageContent.query.eventId;
	var matchId = ScreenPageContent.query.matchId;

	var apiUrl = Constants.webBaseUrl + "/matchviewport/event_table_score?matchId=" + matchId
		+ "&eventId=" + eventId
		+ "&time=" + new Date().getTime();

	console.log("加载数据, eventId = %s, matchId = %s", eventId, matchId);

	$.get(apiUrl, function (data)
	{
		try
		{
			data = JSON.parse(data);
			var seats = data.data.list[0].seats;

			var index = 0;
			if (ScreenPageContent.query.align === "right")
			{
				index = 1;
			}

			var players = seats[index].players;

			for (var i = 0; i < players.length; i++)
			{
				var player = players[i];
				var name = player.realName || player.userName || player.userId;
				var avatar = Constants.webBaseUrl + "/icons/members/" + player.userId + ".png";
				$("#player" + i.toString() + ">img").attr("src", avatar);
				$("#player" + i.toString() + ">p").text(name);

				if (i == 0)
				{
					$(".teamLogo").attr("src", Constants.webBaseUrl + "/icons/teams/" + player.clubId.toString() + ".png") ;
				}
			}

			console.log("数据结果: ", data);
		}
		catch (err)
		{
		}
	}, "text");


};

ScreenPageContent.pages = [];
ScreenPageContent.containerSelector = "";



if (!os)
{
	$(document).ready(function ()
	{
		ScreenPageContent.onLoad();
		ScreenPageContent.requestData();
	});
}
else
{
	os.onNotify.saveScreenPageContentOptionsEx = function (args)
	{
		for (var i = 0; i < 5; i++)
		{

			var state = args["nf_player_state_" + i.toString()];
			var clsName = "wait";
			if (state)
			{
				clsName = "lose";
			}
			else
			{
				if (i.toString() === args.nf_current_player_index.toString())
				{
					clsName = "cur";
				}
			}
			$("#player" + i.toString()).attr("class", clsName);
		}
	}
}