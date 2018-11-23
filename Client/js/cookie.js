function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	var cookie = name + "=" + (value || "")	+ expires + "; path=/";
	
	console.log(navigator.userAgent);
	if (navigator.userAgent.includes("Chrome")){
		document.cookie=cookie;
		localStorage.cookies=cookie;
		sessionStorage.cookies=cookie;
		console.log("localStorage"+localStorage.cookies);
		console.log("sessionStorage"+sessionStorage.cookies);
	} else if (navigator.userAgent.includes("Firefox")){
		document.cookie=cookie;
	}
}

function getCookies(){


}
