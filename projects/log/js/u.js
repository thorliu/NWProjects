var u = {
	inited: false
};

//---------------

u.init = function () {
	if (u.inited) return;
	u.inited = true;


};


//---------------

$(document).ready(u.init);
