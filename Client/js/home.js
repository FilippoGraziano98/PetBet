function freeze_menu() {
	var menu_entries = document.getElementsByClassName("menu");
	for (var i = 0; i < menu_entries.length; i++) {
		console.log("e:"+menu_entries[i].id)
	  menu_entries[i].disabled = true;
	}
}

function unfreeze_menu() {
	var menu_entries = document.getElementsByClassName("menu");
	for (var i = 0; i < menu_entries.length; i++) {
		console.log("e:"+menu_entries[i].id)
	  menu_entries[i].disabled = false;
	}
}

$(document).ready(function(){
	var cookie=getCookies();
	if(cookie){
		document.getElementById("login_btn").style.display = "none";
		document.getElementById("register_btn").style.display = "none";
		var name = getNameFromCookie(cookie);
		var budget = getBudgetFromCookie(cookie);
		document.getElementById("logged_user_name").innerHTML = 
				"Ciao "+name +', <a name="logout" id="logout" onclick="logout()">logout</a>';
		document.getElementById("logged_user_budget").innerHTML = 
				"Il tuo budget è di "+budget;
	}
	else {
		freeze_menu();
	}
	freeze_bet_area(true);
});
