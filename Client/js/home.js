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
		var name = getNameFromCookie(cookie);
		document.getElementById("login").innerHTML = 
			"Ciao "+name +', <a name="logout" id="logout" onclick="logout()">logout</a>';
	}
	else {
		freeze_menu();
	}
	freeze_bet_area(true);
});
