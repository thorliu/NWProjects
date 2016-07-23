var u = {
	inited: false
};

//---------------

u.init = function () {
	if (u.inited) return;
	u.inited = true;
	xls2xml.init();


};


//---------------

$(document).ready(u.init);
