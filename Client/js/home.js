$(document).ready(function(){
	var cookie=getCookies();
	if(cookie){
		var name = getNameFromCookie(cookie);
		document.getElementById("login").innerHTML = 
			"Ciao "+name +', <a name="logout" id="logout" onclick="logout()">logout</a>';
	}
	freeze_bet_area(true);
});
