function freeze_menu() {
	document.getElementById("cavalli_entry").removeEventListener("click",loadCavalli);
	document.getElementById("galli_entry").removeEventListener("click",loadGalli);
}

function unfreeze_menu() {
	document.getElementById("cavalli_entry").addEventListener("click",loadCavalli);
	document.getElementById("galli_entry").addEventListener("click",loadGalli);
	
}

function set_user_info_area(cookie) {
	document.getElementById("login_btn").style.display = "none";
		document.getElementById("register_btn").style.display = "none";
		var name = getNameFromCookie(cookie);
		var budget = getBudgetFromCookie(cookie);
		document.getElementById("logged_user_name").innerHTML = 
				"Ciao "+name +', <a name="logout" id="logout" onclick="logout()">logout</a>';
		document.getElementById("logged_user_budget").innerHTML = 
				"Il tuo budget è di &#8364 "+budget;
}

//function that read the url to determine weither we are betting on cavalli or galli
	//returns cavalli/galli or null
function get_Bet_on_subject(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var bet_on = url.searchParams.get("bet_on");
	console.log("bet_on: "+bet_on);
	switch (bet_on) {
		case "cavalli":
		case "galli" :
			return bet_on
		default:
			return null;
	}
}

$(document).ready(function(){
	var url_string = window.location.href;
	var url_base = url_string.split("?")[0];
	if(url_base.includes("index.html")){
		history.pushState(null, null, url_base);
	}

	var cookie=getCookies();
	if(cookie){
		set_user_info_area(cookie);
		unfreeze_menu();
	}
	else {
		freeze_menu();
	}
	freeze_bet_area(true);
});
