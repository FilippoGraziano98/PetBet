function setCookie(name,value,days,permanent) {
	if (days) {
		var exp_time = new Date();
		exp_time.setTime(exp_time.getTime() + (days*24*60*60*1000));
		expiration = exp_time.toUTCString();
	}
	var cookie = {[name]:(value || ""), "refreshings":0, "expires":expiration, "path":"/"};
	
	//clears eventual previous cookies
	localStorage.removeItem("PetBet-Cookies");
	sessionStorage.removeItem("PetBet-Cookies");

	if(permanent){//use localStorage
		localStorage.setItem("PetBet-Cookies", JSON.stringify(cookie));
	} else {//use sessionStorage
		sessionStorage.setItem("PetBet-Cookies", JSON.stringify(cookie));
	}
	console.log("localStorage -> "+localStorage.getItem("PetBet-Cookies"));
	console.log("sessionStorage -> "+sessionStorage.getItem("PetBet-Cookies"));
}

function getCookies(){
	console.log("localStorage -> "+localStorage.getItem("PetBet-Cookies"));
	console.log("sessionStorage -> "+sessionStorage.getItem("PetBet-Cookies"));
	//var cookie = JSON.parse(localStorage.getItem("PetBet-Cookies")) || JSON.parse(sessionStorage.getItem("PetBet-Cookies")) || false;
	var cookie = false;
	var permanent = false;
	if(localStorage.getItem("PetBet-Cookies")){
		cookie = JSON.parse(localStorage.getItem("PetBet-Cookies"));
		permanent = true;
	} else if(sessionStorage.getItem("PetBet-Cookies")) {
		cookie = JSON.parse(sessionStorage.getItem("PetBet-Cookies"));
		permanent = false;
	} else {
		cookie = false;
		permanent = false;
	}

	if(cookie){//se ho trovato cookie
		var expiration = Date.parse(getExpirationFromCookie(cookie));
		var current_time = Date.now();
		if(current_time > expiration){//se i cookie sono scaduti, buttali
			localStorage.removeItem("PetBet-Cookies");
			sessionStorage.removeItem("PetBet-Cookies");
			return false;
		} else {//altrimenti rinnova i cookie per un altro giorno!
			return refreshCookie(cookie, permanent);
		}
	}
}

function getNameFromCookie(cookie){
	return cookie['session-id'].split('@')[0].split('_')[0];
}
function getBudgetFromCookie(cookie){
	return cookie['session-id'].split('@')[0].split('_')[1];
}
function getExpirationFromCookie(cookie){
	return cookie['expires'];
}

function refreshCookie(cookie, permanent){
	var new_expiration = new Date();
	new_expiration.setTime(new_expiration.getTime() + (1*24*60*60*1000));
	cookie['expires'] = new_expiration.toUTCString();
	cookie['refreshings']++;
	if(permanent) {
		localStorage.setItem("PetBet-Cookies", JSON.stringify(cookie));
	} else {
		sessionStorage.setItem("PetBet-Cookies", JSON.stringify(cookie));
	}
	return cookie;
}
