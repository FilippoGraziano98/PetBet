function setCookie(name,value,days,permanent) {
	if (days) {
		var exp_time = new Date();
		exp_time.setTime(exp_time.getTime() + (days*24*60*60*1000));
		expiration = exp_time.toUTCString();
	}
	var cookie = {[name]:(value || ""), "refreshings":0, "expires":expiration, "path":"/"};
	
	//clears eventual previous cookies
	localStorage.removeItem("PetBetCookies");
	sessionStorage.removeItem("PetBetCookies");

	if(permanent){//use localStorage
		localStorage.setItem("PetBetCookies", JSON.stringify(cookie));
	} else {//use sessionStorage
		sessionStorage.setItem("PetBetCookies", JSON.stringify(cookie));
	}
	console.log("localStorage -> "+localStorage.PetBetCookies);
	console.log("sessionStorage -> "+sessionStorage.PetBetCookies);
}

function getCookies(){
	console.log("localStorage -> "+localStorage.PetBetCookies);
	console.log("sessionStorage -> "+sessionStorage.PetBetCookies);
	//var cookie = JSON.parse(localStorage.getItem("PetBetCookies")) || JSON.parse(sessionStorage.getItem("PetBetCookies")) || false;
	var cookie = false;
	var permanent = false;
	if(localStorage.getItem("PetBetCookies")){
		cookie = JSON.parse(localStorage.getItem("PetBetCookies"));
		permanent = true;
	} else if(sessionStorage.getItem("PetBetCookies")) {
		cookie = JSON.parse(sessionStorage.getItem("PetBetCookies"));
		permanent = false;
	} else {
		cookie = false;
		permanent = false;
	}

	if(cookie){//se ho trovato cookie
		var expiration = Date.parse(getExpirationFromCookie(cookie));
		var current_time = Date.now();
		if(current_time > expiration){//se i cookie sono scaduti, buttali
			localStorage.removeItem("PetBetCookies");
			sessionStorage.removeItem("PetBetCookies");
			return false;
		} else {//altrimenti rinnova i cookie per un altro giorno!
			return refreshCookie(cookie, permanent);
		}
	}
}

function getNameFromCookie(cookie){
	return cookie['session-id'].split('@')[0];
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
		localStorage.setItem("PetBetCookies", JSON.stringify(cookie));
	} else {
		sessionStorage.setItem("PetBetCookies", JSON.stringify(cookie));
	}
	return cookie;
}
