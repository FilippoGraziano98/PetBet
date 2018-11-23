function setCookie(name,value,days,permanent) {
	var expires = "";
	if (days) {
		var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	var cookie = name + "=" + (value || "")	+ expires + "; path=/";
	
	console.log(navigator.userAgent);
	if (navigator.userAgent.includes("Chrome")){
		//this should work, but actually has no effect as chrome doesn't allow to set cookies for local htmls
		//document.cookie=cookie;
		if(permanent){//use localStorage
			localStorage.PetBetCookies=cookie;
		} else {//use sessionStorage
			sessionStorage.PetBetCookies=cookie;
		}
		console.log("localStorage -> "+localStorage.PetBetCookies);
		console.log("sessionStorage -> "+sessionStorage.PetBetCookies);
	} else if (navigator.userAgent.includes("Firefox")){
		document.cookie=cookie;
	}
}

function getCookies(){
	console.log(navigator.userAgent);
	if (navigator.userAgent.includes("Chrome")){
		console.log("localStorage -> "+localStorage.PetBetCookies);
		console.log("sessionStorage -> "+sessionStorage.PetBetCookies);
	} else if (navigator.userAgent.includes("Firefox")){
		console.log(document.cookie);
	}

}
