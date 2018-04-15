
if (os)
{
	os.onNotify.saveScreenPageContentOptionsEx = function(args)
	{
		console.log("saveScreenPageContentOptionsEx", args);

		$("#nameLeft").text(args.nf_player_name_left);
		$("#nameRight").text(args.nf_player_name_right);
		$("#numLeft").text(args.nf_player_score_left);
		$("#numRight").text(args.nf_player_score_right);
	}
}
var ScreenPageContent = {};